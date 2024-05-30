const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const fileSchema = new Schema({
  filename: String,
  url: {
    type: String,
    required: [true, "url is a required field"],
  },
  type: {
    type: String,
    enum: ["image", "audio", "video"],
  },

  status: {
    type: Boolean,
    default: false,
  },
  // Các thuộc tính file khác...
  user: { type: Schema.Types.ObjectId, ref: "User", select: false }, // Tham chiếu tới User
  createdAt: {
    type: Date,
    default: Date.now(),
    // select: false,
  }
});

module.exports = mongoose.model("File", fileSchema);
