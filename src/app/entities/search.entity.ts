interface ISearch {
  flights: Record<string, unknown>;
  events: Record<string, unknown>;
  coin: Record<string, unknown>;
}

export class Search {
  readonly #props: ISearch;

  constructor(props: {
    flights: Record<string, unknown>;
    events: Record<string, unknown>;
    coin: Record<string, unknown>;
  }) {
    this.#props = props;
  }

  toJSON(): {
    flights: Record<string, unknown>;
    events: Record<string, unknown>;
    coin: Record<string, unknown>;
  } {
    return {
      flights: this.#props.flights,
      events: this.#props.events,
      coin: this.#props.coin,
    };
  }
}
