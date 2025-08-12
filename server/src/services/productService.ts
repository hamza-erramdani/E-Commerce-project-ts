import productModel from "../models/productModel";

export const getAllProducts = async () => {
  return await productModel.find();
};
export const seedInitialProducts = async () => {
  try {
    const products = [
      {
        title: "asus rog strix",
        image:
          "https://m.media-amazon.com/images/I/81Cm1VMdxrL._AC_SL1500_.jpg",
        price: 15000,
        stock: 5,
      },
    ];
    const existingProducts = await getAllProducts();
    if (existingProducts.length === 0) {
      await productModel.insertMany(products);
    }
  } catch (err) {
    console.log("cannot see databasse", err);
  }
};
