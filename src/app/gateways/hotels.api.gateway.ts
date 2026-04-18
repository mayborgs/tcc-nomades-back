import axios from "axios";

import {
  type IHotelsApiResponse,
  type IHotelsGateway,
} from "@/interfaces/gateways/hotels.api.gateway";

export class HotelsGateway implements IHotelsGateway {
  async getHotels(to: string): Promise<IHotelsApiResponse | undefined> {
    const options = {
      method: "GET",
      url: "https://booking-com15.p.rapidapi.com/api/v1/hotels/searchDestination",
      params: { query: `${to}` },
      headers: {
        "x-rapidapi-key": process.env.RAPID_API_KEY,
        "x-rapidapi-host": process.env.RAPID_API_HOST,
        "Content-Type": "application/json",
      },
    };

    try {
      const response = await axios.request<IHotelsApiResponse>(options);
      return response.data;
    } catch (error: unknown) {
      console.error("Error fetching hotels data:", error);

      return undefined;
    }
  }
}
