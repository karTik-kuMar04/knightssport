import mongoose, { Schema } from "mongoose";

interface IUser extends Document {
    email: string;
    password: string;
}

const userSchema = new Schema<IUser>({
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
});

const Admin = mongoose.model<IUser>("Admin", userSchema);

export default Admin;