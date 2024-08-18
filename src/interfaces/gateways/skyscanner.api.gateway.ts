
export interface ISkyScannerGateway {
  getFlights: (x: Record<string, unknown>) => Promise<Record<string, unknown> | undefined>;
}
