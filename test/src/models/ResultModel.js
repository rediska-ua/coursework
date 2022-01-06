const pkg = require('mongoose');
const { Schema, model } = pkg;


const resultsSchema = new Schema({
    input_text: { type: String, required: true },
    verdict: { type: Boolean, required: true },
    date: { type: String, required: false },
    original_source_text: { type: String, required: false },
    source_keywords: [{ type: String, required: false }],
    picture: { type: String, required: false },
    cosine_similarity: { type: String, required: false },
    source_channel: { type: String, required: false },
    createdBy: { type: Schema.Types.ObjectId, required: true, ref: "Users" },
    isSaved: { type: Boolean, required: true },
});

const Posts = model("Results", resultsSchema);

module.exports = Posts


