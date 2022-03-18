const connections = [
  {
    name: "default",
    type: "postgres",
    host: "postgresmarket",
    port: "5432",
    database: "market",
    username: process.env.DB_USER,
    password: process.env.PASSWORD,
    entities: ["./src/entities/**/*.ts"],
    migrations: ["./src/database/migrations/*.ts"],
    cli: {
      migrationsDir: "./src/database/migrations",
    },
    logging: true,
  },
  {
    name: "local",
    type: "postgres",
    host: "localhost",
    port: "5431",
    database: "market",
    username: process.env.DB_USER,
    password: process.env.PASSWORD,
    entities: ["./src/entities/**/*.ts"],
    migrations: ["./src/database/migrations/*.ts"],
    cli: {
      migrationsDir: "./src/database/migrations",
    },
    logging: true,
  },
];

const prodEnv = {
  type: "postgres",
  url: process.env.DATABASE_URL,
  entities: ["./dist/src/entities/**/*.js"],
  migrations: ["./dist/src/database/migrations/*.js"],
  clis: {
    migrationsDir: "./dist/src/database/migrations",
  },
  synchronize: false,
  ssl:
    process.env.NODE_ENV === "production"
      ? { rejectUnauthorized: false }
      : false,
};

const testEnv = {
  type: "sqlite",
  database: ":memory:",
  entities: ["./src/entities/**/*.ts"],
  synchronize: true,
};

let exportModule = undefined;
if (process.env.NODE_ENV === "production") {
  exportModule = prodEnv;
} else if (process.env.NODE_ENV === "test") {
  exportModule = testEnv;
} else {
  exportModule = connections;
}

module.exports = exportModule;
