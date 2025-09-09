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
        stock: 10,
      },
      {
        title: "HP OMEN",
        image:
          "https://exceldisc.com/_next/image?url=https%3A%2F%2Fapiv2.exceldisc.com%2Fmedia%2F39507%2Fhp-omen-14-fb0023dx-transcend-2024.jpg&w=3840&q=75",
        price: 20000,
        stock: 8,
      },
      {
        title: "Razer Blade",
        image:
          "https://atlasgaming.ma/wp-content/uploads/2023/07/Atlas-Gaming-Razer-Blade-14-2021-A.jpg",
        price: 30000,
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
