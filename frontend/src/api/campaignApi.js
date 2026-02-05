import axios from "axios";

const API_URL = "http://localhost:5000/api/campaigns";

export const getCampaigns = async (page = 1, limit = 5) => {
  try {
    const res = await axios.get(`${API_URL}?page=${page}&limit=${limit}`);
    return res.data;
  } catch (err) {
    throw new Error(err.response?.data?.error || "Erreur lors de la récupération des campagnes");
  }
};

export const getCampaign = async (id) => {
  try {
    const res = await axios.get(`${API_URL}/${id}`);
    return res.data;
  } catch (err) {
    throw new Error(err.response?.data?.error || "Erreur lors de la récupération de la campagne");
  }
};

export const createCampaign = async (data) => {
  try {
    const res = await axios.post(API_URL, data);
    return res.data;
  } catch (err) {
    throw new Error(err.response?.data?.error || "Erreur lors de la création de la campagne");
  }
};

export const updateCampaignStatus = async (id, status) => {
  try {
    const res = await axios.patch(`${API_URL}/${id}/status`, { status });
    return res.data;
  } catch (err) {
    throw new Error(err.response?.data?.error || "Erreur lors de la mise à jour du statut");
  }
};

export const getStats = async (id) => {
  try {
    const res = await axios.get(`${API_URL}/${id}/stats`);
    return res.data;
  } catch (err) {
    throw new Error(err.response?.data?.error || "Erreur lors de la récupération des stats");
  }
};

export const simulateCampaign = async (id) => {
  try {
    const res = await axios.post(`${API_URL}/${id}/simulate`);
    return res.data;
  } catch (err) {
    throw new Error(err.response?.data?.error || "Erreur lors de la simulation");
  }
};
