import express from "express";
import { getActiveCartForUser } from "../services/cartService";
import validateJWT from "../middleware/validateJWT";
import { Request, Response } from "express";
import { ExtendRequest } from "../types/extendRequet";
import { addItemToCart } from "../services/cartService";
import { updateItemInCart } from "../services/cartService";
import { deleteItemFromCart } from "../services/cartService";
import { clearCart } from "../services/cartService";

const router = express.Router();

router.get("/", validateJWT, async (req: ExtendRequest, res: Response) => {
  const userId = req?.user?._id;
  const cart = await getActiveCartForUser({ userId });
  res.status(200).send(cart);
});

router.delete("/", validateJWT, async (req: ExtendRequest, res) => {
  const userId = req?.user?._id;
  const response = await clearCart({ userId });
  res.status(response.statusCode).send(response.data);
});

router.post("/items", validateJWT, async (req: ExtendRequest, res) => {
  const userId = req?.user?._id;
  const { productId } = req.body;
  const { quantity } = req.body;
  const response = await addItemToCart({ userId, productId, quantity });

  res.status(response.statusCode).send(response.data);
});

router.put("/items", validateJWT, async (req: ExtendRequest, res) => {
  const userId = req?.user?._id;
  const { productId, quantity } = req.body;
  const response = await updateItemInCart({ userId, productId, quantity });
  res.status(response.statusCode).send(response.data);
});

router.delete(
  "/items/:productId",
  validateJWT,
  async (req: ExtendRequest, res) => {
    const userId = req?.user?._id;
    const { productId } = req.params;
    const response = await deleteItemFromCart({ userId, productId });
    res.status(response.statusCode).send(response.data);
  }
);

export default router;
