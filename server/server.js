import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import mongoose from "mongoose";
import NurseProfileRoute from "./Routes/NurseProfileRoute.js";
import PatientProfileRoute from "./Routes/PatientProfileRoute.js";
import NearestNurseRouteAddress from "./Routes/NearestNurseroute.js";
import AlertMessageRoute from "./Routes/AlertMessageRoute.js";

dotenv.config();

const app = express();
const port = process.env.PORT;
const databaseURL = process.env.DATABASE_URL;

app.use(cors({
    origin: 'http://localhost:5173',
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
    credentials: true,
}));

app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true })); // Specify extended option
app.use(cookieParser());

mongoose
  .connect(databaseURL)
  .then(() => {
    console.log("mongoDB connected successfully");
  })
  .catch((err) => console.log(err.message));

app.use('/', NurseProfileRoute);
app.use('/', PatientProfileRoute);
app.use('/',NearestNurseRouteAddress);
app.use('/',AlertMessageRoute);



app.listen(port, () => {
    console.log(`Server is running at port ${port}`);
});
