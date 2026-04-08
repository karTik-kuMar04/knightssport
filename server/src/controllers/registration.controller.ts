import { Request, Response } from "express";
import crypto from "crypto";
import Registration from "../models/RegistrationForum.model";
import { razorpay } from "../config/razorpay";


// 🔥 STEP 1: CREATE ORDER
export const createOrder = async (req: Request, res: Response) => {
  try {
    const {
      firstName,
      middleName,
      lastName,
      dob,
      email,
      phone,
      address,
      trialDistrict,
      role,
    } = req.body;

    // validation
    if (!firstName || !lastName || !dob || !phone || !address || !trialDistrict || !role) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    // duplicate check
    const existing = await Registration.findOne({ phone });
    if (existing) {
      return res.status(400).json({ message: "User already registered" });
    }

    // create pending user
    const registration = await Registration.create({
      firstName,
      middleName,
      lastName,
      dob,
      email,
      phone,
      address,
      trialDistrict,
      role,
      feeStatus: "Pending",
      amount: 1,// set to 1 for testing, change to 499 in production
    });

    // create razorpay order
    const order = await razorpay.orders.create({
      amount: 1 * 100,
      currency: "INR",
      receipt: `reg_${registration._id}`,
    });

    registration.razorpayOrderId = order.id;
    await registration.save();

    res.json({
      order,
      registrationId: registration._id,
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Order creation failed" });
  }
};



// 🔥 STEP 2: VERIFY PAYMENT
export const verifyPayment = async (req: Request, res: Response) => {
  try {
    const {
      registrationId,
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
    } = req.body;

    const body = razorpay_order_id + "|" + razorpay_payment_id;

    const expected = crypto
      .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET!)
      .update(body)
      .digest("hex");

    const registration = await Registration.findById(registrationId);

    if (!registration) {
      return res.status(404).json({ message: "Registration not found" });
    }

    if (expected !== razorpay_signature) {
      registration.feeStatus = "Failed";
      await registration.save();

      return res.status(400).json({ message: "Payment failed" });
    }

    // success
    registration.feeStatus = "Paid";
    registration.razorpayPaymentId = razorpay_payment_id;
    registration.razorpaySignature = razorpay_signature;

    await registration.save();

    res.json({ message: "Payment successful" });

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Verification failed" });
  }
};