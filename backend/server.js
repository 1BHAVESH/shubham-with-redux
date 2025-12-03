import express from "express"
import nodemailer from "nodemailer"
import cors from "cors"
import dotenv from "dotenv";   
import mailRoute from "./routes/mailRoute.js"

dotenv.config();  

const PORT = 3001;

const app = express();

app.use(cors({
  origin: "http://localhost:5173",
  credentials: true,
}));

app.use(express.json()); 

app.use("/api/mail", mailRoute);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
