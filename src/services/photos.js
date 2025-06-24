import axios from "axios";
const url = import.meta.env.VITE_API_URL;

// export const getPhotos = async () => {
//   try {
//     const response = await axios.get(`${url}/photos`);
//     return response.data;
//   } catch (error) {
//     console.error("Error fetching data : ", error);
//   }
// };

export const getPhotosCategory = async (id) => {
  try {
    const response = await axios.get(`${url}/photos/getCategoryType/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching data : ", error);
  }
};

export const createPhotos = async (form) => {
  const formData = new FormData();
  formData.append("category_id", form.category_id);
  formData.append("name", form.name);
  formData.append("description", form.description);
  formData.append("image", form.image);

  try {
    const response = await axios.post(`${url}/photos`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error creating data : ", error);
  }
};

export const updatePhotos = async (id, form) => {
  const formData = new FormData();
  formData.append("category_id", form.category_id);
  formData.append("name", form.name);
  formData.append("description", form.description);
  formData.append("image", form.image);

  // if (form.image instanceof File) {
  //   formData.append("image", form.image);
  // } else {
  //   formData.append("image", form.image);
  // }

  try {
    const response = await axios.post(
      `${url}/photos/${id}?_method=PUT`,
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

export const deletePhoto = async (id) => {
  try {
    const response = await axios.delete(`${url}/photos/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error deleting data : ", error);
  }
};
