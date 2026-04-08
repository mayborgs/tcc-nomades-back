import {
  type IHotelLocation,
  type IHotelsApiResponse,
} from "@/interfaces/gateways/hotels.api.gateway";

export interface IHotelDisplay {
  id: string;
  name: string;
  location: string; // Nome da cidade ou distrito
  country: string;
  picture: string;
  quantity: number;
  type: string;
  coordinates?: {
    lat: number;
    lng: number;
  };
}

// eslint-disable-next-line @typescript-eslint/no-extraneous-class
export class HotelsMapper {
  private static toDomain(hotel: IHotelLocation): IHotelDisplay {
    return {
      id: hotel.dest_id,
      name: hotel.name,
      location: hotel.city_name,
      country: hotel.country,
      picture: hotel.image_url,
      quantity: hotel.hotels ?? hotel.nr_hotels ?? 0,
      type: hotel.dest_type,
      coordinates: {
        lat: hotel.latitude,
        lng: hotel.longitude,
      },
    };
  }

  static hotelsMap(response: IHotelsApiResponse | undefined): IHotelDisplay[] {
    if (response == null || !response.status || !Array.isArray(response.data)) {
      return [];
    }

    return response.data.map((item) => this.toDomain(item));
  }
}
