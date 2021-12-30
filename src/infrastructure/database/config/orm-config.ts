const ormConfig = {
  type: "postgres",
  host: "localhost",
  port: 5454,
  username: "postgres",
  password: "@changeme",
  database: "postgres",
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
