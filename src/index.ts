import express from "express";
import mongoose from "mongoose";
import userRoutes from "./routes/userRoutes";

const app = express();
const PORT = 3001;
app.use(express.json());

mongoose
  .connect("mongodb://localhost:27017/ecommerce")
  .then(() => console.log("mongodb connected"))
  .catch((err) => console.log(err));

app.use("/user", userRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
