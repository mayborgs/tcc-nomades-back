import axios from "axios";

import { type ICoinGateway } from "@/interfaces/gateways/coin.api.gateway";

export class CoinGateway implements ICoinGateway {
  async getCoin(
    from: string,
    to: string,
    amount: number,
  ): Promise<string | undefined> {
    try {
      const response = await axios.get(
        `https://api.frankfurter.dev/v1/latest?base=${from}&symbols=${to}`,
      );

      const convertedAmount = (amount * response.data.rates[to]).toFixed(2);

      return `${amount} ${from} = ${convertedAmount} ${to}`;
    } catch (error: unknown) {
      console.error("Error fetching coin data:", error);

      return undefined;
    }
  }
}
