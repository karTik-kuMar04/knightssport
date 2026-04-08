import { Request, Response } from "express";
import Admin from "../models/user.model";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import Registration from "../models/RegistrationForum.model";

dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET as string;

export const loginAdmin = async (req: Request, res: Response) => {
    try {
        console.log("BODY:", req.body);

        const { email, password } = req.body;

        const admin = await Admin.findOne({ email });
        console.log("ADMIN:", admin);

        if (!admin) {
            return res.status(400).json({ message: "Invalid email or password" });
        }

        const isMatch = await bcrypt.compare(password, admin.password);
        console.log("MATCH:", isMatch);

        const token = jwt.sign(
            { id: admin._id },
            process.env.JWT_SECRET as string,
            { expiresIn: "7d" }
        );

        res.status(200).json({
            message: "Login successful",
            token,
        });

    } catch (error) {
        console.error("LOGIN ERROR:", error);
        res.status(500).json({ message: "Server error", error });
    }
};


export const getAllRegistrations = async (req: Request, res: Response) => {
    try {
        const registrations = await Registration.find().sort({ createdAt: -1 });
        res.json(registrations);
    } catch (error) {
        console.error("GET REGISTRATIONS ERROR:", error);
        res.status(500).json({ message: "Server error", error });
    }
}


// async function createAdmin() {
//     const hashedPassword = await bcrypt.hash("admin123", 10);

//     await Admin.create({
//         email: "mysoulisinfinity1@gmail.com",
//         password: hashedPassword,
//     });

//     console.log("Admin created");
// }

// createAdmin();