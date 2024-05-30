const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const User = require("./userModel");

const questionSchema = Schema(
  {
    question: {
      type: String,
      required: [true, "question is a required field"],
    },
    description: String,
    file: { type: Schema.Types.ObjectId, ref: "File" },
    url: String,
    time: {
      type: String,
      required: [true, "time is a required field"],
    },
    answers: {
      type: {
        type: String,
        enum: ["selection", "text"],
        default: "selection",
      },
      url: String,
      answerText: String,
      answerOpt: {
        type: [
          {
            aws: String,
            isCorrect: Boolean,
          },
        ],
      },
    },
    user: { type: Schema.Types.ObjectId, ref: "User" },
    public: {
      // xác định câu hỏi này của user đã được duyệt hay chưa true ... của user và đã đc admin duyệt làm câu hỏi chính
      type: Boolean,
      default: false,
    },
    createdAt: {
      type: Date,
      default: Date.now(),
    },
    updatedAt: {
      type: Date,
      default: Date.now(),
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

// questionSchema.virtual('userName', {
//   ref: 'User',
//   localField: 'user',
//   foreignField: '_id',
//   justOne: true
// });

// questionSchema.virtual('userName').get(function () {
//   return this.user.userName
// });

module.exports = mongoose.model("Question", questionSchema);
