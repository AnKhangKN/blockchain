const mongoose = require("mongoose");
const { Schema, model } = mongoose;

// ================= User Schema =================
const userSchema = new Schema(
  {
    fullName: { type: String, required: true, trim: true },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    password: { type: String, required: true }, // hash trước khi lưu

    // Relations
    subjects: [{ type: Schema.Types.ObjectId, ref: "Subject" }],
    classes: [{ type: Schema.Types.ObjectId, ref: "Class" }],

    // Roles
    isAdmin: { type: Boolean, default: false, required: true },
    isTeacher: { type: Boolean, default: false, required: true },

    // Wallet (optional). Unique when present
    walletAddress: { type: String, sparse: true, unique: true },

    status: {
      type: String,
      enum: ["active", "inactive"],
      default: "active",
      required: true,
    },

    lastLoginAt: { type: Date },
    metadata: { type: Schema.Types.Mixed },
  },
  {
    timestamps: true,
    toJSON: {
      transform(doc, ret) {
        delete ret.password;
        delete ret.__v;
        return ret;
      },
    },
  }
);

// Indexes
userSchema.index({ email: 1 }, { unique: true });
userSchema.index({ walletAddress: 1 }, { unique: true, sparse: true });

// Normalize email and wallet address on save
userSchema.pre("save", function (next) {
  if (this.email) this.email = this.email.toLowerCase().trim();
  if (this.walletAddress)
    this.walletAddress = this.walletAddress.toLowerCase().trim();
  next();
});

const User = model("User", userSchema);
module.exports = User;
