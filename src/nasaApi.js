import axios from 'axios';

const apiKey = 'dK4NpbfNGFD1kx6FdnwEauM3y8QxxjacMHmQUluJ';

export const getAPOD = async () => {
  const url = `https://api.nasa.gov/planetary/apod?api_key=${apiKey}`;
  try {
    const response = await axios.get(url);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};
