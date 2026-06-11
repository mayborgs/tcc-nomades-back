export interface ApiResponse<T> {
  status: boolean;
  message: string;
  timestamp: number;
  data: T;
}

interface Duration {
  raw: number;
  text: string;
}

interface Airport {
  airport_name: string;
  airport_code: string;
  time: string;
}

interface AirlineInfo {
  airline: string;
  airline_logo: string;
  flight_number: string;
  aircraft: string;
  seat: string;
  legroom: string;
  extensions: string[];
}

interface CarbonEmissions {
  difference_percent: number;
  CO2e: number;
  typical_for_this_route: number;
  higher: number;
}

interface Layover {
  airport_code: string;
  airport_name: string;
  duration_label: string;
  duration: number;
  city: string;
}

interface FlightDetail extends AirlineInfo {
  departure_airport: Airport;
  arrival_airport: Airport;
  duration: Duration;
}

export interface FlightItinerary {
  departure_time: string;
  arrival_time: string;
  duration: Duration;
  flights: FlightDetail[];
  delay: {
    values: boolean;
    text: number;
  };
  self_transfer: boolean;
  layovers: Layover[] | null;
  bags: {
    carry_on: number;
    checked: number;
  };
  carbon_emissions: CarbonEmissions;
  price: number;
  stops: number;
  airline_logo: string;
  booking_token: string;
}

export interface FlightData {
  itineraries: {
    topFlights: FlightItinerary[];
    otherFlights: FlightItinerary[];
  };
}

export type IFlightApiResponse = ApiResponse<FlightData>;

export interface IFlightsGateway {
  getFlights: (
    from: string,
    to: string,
    date: string,
    flightClass?: "economy" | "premium_economy" | "business" | "first",
    currency?: string,
  ) => Promise<IFlightApiResponse | undefined>;
}
