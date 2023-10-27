import axios, { AxiosError } from "axios"
import { RocketProps } from "../@types/rockets-types";

export async function getRockets() {
  const controller = new AbortController();

  try {
    const response = await axios.get<RocketProps[]>(
      "http://localhost:3333/api/v1/rockets", {
        signal: controller.signal
      }
    );

    return response.data
  } catch (error) {
    if (error instanceof AxiosError) {
      if(error.response?.status === 500) {
        console.log(error);
        throw new Error('Server error');
      }

      if(error.response?.status === 401) {
        console.log(error);
        throw new Error('Unauthenticated');
      }

      return Promise.reject(error);
    }
  }

}