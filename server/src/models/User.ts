import mongoose, { Schema, Document, Model, Types } from "mongoose";
import { ISubject } from "./Subject";

// Export interface để dùng ở service/controller khác
export interface IUser extends Document {
  fullName: string;
  email: string;
  password: string;
  subjects: Types.ObjectId[] | ISubject[];
  isAdmin: boolean;
  isTeacher: boolean;
  walletAddress?: string; // địa chỉ blockchain
  status: "active" | "inactive";
  createdAt: Date;
}

const userSchema: Schema<IUser> = new Schema({
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

const User: Model<IUser> = mongoose.model<IUser>("User", userSchema);

export default User;
