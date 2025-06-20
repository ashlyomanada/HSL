import axios from "axios";
const url = import.meta.env.VITE_API_URL;

export const getLeagues = async () => {
  try {
    const response = await axios.get(`${url}/leagues`);
    return response.data;
  } catch (error) {
    console.error("Error fetching leagues", error);
  }
};

export const getSelectedLeagues = async (id) => {
  try {
    const response = await axios.get(`${url}/leagues/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching leagues", error);
  }
};

export const getLeagueCategory = async (form) => {
  try {
    const response = await axios.post(`${url}/leagues/getLeagueCategory`, form);
    return response.data;
  } catch (error) {
    console.error("Error fetching leagues", error);
  }
};

export const createLeagues = async (form) => {
  try {
    const response = await axios.post(`${url}/leagues`, form);
    return response.data;
  } catch (error) {
    console.error("Error creating leagues", error);
  }
};

export const updateLeagues = async (id, form) => {
  try {
    const response = await axios.put(`${url}/leagues/${id}`, form);
    return response.data;
  } catch (error) {
    console.error("Error creating leagues", error);
  }
};

export const deleteLeagues = async (id) => {
  try {
    const response = await axios.delete(`${url}/leagues/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error deleting leagues", error);
  }
};
