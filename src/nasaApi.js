import axios from 'axios';

const apiKey = 'dK4NpbfNGFD1kx6FdnwEauM3y8QxxjacMHmQUluJ';

export const getAPOD = async () => {
  const url = `https://api.nasa.gov/planetary/apod?api_key=${apiKey}`;
  try {
    const response = await axios.get(url);
    console.log(response);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

const date = new Date()
const year = date.getFullYear()
const month = ('0' + (date.getMonth() + 1)).slice(-2)
const day = ('0' + date.getDate()).slice(-2)
const currentDate = `${year}-${month}-${day}`


export const getAsteroids = async () => {
  const url = `https://api.nasa.gov/neo/rest/v1/feed?start_date=${currentDate}&end_date=${currentDate}&api_key=${apiKey}`;
  try {
    const response = await axios.get(url);
    console.log(response);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};
