const mongoose = require("mongoose");

const questionSchema = mongoose.Schema({
  question: {
    type: String,
    required: [true, "question is a required field"],
  },
  file: { type: Schema.Types.ObjectId, ref: "File" },
  url: String,
  time:String,
  answers: {
    type: [
      {
        type: {
          type: String,
          enum: ["selection", "text"],
          default: "selection",
        },
        src: String,
        answer:
          type[
            {
              aws: String,
              isCorrect: Boolean,
            }
          ],
      },
    ],
  },
  createAt: {
    type: Date,
    default: Date.now(),
  },
  updateAt: {
    type: Date,
    default: Date.now(),
  },
});

module.exports = mongoose.model("Question", questionSchema);
