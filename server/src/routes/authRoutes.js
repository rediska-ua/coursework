import {AuthService} from "../services/AuthService.js";

const authService = new AuthService();

export const createAuthRoutes = async fastify => {
        fastify.options('/*', async (request, reply) => {
            reply.header("Access-Control-Allow-Origin", "*")
            reply.header("Access-Control-Allow-Headers", "content-type, authorization")
            reply.code(200)
        });

        fastify.post('/signup', async (request, reply) => {
                try {
                    const result = await authService.userRegister(request.body);
                    reply.code(201);
                    reply.send({result});
                } catch (error) {
                    throw new Error('Unable to complete signup');
                }
            },
        );

        fastify.post('/login', async (request, reply) => {
                try {
                    const result = await authService.userLogin(request.body, fastify);
                    console.log(result)
                    reply.code(201);
                    reply.send({result})
                } catch (error) {
                    throw new Error('Invalid username/password combination');
                }
            },
        );

        /*fastify.post('/sentInfo', async (request: FastifyRequest, reply: FastifyReply) => {
            reply.header("Access-Control-Allow-Origin", "*")
            try {
                const { text } = request.body;
                const result = await sentData(text);
                console.log(typeof result)
                reply.send({result})
            } catch (error) {
                throw new Error('Invalid username/password combination');
            }
        });*/

        fastify.post('/logout', async (request, reply) => {
                try {
                    await authService.userLogout(request);
                    reply.code(200);
                    reply.send({ success: true, loggedOut: true });
                } catch (error) {
                    throw new Error('Invalid username/password combination');
                }
        });

        /*fastify.get('/me', async (request: FastifyRequest, reply: FastifyReply) => {
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
        );*/

}

