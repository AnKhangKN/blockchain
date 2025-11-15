const mongoose = require("mongoose");
const { Schema, model } = mongoose;

// ================= User Schema =================
const userSchema = new Schema({
  fullName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  subjects: [{ type: Schema.Types.ObjectId, ref: "Subject" }],
  isAdmin: { type: Boolean, default: false, required: true },
  isTeacher: { type: Boolean, default: false, required: true },
  walletAddress: { type: String, required: false },
  status: {
    type: String,
    enum: ["active", "inactive"],
    default: "active",
    required: true,
  },
  createdAt: { type: Date, default: Date.now },
});

// ================= Export Model =================
const User = model("User", userSchema);
module.exports = User;
