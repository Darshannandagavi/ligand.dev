import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import path from "path";
import userrouter from "./routes/userRoutes.js";
import router from "./routes/exanRouter.js";
import examAttemptRouter from "./routes/examAttemptRoutes.js";
import notesrouter from "./routes/notesRoutes.js";
import optionsRouter from "./routes/optionsRoute.js";
import topicrouter from "./routes/topicRoutes.js";
import attendanceRoutes from "./routes/attendanceRoutes.js";
import feePaymentRoutes from "./routes/feePaymentRoutes.js";
import feeGroupRoutes from "./routes/feeGroupRoutes.js";
import TeacherRouter from "./routes/TeacherRouter.js";
import homeworkRoutes from "./routes/homeworkRoutes.js";
import homeworkstatusRouter from "./routes/homeworkStatusRoutes.js";

const app = express();
app.use(bodyParser.json());
app.use(cors({
  origin: "https://liganddevelopers.vercel.app",
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true
}));

app.use("/uploads", express.static(path.join(process.cwd(), "uploads")));

dotenv.config();
const PORT = process.env.PORT || 7000;
const URL = process.env.MONGOURL;

mongoose
  .connect(URL)
  .then(() => {
    console.log("DB connected Successfully");
    app.listen(PORT, () => {
      console.log(`Server is runniing on Port:${PORT}`);
    });
  })
  .catch((error) => console.log(error));



app.use("/api/users", userrouter);
app.use("/api/exams", router);
app.use("/api/attempts", examAttemptRouter);
app.use("/api/notes",notesrouter);
app.use("/api/options",optionsRouter);
app.use("/api/topics",topicrouter);
app.use("/api/assignments", homeworkRoutes);
app.use("/api/attendance", attendanceRoutes);
app.use("/api/fee-payment", feePaymentRoutes);
app.use("/api/fee-groups", feeGroupRoutes);
app.use("/api/teacher", TeacherRouter);
app.use("/api/homeworkstatus",homeworkstatusRouter);