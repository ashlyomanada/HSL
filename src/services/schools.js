import axiosInstance from "./axiosInstance";

// Get all schools
export const getSchools = async () => {
  try {
    const response = await axiosInstance.get("/schools");
    return response.data;
  } catch (error) {
    console.error("Error fetching schools:", error);
  }
};

// Create a new school
export const createSchool = async (form) => {
  const formData = new FormData();
  formData.append("name", form.name);
  formData.append("address", form.address);
  formData.append("logo_url", form.logo_url);

  try {
    const response = await axiosInstance.post("/schools", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error creating school:", error);
  }
};

// Edit a school
export const editSchool = async (id, form) => {
  const formData = new FormData();
  formData.append("name", form.name);
  formData.append("address", form.address);

  if (form.logo_url instanceof File) {
    formData.append("logo_url", form.logo_url);
  }

  try {
    const response = await axiosInstance.post(
      `/schools/${id}?_method=PUT`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error editing school:", error);
    throw error;
  }
};

// Delete a school
export const deleteSchool = async (id) => {
  try {
    const response = await axiosInstance.delete(`/schools/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error deleting school:", error);
  }
};
