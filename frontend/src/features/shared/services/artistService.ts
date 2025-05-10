import axios from 'axios';
const API_URL: any = process.env.REACT_APP_API_URL || 'http://localhost:3000/api';
export async function getArtistById(id) {
    const response: any = await axios.get(`${API_URL}/artists/${id}`);
    return response.data;
}
