import { createConnection } from "typeorm";
import ormConfig from "./orm-config";

export const connect = async () => {
  return createConnection(ormConfig as any);
};
