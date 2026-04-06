import express from "express";
import cors from "cors";
import { connectDB } from "./DB/Database.js";
import dotenv from "dotenv";
import helmet from "helmet";
import morgan from "morgan";
import transactionRoutes from "./Routers/Transactions.js";
import userRoutes from "./Routers/userRouter.js";

dotenv.config();

const app = express();

// ✅ Port (Render compatible)
const port = process.env.PORT || 5000;

// ✅ Connect DB
connectDB();


// 🔥 ✅ CORS FIX (sabse upar hona chahiye)
app.use(cors());
app.options("*", cors()); // preflight handle


// ✅ Middlewares
app.use(express.json());

// ⚠️ Helmet (temporarily optional, baad me enable kar lena)
// app.use(helmet());

app.use(morgan("dev"));


// ✅ Routes
app.use("/api/v1", transactionRoutes);
app.use("/api/auth", userRoutes);


// ✅ Test route
app.get("/", (req, res) => {
  res.send("Server is running 🚀");
});


// ✅ Start server
app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});