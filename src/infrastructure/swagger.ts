import * as HapiSwagger from "hapi-swagger";

import * as Package from "../../package.json";

const swaggerOptions: HapiSwagger.RegisterOptions = {
  info: {
    title: "Some title",
    version: Package.version,
  },
  schemes: ["http", "https"],
};

export default {
  plugin: HapiSwagger,
  options: swaggerOptions,
};
