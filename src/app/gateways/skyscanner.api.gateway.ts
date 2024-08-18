
import { ISkyScannerGateway } from "@/interfaces/gateways/skyscanner.api.gateway";

export class SkyScannerGateway implements ISkyScannerGateway {
  async getFlights(x: Record<string, unknown>): Promise<Record<string, unknown>> {

    return { flights: "flights" };
  }
}

