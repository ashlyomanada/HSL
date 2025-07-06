import axiosInstance from "./axiosInstance";

// Get all categories
export const getCategories = async () => {
  try {
    const response = await axiosInstance.get("/categories");
    return response.data;
  } catch (error) {
    console.error("Error fetching categories:", error);
  }
};

// Create a new category (with image)
export const createCategories = async (form) => {
  const formData = new FormData();
  formData.append("category", form.category);
  formData.append("image_url", form.image_url);

  try {
    const response = await axiosInstance.post("/categories", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error creating category:", error);
  }
};

// Update a category (with image)
export const updateCategories = async (id, form) => {
  const formData = new FormData();
  formData.append("category", form.category);
  formData.append("image_url", form.image_url);

  try {
    const response = await axiosInstance.post(`/categories/${id}`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error updating category:", error);
  }
};

// Delete a category
export const deleteCategories = async (id) => {
  try {
    const response = await axiosInstance.delete(`/categories/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error deleting category:", error);
  }
};
