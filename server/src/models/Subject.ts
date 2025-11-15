import mongoose, { Schema, Document, Model } from "mongoose";

export interface ISubject extends Document {
  name: string;
  code: string;
  credit: number;
}

const subjectSchema: Schema<ISubject> = new Schema({
  name: { type: String, required: true },
  code: { type: String, required: true, unique: true },
  credit: { type: Number, required: true },
});

const Subject: Model<ISubject> = mongoose.model<ISubject>("Subject", subjectSchema);

export default Subject;
