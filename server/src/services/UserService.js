import {Users} from "../models/UserModel.js";
import {Posts} from "../models/ResultModel.js";

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

    async updateUserInfoById(id, data) {
        const user = JSON.parse(data);
        const body = {
            "email": user.email,
            "lastName": user.lastName,
            "firstName": user.firstName
        }
        return Users.updateOne({_id: id}, body);
    }

}