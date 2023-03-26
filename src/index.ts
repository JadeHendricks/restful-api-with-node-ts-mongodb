import express from "express";
import http from "http";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import compression from "compression";
import cors from "cors";
import mongoose from "mongoose";
import router from "./router";
const dotenv = require("dotenv").config();
const port = process.env.PORT || 8080;

//setting up our express server
const app = express();
app.use(cors({
    credentials: true
}));

app.use(compression());
app.use(cookieParser());
app.use(bodyParser.json());

const server = http.createServer(app);
server.listen(port, () => {
    console.log(`Server running on port: ${port}`);
});

const dBConnectionString = process.env.MONGO_URL
    .replace('<USERNAME>', process.env.MONGO_USERNAME)
    .replace('<PASSWORD>', process.env.MONGO_PASSWORD);

mongoose.Promise = Promise;
mongoose.connect(dBConnectionString);
mongoose.connection.on("error", (error: Error) => console.log(error));

app.use("/", router())