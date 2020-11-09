const express = require("express");
const dotenv = require("dotenv");
const morgan = require("morgan");
const connectDB = require("./config/db");

//load env vars
dotenv.config({ path: "./config/config.env" });

//Connect MongoDB
connectDB();

//Route files
const bootcamps = require("./routes/bootcamps");

const app = express();

//Body Parser
app.use(express.json());

//Dev logging middleware MORGAN
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

//Mount/Load routers
app.use("/api/v1/bootcamps", bootcamps);

const PORT = process.env.PORT || 5000;

const server = app.listen(
  PORT,
  console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`)
);

//Handle unhandled promise rejections
process.on("unhandledRejection", (err, promise) => {
  console.log(`Error: ${err.message}`);
  //close server and exit
  server.close(() => {
    process.exit(1);
  });
});
