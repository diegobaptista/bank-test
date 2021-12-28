import { createConnection } from "typeorm";
import ormConfig from "./orm-config";

export const connection = async () => createConnection(ormConfig as any);
