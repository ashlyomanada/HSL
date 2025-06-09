import axios from "axios";

const url = import.meta.env.VITE_API_URL;

export const getTeams = async () => {
  try {
    const response = await axios.get(`${url}/teams`);
    return response.data;
  } catch (error) {
    console.error("Error fetching data", error);
  }
};

export const getCategoryType = async (category) => {
  try {
    const response = await axios.post(`${url}/teams/getCategoryType`, category);
    return response.data;
  } catch (error) {
    console.error("Error fetching data", error);
  }
};

export const createTeam = async (form) => {
  const formData = {
    school_id: parseInt(form.school_id),
    name: form.name,
    category_id: parseInt(form.category_id),
  };

  try {
    const response = await axios.post(`${url}/teams`, formData);
    return response.data;
  } catch (error) {
    console.error("Error Creating Team:", error);
  }
};

export const updateTeam = async (id, form) => {
  const formData = {
    school_id: parseInt(form.school_id),
    name: form.name,
    category_id: parseInt(form.category_id),
  };

  try {
    const response = await axios.put(`${url}/teams/${id}`, formData);
    return response.data;
  } catch (error) {
    console.error("Error Updating Team:", error);
  }
};

export const deleteTeam = async (id) => {
  try {
    const response = await axios.delete(`${url}/teams/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error Deleting Team:", error);
  }
};
