import { Server, Request, ResponseToolkit, Plugin } from "@hapi/hapi";

import Inert from "@hapi/inert";
import Vision from "@hapi/vision";
import { connect } from "./infrastructure/database/config/connection";
import swagger from "./infrastructure/swagger";
import { constrollers } from "./presentation/routes";

const init = async () => {
  const server: Server = new Server({
    port: 3000,
    host: "localhost",
  });

  await connect();

  const plugins: any[] = [Inert, Vision, swagger];

  await server.register(plugins);

  try {
    await server.start();
    console.log("Server running at:", server.info.uri);
  } catch (err) {
    console.log(err);
  }

  const routes = constrollers.reduce((accRoutes, controller) => {
    accRoutes.push(...controller());
    return accRoutes;
  }, []);

  server.route(routes);
};

process.on("unhandledRejection", (err) => {
  console.log(err);
  process.exit(1);
});

init();
