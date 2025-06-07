import axios from "axios";

const url = import.meta.env.VITE_API_URL;

export const getScores = async () => {
  try {
    const response = await axios.get(`${url}/scores`);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export const createScores = async (form) => {
  try {
    const response = await axios.post(`${url}/scores`, form);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export const updateScores = async (id, form) => {
  try {
    const response = await axios.put(`${url}/scores/${id}`, form);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export const deleteScores = async (id) => {
  try {
    const response = await axios.delete(`${url}/scores/${id}`);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};
