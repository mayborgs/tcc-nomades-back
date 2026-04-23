import { type IFlightApiResponse } from "@/interfaces/gateways/flights.api.gateway";

export interface IFlightDisplay {
  airline: string;
  flightNumber: string;
  departure: string;
  arrival: string;
  duration: string;
  price: number;
  stops: number;
}

// eslint-disable-next-line @typescript-eslint/no-extraneous-class
export class FlightsMapper {
  static flightsMap(flights: IFlightApiResponse): IFlightDisplay[] {
    const allItineraries = [
      ...flights.data.itineraries.topFlights,
      ...flights.data.itineraries.otherFlights,
    ];

    return allItineraries.map((itinerary) => {
      const firstFlight = itinerary.flights[0];
      const lastFlight = itinerary.flights[itinerary.flights.length - 1];

      return {
        airline: firstFlight.airline,
        flightNumber: firstFlight.flight_number,
        departure: `${firstFlight.departure_airport.airport_code} at ${itinerary.departure_time}`,
        arrival: `${lastFlight.arrival_airport.airport_code} at ${itinerary.arrival_time}`,
        duration: itinerary.duration.text,
        price: itinerary.price,
        stops: itinerary.stops,
      };
    });
  }
}
