import express from "express";
import { loginAdmin, getAllRegistrations } from "../controllers/admin.controllers";
import { protectAdmin } from "../middlewares/auth.middleware";


const adminRouter = express.Router();

// login route
adminRouter.post("/login", loginAdmin);

adminRouter.get("/dashboard", protectAdmin, (req, res) => {
    res.json({ message: "Welcome Admin" });
});

adminRouter.get("/players", protectAdmin, getAllRegistrations);

export default adminRouter;