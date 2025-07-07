import { getCategories } from "@/services/categories";
import React, { createContext, useContext, useEffect, useState } from "react";

const CategoryContext = createContext();
export const useCategoryContext = () => useContext(CategoryContext);
const CategoryProvider = ({ children }) => {
  const [categories, setCategories] = useState([]);
  const [isLoadingCategories, setIsLoadingCategories] = useState(false);
  useEffect(() => {
    const fetchCategories = async () => {
      setIsLoadingCategories(true);
      try {
        const response = await getCategories();
        setCategories(response);
      } catch (error) {
        console.error(error);
        setIsLoadingCategories(true);
      } finally {
        setIsLoadingCategories(false);
      }
    };

    fetchCategories();
  }, []);
  return (
    <CategoryContext.Provider value={{ categories, isLoadingCategories }}>
      {children}
    </CategoryContext.Provider>
  );
};

export default CategoryProvider;
