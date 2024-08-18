import { z } from "zod";
import { GetSearchInformationUseCase } from "../useCases/getInformation.useCase";
import { SkyScannerGateway } from "../gateways/skyscanner.api.gateway";

const get = new GetSearchInformationUseCase(new SkyScannerGateway());

const inputSchema = z.object({
  gameName: z.string(),
  tagLine: z.string(),
});

/**
 * @command sls invoke local -f test
 */
export default async function (
  event: z.infer<typeof inputSchema>,
): Promise<void> {
  const { gameName, tagLine } = inputSchema.parse(event);

  await get.execute({
    x: {
      gameName,
      tagLine,
    },
  });
}
