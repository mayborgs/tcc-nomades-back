import { type AWS } from "@serverless/typescript";

const lambda: NonNullable<AWS["functions"]>[string] = {
  handler: "src/app/handlers/getInformation.default",
  // reservedConcurrency: 1,
  timeout: 10,
  tracing: "Active",
  events: [
    {
      http: {
        method: "get",
        path: "/tcc-nomades/informations",
      },
    },
  ],
  environment: {
    // PLAYER_TABLE_NAME: {
    //   Ref: "PlayerTable",
    // },
    RIOT_API_KEY: "RGAPI-d9b42c50-5d30-4609-a1ef-ef2e18bc4d47",
    RAPID_API_KEY: "f1a598d425msh40cb25dc3a3c690p1c5779jsn666f529a56ba",
    RAPID_API_HOST: "booking-com15.p.rapidapi.com",
    // PROCESS_QUEUE_URL: {
    //   Ref: "ProcessQueue",
    // },
  },
  // @ts-expect-error using plugin serverless-iam-roles-per-function
  iamRoleStatements: [
    // DynamoDB player table
    // {
    //   Effect: "Allow",
    //   Action: ["dynamodb:Query", "dynamodb:PutItem", "dynamodb:GetItem"],
    //   Resource: [
    //     {
    //       "Fn::GetAtt": ["PlayerTable", "Arn"],
    //     },
    //     {
    //       "Fn::Join": [
    //         "",
    //         [
    //           {
    //             "Fn::GetAtt": ["PlayerTable", "Arn"],
    //           },
    //           "/*",
    //         ],
    //       ],
    //     },
    //   ],
    // },
    // X-Ray
    {
      Effect: "Allow",
      Action: [
        "xray:PutTraceSegments",
        "xray:PutTelemetryRecords",
        "xray:GetSamplingRules",
        "xray:GetSamplingTargets",
        "xray:GetSamplingStatisticSummaries",
      ],
      Resource: "*",
    },
  ],
};

export default lambda;
