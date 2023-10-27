import axios, { AxiosError } from "axios"

export async function getStatsBar() {
  const controller = new AbortController();

  try {
    const response = await axios.get<any[]>(
      "http://localhost:3333/api/v1/stats/bar", {
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