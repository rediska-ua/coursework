import {Posts} from "../models/ResultModel.js";
import PyConnector from "pyconnector";

const PyAPI = new PyConnector({
    endpoint: 24001,
});


export class ResultService {

    async getResultById(id) {
        return await Posts.findOne({_id: id}).exec();
    }

    async analyseText(text, sources) {
        console.log(text, sources);
        return await PyAPI.query('text', {text: text, sources: sources});
    }

    async postResult(result) {
        const data = await Posts.create(result);
        return data._id;
    }

    async updateResultById(resultId, statement) {
        const condition = JSON.parse(statement);
        const updateResult = {
            "isSaved": true
        }
        if (condition === false) {
            updateResult["isSaved"] = false
        }
        return Posts.updateOne({_id: resultId}, updateResult);
    }

    async getAllByUserId(userId) {
        return await Posts.find({createdBy: userId, isSaved: true}).exec();
    }

    async deleteResultById(id) {
        return Posts.deleteOne({_id: id});
    }



}
