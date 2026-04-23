/* eslint-disable no-restricted-imports */
import { z } from "zod";

import { CoinGateway } from "../gateways/coin.api.gateway";
import { FlightsGateway } from "../gateways/flights.api.gateway";
import { HotelsGateway } from "../gateways/hotels.api.gateway";
import { type IFlightDisplay } from "../mappers/flights.mapper";
import { type IHotelDisplay } from "../mappers/hotels.mapper";
import { GetSearchInformationUseCase } from "../useCases/getInformation.useCase";

const get = new GetSearchInformationUseCase(
  new CoinGateway(),
  new HotelsGateway(),
  new FlightsGateway(),
);

const inputSchema = z.object({
  from: z.enum(["JFK", "LGA", "GRU", "CGH"]),
  to: z.enum(["JFK", "LGA", "GRU", "CGH"]),
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
  date: z
    .string()
    .regex(/^\d{4}-\d{2}-\d{2}$/, "Formato inválido. Use YYYY-MM-DD"), // format pattern example: "2026-04-30"
});

/**
 * @command sls invoke local -f get-information --path src/app/mocks/get-infos.json
 */
export default async function (event: z.infer<typeof inputSchema>): Promise<{
  coinInformation?: string;
  hotelsInformation?: IHotelDisplay[];
  flightsInformation?: IFlightDisplay[];
}> {
  const { from, to, coin, date } = inputSchema.parse(event);

  const informations = await get.execute({
    coin,
    from,
    to,
    date,
  });

  return informations;
}
