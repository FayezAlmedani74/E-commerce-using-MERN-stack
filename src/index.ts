import dotenv from "dotenv";
import express from "express";
import mongoose from "mongoose";
import userRoute from "./routes/userRoute";
import { seedInitialProducts } from "./services/productService";
import productRoute from "./routes/productRoute";
import cartRoute from "./routes/cartRoute";
const app = express();
const PORT = 3001;
dotenv.config();
mongoose
  .connect(process.env.DATABASE_URL || "")
  .then(() => console.log("Mongo connected!"))
  .catch((err) => console.log("Faild to connect!", err));
app.use(express.json());
app.use("/user", userRoute);
app.use("/product", productRoute);
app.use("/cart", cartRoute);

seedInitialProducts();
app.listen(PORT, () => {
  console.log(`Server is running at: http://localhost:${PORT} .`);
});
