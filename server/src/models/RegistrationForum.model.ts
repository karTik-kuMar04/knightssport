import mongoose, { Schema, Document } from "mongoose";

export interface IRegistration extends Document {
  firstName: string;
  middleName?: string;
  lastName: string;
  dob: Date;
  email?: string;
  phone: string;
  address: string;
  trialDistrict: string;
  role: string;

  feeStatus: "Pending" | "Paid" | "Failed";

  razorpayOrderId?: string;
  razorpayPaymentId?: string;
  razorpaySignature?: string;

  amount: number;
}

const schema = new Schema<IRegistration>(
  {
    firstName: { type: String, required: true },
    middleName: { type: String },
    lastName: { type: String, required: true },
    dob: { type: Date, required: true },

    email: { type: String, sparse: true },
    phone: { type: String, required: true, unique: true },

    address: { type: String, required: true },
    trialDistrict: { type: String, required: true },
    role: { type: String, required: true },

    feeStatus: {
      type: String,
      enum: ["Pending", "Paid", "Failed"],
      default: "Pending",
    },

    razorpayOrderId: String,
    razorpayPaymentId: String,
    razorpaySignature: String,

    amount: { type: Number, default: 499 },
  },
  { timestamps: true }
);

const Registration = mongoose.model<IRegistration>("Registration", schema);

export default Registration;