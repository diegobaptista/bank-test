import { Request, ResponseToolkit, ServerRoute } from "@hapi/hapi";
import Joi from "joi";
import { favoredAccountService } from "../../domain/favored-account/favored-account.service";
import {
  FavoredAccountCreateUpdateDto,
  favoredAccountCreateValidationSchema,
} from "./favored-account-create.dto";

export const favoredAccountController = (): Array<ServerRoute> => {
  const service = favoredAccountService();

  return [
    {
      method: "GET",
      path: "/favored-account",
      options: {
        tags: ["api"],
      },
      handler: (request: Request, h: ResponseToolkit, err?: Error) => {
        return service.find();
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

        console.log(id);
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
      path: "/favored-account",
      options: {
        tags: ["api"],
      },
      handler: (request: Request, h: ResponseToolkit, err?: Error) => {
        console.log(request.payload);
        return "ok";
      },
    },
  ];
};
