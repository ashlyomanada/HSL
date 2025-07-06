import axiosInstance from "./axiosInstance";

// Get all matches
export const getMatches = async () => {
  try {
    const response = await axiosInstance.get("/matches");
    return response.data;
  } catch (error) {
    console.error("Error fetching data:", error);
  }
};

// Get matches by category
export const getMatchesCategory = async (form) => {
  try {
    const response = await axiosInstance.post(
      "/matches/showMatchesCategory",
      form
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching category matches:", error);
  }
};

// Get upcoming/next matches
export const nextMatch = async (form) => {
  try {
    const response = await axiosInstance.post("/matches/nextMatches", form);
    return response.data;
  } catch (error) {
    console.error("Error fetching next matches:", error);
  }
};

// Get single match
export const getSingleMatch = async (id) => {
  try {
    const response = await axiosInstance.get(`/matches/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching match:", error);
  }
};

// Create new match
export const createMatches = async (form) => {
  try {
    const response = await axiosInstance.post("/matches", form);
    return response.data;
  } catch (error) {
    console.error("Error creating match:", error);
  }
};

// Update match
export const updateMatches = async (id, form) => {
  try {
    const response = await axiosInstance.put(`/matches/${id}`, form);
    return response.data;
  } catch (error) {
    console.error("Error updating match:", error);
  }
};

// Delete match
export const deleteMatches = async (id) => {
  try {
    const response = await axiosInstance.delete(`/matches/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error deleting match:", error);
  }
};
