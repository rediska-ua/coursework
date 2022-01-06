
const pkg = require('mongoose');
const { connect } = pkg;
const fastify = require('fastify');
const fastifyCors = require('fastify-cors');
const fastifyJwt = require('fastify-jwt');
const createUserRoutes = require('./routes/userRoutes.js');
const createAuthRoutes = require('./routes/authRoutes.js');
const createResultRoutes = require('./routes/resultRoutes.js');


const build = (variables) => {
    const server = fastify({
        logger: true
    });

    try {
        connect(`${variables.mongo}`);
    } catch (error) {
        console.log(error)
    }

    server.register(fastifyCors, {
        credentials: true,
        origin: ["http://localhost:3000"],
    });

    server.register(fastifyJwt, {
        secret: "supersecret"
    });

    server.decorate("authentication", async (request, reply) => {
        try {
            await request.jwtVerify()
        } catch (err) {
            reply.send(err)
        }
    });

    server.register(createUserRoutes, { prefix: '/api/user'});
    server.register(createAuthRoutes, { prefix: '/api/auth'});
    server.register(createResultRoutes, { prefix: '/api/analyze'});

    return server;
}

module.exports = build;
