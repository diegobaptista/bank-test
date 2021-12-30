import { Request, ResponseToolkit, ServerRoute } from "@hapi/hapi";
import Joi from "joi";
import { Connection, Repository } from "typeorm";
import { favoredService } from "../../domain/favored/favored.service";
import { FavoredEntity } from "../../infrastructure/database/entity/favored.entity";
import {
  FavoredCreateDto,
  favoredCreateValidationSchema,
} from "./favored-create.dto";

export const favoredConstroller = (): Array<ServerRoute> => {
  const service = favoredService();

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
    {
      method: "POST",
      path: "/favored",
      handler: (request: Request, h: ResponseToolkit, err?: Error) => {
        const payload = <FavoredCreateDto>request.payload;
        service.create(payload);
        return "ok";
      },
      options: {
        tags: ["api"],
        validate: {
          payload: favoredCreateValidationSchema,
        },
      },
    },
    {
      method: "PUT",
      path: "/favored",
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
      path: "/favored",
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
