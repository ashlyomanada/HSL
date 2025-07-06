import axiosInstance from "./axiosInstance";

// Get all scores
export const getScores = async () => {
  try {
    const response = await axiosInstance.get("/scores");
    return response.data;
  } catch (error) {
    console.error("Error fetching scores:", error);
  }
};

// Create a new score
export const createScores = async (form) => {
  try {
    const response = await axiosInstance.post("/scores", form);
    return response.data;
  } catch (error) {
    console.error("Error creating score:", error);
  }
};

// Update a score
export const updateScores = async (id, form) => {
  try {
    const response = await axiosInstance.put(`/scores/${id}`, form);
    return response.data;
  } catch (error) {
    console.error("Error updating score:", error);
  }
};

// Delete a score
export const deleteScores = async (id) => {
  try {
    const response = await axiosInstance.delete(`/scores/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error deleting score:", error);
  }
};
