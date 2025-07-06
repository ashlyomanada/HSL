import axiosInstance from "./axiosInstance";

// GET all photos
export const getPhotos = async () => {
  try {
    const response = await axiosInstance.get("/photos");
    return response.data;
  } catch (error) {
    console.error("Error fetching data:", error);
  }
};

// GET photos by category ID
export const getPhotosCategory = async (id) => {
  try {
    const response = await axiosInstance.get(`/photos/getCategoryType/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching data:", error);
  }
};

// CREATE photo with image upload
export const createPhotos = async (form) => {
  const formData = new FormData();
  formData.append("category_id", form.category_id);
  formData.append("name", form.name);
  formData.append("description", form.description);
  formData.append("image", form.image);

  try {
    const response = await axiosInstance.post("/photos", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error creating data:", error);
  }
};

// UPDATE photo (with PUT via POST method override)
export const updatePhotos = async (id, form) => {
  const formData = new FormData();
  formData.append("category_id", form.category_id);
  formData.append("name", form.name);
  formData.append("description", form.description);
  formData.append("image", form.image); // works for both new and old

  try {
    const response = await axiosInstance.post(
      `/photos/${id}?_method=PUT`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error updating photo:", error);
    throw error;
  }
};

// DELETE photo
export const deletePhoto = async (id) => {
  try {
    const response = await axiosInstance.delete(`/photos/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error deleting photo:", error);
  }
};
