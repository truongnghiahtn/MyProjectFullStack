const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");
const crypto = require("crypto");
const { type } = require("os");

const userSchema = mongoose.Schema({
  userName: {
    type: String,
    required: [true, "userName is a required field"],
  },
  email: {
    type: String,
    required: [true, "email is a required field"],
    unique: true,
    validate: [validator.isEmail, "email invalidate"],
  },
  photo: {
    type: [
      {
        active: Boolean,
        src: String,
      },
    ],
    default: [{ active: true, src: "img/user.PNG" }],
  },
  role: {
    type: String,
    enum: ["user", "admin", "manager"],
    default: "user",
  },
  password: {
    type: String,
    required: [true, "password is a required field"],
    select: false,
  },
  passwordConfirm: {
    type: String,
    required: [true, "passwordConfirm is a required field"],
    validate: {
      validator: function (el) {
        return el === this.password;
      },
      message:
        "password does not match passwordConfirm. Resend passwordConfirm",
    },
  },
  passwordChangedAt: Date,
  passwordResetToken: String, // token rest password
  passwordResetExpires: Date, // hạn sử dụng token
  active: {
    type: Boolean,
    default: true,
    select: false,
  },
});

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next(); // khi update user ko đụng vô password
  this.password = await bcrypt.hash(this.password, 12);
  this.passwordConfirm = undefined;
});

userSchema.methods.checkPassword = async function (password, hashPassword) {
  return await bcrypt.compare(password, hashPassword);
};

userSchema.methods.changedPasswordAfter = function (JWTTimestamp) {
  if (this.passwordChangedAt) {
    const changedTimestamp = parseInt(
      this.passwordChangedAt.getTime() / 1000,
      10
    );
    return JWTTimestamp < changedTimestamp;
  }
  return false;
};

userSchema.methods.createPasswordResetToken = function () {
  const resetToken = crypto.randomBytes(32).toString("hex"); // reset thực tế gửi cho người dùng.

  this.passwordResetToken = crypto
    .createHash("sha256")
    .update(resetToken)
    .digest("hex");
  this.passwordResetExpires = Date.now() + 10 * 60 * 1000;
  return resetToken;
};

module.exports = mongoose.model("User", userSchema);
