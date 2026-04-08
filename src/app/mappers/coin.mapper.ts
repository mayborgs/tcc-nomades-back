// eslint-disable-next-line @typescript-eslint/no-extraneous-class
export class CoinMapper {
  static coinMap(
    coinData: { rates: Record<string, number> } | undefined,
    amount: number,
    from: string,
    to: string,
  ): string | undefined {
    const rate = coinData?.rates[to];
    if (rate === undefined) {
      return undefined;
    }
    const convertedAmount = (amount * rate).toFixed(2);
    return `${amount} ${from} = ${convertedAmount} ${to}`;
  }
}
