import { Request, ResponseToolkit, ServerRoute } from "@hapi/hapi";
import { AuthService } from "../../domain/auth/auth.service";

import { LoginDto, loginValidationSchema } from "./login.dto";

export const authController = (): Array<ServerRoute> => {
  const service = new AuthService();

  return [
    {
      method: "POST",
      path: "/auth",
      handler: (request: Request, h: ResponseToolkit, err?: Error) => {
        const payload = <LoginDto>request.payload;
        const isValidUser = service.validateUser(payload);

        if (!isValidUser)
          return h.response({ error: "Credentials didnt match" }).code(401);

        const token = service.generateJwtToken();

        return { token };
      },
      options: {
        auth: false,
        tags: ["api"],
        validate: {
          payload: loginValidationSchema,
          failAction(request: Request, h: ResponseToolkit, err?: Error) {
            throw err;
          },
        },
      },
    },
  ];
};
