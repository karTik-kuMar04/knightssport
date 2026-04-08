import mongoose, { Schema, Document } from "mongoose";

export interface IForum extends Document {
  title: string;
  description?: string;
  category: "u19" | "senior";
  minAge: number;
  maxAge: number;
  seatsTotal: number;
  seatsLeft: number;
  fee: number;
  validTill: Date;
  status: "draft" | "published" | "closed";
  createdBy?: string;
  createdAt: Date;
  updatedAt: Date;
}

const forumSchema = new Schema<IForum>(
  {
    title: { type: String, required: true, trim: true, unique: true },
    description: { type: String, trim: true },
    category: {
      type: String,
      enum: ["u19", "senior"],
      required: true,
    },
    minAge: { type: Number, required: true, min: 0 },
    maxAge: { type: Number, required: true, min: 0 },
    seatsTotal: { type: Number, required: true, min: 1 },
    seatsLeft: { type: Number, required: true, min: 0 },
    fee: { type: Number, required: true, min: 0 },
    validTill: { type: Date, required: true },
    status: {
      type: String,
      enum: ["draft", "published", "closed"],
      default: "published",
    },
    createdBy: { type: String },
  },
  { timestamps: true }
);

forumSchema.pre("validate", function (this: IForum, next: (err?: Error) => void) {
  if (this.maxAge <= this.minAge) {
    return next(new Error("maxAge must be greater than minAge"));
  } else {
    next();
  }
});

const Forum = mongoose.model<IForum>("Forum", forumSchema);
export default Forum;