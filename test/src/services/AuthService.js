const Users = require("../models/UserModel.js");
const bcrypt = require('bcryptjs');

class AuthService {

    async userRegister(body) {
        const { email, password, firstName, lastName } = body;
        const hashed = await bcrypt.hash(password, 10);
        const user = {
            email: email,
            password: hashed,
            firstName: firstName,
            lastName: lastName
        };
        const client = await Users.create(user)
        return client._id;
    }

    async userLogin(body, server) {
        const { email, password } = body;
        const client = await Users.findOne({ email: `${email}` }).exec();
        const isValidPassword = await bcrypt.compare(
            password,
            client.password,
        );
        if (!isValidPassword) {
            throw new Error();
        }
        const token = server.jwt.sign({ userId: client._id });
        return token.toString();
    }

    async userLogout(request) {
        if (await this.isLogged(request)) {
            return true;
        }
        throw new Error();
    }

    async isLogged(request) {
        const { userId } = await request.jwtVerify()
        return userId;
    }

}

module.exports = AuthService;