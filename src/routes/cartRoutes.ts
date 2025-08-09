import express from "express";
import { getActiveCartForUser } from "../services/cartService";
import validateJWT from "../middleware/validateJWT";
import { Request, Response } from "express";
import { ExtendRequest } from "../types/extendRequet";
import { addItemToCart } from "../services/cartService";

const router = express.Router();

router.get("/", validateJWT, async (req: ExtendRequest, res: Response) => {
  const userId = req?.user?._id;
  const cart = await getActiveCartForUser({ userId });
  res.status(200).send(cart);
});

router.post("/items", validateJWT, async (req: ExtendRequest, res) => {
  const userId = req?.user?._id;
  const { productId } = req.body;
  const { quantity } = req.body;
  const response = await addItemToCart({ userId, productId, quantity });

  res.status(response.statusCode).send(response.data);
});

export default router;
