import * as dotenv from 'dotenv';
dotenv.config();
import axios from "axios";

export const fetchLocation = async (latitude, longitude) => {
    const { data } = await axios.get(`https://api.olamaps.io/places/v1/reverse-geocode?latlng=${encodeURIComponent(`${latitude},${longitude}`)}&api_key=${process.env.OLA_API}`);
    return data;
  };
  export const fetchTile = async (latitude, longitude) => {
    const style = "default-light-standard"
    
    const { data } = await axios.get(`https://api.olamaps.io/tiles/v1/styles/default-light-standard/static/${longitude},${latitude},15/200x200.jpg?marker=${longitude},${latitude}|red|scale:0.9&api_key=${process.env.OLA_API}`, { responseType: 'arraybuffer' });
    const base64Image = Buffer.from(data, 'binary').toString('base64');
    return base64Image;
  };