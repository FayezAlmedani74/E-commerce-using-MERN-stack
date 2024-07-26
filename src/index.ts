import express from "express";
import mongoose from "mongoose";
import userRoute from "./routes/userRoute";

const app = express();
const PORT = 3001;

mongoose
  .connect("mongodb://localhost:27017/ecommerce")
  .then(() => console.log("Mongo connected!"))
  .catch((err) => console.log("Faild to connect!", err));
app.use(express.json());
app.use("/user", userRoute);

app.listen(PORT, () => {
  console.log(`Server is running at: http://localhost:${PORT} .`);
});
