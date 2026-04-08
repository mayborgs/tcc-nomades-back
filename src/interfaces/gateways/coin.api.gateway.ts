export interface ICoinGateway {
  getCoin: (
    from: string,
    to: string,
  ) => Promise<{ rates: Record<string, number> } | undefined>;
}
