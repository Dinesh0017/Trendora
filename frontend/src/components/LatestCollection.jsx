import React, { useEffect, useState, useContext } from "react";
import Title from "./Title";
import { ShopContext } from "../context/ShopContext";
import ProductItem from "./ProductItem";

const LatestCollection = () => {
  const { products } = useContext(ShopContext);
  const [latestProducts, setLatestProducts] = useState([]);

  useEffect(() => {
    if (products && products.length > 0) {
      setLatestProducts(products.slice(0, 10));
    }
  }, [products]);

  return (
    <div className="my-12">
      {/* Section Title */}
      <div className="text-center py-8 text-3xl">
        <Title text1="LATEST " text2="COLLECTION" />
        <p className="w-11/12 sm:w-3/4 md:w-2/3 lg:w-1/2 mx-auto text-xs sm:text-sm md:text-base text-gray-600 mt-3">
          You can explore the latest collection of our shop. Discover new
          arrivals, trending styles, and exclusive offers curated just for you.
        </p>
      </div>

      {/* Products Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 sm:gap-6">
        {latestProducts.map((item,index) => (
          <ProductItem
            key={index}
            id={item._id}
            image={item.image}
            name={item.name}
            price={item.price}
          />
        ))}
      </div>
    </div>
  );
};

export default LatestCollection;
