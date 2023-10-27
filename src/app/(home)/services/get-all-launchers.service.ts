import axios, { AxiosError } from "axios";
import { LauncherProps } from "../@types/launcher-types";

// @error global tratament
axios.interceptors.response.use(
  function (response) {
    console.log(response,'response v2');
    return response;
  },
  function(error) {
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
)

export async function getLaunchers(signal = '') {
  const controller = new AbortController();

  try {
    const response = await axios.get<{ results: LauncherProps[] }>(
      'http://localhost:3333/api/v1/launchers', {
        signal: controller.signal
      }
    );
  
    return response.data.results
  } catch (error: any) {
    throw new Error(error);
    // if (error instanceof AxiosError) {
    //   console.log(error.response?.status, 'status code');
    // }
  }
}