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
  from: z.enum([
    "JFK",
    "LGA",
    "GRU",
    "CGH",
    "SYD",
    "LHR",
    "YYZ",
    "ZRH",
    "PVG",
    "PRG",
    "CPH",
    "CDG",
    "HKG",
    "BUD",
    "CGK",
    "TLV",
    "DEL",
    "KEF",
    "NRT",
    "ICN",
    "MEX",
    "KUL",
    "OSL",
    "AKL",
    "MNL",
    "WAW",
    "OTP",
    "ARN",
    "SIN",
    "BKK",
    "IST",
    "JNB",
  ]),
  to: z.enum([
    "JFK",
    "LGA",
    "GRU",
    "CGH",
    "SYD",
    "LHR",
    "YYZ",
    "ZRH",
    "PVG",
    "PRG",
    "CPH",
    "CDG",
    "HKG",
    "BUD",
    "CGK",
    "TLV",
    "DEL",
    "KEF",
    "NRT",
    "ICN",
    "MEX",
    "KUL",
    "OSL",
    "AKL",
    "MNL",
    "WAW",
    "OTP",
    "ARN",
    "SIN",
    "BKK",
    "IST",
    "JNB",
  ]),
  coinAmount: z.number().optional(),
  flightClass: z
    .enum(["economy", "premium_economy", "business", "first"])
    .optional(),
  flightDate: z
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
  const { from, to, coinAmount, flightDate, flightClass } =
    inputSchema.parse(event);

  const informations = await get.execute({
    coinAmount,
    from,
    to,
    flightDate,
    flightClass,
  });

  return informations;
}
