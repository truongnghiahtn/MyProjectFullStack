const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const bcrypt = require("bcryptjs");
const crypto = require("crypto");

const quizSchema = new Schema({
  name: String,
  description: String,
  type: String,
  file: { type: Schema.Types.ObjectId, ref: "File" },
  password:{
    type:String,
    default:"",
  },
  active: {
    type: Boolean,
    default: true,
  },
  start:{
    type:Date,
    default: Date.now(),
  },
  expire:{
    type:Date,
    default: Date.now() + 100 * 24 * 60 * 60 * 1000,
  },
  questions: [{ type: Schema.Types.ObjectId, ref: "Question" }],
  user:{ type: Schema.Types.ObjectId, ref: "User" },
  public:{// xác định câu hỏi này của user đã được duyệt hay chưa true ... của user và đã đc admin duyệt làm câu hỏi chính
    type:Boolean,
    default:false
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
  updatedAt: {
    type: Date,
    default: Date.now(),
  },
});


quizSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next(); // khi update user ko đụng vô password
  this.password = await bcrypt.hash(this.password, 12);
});

quizSchema.methods.checkPassword = async function (password, hashPassword) {
  return await bcrypt.compare(password, hashPassword);
};

module.exports = mongoose.model("Quiz", quizSchema);
