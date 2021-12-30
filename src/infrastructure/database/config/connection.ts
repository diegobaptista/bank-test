import { createConnection } from "typeorm";
import ormConfig from "./orm-config";

export const connect = async () => {
  return createConnection(ormConfig as any);
};

// createConnection(ormConfig as any)
//   .then(() => {
//     console.log("Connected to the database");
//     import("../../../index");
//   })
//   .catch(() => "oi");
