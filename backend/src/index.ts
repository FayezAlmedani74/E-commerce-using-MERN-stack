import dotenv from "dotenv";
import express from "express";
import mongoose from "mongoose";
import userRoute from "./routes/userRoute";
import { seedInitialProducts } from "./services/productService";
import productRoute from "./routes/productRoute";
import cartRoute from "./routes/cartRoute";
import cors from "cors";
import path from "path";

const app = express();
const PORT = 3001;
dotenv.config();
mongoose
  .connect(process.env.DATABASE_URL || "")
  .then(() => console.log("Mongo connected!"))
  .catch((err) => console.log("Faild to connect!", err));
app.use(express.static(path.join(__dirname, "../public")));
app.use(express.json());
app.use(cors());
// app.use(cors({ origin: "*" }));
app.use("/user", userRoute);
app.use("/product", productRoute);
app.use("/cart", cartRoute);

seedInitialProducts();
app.listen(PORT, () => {
  console.log(`Server is running at: http://localhost:${PORT} .`);
});
