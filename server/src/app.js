import fastify from "fastify";
import fastifyCors from "fastify-cors";
import fastifyJwt from "fastify-jwt";
import {createUserRoutes} from "./routes/userRoutes.js";
import {createAuthRoutes} from "./routes/authRoutes.js";
import {createResultRoutes} from "./routes/resultRoutes.js";
import pkg from 'mongoose';
const { connect } = pkg;

export const build = (variables) => {
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
