const app = require("./app");

const dotenv = require("dotenv");
const connectDatabase = require("./database");

//config
dotenv.config({ path: "backend/config/config.env" });

//error handleed for uncaught error
process.on("uncaughtException", (err) => {
  console.log(`Error: ${err.message}`);
  console.log(`shutting down the server due to uncaught error`);
  process.exit(1);
});

// connecting to database
connectDatabase();

const server = app.listen(process.env.PORT, () => {
  console.log(`server is workig on http://localhost:${process.env.PORT}`);
});
//unhandled Promise Rejection

process.on("unhandledRejection", (err) => {
  console.log(`Error: ${err.message}`);
  console.log(`shutting down the server due to unhandle rejection`);

  server.close(() => {
    process.exit(1);
  });
});
