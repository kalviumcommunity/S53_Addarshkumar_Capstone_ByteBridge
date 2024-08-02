const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true,
        minlength: 6
    },
    profileImg: {
        type: String,
    },
    questions: {
        questions_id: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "questions"
            }
        ]
    },
    answers: {
        answers_id: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "answers"
            }
        ]
    },
    blogs: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "blogs"
        }
    ],
    ads: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "ads"
        }
    ],
    verified: { type: Boolean, default: false },
});

const userModel = mongoose.model("users", userSchema);
module.exports = userModel;
