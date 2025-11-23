const mongoose = require("mongoose");
const { Schema, model } = mongoose;

// ================= Class Schema =================
const classSchema = new Schema(
  {
    className: { type: String, required: true },
    classCode: { type: String, required: true, unique: true },

    teachers: [{ type: Schema.Types.ObjectId, ref: "User" }],
    students: [{ type: Schema.Types.ObjectId, ref: "User" }],
    subjects: [{ type: Schema.Types.ObjectId, ref: "Subject" }],

    status: {
      type: String,
      enum: ["active", "inactive"],
      default: "active",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

// ================= Export Model =================
const Class = model("Class", classSchema);
module.exports = Class;
