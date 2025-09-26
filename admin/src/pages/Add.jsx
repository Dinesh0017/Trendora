import React, { useState } from "react";
import { assets } from "../assets/adminIcons/assets.js";
import axios from "axios";
import {backendUrl} from "../App.jsx"
import { toast } from "react-toastify";
import LoadingSpinner from "../components/LoadingSpinner.jsx";

const Add = ({token}) => {
  const [image1, setImage1] = useState(false);
  const [image2, setImage2] = useState(false);
  const [image3, setImage3] = useState(false);
  const [image4, setImage4] = useState(false);

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("Men");
  const [subCategory, setSubCategory] = useState("Topwear");
  const [bestseller, setBestseller] = useState(false);
  const [sizes, setSizes] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    setIsLoading(true); // Start loading
    try {
      const formData = new FormData();
      image1 && formData.append("image1", image1);
      image2 && formData.append("image2", image2);
      image3 && formData.append("image3", image3);
      image4 && formData.append("image4", image4);

      formData.append("name", name);
      formData.append("description", description);
      formData.append("price", price);
      formData.append("category", category);
      formData.append("subCategory", subCategory);
      formData.append("bestseller", bestseller);
      formData.append("sizes", JSON.stringify(sizes));

      const response = await axios.post(backendUrl + "/api/product/add", formData,{headers:{token}})
      if(response.data.success){
        toast.success("Product added successfully")
        setImage1(false);
        setImage2(false);
        setImage3(false);
        setImage4(false);
        setName("");
        setDescription("");
        setPrice("");
        setCategory("Men");
        setSubCategory("Topwear");
        setBestseller(false);
        setSizes([]);
      }else{
        toast.error(response.data.message)
      }

    } catch (error) {
      console.log("Error while adding product : ", error);
      toast.error("Error while adding product :" , error.message)
    } finally {
      setIsLoading(false); // End loading
    }
  };


  return (
    <div className="flex px-4 bg-gray-50 min-h-screen">
      <form
        className="sm:p-8 w-full max-w-2xl flex flex-col gap-6"
        onSubmit={onSubmitHandler}
      >
        {/* Upload Images */}
        <div>
          <p className="mb-3 font-medium text-gray-700">Upload Images</p>
          <div className="flex flex-wrap gap-4">
            {/* Upload Image 1 */}
            <label
              htmlFor="image1"
              className={`flex flex-col items-center justify-center w-24 h-24 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-amber-500 transition ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
            >
              <img
                src={!image1 ? assets.upload_area : URL.createObjectURL(image1)}
                alt="Upload 1"
                className="w-full object-contain opacity-70"
              />
              <input
                type="file"
                id="image1"
                className="hidden"
                onChange={(e) => setImage1(e.target.files[0])}
                disabled={isLoading}
              />
            </label>

            {/* Upload Image 2 */}
            <label
              htmlFor="image2"
              className={`flex flex-col items-center justify-center w-24 h-24 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-amber-500 transition ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
            >
              <img
                src={!image2 ? assets.upload_area : URL.createObjectURL(image2)}
                alt="Upload 2"
                className="w-full object-contain opacity-70"
              />
              <input
                type="file"
                id="image2"
                className="hidden"
                onChange={(e) => setImage2(e.target.files[0])}
                disabled={isLoading}
              />
            </label>

            {/* Upload Image 3 */}
            <label
              htmlFor="image3"
              className={`flex flex-col items-center justify-center w-24 h-24 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-amber-500 transition ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
            >
              <img
                src={!image3 ? assets.upload_area : URL.createObjectURL(image3)}
                alt="Upload 3"
                className="w-full object-contain opacity-70"
              />
              <input
                type="file"
                id="image3"
                className="hidden"
                onChange={(e) => setImage3(e.target.files[0])}
                disabled={isLoading}
              />
            </label>

            {/* Upload Image 4 */}
            <label
              htmlFor="image4"
              className={`flex flex-col items-center justify-center w-24 h-24 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-amber-500 transition ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
            >
              <img
                src={!image4 ? assets.upload_area : URL.createObjectURL(image4)}
                alt="Upload 4"
                className="w-full object-contain opacity-70"
              />
              <input
                type="file"
                id="image4"
                className="hidden"
                onChange={(e) => setImage4(e.target.files[0])}
                disabled={isLoading}
              />
            </label>
          </div>
        </div>

        {/* Product Name */}
        <div>
          <p className="mb-2 font-medium text-gray-700">Product Name</p>
          <input
            type="text"
            className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-amber-500"
            placeholder="Enter product name"
            required
            onChange={(e) => setName(e.target.value)}
            value={name}
            disabled={isLoading}
          />
        </div>

        {/* Product Description */}
        <div>
          <p className="mb-2 font-medium text-gray-700">Product Description</p>
          <textarea
            rows={4}
            className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-amber-500"
            placeholder="Enter product description"
            required
            onChange={(e) => setDescription(e.target.value)}
            value={description}
            disabled={isLoading}
          />
        </div>

        {/* Category + Subcategory */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div>
            <p className="mb-2 font-medium text-gray-700">Product Category</p>
            <select
              className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-amber-500"
              onChange={(e) => setCategory(e.target.value)}
              value={category}
              disabled={isLoading}
            >
              <option value="Men">Men</option>
              <option value="Women">Women</option>
              <option value="Kids">Kids</option>
            </select>
          </div>

          <div>
            <p className="mb-2 font-medium text-gray-700">
              Product Subcategory
            </p>
            <select
              className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-amber-500"
              onChange={(e) => setSubCategory(e.target.value)}
              value={subCategory}
              required
              disabled={isLoading}
            >
              <option value="Topwear">Topwear</option>
              <option value="Bottomwear">Bottomwear</option>
              <option value="Winterwear">Winterwear</option>
            </select>
          </div>
        </div>

        {/* Price */}
        <div>
          <p className="mb-2 font-medium text-gray-700">Product Price</p>
          <input
            type="number"
            className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-amber-500"
            placeholder="Enter product price"
            required
            onChange={(e) => setPrice(e.target.value)}
            value={price}
            disabled={isLoading}
          />
        </div>

        {/* Product Sizes */}
        <div className="w-full">
          <p className="mb-2 font-medium text-gray-700">Available Sizes</p>
          <div className="flex flex-wrap gap-3">
            {["XS", "S", "M", "L", "XL", "XXL"].map((size) => (
              <label
                key={size}
                className={`flex items-center gap-2 cursor-pointer select-none ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
              >
                <input
                  type="checkbox"
                  className="h-4 w-4 accent-amber-500 border-gray-300 rounded focus:ring-2 focus:ring-amber-400 cursor-pointer"
                  onChange={() =>
                    setSizes((prev) =>
                      prev.includes(size)
                        ? prev.filter((item) => item !== size)
                        : [...prev, size]
                    )
                  }
                  checked={sizes.includes(size)}
                  disabled={isLoading}
                />
                <span
                  className={`text-sm text-gray-700 ${
                    sizes.includes(size) ? "font-medium" : ""
                  }`}
                >
                  {size}
                </span>
              </label>
            ))}
          </div>
        </div>
        
        {/* Best Seller */}
        <div className={`flex items-center gap-2 ${isLoading ? 'opacity-50' : ''}`}>
          <input
            type="checkbox"
            id="bestSeller"
            className="h-4 w-4 accent-amber-500 border-gray-300 rounded focus:ring-2 focus:ring-amber-400 cursor-pointer"
            onChange={() => setBestseller((prev) => !prev)}
            checked={bestseller}
            disabled={isLoading}
          />
          <label
            htmlFor="bestseller"
            className={`text-sm text-gray-700 cursor-pointer select-none ${isLoading ? 'cursor-not-allowed' : ''}`}
          >
            Mark as Best Seller
          </label>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className={`w-full font-medium rounded-md px-4 py-2 mt-2 transition-colors duration-300 shadow-md hover:shadow-lg ${
            isLoading
              ? 'bg-gray-400 cursor-not-allowed'
              : 'bg-amber-500 text-white hover:bg-amber-600 cursor-pointer'
          }`}
          disabled={isLoading}
        >
          {isLoading ? <LoadingSpinner message="Uploading..."/> : 'Add Product'}
        </button>
      </form>
    </div>
  );
};

export default Add;