import axios from "axios";

const url = import.meta.env.VITE_API_URL;

export const getStandings = async () => {
  try {
    const response = await axios.get(`${url}/standings`);
    return response.data;
  } catch (error) {
    console.error("Error fetching data: ", error);
  }
};

export const getStandingsCategory = async (form) => {
  try {
    const response = await axios.post(
      `${url}/standings/getStandingsCategory`,
      form
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching data: ", error);
  }
};

export const createStandings = async (form) => {
  try {
    const response = await axios.post(`${url}/standings`, form);
    return response.data;
  } catch (error) {
    console.error("Error creating data: ", error);
  }
};

export const getTeamStanding = async (form) => {
  try {
    const response = await axios.post(
      `${url}/standings/showTeamStandings`,
      form
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching data: ", error);
  }
};
