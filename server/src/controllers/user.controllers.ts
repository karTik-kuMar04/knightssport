import User from "../models/user.model";
import { Request, Response } from "express";


async function createuser() {
    try {
        const user =  await User.create({
            email: "mysoulisinifinity1@gmail.com",
            password: "kartik@123"
        })
        console.log(user)
    } catch (err) {
        console.log(err);
    }
}

export default createuser;