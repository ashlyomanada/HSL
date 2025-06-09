import axios from "axios";

const url = import.meta.env.VITE_API_URL;

export const getMatches = async () => {
  try {
    const response = await axios.get(`${url}/matches`);
    return response.data;
  } catch (error) {
    console.error("Error fetching data:", error);
  }
};

export const getMatchesCategory = async (form) => {
  try {
    const response = await axios.post(
      `${url}/matches/showMatchesCategory`,
      form
    );
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export const getSingleMatch = async (id) => {
  try {
    const response = await axios.get(`${url}/matches/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching data:", error);
  }
};

export const createMatches = async (form) => {
  try {
    const response = await axios.post(`${url}/matches`, form);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export const updateMatches = async (id, form) => {
  try {
    const response = await axios.put(`${url}/matches/${id}`, form);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const deleteMatches = async (id) => {
  try {
    const response = await axios.delete(`${url}/matches/${id}`);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};
