export interface IHotelLocation {
  dest_id: string;
  search_type: "city" | "district" | string;
  cc1: string;
  country: string;
  lc: string;
  region: string;
  dest_type: string;
  latitude: number;
  longitude: number;
  city_ufi: number | null;
  roundtrip: string;
  name: string;
  hotels: number;
  nr_hotels: number;
  label: string;
  type: string;
  city_name: string;
  image_url: string;
}

export interface IHotelsApiResponse {
  status: boolean;
  message: string;
  timestamp: number;
  data: IHotelLocation[];
}

export interface IHotelsGateway {
  getHotels: (to: string) => Promise<IHotelsApiResponse | undefined>;
}
