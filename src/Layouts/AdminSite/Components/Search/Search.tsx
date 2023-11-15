import React, { useEffect, useState } from "react";
import { getAllProducts } from "../../../../API";
import { getAllUsers } from "../../../../API/user";
import { getAllCategories } from "../../../../API/category";
import { getAllBrands } from "../../../../API/brand";

const Search = (props: any) => {
  const token = localStorage.getItem("accessToken");

  const [value, setValue] = useState<string>("");
  const handleSearchChane = (e: any) => {
    setValue(e.target.value);
    switch (props.slug) {
      case "PRODUCT":
        const fetchProduct = async () => {
          const allProducts = await getAllProducts({ data: e.target.value });
          props.handleSearch(allProducts);
        };
        fetchProduct();
        break;
      case "USER":
        const fetchUsers = async () => {
          const allUsers = await getAllUsers({ data: e.target.value }, token);
          props.handleSearch(allUsers);
        };
        fetchUsers();
        break;
      case "CATEGORY":
        const fetchCategories = async () => {
          const allCategories = await getAllCategories(
            {
              data: e.target.value,
            },
            token
          );

          props.handleSearch(allCategories);
        };
        fetchCategories();
        break;

      case "BRAND":
        const fetchBrands = async () => {
          const allBrands = await getAllBrands({ data: e.target.value }, token);
          props.handleSearch(allBrands);
        };
        fetchBrands();
        break;

      default:
        break;
    }
  };
  return (
    <form className="w-[45%]">
      <label
        htmlFor="default-search"
        className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white"
      >
        Search
      </label>
      <div className="relative">
        <div className="absolute inset-y-0 right-0 flex items-center pl-3 pointer-events-none"></div>
        <input
          type="search"
          value={value}
          onChange={handleSearchChane}
          id="default-search"
          className="block w-full p-3 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder="Tìm kiếm..."
        />
      </div>
    </form>
  );
};

export default Search;
