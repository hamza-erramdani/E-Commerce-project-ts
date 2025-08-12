"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const userRoutes_1 = __importDefault(require("./routes/userRoutes"));
const productsRoutes_1 = __importDefault(require("./routes/productsRoutes"));
const cartRoutes_1 = __importDefault(require("./routes/cartRoutes"));
const productService_1 = require("./services/productService");
dotenv_1.default.config();
const app = (0, express_1.default)();
const PORT = 3001;
app.use(express_1.default.json());
mongoose_1.default
    .connect(process.env.DATABASE_URL || "")
    .then(() => console.log("mongodb connected"))
    .catch((err) => console.log(err));
// seed the products to database
(0, productService_1.seedInitialProducts)();
app.use("/user", userRoutes_1.default);
app.use("/products", productsRoutes_1.default);
app.use("/cart", cartRoutes_1.default);
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
