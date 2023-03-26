import express from "express";
import http from "http";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import compression from "compression";
import cors from "cors";
import mongoose from "mongoose";
const dotenv = require("dotenv").config();

//setting up our express server
const app = express();
app.use(cors({
    credentials: true
}));

app.use(compression());
app.use(cookieParser());
app.use(bodyParser.json());

const server = http.createServer(app);
server.listen(8080, () => {
    console.log('Server running on localhost:8080/');
});

const dBConnectionString = process.env.MONGO_URL
    .replace('<USERNAME>', process.env.MONGO_USERNAME)
    .replace('<PASSWORD>', process.env.MONGO_PASSWORD);

mongoose.Promise = Promise;
mongoose.connect(dBConnectionString);
mongoose.connection.on("error", (error: Error) => console.log(error));