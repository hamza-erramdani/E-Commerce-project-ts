import express from "express";
import mongoose from "mongoose";
import userRoutes from "./routes/userRoutes";
import productsRoutes from "./routes/productsRoutes";
import { seedInitialProducts } from "./services/productService";

const app = express();
const PORT = 3001;
app.use(express.json());

mongoose
  .connect("mongodb://localhost:27017/ecommerce")
  .then(() => console.log("mongodb connected"))
  .catch((err) => console.log(err));

// seed the products to database
seedInitialProducts();

app.use("/user", userRoutes);
app.use("/products", productsRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
