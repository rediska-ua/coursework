
import fastify from 'fastify';
import {createAuthRoutes} from "./routes/authRoutes.js";
import {createUserRoutes} from "./routes/userRoutes.js";
import vars from './helpers/appConfig.js';
import pkg from 'mongoose';
const { connect } = pkg;
import fastifyCors from "fastify-cors";
import fastifyJwt from "fastify-jwt";



const setupServer = () => {

    const server = fastify({
        logger: true
    });

    try {
        connect(`${vars.mongo}`);
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

    server.listen(8080, (error, address) => {
        if (error) {
            server.log.error(error)
            process.exit(1)
        }
       server.log.info(`server listening on ${address}`)
    })
}


setupServer();

