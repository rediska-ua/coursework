const bcrypt = require('bcryptjs');
const { isLogged } = require('./isLogged');
const { sentData } = require('../services/dataToPython')
/**
 * @param {import('fastify').FastifyInstance} fastify
 */
const routes = async fastify => {

    fastify.options('/*', async (req, reply) => {
        reply.header("Access-Control-Allow-Origin", "*")
        reply.header("Access-Control-Allow-Headers", "content-type, authorization")
        reply.code(204)
    })


    fastify.get('/', async (req, reply) => {
        const client = await fastify.pg.connect()
        const { rows } = await client.query(
            'SELECT * from users'
        )
        client.release()
        reply.send({ rows })
    })


    fastify.post('/signup', async (request, reply) => {
            reply.header("Access-Control-Allow-Origin", "*")
            const { email, password, firstName, lastName } = request.body;
            console.log(request.body)
            try {
                const hashed = await bcrypt.hash(password, 10);
                const client = await fastify.pg.connect();
                const user = await client.query(
                    'INSERT INTO users (password_hash, email, firstName, lastName) VALUES ($1, $2, $3, $4) RETURNING id',
                    [hashed, email, firstName, lastName],
                );
                const id = user.rows[0].id;
                console.log(id)
                reply.code(201);
                reply.send({ id, email });
            } catch (error) {
                console.warn(error);
                throw new Error('Unable to complete signup');
            }
        },
    );



    fastify.post('/login', async (request, reply) => {
            reply.header("Access-Control-Allow-Origin", "*")
            try {
                const { email, password } = request.body;
                console.log(password)
                const client = await fastify.pg.connect();
                const user = await client.query(
                    'SELECT id, password_hash, email FROM users WHERE email = $1',
                    [email],
                );
                const isValidPassword = await bcrypt.compare(
                    password,
                    user.rows[0].password_hash,
                );
                if (!isValidPassword) {
                    throw new Error();
                }
                const token = fastify.jwt.sign({ userId: user.rows[0].id })
                reply.send({ token })
            } catch (error) {
                throw new Error('Invalid username/password combination');
            }
        },
    );

    fastify.post('/sentInfo', async (request, reply) => {
        reply.header("Access-Control-Allow-Origin", "*")
        try {
            const { text } = request.body;
            const result = await sentData(text);
            console.log(typeof result)
            reply.send({result})
        } catch (error) {
            throw new Error('Invalid username/password combination');
        }
    });

    fastify.post('/logout', { preHandler: isLogged }, (request, reply) => {
        console.log(request.session.user)
        request.session.user = null;
        request.sessionStore.destroy(request.session.sessionId, err => {
            if (err) {
                reply.code(400);
                reply.send({ message: 'Something went wrong', success: false });
                return;
            }

            reply.redirect('/');
            reply.send({ success: true, loggedOut: true });
        });
    });

    fastify.get('/me', async (request, reply) => {
            reply.header("Access-Control-Allow-Origin", "*")
            try {
                const verified = await request.jwtVerify()
                const id = verified.userId;
                if (id) {
                    console.log(verified.userId)
                    const client = await fastify.pg.connect();
                    const user = await client.query(
                        'SELECT id, email, firstName, lastName FROM users WHERE id = $1',
                        [id],
                    );
                    reply.send(user.rows[0]);
                } else {
                    throw Error()
                }

            } catch (error) {
                throw new Error('Invalid username/password combination');
            }
        },
    );
};

module.exports = routes;
