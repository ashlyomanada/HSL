import { getCategories } from "@/services/categories";
import React, { createContext, useContext, useEffect, useState } from "react";

const CategoryContext = createContext();
export const useCategoryContext = () => useContext(CategoryContext);
const CategoryProvider = ({ children }) => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    const fetchCategories = async () => {
      setLoading(true);
      try {
        const response = await getCategories();
        setCategories(response);
      } catch (error) {
        console.error(error);
        setLoading(true);
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);
  return (
    <CategoryContext.Provider value={{ categories }}>
      {children}
    </CategoryContext.Provider>
  );
};

export default CategoryProvider;
