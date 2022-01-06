import {AuthService} from "../services/AuthService.js";
import {UserService} from "../services/UserService.js";

const authService = new AuthService();
const userService = new UserService();

export const createAuthRoutes = async fastify => {
        fastify.options('/*', async (request, reply) => {
            reply.header("Access-Control-Allow-Origin", "*")
            reply.header("Access-Control-Allow-Headers", "content-type, authorization")
            reply.code(200)
        });

        fastify.post('/signup', async (request, reply) => {
                try {
                    const candidate = await userService.getUserInfoByEmail(request.body.email);
                    if (candidate) {
                        reply.code(403)
                        reply.send({error: "This email already exists"})
                        return
                    }
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

        fastify.post('/logout', async (request, reply) => {
                try {
                    await authService.userLogout(request);
                    reply.code(200);
                    reply.send({ success: true, loggedOut: true });
                } catch (error) {
                    throw new Error('Invalid username/password combination');
                }
        });


}

