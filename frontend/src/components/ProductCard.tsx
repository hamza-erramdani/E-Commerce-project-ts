import React from "react";

interface props {
  _id: string;
  image: string;
  title: string;
  price: string;
}

const ProductCard = ({ image, title, price}: props) => {
  return (
    <div className=" border-1 rounded-2xl m-2">
      <img className="rounded-lg h-80 p-7" src={image} alt="product" />
      <div className="m-4">
        <div className="text-l font-bold text-sky-500">{title}</div>
        <div className="mt-1 font-bold text-gray-700">
          <a href={'#'} className="hover:underline">
            {title}
          </a>
        </div>
        <div className="flex items-center justify-between">
          <div className="mt-2 text-md text-white bg-green-600 rounded-md p-0.5">
            {price} DH
          </div>
          <div className="relative">
            <button className="absolute py-5 px-14.5 border-sky-500 border-2 rounded-xl bg-transparent cursor-pointer hover:border-4 hover:blur-sm"></button>
            <button className="py-2.5 px-2 border-1 rounded-xl bg-linear-to-t from-sky-500 to-indigo-500 text-white font-medium cursor-pointer active:bg-sky-500 ">
              ADD TO CART
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
