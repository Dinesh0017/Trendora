import React, { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import { ShopContext } from "../context/ShopContext";
import { assets } from "../assets/images/assets";
import RelatedProduct from "../components/RelatedProduct";

const Product = () => {
  const { productId } = useParams();
  const { products, currency, addToCart } = useContext(ShopContext);
  const [productData, setProductData] = useState(false);
  const [images, setImages] = useState("");
  const [size, setSize] = useState("");

  const fetchProductData = async () => {
    products.map((item) => {
      if (item._id === productId) {
        setProductData(item);
        setImages(item.images[0]);
        return null;
      }
    });
  };

  useEffect(() => {
    fetchProductData();
  }, [products]);

  return productData ? (
    <div className="pt-10 transition-opacity duration-500 ease-in opacity-100 px-4 sm:px-10">
      {/* Product Data */}
      <div className="flex gap-12 sm:gap-16 flex-col sm:flex-row">
        {/* Product Images */}
        <div className="flex-1 flex flex-col items-center">
          {/* Big Image */}
          <div className="w-full sm:w-[80%]">
            <img
              src={images}
              alt={productData.name}
              className="w-full h-auto rounded-xl shadow-md"
            />
          </div>

          {/* Small Thumbnails BELOW */}
          <div className="flex gap-3 mt-4 overflow-x-auto justify-center p-2">
            {productData.images.map((item, index) => (
              <img
                key={index}
                src={item}
                alt={productData.name}
                className={`min-w-[70px] h-[70px] sm:min-w-[80px] sm:h-[80px] md:min-w-[90px] md:h-[90px] object-cover rounded-lg cursor-pointer border-2 transition-all duration-300 ${
                  item === images
                    ? "border-amber-500 scale-105"
                    : "border-gray-200 hover:border-gray-400"
                }`}
                onClick={() => setImages(item)}
              />
            ))}
          </div>
        </div>

        {/* Product Info */}
        <div className="flex-1">
          <h1 className="font-semibold text-3xl mt-2">{productData.name}</h1>

          {/* Ratings */}
          <div className="flex items-center gap-1 mt-3">
            <img src={assets.star_icon} alt="" className="w-4" />
            <img src={assets.star_icon} alt="" className="w-4" />
            <img src={assets.star_icon} alt="" className="w-4" />
            <img src={assets.star_icon} alt="" className="w-4" />
            <img src={assets.star_dull_icon} alt="" className="w-4" />
            <p className="pl-2 text-gray-600">(122)</p>
          </div>

          {/* Price */}
          <p className="mt-5 text-3xl font-bold text-amber-600">
            {currency}
            {productData.price}
          </p>

          {/* Description */}
          <p className="mt-5 text-gray-500 leading-relaxed md:w-4/5">
            {productData.description}
          </p>

          {/* Sizes Selection */}
          <div className="flex flex-col gap-4 my-8">
            <p className="font-medium text-slate-800">Select Size</p>
            <div className="flex gap-2 flex-wrap">
              {productData.sizes.slice().reverse().map((item, index) => (
                <button
                  onClick={() => setSize(item)}
                  key={index}
                  className={`border py-2 px-4 rounded-lg text-sm transition-all cursor-pointer ${
                    item === size
                      ? "border-amber-500 bg-amber-50 text-amber-700 shadow"
                      : "border-gray-300 bg-gray-100 hover:border-amber-400"
                  }`}
                >
                  {item}
                </button>
              ))}
            </div>
          </div>

          {/* Add to Cart */}
          <button onClick={() => addToCart(productData._id, size)} className="bg-amber-600 hover:bg-amber-700 text-white px-8 py-3 rounded-lg text-sm font-medium transition-all duration-300 cursor-pointer">
            Add to Cart
          </button>

          {/* Extra Info */}
          <hr className="mt-8 w-4/5" />
          <div className="text-sm text-gray-500 mt-5 flex flex-col gap-2">
            <p>100% Original Product.</p>
            <p>Free Delivery on orders above {currency}500.</p>
            <p>Pay on delivery might be available.</p>
          </div>
        </div>
      </div>

      {/* Description & Review Section */}
      <div className="mt-20">
        <div className="flex border-b">
          <button className="border-b-2 border-amber-500 px-5 py-3 text-md font-semibold text-amber-600">
            Description
          </button>
          <button className="px-5 py-3 text-md text-gray-500 hover:text-rose-500 transition">
            Reviews (122)
          </button>
        </div>
        <div className="flex flex-col gap-4 px-6 py-6 text-sm text-gray-600 leading-relaxed">
          <p>
            An e-commerce product page typically includes a description and
            reviews section. The description provides detailed information about
            the product, including its features, specifications, and benefits.
          </p>
          <p>
            The reviews section displays customer feedback and ratings, helping
            potential buyers make informed decisions. It may also highlight any
            unique selling points or special offers.
          </p>
        </div>
      </div>

      {/* Related Products */}
      <RelatedProduct
        category={productData.category}
        subCategory={productData.subCategory}
      />
    </div>
  ) : (
    <div className="opacity-0"></div>
  );
};

export default Product;
