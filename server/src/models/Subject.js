const mongoose = require("mongoose");
const { Schema, model } = mongoose;

// ================= Subject Schema =================
const subjectSchema = new Schema(
  {
    name: { type: String, required: true, trim: true },
    code: {
      type: String,
      required: true,
      unique: true,
      uppercase: true,
      trim: true,
    },

    teachers: [{ type: Schema.Types.ObjectId, ref: "User" }],
    students: [{ type: Schema.Types.ObjectId, ref: "User" }],
    classes: [{ type: Schema.Types.ObjectId, ref: "Class" }],

    status: {
      type: String,
      required: true,
      enum: ["active", "inactive"],
      default: "active",
    },
    metadata: { type: Schema.Types.Mixed },
  },
  {
    timestamps: true,
  }
);

// ================= Export Model =================
const Subject = model("Subject", subjectSchema);
module.exports = Subject;
