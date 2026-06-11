import axios from "axios";

import {
  type IFlightApiResponse,
  type IFlightsGateway,
} from "@/interfaces/gateways/flights.api.gateway";
export class FlightsGateway implements IFlightsGateway {
  async getFlights(
    from: string,
    to: string,
    date: string = "2026-04-30", // api pattern,
    flightClass?: "economy" | "premium_economy" | "business" | "first",
    currency: string = "USD",
  ): Promise<IFlightApiResponse | undefined> {
    const options = {
      method: "GET",
      url: "https://google-flights2.p.rapidapi.com/api/v1/searchFlights",
      params: {
        departure_id: `${from}`,
        arrival_id: `${to}`,
        outbound_date: `${date}`,
        travel_class: flightClass?.toUpperCase() ?? "ECONOMY",
        adults: "1",
        currency,
        language_code: "en-US",
        search_type: "best",
      },
      headers: {
        "x-rapidapi-key": process.env.RAPID_API_KEY,
        "x-rapidapi-host": process.env.RAPID_API_FLIGHTS_HOST,
        "Content-Type": "application/json",
      },
    };

    try {
      console.log("Fetching flight data with options:", options); // Debug log

      const response = await axios.request<IFlightApiResponse>(options);

      if (
        !response.data.status ||
        response.data.message !== "Success" ||
        response.status !== 200
      ) {
        console.error("Flights API returned an error:", response.data.message);
        return undefined;
      }

      return response.data;
    } catch (error: unknown) {
      console.error("Error fetching flight data:", error);

      return undefined;
    }
  }
}
