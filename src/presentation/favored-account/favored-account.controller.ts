import { Request, ResponseToolkit, ServerRoute } from "@hapi/hapi";
import Joi from "joi";
import { favoredAccountService } from "../../domain/favored-account/favored-account.service";
import {
  FavoredAccountCreateDto,
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
      handler: (request: Request, h: ResponseToolkit, err?: Error) => {
        const payload = <FavoredAccountCreateDto>request.payload;
        service.create(payload);
        return "ok";
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
      path: "/favored-account",
      handler: (request: Request, h: ResponseToolkit, err?: Error) => {
        console.log(request.payload);
        return "ok";
      },
      options: {
        tags: ["api"],
        validate: {
          payload: Joi.object({
            name: Joi.string().required(),
            document: Joi.string().required(),
            email: Joi.string().required(),
            documentType: Joi.string(),
          }),
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
