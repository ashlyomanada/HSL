import axios from "axios";
const url = import.meta.env.VITE_API_URL;

export const getCategories = async () => {
  try {
    const response = await axios.get(`${url}/categories`);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export const createCategories = async (form) => {
  const formData = new FormData();
  formData.append("category", form.category);
  formData.append("image_url", form.image_url);

  try {
    const response = await axios.post(`${url}/categories`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export const updateCategories = async (id, form) => {
  const formData = new FormData();
  formData.append("category", form.category);
  formData.append("image_url", form.image_url);

  // if (form.image_url instanceof File) {
  //   formData.append("image_url", form.image_url);
  // }

  try {
    const response = await axios.post(`${url}/categories/${id}`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export const deleteCategories = async (id) => {
  try {
    const response = await axios.delete(`${url}/categories/${id}`);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};
