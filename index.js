import express from "express";
import colors from "colors";
import dotenv from "dotenv";
import morgan from "morgan";
import connectDB from "./config/db.js";
import authRoutes from "./routes/authRoute.js";
import cors from "cors";
import categoryRoute from "./routes/categoryRoute.js";
import productRoute from "./routes/productRoute.js";

import path from "path";

//configure env
dotenv.config();

//database config =>
connectDB();

//rest object
const app = express();

//middlewares =>
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));
app.use(express.static(path.join(__dirname,'../client/dist')))

//routes =>
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/category", categoryRoute);
app.use("/api/v1/product", productRoute);

//rest api
// app.get("/", (req, res) => {
//   res.send("<h1>Welcome to E-commerce app</h1>");
// });
app.use('*', function(req,res) {
  res.sendFile(path.join(__dirname, '../client/dist/index.html'))
})

//port
const PORT = process.env.PORT || 8080;
const MODE = process.env.DEV_MODE;

//listen
app.listen(PORT, () => {
  console.log(`Server running on ${MODE} mode on port ${PORT}`.bgCyan.white);
});
