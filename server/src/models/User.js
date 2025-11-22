const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const userSchema = new Schema({
  fullName: { type: String },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true }, // hash trước khi lưu

  // Nếu là giảng viên thì subject là môn dạy - Nếu là sinh viên trong subject là môn học
  subjects: [{ type: Schema.Types.ObjectId, ref: "Subject" }],

  isAdmin: { type: Boolean, default: false, required: true },
  isTeacher: { type: Boolean, default: false, required: true },
  walletAddress: { type: String }, // chỉ lưu khi teacher connect MetaMask
  status: {
    type: String,
    enum: ["active", "inactive"],
    default: "active",
    required: true,
  },
  createdAt: { type: Date, default: Date.now },
});

const User = model("User", userSchema);
module.exports = User;
