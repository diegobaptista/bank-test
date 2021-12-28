import { Request, ResponseToolkit, ServerRoute } from "hapi";
import Joi from "joi";
import { Connection, Repository } from "typeorm";
import {
  DocumentType,
  FavoredEntity,
} from "../../database/entity/favored.entity";
import { FavoredCreateDto } from "./favored-create.dto";

export const favoredConstroller = (
  connection: Connection
): Array<ServerRoute> => {
  const favoredRepository: Repository<FavoredEntity> =
    connection.getRepository(FavoredEntity);

  return [
    {
      method: "GET",
      path: "/favored",
      handler: (request: Request, h: ResponseToolkit, err?: Error) => {
        console.log("oi");
        return favoredRepository.find();
      },
    },
    {
      method: "POST",
      path: "/favored",
      handler: (request: Request, h: ResponseToolkit, err?: Error) => {
        const payload = <FavoredCreateDto>request.payload;
        console.log(payload);
        return "ok";
      },
      options: {
        validate: {
          payload: Joi.object({
            name: Joi.string().required(),
            document: Joi.string().required(),
            email: Joi.string().required(),
            documentType: Joi.string().valid(...Object.values(DocumentType)),
          }),
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
        validate: {
          payload: Joi.object({
            name: Joi.string().required(),
            document: Joi.string().required(),
            email: Joi.string().required(),
            documentType: Joi.string().valid(...Object.values(DocumentType)),
          }),
        },
      },
    },
    {
      method: "DELETE",
      path: "/favored",
      handler: (request: Request, h: ResponseToolkit, err?: Error) => {
        console.log(request.payload);
        return "ok";
      },
    },
  ];
};
