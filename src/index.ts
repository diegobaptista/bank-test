import { Server } from "@hapi/hapi";

import Inert from "@hapi/inert";
import Vision from "@hapi/vision";
import Jwt from "@hapi/jwt";
import { connect } from "./infrastructure/database/config/connection";
import Swagger from "./infrastructure/swagger";
import { controllers } from "./presentation/routes";
import dotenv from "dotenv";
import QueryString from "qs";
dotenv.config();

const init = async () => {
  const server: Server = new Server({
    port: process.env.PORT || 3000,
    query: {
      parser: (query) => QueryString.parse(query),
    },
  });

  await connect();

  const plugins: any[] = [Jwt, Inert, Vision, Swagger];

  await server.register(plugins);

  try {
    await server.start();
    console.log("Server running at:", server.info.uri);
  } catch (err) {
    console.log(err);
  }

  const routes = controllers.reduce((accRoutes, controller) => {
    accRoutes.push(...controller());
    return accRoutes;
  }, []);

  server.auth.strategy("jwt-strategy", "jwt", {
    keys: process.env.JWT_SECRET,
    verify: {
      aud: process.env.JWT_AUDIT,
      iss: process.env.JWT_ISSUER,
      sub: false,
      nbf: true,
      exp: true,
      maxAgeSec: process.env.JWT_VALID_IN_SECONDS, // 4 hours
      timeSkewSec: 15,
    },
    validate: (artifacts, request, h) => {
      return {
        isValid: true,
        credentials: { user: artifacts.decoded.payload.sub },
      };
    },
  });

  server.route(routes);
  server.auth.default("jwt-strategy");
};

process.on("unhandledRejection", (err) => {
  console.log(err);
  process.exit(1);
});

init();
