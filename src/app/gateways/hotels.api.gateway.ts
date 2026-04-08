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
        "x-rapidapi-key": "f1a598d425msh40cb25dc3a3c690p1c5779jsn666f529a56ba", // TODO: move to env variable
        "x-rapidapi-host": "booking-com15.p.rapidapi.com", // TODO: move to env variable
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
