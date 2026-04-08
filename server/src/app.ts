import express from "express";
import cors from "cors";
import router from "./route/route";
import dotenv from "dotenv";

dotenv.config();

const app = express();

app.use(cors({
    origin: process.env.CORS_ORIGIN
}));
app.use(express.json());

app.get("/", (req, res) => {
    res.json({
        success: true,
        message: "app is running",
    });
});
app.use("/api/payment", router);

export default app;