import React, { useEffect, useState } from "react";
import axios from "axios";
import { backendUrl, currency } from "../App.jsx";
import { toast } from "react-toastify";
import LoadingSpinner from "../components/LoadingSpinner.jsx";

const List = ({ token }) => {
  const [list, setList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchList = async () => {
    try {
      setIsLoading(true);
      const response = await axios.get(backendUrl + "/api/product/list", {
        headers: { token },
      });
      if (response.data.success) {
        setList(response.data.products);
      } else {
        toast.error(response.data.message || "Failed to fetch products");
      }
    } catch (error) {
      console.log("Error fetching products:", error);
      toast.error("Error fetching products: " + error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const removeProduct = async (id) => {
    try {
      const response = await axios.post(backendUrl + "/api/product/remove",
        { id },
        { headers: { token } }
      );

      if (response.data.success) {
        toast.success("Product removed successfully");
        await fetchList();
      } else {
        toast.error(response.data.message || "Failed to remove product");
      }
    } catch (error) {
      console.log("Error removing product:", error);
      toast.error("Error removing product: " + error.message);
    }
  };

  useEffect(() => {
    fetchList();
  }, []);

  if (isLoading) {
    return (
      <div className="px-4 sm:px-6 lg:px-8 bg-gray-50 min-h-screen">
        <div className="max-w-6xl mx-auto py-8">
          <h1 className="text-xl sm:text-2xl font-bold text-gray-800 mb-6">
            All Products List
          </h1>
          <LoadingSpinner message="Processing Data..." />
        </div>
      </div>
    );
  }

  return (
    <div className="px-4 sm:px-6 lg:px-8 bg-gray-50 min-h-screen">
      <div className="max-w-6xl mx-auto py-8">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6 gap-2">
          <h1 className="text-xl sm:text-2xl font-bold text-gray-800">
            All Products List
          </h1>
          <span className="text-sm text-gray-600">
            {list.length} {list.length === 1 ? "product" : "products"} found
          </span>
        </div>

        {list.length === 0 ? (
          <div className="text-center py-12">
            <div className="text-gray-400 mb-4">
              <svg
                className="w-12 h-12 sm:w-16 sm:h-16 mx-auto"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1}
                  d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2M4 13h2m13-8V4a1 1 0 00-1-1H9a1 1 0 00-1 1v1M8 8h8m-8 4h8m-4 4h4"
                />
              </svg>
            </div>
            <p className="text-gray-500 text-base sm:text-lg">
              No products found
            </p>
            <p className="text-gray-400 text-sm mt-2">
              Add some products to see them here
            </p>
          </div>
        ) : (
          <div className="bg-white rounded-lg shadow-sm overflow-hidden">
            {/* Table Header */}
            <div className="hidden md:block bg-gray-50 px-6 py-4 border-b border-gray-200">
              <div className="grid grid-cols-12 gap-4 items-center font-medium text-gray-700 text-sm">
                <div className="col-span-3">Product</div>
                <div className="col-span-2">Category</div>
                <div className="col-span-2">Price</div>
                <div className="col-span-2">Sizes</div>
                <div className="col-span-2">Best Seller</div>
                <div className="col-span-1">Action</div>
              </div>
            </div>
            {/* Product List */}
            <div className="divide-y divide-gray-200">
              {list.map((item) => (
                <div
                  key={item._id}
                  className="px-4 sm:px-6 py-4 hover:bg-gray-50 transition-colors"
                >
                  <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
                    {/* Product Info */}
                    <div className="md:col-span-3 flex items-center space-x-3">
                      <img
                        src={
                          item.images && item.images.length > 0
                            ? item.images[0]
                            : "/placeholder-image.jpg"
                        }
                        alt={item.name || "Product"}
                        className="w-14 h-14 object-cover rounded-md border border-gray-200"
                        onError={(e) => {
                          e.currentTarget.src = "/placeholder-image.jpg";
                        }}
                      />
                      <div>
                        <p className="font-medium text-gray-900 text-sm sm:text-base line-clamp-2">
                          {item.name}
                        </p>
                        <p className="text-gray-500 text-xs sm:text-sm mt-1 line-clamp-1">
                          {item.description}
                        </p>
                      </div>
                    </div>

                    {/* Category */}
                    <div className="md:col-span-2 text-sm">
                      <span className="text-gray-900">{item.category}</span>
                      <span className="text-gray-500 block text-xs">
                        {item.subCategory}
                      </span>
                    </div>

                    {/* Price */}
                    <div className="md:col-span-2">
                      <span className="text-base sm:text-lg font-semibold text-gray-900">
                        {typeof currency !== "undefined" ? currency : "$"}
                        {item.price}
                      </span>
                    </div>

                    {/* Sizes */}
                    <div className="md:col-span-2 flex flex-wrap gap-1">
                      {item.sizes?.map((size, index) => (
                        <span
                          key={index}
                          className="px-2 py-1 bg-gray-100 text-gray-700 text-xs sm:text-sm rounded-md"
                        >
                          {size}
                        </span>
                      ))}
                    </div>

                    {/* Best Seller */}
                    <div className="md:col-span-2">
                      <span
                        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs sm:text-sm font-medium ${
                          item.bestseller
                            ? "bg-green-100 text-green-800"
                            : "bg-gray-100 text-gray-800"
                        }`}
                      >
                        {item.bestseller ? "Best Seller" : "Regular"}
                      </span>
                    </div>

                    {/* Action */}
                    <div className="md:col-span-1">
                      <button
                        onClick={() => removeProduct(item._id)}
                        className="text-red-600 hover:text-red-800 hover:bg-red-50 p-2 rounded-md transition-colors"
                        title="Remove product"
                      >
                        <svg
                          className="w-4 h-4 sm:w-5 sm:h-5"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                          />
                        </svg>
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default List;
