/* eslint-disable no-restricted-imports */
import { z } from "zod";

import { CoinGateway } from "../gateways/coin.api.gateway";
import { HotelsGateway } from "../gateways/hotels.api.gateway";
import { GetSearchInformationUseCase } from "../useCases/getInformation.useCase";

const get = new GetSearchInformationUseCase(
  new CoinGateway(),
  new HotelsGateway(),
);

const inputSchema = z.object({
  from: z.string(),
  to: z.string(),
  coin: z.object({
    from: z.enum([
      "AUD",
      "BRL",
      "CAD",
      "CHF",
      "CNY",
      "CZK",
      "DKK",
      "EUR",
      "GBP",
      "HKD",
      "HUF",
      "IDR",
      "ILS",
      "INR",
      "ISK",
      "JPY",
      "KRW",
      "MXN",
      "MYR",
      "NOK",
      "NZD",
      "PHP",
      "PLN",
      "RON",
      "SEK",
      "SGD",
      "THB",
      "TRY",
      "USD",
      "ZAR",
    ]),
    to: z.enum([
      "AUD",
      "BRL",
      "CAD",
      "CHF",
      "CNY",
      "CZK",
      "DKK",
      "EUR",
      "GBP",
      "HKD",
      "HUF",
      "IDR",
      "ILS",
      "INR",
      "ISK",
      "JPY",
      "KRW",
      "MXN",
      "MYR",
      "NOK",
      "NZD",
      "PHP",
      "PLN",
      "RON",
      "SEK",
      "SGD",
      "THB",
      "TRY",
      "USD",
      "ZAR",
    ]),
    amount: z.number().optional(),
  }),
});

/**
 * @command sls invoke local -f get-information --path src/app/mocks/get-infos.json
 */
export default async function (event: z.infer<typeof inputSchema>): Promise<{
  coinInformation?: string;
  hotelsInformation?: unknown;
}> {
  const { from, to, coin } = inputSchema.parse(event);

  const informations = await get.execute({
    coin,
    from,
    to,
  });

  return informations;
}
