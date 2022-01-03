import * as HapiSwagger from "hapi-swagger";

import * as Package from "../../package.json";

const swaggerOptions: HapiSwagger.RegisterOptions = {
  swagger: "3.0",
  info: {
    title: "Bank Teste Swagger",
    version: Package.version,
  },
  schemes: ["http", "https"],
  securityDefinitions: {
    jwt: {
      type: "apiKey",
      name: "Authorization",
      in: "header",
    },
  },
  security: [{ jwt: [] }],
};

export default {
  plugin: HapiSwagger,
  options: swaggerOptions,
};
