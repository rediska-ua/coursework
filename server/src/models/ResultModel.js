import pkg from 'mongoose';
const { Schema, model } = pkg;


const resultsSchema = new Schema({
    percentage: { type: Number, required: true },
    description: { type: String, required: true },
    createdBy: { type: Schema.Types.ObjectId, required: true, ref: "Users" },
});

export const Posts = model("Results", resultsSchema);


