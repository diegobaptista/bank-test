import { Request, ResponseToolkit, ServerRoute } from "@hapi/hapi";
import { bankService } from "../../domain/bank/bank.service";

export const bankConstroller = (): Array<ServerRoute> => {
  const service = bankService();

  return [
    {
      method: "GET",
      path: "/bank",
      options: {
        tags: ["api"],
      },
      handler: (request: Request, h: ResponseToolkit, err?: Error) => {
        return service.find();
      },
    },
  ];
};
