const ormConfig = {
  type: "postgres",
  host: "localhost",
  port: 5454,
  username: "postgres",
  password: "@changeme",
  database: "postgres",
  synchronize: false,
  logging: false,
  entities: ["src/database/entity/**/*.ts"],
  migrations: ["src/database/migration/**/*.ts"],
  cli: {
    entitiesDir: "src/database/entity",
    migrationsDir: "src/database/migration",
  },
};

export default ormConfig;
