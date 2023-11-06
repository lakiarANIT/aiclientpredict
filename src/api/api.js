// src/api/api.js
import axios from 'axios';

const API_BASE_URL = 'https://aipredict-rho.vercel.app/api'; // Replace with your backend's URL

export const insertOrUpdateInCollection = async (collectionName, data, docId = null) => {
  try {
    let response;
    if (docId) {
      response = await axios.put(`${API_BASE_URL}/collections/insert-or-update/${collectionName}/${docId}`, data);
    } else {
      response = await axios.post(`${API_BASE_URL}/collections/insert-or-update/${collectionName}`, data);
    }
    return response.data;
  } catch (error) {
    throw error;
  }
};
