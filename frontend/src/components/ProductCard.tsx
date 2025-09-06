import React from "react";

interface props {
  img: string;
  eyebrow: string;
  title: string;
  pricing: string;
  url: string;
}

const ProductCard = ({ img, eyebrow, title, pricing, url }: props) => {
  return (
    <div className=" border-1 rounded-2xl m-2">
      <img className="rounded-lg size-full p-7" src={img} alt="product" />
      <div className="m-4">
        <div className="text-l font-bold text-sky-500">{eyebrow}</div>
        <div className="mt-1 font-bold text-gray-700">
          <a href={url} className="hover:underline">
            {title}
          </a>
        </div>
        <div className="flex items-center justify-between">
          <div className="mt-2 text-md text-white bg-green-600 rounded-md p-0.5">
            {pricing}
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
