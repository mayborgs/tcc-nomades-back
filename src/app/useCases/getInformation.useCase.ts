import { ISkyScannerGateway } from "@/interfaces/gateways/skyscanner.api.gateway";



export class GetSearchInformationUseCase {
  constructor(
    private readonly gateway: ISkyScannerGateway,
  ) { }

  async execute({
    x,
  }: {
    x: Record<string, unknown>;
  }): Promise<Record<string, unknown>> {
    const flights = await this.gateway.getFlights(
      x);

    // const events = await this.gateway.getEvents({
    //   gameName,
    //   tagLine,
    // });

    return {
      flights,
      // events,
    };
  }
}
