import {Users} from "../models/UserModel.js";

export class UserService {

    async getUserInfoById(id) {
        const { _id, email, firstName, lastName } = await Users.findOne({_id: id}).exec();
        return {
            id: _id,
            email,
            firstName,
            lastName
        };
    }

    async getUserInfoByEmail(email) {
        const result = await Users.findOne({email: email}).exec();
        console.log(result)
        return result;
    }

}