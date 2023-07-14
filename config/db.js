import mongoose from "mongoose";
import dotenv from "dotenv";
import colors from "colors";

//config dotenv
dotenv.config();

//import mongodb url from env
const url = process.env.MONGO_URL;

//function to connect database
const connectDB = async () => {
  try {
    const conn = await mongoose.connect(url);
    console.log(
      `Connected to mongoDB Database ${conn.connection.host}`.bgMagenta.white
    );
  } catch (error) {
    console.log(`Error in Mongodb ${error}`.bgRed.white);
  }
};

export default connectDB;
