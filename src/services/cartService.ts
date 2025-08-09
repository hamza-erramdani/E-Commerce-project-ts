import { ObjectId } from "mongoose";
import { cartModel } from "../models/cartModel";
import productModel from "../models/productModel";
interface CreateCartForUser {
  userId: string;
}
const createCartForUser = async ({ userId }: CreateCartForUser) => {
  const cart = await cartModel.create({ userId, totalAmount: 0 });
  await cart.save();
  return cart;
};

interface GetActiveCartForUser {
  userId: string;
}
export const getActiveCartForUser = async ({
  userId,
}: GetActiveCartForUser) => {
  let cart = await cartModel.findOne({ userId, status: "active" });
  if (!cart) {
    cart = await createCartForUser({ userId });
  }
  return cart;
};
//add item to cart
interface AddItemToCart {
  userId: string;
  productId: any;
  quantity: number;
}
export const addItemToCart = async ({
  userId,
  productId,
  quantity,
}: AddItemToCart) => {
  const cart = await getActiveCartForUser({ userId });
  //Does the item exist in the cart?
  const existingItem = cart.items.find((p) => {
    return p.product.toString() === productId;
  });

  if (existingItem) {
    return { data: "Item already exists in cart", statusCode: 400 };
  }
  //I fix the issue here ({productId}==>productId)
  const product = await productModel.findById(productId);
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

  const updateCart = await cart.save();
  return { data: updateCart, statusCode: 200 };
};

//update item in cart
interface UpdateItemInCart {
  userId: string;
  productId: any;
  quantity: number;
}
export const updateItemInCart = async ({
  userId,
  productId,
  quantity,
}: UpdateItemInCart) => {
  const cart = await getActiveCartForUser({ userId });
  const existingItem = cart.items.find((p) => {
    return p.product.toString() === productId;
  });

  if (!existingItem) {
    return { data: "Item does not exist in cart", statusCode: 400 };
  }
  const product = await productModel.findById(productId);
  if (!product) {
    return { data: "product not found", statusCode: 400 };
  }

  if (product.stock < quantity) {
    return { data: "low stock for item", statusCode: 400 };
  }

  const otherCartItems = cart.items.filter((p) => {
    p.product.toString() !== productId;
  });
  let total = otherCartItems.reduce((sum, product) => {
    sum += product.quantity * product.unitPrice;
    return sum;
  }, 0);
  existingItem.quantity = quantity;
  total += existingItem.quantity * existingItem.unitPrice;
  cart.totalAmount = total;
  const updateCart = await cart.save();
  return { data: updateCart, statusCode: 200 };
};
