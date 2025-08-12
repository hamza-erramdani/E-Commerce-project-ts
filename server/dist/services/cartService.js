"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkout = exports.deleteItemFromCart = exports.updateItemInCart = exports.addItemToCart = exports.clearCart = exports.getActiveCartForUser = void 0;
const cartModel_1 = require("../models/cartModel");
const productModel_1 = __importDefault(require("../models/productModel"));
const orderModel_1 = require("../models/orderModel");
const createCartForUser = (_a) => __awaiter(void 0, [_a], void 0, function* ({ userId }) {
    const cart = yield cartModel_1.cartModel.create({ userId, totalAmount: 0 });
    yield cart.save();
    return cart;
});
const getActiveCartForUser = (_a) => __awaiter(void 0, [_a], void 0, function* ({ userId, }) {
    let cart = yield cartModel_1.cartModel.findOne({ userId, status: "active" });
    if (!cart) {
        cart = yield createCartForUser({ userId });
    }
    return cart;
});
exports.getActiveCartForUser = getActiveCartForUser;
const clearCart = (_a) => __awaiter(void 0, [_a], void 0, function* ({ userId }) {
    let cart = yield (0, exports.getActiveCartForUser)({ userId });
    cart.items = [];
    cart.totalAmount = 0;
    const updateCart = cart.save();
    return { data: updateCart, statusCode: 200 };
});
exports.clearCart = clearCart;
const addItemToCart = (_a) => __awaiter(void 0, [_a], void 0, function* ({ userId, productId, quantity, }) {
    const cart = yield (0, exports.getActiveCartForUser)({ userId });
    //Does the item exist in the cart?
    const existingItem = cart.items.find((p) => {
        return p.product.toString() === productId;
    });
    if (existingItem) {
        return { data: "Item already exists in cart", statusCode: 400 };
    }
    //I fix the issue here ({productId}==>productId)
    const product = yield productModel_1.default.findById(productId);
    if (!product) {
        return { data: "product not found", statusCode: 400 };
    }
    if (product.stock < quantity) {
        return { data: "low stock for item", statusCode: 400 };
    }
    cart.items.push({
        product: productId,
        unitPrice: product.price,
        quantity,
    });
    //update totalAmount for the cart
    cart.totalAmount += product.price * quantity;
    const updateCart = yield cart.save();
    return { data: updateCart, statusCode: 200 };
});
exports.addItemToCart = addItemToCart;
const updateItemInCart = (_a) => __awaiter(void 0, [_a], void 0, function* ({ userId, productId, quantity, }) {
    const cart = yield (0, exports.getActiveCartForUser)({ userId });
    const existingItem = cart.items.find((p) => {
        return p.product.toString() === productId;
    });
    if (!existingItem) {
        return { data: "Item does not exist in cart", statusCode: 400 };
    }
    const product = yield productModel_1.default.findById(productId);
    if (!product) {
        return { data: "product not found", statusCode: 400 };
    }
    if (product.stock < quantity) {
        return { data: "low stock for item", statusCode: 400 };
    }
    const otherCartItems = cart.items.filter((p) => {
        p.product.toString() !== productId;
    });
    let total = calculateCartTotal({ cartItems: otherCartItems });
    existingItem.quantity = quantity;
    total += existingItem.quantity * existingItem.unitPrice;
    cart.totalAmount = total;
    const updateCart = yield cart.save();
    return { data: updateCart, statusCode: 200 };
});
exports.updateItemInCart = updateItemInCart;
const deleteItemFromCart = (_a) => __awaiter(void 0, [_a], void 0, function* ({ userId, productId, }) {
    const cart = yield (0, exports.getActiveCartForUser)({ userId });
    const existingItem = cart.items.find((p) => {
        return p.product.toString() === productId;
    });
    if (!existingItem) {
        return { data: "Item does not exist in cart", statusCode: 400 };
    }
    const otherCartItems = cart.items.filter((p) => {
        p.product.toString() !== productId;
    });
    const total = calculateCartTotal({ cartItems: otherCartItems });
    cart.items = otherCartItems;
    cart.totalAmount = total;
    const updateCart = yield cart.save();
    return { data: updateCart, statusCode: 200 };
});
exports.deleteItemFromCart = deleteItemFromCart;
// Helper function to calculate the total amount of the cart excluding a specific product
const calculateCartTotal = ({ cartItems }) => {
    const total = cartItems.reduce((sum, product) => {
        sum += product.quantity * product.unitPrice;
        return sum;
    }, 0);
    return total;
};
const checkout = (_a) => __awaiter(void 0, [_a], void 0, function* ({ userId, address }) {
    if (!address) {
        return { data: "Please add address", statusCode: 400 };
    }
    const cart = yield (0, exports.getActiveCartForUser)({ userId });
    const orderItems = [];
    for (const item of cart.items) {
        const product = yield productModel_1.default.findById(item.product);
        if (!product) {
            return { data: "Product not found", statusCode: 400 };
        }
        const orderItem = {
            productTitle: product.title,
            productImage: product.image,
            quantity: item.quantity,
            unitPrice: item.unitPrice,
        };
        orderItems.push(orderItem);
    }
    const order = yield orderModel_1.orderModel.create({
        orderItems,
        total: cart.totalAmount,
        address,
        userId,
    });
    yield order.save();
    cart.status = "completed";
    yield cart.save();
    return { data: order, statusCode: 200 };
});
exports.checkout = checkout;
