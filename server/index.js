const express = require("express");
const morgan = require("morgan");
const helmet = require("helmet");
const cors = require("cors");

const app = express();

// Middleware

app.use(morgan("dev"));
app.use(helmet());
app.use(cors());
app.use(express.json());

const vendors = require("./api/vendors");

app.use("/api/vendors", vendors);

if (process.env.NODE_ENV === "production") {
  // static folder
  app.use(express.static(__dirname + "/public/"));

  // handle SPA
  app.get(/.*/, (req, res) => res.sendfile(__dirname + "/public/index.html"));
}

app.use((req, res, next) => {
  res.status(404);
  const error = new Error(`🔍 - Not Found - ${req.originalUrl}`);
  next(error);
});

app.use((err, req, res, next) => {
  const statusCode = res.statusCode !== 200 ? res.statusCode : 500;
  res.status(statusCode);
  res.json({
    message: err.message,
    stack: process.env.NODE_ENV === "production" ? "🥞" : err.stack,
  });
});

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server started http://localhost:${port}`));
