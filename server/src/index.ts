import app from "./app";
import dotenv from "dotenv";
import connectDB from "./config/db";


dotenv.config();

const PORT = process.env.PORT;

if (!PORT) {
    console.error("PORT is not defined");
    process.exit(1);
}

connectDB();


app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});