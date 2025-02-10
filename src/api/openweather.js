import axios from "axios";

const API_URL = "https://api.openweathermap.org/data/2.5/weather";
const API_KEY = "ca5f32c0475db6a51a059994fe0fa41b"; // Replace with your actual API key

export const getWeatherData = async (city) => {
  try {
    const response = await axios.get(API_URL, {
      params: {
        q: city,
        appid: API_KEY,
        units: "metric", // Use 'metric' for Celsius, 'imperial' for Fahrenheit
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching weather data:", error);
    throw error;
  }
};
