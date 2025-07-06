import axiosInstance from "./axiosInstance";

// Get all standings
export const getStandings = async () => {
  try {
    const response = await axiosInstance.get("/standings");
    return response.data;
  } catch (error) {
    console.error("Error fetching standings:", error);
  }
};

// Get standings by category
export const getStandingsCategory = async (form) => {
  try {
    const response = await axiosInstance.post(
      "/standings/getStandingsCategory",
      form
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching standings category:", error);
  }
};

// Create a new standings record
export const createStandings = async (form) => {
  try {
    const response = await axiosInstance.post("/standings", form);
    return response.data;
  } catch (error) {
    console.error("Error creating standings:", error);
  }
};

// Get standings for a specific team
export const getTeamStanding = async (form) => {
  try {
    const response = await axiosInstance.post(
      "/standings/showTeamStandings",
      form
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching team standings:", error);
  }
};
