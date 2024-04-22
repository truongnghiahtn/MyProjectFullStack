const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const fileSchema = new Schema({
  filename: String,
  url:{
    type:String,
    required: [true, "url is a required field"],
  },
  type:{
    type:String,
    enum: ["image", "audio","video"],
  },
  createAt:{
    type:Date,
    default: Date.now(),
  },
  // Các thuộc tính file khác...
  user: { type: Schema.Types.ObjectId, ref: 'User' } // Tham chiếu tới User
});

module.exports = mongoose.model("File", fileSchema);