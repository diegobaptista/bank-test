import { createConnection } from "typeorm";
import { FavoredEntity } from "../entity/favored.entity";
import ormConfig from "./orm-config";

export const connect = async () => {
  return createConnection(ormConfig as any);
};
