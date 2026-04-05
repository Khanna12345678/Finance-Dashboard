import express from "express";
import cors from "cors";
import { connectDB } from "./DB/Database.js";
import dotenv from "dotenv";
import helmet from "helmet";
import morgan from "morgan";
import transactionRoutes from "./Routers/Transactions.js";
import userRoutes from "./Routers/userRouter.js";

dotenv.config(); // ✅ only once

const app = express();

// ✅ safe port
const port = process.env.PORT || 5000;

// ✅ connect DB
connectDB();

// ✅ CORS config
const allowedOrigins = [
  "http://localhost:3000",
  "http://127.0.0.1:3000",
  "https://main.d1sj7cd70hlter.amplifyapp.com",
  "https://expense-tracker-app-three-beryl.vercel.app",
];

// ✅ Middleware
app.use(express.json());

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin) return callback(null, true); // postman
      if (allowedOrigins.includes(origin)) {
        return callback(null, true);
      } else {
        return callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
  })
);

app.use(helmet());
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
  console.log(`Server is listening on http://localhost:${port}`);
});

// import express from "express";
// import cors from "cors";
// import dotenv from "dotenv";
// import mongoose from "mongoose";
// import morgan from "morgan";
// import helmet from "helmet";

// import authRoutes from "./routes/authRoutes.js";
// import recordRoutes from "./routes/recordRoutes.js";

// dotenv.config();

// const app = express();

// // DB CONNECT
// mongoose.connect(process.env.MONGO_URI, {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
// }).then(() => console.log("MongoDB Connected"))
//   .catch(err => console.log(err));

// // ✅ CORS FIX (LOCAL + DEPLOY)
// const allowedOrigins = [
//   "http://localhost:3000",
//   "http://127.0.0.1:3000",
//   "https://main.d1sj7cd70hlter.amplifyapp.com",
//   "https://expense-tracker-app-three-beryl.vercel.app",
// ];

// app.use(cors({
//   origin: function (origin, callback) {
//     if (!origin) return callback(null, true);
//     if (allowedOrigins.includes(origin)) {
//       callback(null, true);
//     } else {
//       callback(new Error("CORS blocked"));
//     }
//   },
//   credentials: true,
// }));

// // Middlewares
// app.use(express.json());
// app.use(morgan("dev"));
// app.use(helmet());

// // Routes
// app.use("/api/auth", authRoutes);
// app.use("/api/records", recordRoutes);

// app.get("/", (req, res) => {
//   res.send("API Running...");
// });

// const PORT = process.env.PORT || 5000;
// app.listen(PORT, () => {
//   console.log(`Server running on http://localhost:${PORT}`);
// });