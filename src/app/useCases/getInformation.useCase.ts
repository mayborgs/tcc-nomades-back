import { type ICoinGateway } from "@/interfaces/gateways/coin.api.gateway";
import { type IFlightsGateway } from "@/interfaces/gateways/flights.api.gateway";
import { type IHotelsGateway } from "@/interfaces/gateways/hotels.api.gateway";

// eslint-disable-next-line no-restricted-imports
import { CoinMapper } from "../mappers/coin.mapper";
// eslint-disable-next-line no-restricted-imports
import { FlightsMapper, type IFlightDisplay } from "../mappers/flights.mapper";
// eslint-disable-next-line no-restricted-imports
import { HotelsMapper, type IHotelDisplay } from "../mappers/hotels.mapper";
// eslint-disable-next-line no-restricted-imports
import { locationMapper } from "../mappers/location.mapper";

export class GetSearchInformationUseCase {
  constructor(
    private readonly coinGateway: ICoinGateway,
    private readonly hotelsGateway: IHotelsGateway,
    private readonly FlightsGateway: IFlightsGateway,
  ) {}

  async execute({
    coin,
    from,
    to,
    date,
  }: {
    coin: { from: string; to: string; amount?: number };
    from: string;
    to: string;
    date: string;
  }): Promise<{
    coinInformation?: string;
    hotelsInformation?: IHotelDisplay[];
    flightsInformation?: IFlightDisplay[];
  }> {
    let coinInformation: string | undefined;
    let hotelsInformation: IHotelDisplay[] | undefined;
    let flightsInformation: IFlightDisplay[] | undefined;

    try {
      const coinData = await this.coinGateway.getCoin(coin.from, coin.to);
      if (coinData === undefined) {
        console.error("Error getting coin data");
        throw new Error(
          "Could not retrieve coin information for the provided currencies.",
        );
      }

      coinInformation = CoinMapper.coinMap(
        coinData,
        coin.amount ?? 1,
        coin.from,
        coin.to,
      );

      // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
      const hotelsData = await this.hotelsGateway.getHotels(
        locationMapper[to as keyof typeof locationMapper],
      );
      if (hotelsData === undefined) {
        console.error("Error getting hotels data");
        throw new Error(
          "Could not retrieve hotels information for the destination.",
        );
      }
      hotelsInformation = HotelsMapper.hotelsMap(hotelsData);

      const flightsData = await this.FlightsGateway.getFlights(from, to, date);

      if (flightsData === undefined) {
        console.error("Error getting flights data");
        throw new Error(
          "Could not retrieve flights information for the destination and date.",
        );
      }

      flightsInformation = FlightsMapper.flightsMap(flightsData);
    } catch (error: unknown) {
      console.error("Error executing GetSearchInformationUseCase:", error);

      if (error instanceof Error) {
        const errorMessages = [
          "Could not retrieve coin information for the provided currencies.",
          "Could not retrieve hotels information for the destination.",
          "Could not retrieve flights information for the destination and date.",
        ];

        const isKnownError = errorMessages.some((message) =>
          error.message.includes(message),
        );

        if (!isKnownError) {
          console.error("An unexpected error occurred:", error);
        }

        if (error.message.includes("coin")) {
          coinInformation = undefined;
        }

        if (error.message.includes("hotels")) {
          hotelsInformation = undefined;
        }
        if (error.message.includes("flights")) {
          flightsInformation = undefined;
        }
      }

      return {
        coinInformation,
        hotelsInformation,
        flightsInformation,
      };
    }

    return {
      coinInformation,
      hotelsInformation,
      flightsInformation,
    };
  }
}
