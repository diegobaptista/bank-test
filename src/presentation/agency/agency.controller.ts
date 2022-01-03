import { Request, ResponseToolkit, ServerRoute } from "@hapi/hapi";
import { AgencyService } from "../../domain/agency/agency.service";

export const agencyController = (): Array<ServerRoute> => {
  const service = new AgencyService();

  return [
    {
      method: "GET",
      path: "/agency",
      options: {
        tags: ["api"],
      },
      handler: (request: Request, h: ResponseToolkit, err?: Error) => {
        return service.find();
      },
    },
  ];
};
