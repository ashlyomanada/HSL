import axios from "axios";
const url = import.meta.env.VITE_API_URL;

export const getSchools = async () => {
  const response = await axios.get(`${url}/schools`);
  const data = response.data;
  return data;
};

export const createSchool = async (form) => {
  const formData = new FormData();
  formData.append("name", form.name);
  formData.append("address", form.address);
  formData.append("logo_url", form.logo_url);

  try {
    const response = await axios.post(`${url}/schools`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    return response.data;
  } catch (error) {
    console.error("Error creating school :", error);
  }
};

export const editSchool = async (id, form) => {
  const formData = new FormData();
  formData.append("name", form.name);
  formData.append("address", form.address);

  if (form.logo_url instanceof File) {
    formData.append("logo_url", form.logo_url);
  }

  try {
    const response = await axios.post(`${url}/schools/${id}`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    return response.data;
  } catch (error) {
    console.error("Error editing school:", error);
    throw error;
  }
};

export const deleteSchool = async (id) => {
  try {
    const response = await axios.delete(`${url}/schools/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error deleting school:", error);
  }
};
