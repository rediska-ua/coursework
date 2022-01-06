const pkg = require('mongoose');
const { Schema, model } = pkg;


const usersSchema = new Schema({
    email: { type: String, required: true },
    password: { type: String, required: true },
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
});

const Users = model("Users", usersSchema);

module.exports = Users