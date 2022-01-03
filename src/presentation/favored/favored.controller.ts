import { Request, ResponseToolkit, ServerRoute } from "@hapi/hapi";
import { FavoredService } from "../../domain/favored/favored.service";

export const favoredController = (): Array<ServerRoute> => {
  const service = new FavoredService();

  return [
    {
      method: "GET",
      path: "/favored",
      options: {
        tags: ["api"],
      },
      handler: (request: Request, h: ResponseToolkit, err?: Error) => {
        return service.find();
      },
    },
  ];
};
