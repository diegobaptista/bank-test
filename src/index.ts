import { Server, Request, ResponseToolkit } from "@hapi/hapi";
import { favoredConstroller } from "./app/favored/favored.controller";
import { connect } from "./database/config/connection";

const init = async () => {
  const server: Server = new Server({
    port: 3000,
    host: "localhost",
  });

  const testRoute = {
    method: "GET",
    path: "/",
    handler: (request: Request, h: ResponseToolkit) => {
      return "Hello World!";
    },
  };

  const connection = await connect();

  server.route(favoredConstroller(connection));

  await server
    .start()
    .then(() => console.log("Server running on %s", server.info.uri));
};

process.on("unhandledRejection", (err) => {
  console.log(err);
  process.exit(1);
});

init();
