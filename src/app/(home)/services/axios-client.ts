import axios from "axios";

export const axiosClient = axios.create({
  baseURL: process.env.REACT_API_URL || 'http://localhost:3333' 
})