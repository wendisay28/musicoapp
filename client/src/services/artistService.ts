import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:3000/api';

export async function getArtistById(id: string) {
  const response = await axios.get(`${API_URL}/artists/${id}`);
  return response.data;
} 