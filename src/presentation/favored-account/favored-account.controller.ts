import { Request, ResponseToolkit, ServerRoute } from "@hapi/hapi";
import Joi from "joi";
import { FavoredAccountService } from "../../domain/favored-account/favored-account.service";
import {
  FavoredAccountCreateUpdateDto,
  favoredAccountCreateValidationSchema,
} from "./favored-account-create.dto";
import {
  FavoredAccountFilterDto,
  favoredFilterSchema,
} from "./favored-account-filter.dto";

export const favoredAccountController = (): Array<ServerRoute> => {
  const service = new FavoredAccountService();

  return [
    {
      method: "GET",
      path: "/favored-account",
      options: {
        tags: ["api"],
        validate: {
          query: favoredFilterSchema,
          failAction(request: Request, h: ResponseToolkit, err?: Error) {
            throw err;
          },
        },
      },

      handler: (request: Request, h: ResponseToolkit, err?: Error) => {
        const filterOrder = FavoredAccountFilterDto.fromQuery(request.query);
        return service.find(filterOrder);
      },
    },
    {
      method: "POST",
      path: "/favored-account",
      handler: async (request: Request, h: ResponseToolkit, err?: Error) => {
        const payload = <FavoredAccountCreateUpdateDto>request.payload;
        try {
          await service.create(payload);
        } catch (err) {
          return h.response({ error: err.message }).code(406);
        }
        return h.response().code(201);
      },
      options: {
        tags: ["api"],
        validate: {
          payload: favoredAccountCreateValidationSchema,
          failAction(request: Request, h: ResponseToolkit, err?: Error) {
            throw err;
          },
        },
      },
    },
    {
      method: "PUT",
      path: "/favored-account/{id}",
      handler: async (request: Request, h: ResponseToolkit, err?: Error) => {
        const payload = <FavoredAccountCreateUpdateDto>request.payload;
        const id = <string>request.params.id;

        try {
          await service.update(payload, id);
        } catch (err) {
          return h.response({ error: err.message }).code(406);
        }
        return h.response().code(201);
      },
      options: {
        tags: ["api"],
        validate: {
          params: Joi.object({
            id: Joi.string().required(),
          }),
          payload: favoredAccountCreateValidationSchema,
          failAction(request: Request, h: ResponseToolkit, err?: Error) {
            throw err;
          },
        },
      },
    },
    {
      method: "DELETE",
      path: "/favored-account/{id}",
      options: {
        tags: ["api"],
      },
      handler: (request: Request, h: ResponseToolkit, err?: Error) => {
        const id = <string>request.params.id;
        service.delete(id);

        return h.response().code(201);
      },
    },
  ];
};
