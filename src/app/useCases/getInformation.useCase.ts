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
import { locationCoinMapper } from "../mappers/locationCoin.mapper";

export class GetSearchInformationUseCase {
  constructor(
    private readonly coinGateway: ICoinGateway,
    private readonly hotelsGateway: IHotelsGateway,
    private readonly FlightsGateway: IFlightsGateway,
  ) {}

  async execute({
    coinAmount,
    from,
    to,
    flightDate,
    flightClass,
  }: {
    coinAmount?: number;
    from: string;
    to: string;
    flightDate: string;
    flightClass?: "economy" | "premium_economy" | "business" | "first";
  }): Promise<{
    coinInformation?: string;
    hotelsInformation?: IHotelDisplay[];
    flightsInformation?: IFlightDisplay[];
  }> {
    const [coinResult, hotelsResult, flightsResult] = await Promise.allSettled([
      this.coinGateway.getCoin(
        locationCoinMapper[from as keyof typeof locationCoinMapper].coin,
        locationCoinMapper[to as keyof typeof locationCoinMapper].coin,
      ),
      this.hotelsGateway.getHotels(
        locationCoinMapper[to as keyof typeof locationCoinMapper].location,
      ),
      this.FlightsGateway.getFlights(
        from,
        to,
        flightDate,
        flightClass,
        locationCoinMapper[from as keyof typeof locationCoinMapper].coin,
      ),
    ]);

    const coinInformation =
      coinResult.status === "fulfilled" && coinResult.value !== undefined
        ? CoinMapper.coinMap(
            coinResult.value,
            coinAmount ?? 1,
            locationCoinMapper[from as keyof typeof locationCoinMapper].coin,
            locationCoinMapper[to as keyof typeof locationCoinMapper].coin,
          )
        : (console.error(
            "Could not retrieve coin information for the provided currencies.",
          ),
          undefined);

    const hotelsInformation =
      hotelsResult.status === "fulfilled" && hotelsResult.value !== undefined
        ? HotelsMapper.hotelsMap(hotelsResult.value)
        : (console.error(
            "Could not retrieve hotels information for the destination.",
          ),
          undefined);

    const flightsInformation =
      flightsResult.status === "fulfilled" && flightsResult.value !== undefined
        ? FlightsMapper.flightsMap(flightsResult.value)
        : (console.error(
            "Could not retrieve flights information for the destination and date.",
          ),
          undefined);

    return {
      coinInformation,
      hotelsInformation,
      flightsInformation,
    };
  }
}
