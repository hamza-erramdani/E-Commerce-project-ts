import ProductCard from "../components/ProductCard";
import { useEffect, useState } from "react";
import type { Product } from "../types/product";
import { BASE_URL } from "../constants/baseURL";

const HomePage = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [error, setError] = useState(false);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(`${BASE_URL}/products`);
      const data = await res.json();
      setProducts(data);
      } catch {
        setError(true);
      }
      
    };
    fetchData();
  }, []);
  if(error) return <div className="bg-red-500 ">Something went wrong!</div>
  return (
    <div className="items-center grid lr:grid-cols-4 md:grid-cols-3 sm:grid-cols-2">
      {products.map((p) => (
        <ProductCard {...p} />
      ))}
    </div>
  );
};

export default HomePage;
