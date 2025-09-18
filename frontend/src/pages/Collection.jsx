import React, { useContext, useEffect, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import { assets } from "../assets/images/assets";
import Title from "../components/Title";
import ProductItem from "../components/ProductItem";

const Collection = () => {
  const { products } = useContext(ShopContext);
  const [showFilter, setShowFilter] = useState(false);
  const [filterProducts, setFilterProducts] = useState([]);
  const [category, setCategory] = useState([]);
  const [subCategory, setSubCategory] = useState([]);


  const toggleCategory = (e) => {
    if (category.includes(e.target.value)) {
      setCategory(prev=>prev.filter(item => item !== e.target.value));
    } else {
      setCategory(prev=>[...prev, e.target.value]);
    }
  }

  const toggleSubCategory = (e) =>{
    if (subCategory.includes(e.target.value)) {
      setSubCategory(prev=>prev.filter(item => item !== e.target.value));
    } else {
      setSubCategory(prev=>[...prev, e.target.value]);
    }
  }
/*
  const applyFilter = () =>{
    let productsCopy = products.slice()

    if (category.length > 0){
      productsCopy =
    }
  }*/

  useEffect(() => {
      setFilterProducts(products);
  }, [products]);



  return (
    <div className="flex flex-col sm:flex-row gap-10 pt-10 border-t">
      {/* FILTER SIDEBAR */}
      <aside className="min-w-[250px]">
        <p
          className="my-2 text-xl flex items-center justify-between cursor-pointer sm:cursor-default font-semibold"
          onClick={() => setShowFilter(!showFilter)}
        >
          FILTERS
          <img
            className={`sm:hidden h-4 ml-2 transition-transform duration-300 ${
              showFilter ? "rotate-90" : ""
            }`}
            src={assets.dropdown_icon}
            alt="dropdown"
          />
        </p>

        {/* Filter Container */}
        <div
          className={`overflow-hidden transition-all duration-300 ${
            showFilter ? "max-h-96" : "max-h-0"
          } sm:max-h-full`}
        >
          {/* Category Filter */}
          <div className="border border-gray-200 rounded-xl p-5 mt-4 shadow-sm hover:shadow-lg transition-shadow duration-300">
            <p className="mb-3 text-sm font-medium text-gray-700 uppercase tracking-wide">
              Categories
            </p>
            <div className="flex flex-col gap-3">
              {["Men", "Women", "Kids"].map((e) => (
                <label
                  key={e}
                  className="flex items-center gap-3 text-gray-600 hover:text-gray-800 transition-colors"
                >
                  <input
                    type="checkbox"
                    className="w-5 h-5 rounded-lg border-gray-300 bg-amber-500 text-white accent-white focus:ring-amber-400"
                    onChange={toggleCategory}
                    value={e}
                  />
                  {e}
                </label>
              ))}
            </div>
          </div>

          {/* Type Filter */}
          <div className="border border-gray-200 rounded-xl p-5 mt-5 shadow-sm hover:shadow-lg transition-shadow duration-300">
            <p className="mb-3 text-sm font-medium text-gray-700 uppercase tracking-wide">
              Type
            </p>
            <div className="flex flex-col gap-3">
              {["Topwear", "Bottomwear", "Winterwear"].map((type) => (
                <label
                  key={type}
                  className="flex items-center gap-3 text-gray-600 hover:text-gray-800 transition-colors"
                >
                  <input
                    type="checkbox"
                    className="w-5 h-5 rounded-lg border-gray-300 bg-amber-500 text-white accent-white focus:ring-amber-400"
                    onChange={toggleSubCategory}
                    value={type}
                  />
                  {type.replace("wear", " Wear")}
                </label>
              ))}
            </div>
          </div>
        </div>
      </aside>

      {/* PRODUCTS GRID */}
      <main className="flex-1">
        <div className="flex flex-col sm:flex-row justify-between items-center mb-6 gap-4 text-md">
          <Title text1="ALL" text2="COLLECTIONS" />
          <select className="border border-gray-300 rounded-lg p-2 text-gray-700 hover:border-gray-500 focus:outline-none focus:ring-2 focus:ring-amber-400 transition">
            <option value="relevant">Sort by Relevant</option>
            <option value="low-high">Price: Low to High</option>
            <option value="high-low">Price: High to Low</option>
          </select>
        </div>

        {/* Map Product*/}
        <div className="grid grid-cols-2 lg:grid-cols-4 md:grid-cols-3 gap-y-6 gap-x-4">
          {filterProducts.map((item, index) => (
            <ProductItem key={index} name={item.name} id={item._id} price={item.price} image={item.image} />
          ))}
        </div>
      </main>
    </div>
  );
};

export default Collection;
