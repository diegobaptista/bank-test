import dotenv from "dotenv";
dotenv.config();

const ormConfig = {
  type: "postgres",
  host: process.env.DATABASE_HOST,
  port: process.env.DATABASE_PORT,
  username: process.env.DATABASE_USERNAME,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE_NAME,
  synchronize: false,
  logging: false,
  entities: ["src/infrastructure/database/entity/**/*.ts"],
  migrations: ["src/infrastructure/database/migration/**/*.ts"],
  cli: {
    entitiesDir: "src/infrastructure/database/entity",
    migrationsDir: "src/infrastructure/database/migration",
  },
};

export default ormConfig;