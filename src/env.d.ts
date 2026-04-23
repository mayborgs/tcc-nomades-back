declare global {
  declare namespace NodeJS {
    interface ProcessEnv {
      DYNAMODB_TABLE_NAME: string;
      RAPID_API_KEY: string;
      RAPID_API_HOST: string;
      RIOT_API_KEY: string;
      RAPID_API_FLIGHTS_HOST: string;
      IS_LOCAL: string;
    }
  }
}

export {};
