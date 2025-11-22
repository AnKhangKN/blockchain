const mongoose = require("mongoose");
const { Schema, model } = mongoose;

// ================= Subject Schema =================
const subjectSchema = new Schema({
  name: { type: String, required: true },
  code: { type: String, required: true, unique: true },
  status: {
    type: String,
    required: true,
    enum: ["active", "inactive"],
    default: "active",
  },
  teachers: [{ type: Schema.Types.ObjectId, ref: "User" }],
  students: [{ type: Schema.Types.ObjectId, ref: "User" }],
});

// ================= Export Model =================
const Subject = model("Subject", subjectSchema);
module.exports = Subject;
