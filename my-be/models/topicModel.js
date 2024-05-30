const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const topicSchema = new Schema({
  name:{
    type:String,
    required: [true, "name is a required field"],
  },
  description: {
    type: String,
    required: [true, "description is a required field"],
  },
  file: { type: Schema.Types.ObjectId, ref: "File" },
  createdAt: {
    type: Date,
    default: Date.now(),
    // select: false,
  },
  updatedAt: {
    type: Date,
    default: Date.now(),
    select: false,
  }
});

module.exports = mongoose.model("Topic", topicSchema);
