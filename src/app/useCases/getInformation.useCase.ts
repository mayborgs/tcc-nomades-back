import { type ICoinGateway } from "@/interfaces/gateways/coin.api.gateway";
import { type IHotelsGateway } from "@/interfaces/gateways/hotels.api.gateway";
import { type ISkyScannerGateway } from "@/interfaces/gateways/skyscanner.api.gateway";

// eslint-disable-next-line no-restricted-imports
import { CoinMapper } from "../mappers/coin.mapper";
// eslint-disable-next-line no-restricted-imports
import { HotelsMapper, type IHotelDisplay } from "../mappers/hotels.mapper";

export class GetSearchInformationUseCase {
  constructor(
    private readonly coinGateway: ICoinGateway,
    private readonly hotelsGateway: IHotelsGateway,
    private readonly eventsGateway: ISkyScannerGateway,
  ) {}

  async execute({
    from,
    to,
    amount,
  }: {
    from: string;
    to: string;
    amount?: number;
  }): Promise<{
    coinInformation?: string;
    hotelsInformation?: IHotelDisplay[];
    // events?: unknown;
  }> {
    let coinInformation: string | undefined;
    let hotelsInformation: IHotelDisplay[] | undefined;

    try {
      const coinData = await this.coinGateway.getCoin(from, to);
      if (coinData === undefined) {
        console.error("Error getting coin data");
        throw new Error(
          "Could not retrieve coin information for the provided currencies.",
        );
      }

      coinInformation = CoinMapper.coinMap(coinData, amount ?? 1, from, to);

      const hotelsData = await this.hotelsGateway.getHotels(to);
      if (hotelsData === undefined) {
        console.error("Error getting hotels data");
        throw new Error(
          "Could not retrieve hotels information for the destination.",
        );
      }
      hotelsInformation = HotelsMapper.hotelsMap(hotelsData);
    } catch (error: unknown) {
      console.error("Error executing GetSearchInformationUseCase:", error);

      if (error instanceof Error) {
        const errorMessages = [
          "Could not retrieve coin information for the provided currencies.",
          "Could not retrieve hotels information for the destination.",
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
      }

      return {
        coinInformation,
        hotelsInformation,
        // events,
      };
    }

    return {
      coinInformation,
      hotelsInformation,
      // events,
    };
  }
}
