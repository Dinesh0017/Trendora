import React, { useContext, useEffect, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import Title from "./Title";
import ProductItem from "./ProductItem";

const BestSeller = () => {
  const { products } = useContext(ShopContext);
  const [bestSeller, setBestSeller] = useState([]);

  useEffect(() => {
    if (products && products.length > 0) {
      const bestProducts = products.filter((item) => item.bestseller);
      setBestSeller(bestProducts.slice(0, 5));
    }
  }, [products]);

  return (
    <div className="my-12">
      {/* Section Header */}
      <div className="text-center py-6 text-3xl">
        <Title text1="BEST " text2="SELLERS" />
        <p className="w-11/12 sm:w-3/4 md:w-2/3 lg:w-1/2 mx-auto text-xs sm:text-sm md:text-base text-gray-600 mt-3">
          Explore our best-selling products, loved by customers for their
          quality and style. Find out why these items are top-rated and highly
          recommended.
        </p>
      </div>

      {/* Products Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 sm:gap-6">
        {bestSeller.length > 0 ? (
          bestSeller.map((item, index) => (
            <ProductItem
              key={index}
              id={item._id}
              image={item.image}
              name={item.name}
              price={item.price}
            />
          ))
        ) : (
          <p className="col-span-full text-center text-gray-500 text-sm sm:text-base">
            No best sellers available right now.
          </p>
        )}
      </div>
    </div>
  );
};

export default BestSeller;
