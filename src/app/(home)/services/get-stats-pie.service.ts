import axios, { AxiosError } from "axios"

export async function getStatsPie() {
  const controller = new AbortController();

  try {
    const response = await axios.get<any[]>(
      "http://localhost:3333/api/v1/stats/pie", {
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