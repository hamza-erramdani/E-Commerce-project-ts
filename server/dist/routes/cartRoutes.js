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
const express_1 = __importDefault(require("express"));
const cartService_1 = require("../services/cartService");
const validateJWT_1 = __importDefault(require("../middleware/validateJWT"));
const cartService_2 = require("../services/cartService");
const cartService_3 = require("../services/cartService");
const cartService_4 = require("../services/cartService");
const cartService_5 = require("../services/cartService");
const cartService_6 = require("../services/cartService");
const router = express_1.default.Router();
router.get("/", validateJWT_1.default, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const userId = (_a = req === null || req === void 0 ? void 0 : req.user) === null || _a === void 0 ? void 0 : _a._id;
        const cart = yield (0, cartService_1.getActiveCartForUser)({ userId });
        res.status(200).send(cart);
    }
    catch (_b) {
        res.status(500).send("Something went wrong!");
    }
}));
router.delete("/", validateJWT_1.default, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const userId = (_a = req === null || req === void 0 ? void 0 : req.user) === null || _a === void 0 ? void 0 : _a._id;
        const response = yield (0, cartService_5.clearCart)({ userId });
        res.status(response.statusCode).send(response.data);
    }
    catch (_b) {
        res.status(500).send("Something went wrong!");
    }
}));
router.post("/items", validateJWT_1.default, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const userId = (_a = req === null || req === void 0 ? void 0 : req.user) === null || _a === void 0 ? void 0 : _a._id;
        const { productId } = req.body;
        const { quantity } = req.body;
        const response = yield (0, cartService_2.addItemToCart)({ userId, productId, quantity });
        res.status(response.statusCode).send(response.data);
    }
    catch (_b) {
        res.status(500).send("Something went wrong!");
    }
}));
router.put("/items", validateJWT_1.default, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const userId = (_a = req === null || req === void 0 ? void 0 : req.user) === null || _a === void 0 ? void 0 : _a._id;
        const { productId, quantity } = req.body;
        const response = yield (0, cartService_3.updateItemInCart)({ userId, productId, quantity });
        res.status(response.statusCode).send(response.data);
    }
    catch (_b) {
        res.status(500).send("Something went wrong!");
    }
}));
router.delete("/items/:productId", validateJWT_1.default, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const userId = (_a = req === null || req === void 0 ? void 0 : req.user) === null || _a === void 0 ? void 0 : _a._id;
        const { productId } = req.params;
        const response = yield (0, cartService_4.deleteItemFromCart)({ userId, productId });
        res.status(response.statusCode).send(response.data);
    }
    catch (_b) {
        res.status(500).send("Something went wrong!");
    }
}));
router.post("/checkout", validateJWT_1.default, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const userId = (_a = req === null || req === void 0 ? void 0 : req.user) === null || _a === void 0 ? void 0 : _a._id;
        const { address } = req.body;
        const response = yield (0, cartService_6.checkout)({ userId, address });
        res.status(response.statusCode).send(response.data);
    }
    catch (_b) {
        res.status(500).send("Something went wrong!");
    }
}));
exports.default = router;
