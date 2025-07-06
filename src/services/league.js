import axiosInstance from "./axiosInstance";

// Get all leagues
export const getLeagues = async () => {
  try {
    const response = await axiosInstance.get("/leagues");
    return response.data;
  } catch (error) {
    console.error("Error fetching leagues:", error);
  }
};

// Get league by ID
export const getSelectedLeagues = async (id) => {
  try {
    const response = await axiosInstance.get(`/leagues/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching league by ID:", error);
  }
};

// Get league category
export const getLeagueCategory = async (form) => {
  try {
    const response = await axiosInstance.post(
      "/leagues/getLeagueCategory",
      form
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching league category:", error);
  }
};

// Create new league
export const createLeagues = async (form) => {
  try {
    const response = await axiosInstance.post("/leagues", form);
    return response.data;
  } catch (error) {
    console.error("Error creating league:", error);
  }
};

// Update league
export const updateLeagues = async (id, form) => {
  try {
    const response = await axiosInstance.put(`/leagues/${id}`, form);
    return response.data;
  } catch (error) {
    console.error("Error updating league:", error);
  }
};

// Delete league
export const deleteLeagues = async (id) => {
  try {
    const response = await axiosInstance.delete(`/leagues/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error deleting league:", error);
  }
};
