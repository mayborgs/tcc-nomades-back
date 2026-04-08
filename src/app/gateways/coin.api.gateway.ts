import axios from "axios";

import { type ICoinGateway } from "@/interfaces/gateways/coin.api.gateway";

export class CoinGateway implements ICoinGateway {
  async getCoin(
    from: string,
    to: string,
  ): Promise<{ rates: Record<string, number> } | undefined> {
    try {
      const response = await axios.get<{ rates: Record<string, number> }>(
        `https://api.frankfurter.dev/v1/latest?base=${from}&symbols=${to}`,
      );

      return response.data;
    } catch (error: unknown) {
      console.error("Error fetching coin data:", error);

      return undefined;
    }
  }
}
