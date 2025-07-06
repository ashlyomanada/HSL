import axiosInstance from "./axiosInstance";

// Get all teams
export const getTeams = async () => {
  try {
    const response = await axiosInstance.get("/teams");
    return response.data;
  } catch (error) {
    console.error("Error fetching teams:", error);
  }
};

// Get category type
export const getCategoryType = async (category) => {
  try {
    const response = await axiosInstance.post(
      "/teams/getCategoryType",
      category
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching category type:", error);
  }
};

// Create new team
export const createTeam = async (form) => {
  const formData = {
    school_id: parseInt(form.school_id),
    name: form.name,
    category_id: parseInt(form.category_id),
  };

  try {
    const response = await axiosInstance.post("/teams", formData);
    return response.data;
  } catch (error) {
    console.error("Error creating team:", error);
  }
};

// Update team
export const updateTeam = async (id, form) => {
  const formData = {
    school_id: parseInt(form.school_id),
    name: form.name,
    category_id: parseInt(form.category_id),
  };

  try {
    const response = await axiosInstance.put(`/teams/${id}`, formData);
    return response.data;
  } catch (error) {
    console.error("Error updating team:", error);
  }
};

// Delete team
export const deleteTeam = async (id) => {
  try {
    const response = await axiosInstance.delete(`/teams/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error deleting team:", error);
  }
};
