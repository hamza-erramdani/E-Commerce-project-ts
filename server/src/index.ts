import dotenv from "dotenv";
import express from "express";
import mongoose from "mongoose";
import userRoutes from "./routes/userRoutes";
import productsRoutes from "./routes/productsRoutes";
import cartRoutes from "./routes/cartRoutes";
import { seedInitialProducts } from "./services/productService";
import cors from "cors"

dotenv.config();

const app = express();
const PORT = 3001;
app.use(express.json());
app.use(cors());

mongoose
  .connect(process.env.DATABASE_URL || "")
  .then(() => console.log("mongodb connected"))
  .catch((err) => console.log(err));

// seed the products to database
seedInitialProducts();

app.use("/user", userRoutes);
app.use("/products", productsRoutes);
app.use("/cart", cartRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
