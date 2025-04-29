import dotenv from "dotenv";
import express from "express";
import mongoose from "mongoose";
import userRoute from "./routes/userRoute";
import { seedInitialProducts } from "./services/productService";
import productRoute from "./routes/productRoute";
import cartRoute from "./routes/cartRoute";
import cors from "cors";
import path from "path";
import errorHandler from "./utils/errorHandler";
import testRoute from "./routes/testRoute";
import mongoSanitize from 'express-mongo-sanitize';


const app = express();
dotenv.config();

mongoose.connect(process.env.DATABASE_URL!     , {
  maxPoolSize: 10, // Maximum number of sockets
  socketTimeoutMS: 45000, // Close sockets after 45s of inactivity
  family: 4, // Use IPv4, skip trying IPv6
  serverSelectionTimeoutMS: 5000 // Timeout for server selection
}).then(() => console.log("Mongo connected!"))
.catch((err) => console.log("Failed to connect!", err));
app.use(express.static(path.join(__dirname, "../public")));
app.use(express.json());     
app.use(cors());
app.use(
  mongoSanitize({
    replaceWith: '_'
  })
);
app.use("/user", userRoute);
app.use("/product", productRoute);
app.use("/cart", cartRoute);
app.use("/test", testRoute);
seedInitialProducts();

app.use(errorHandler);
app.listen(process.env.PORT, () => {
  console.log(`Server is running at: http://localhost:${process.env.PORT} .`);
});
