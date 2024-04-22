const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const quizSchema = new Schema({
  name: String,
  description: String,
  type: String,
  file: { type: Schema.Types.ObjectId, ref: "File" },
  password:{
    type:String,
    default:"",
  },
  public: {
    type: Boolean,
    default: true,
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
  createAt: {
    type: Date,
    default: Date.now(),
  },
  updateAt: {
    type: Date,
    default: Date.now(),
  },
});

module.exports = mongoose.model("Quiz", quizSchema);
