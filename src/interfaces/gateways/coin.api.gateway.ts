export interface ICoinGateway {
  getCoin: (
    from: string,
    to: string,
    amount: number,
  ) => Promise<string | undefined>;
}
