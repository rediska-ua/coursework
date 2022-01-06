import {UserService} from "../services/UserService.js";
import {Users} from "../models/UserModel.js";
import {AuthService} from "../services/AuthService.js";

const authService = new AuthService();
const userService = new UserService();


export const createUserRoutes = async fastify => {
    fastify.options('/*', async (request, reply) => {
        reply.header("Access-Control-Allow-Origin", "*")
        reply.header("Access-Control-Allow-Headers", "content-type, authorization")
        reply.code(200)
    });

    fastify.get('/', async (request, reply) => {
        reply.code(200);
        reply.send("Hello world");
    });



    fastify.get('/profile', async (request, reply) => {
        const userId = await authService.isLogged(request)
        if (userId) {
            const result = await userService.getUserInfoById(userId);
            reply.code(200);
            reply.send(result);
        }
        throw new Error('Invalid username/password combination');
    });

    fastify.put('/update/:id', async (request, reply) => {
        const userId = request.params.id;
        const body = request.body;
        if (userId) {
            const result = await userService.updateUserInfoById(userId, body);
            reply.code(200);
            reply.send(result);
        }
        throw new Error('Invalid user info');
    });

    fastify.get('/profile/:email', async (request, reply) => {
        const email = request.params.email
        if (email) {
            const result = await userService.getUserInfoByEmail(email);
            reply.code(200);
            reply.send(result);
        }
        throw new Error('Invalid email format');
    });

    fastify.get('/getCurrentUser', async (request, reply) => {
        try {
            console.log('here')
            const data = await request.jwtVerify()
            console.log(data)
            if (data) {
                const result = await userService.getUserInfoById(data.userId);
                console.log(result)
                reply.code(200);
                reply.send(result);
            }
        } catch (error) {
            console.log(error)
            if (error.message === 'The token is malformed.') {
                reply.code(401);
                reply.send('The token is null or invalid')
            }
        }

    });

}
