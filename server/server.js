const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const mongoose = require("mongoose");
const session = require("express-session");
const MongoStore = require("connect-mongo");
const credentials = require("./middleware/credentials");
const corsOptions = require("./config/corsOptions");
const path = require("path");

const app = express();
app.use(credentials);
app.use(cors(corsOptions));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(
  session({
    name: process.env.SESSION_NAME,
    secret: process.env.SESSION_SECRET,
    saveUninitialized: false,
    resave: false,
    store: MongoStore.create({
      client: mongoose.connection.getClient(),
      collectionName: "sessions",
      ttl: parseInt(process.env.SESSION_LIFETIME) / 1000,
      touchAfter: 24 * 3600,
    }),
    cookie: {
      sameSite: "lax",
      secure: process.env.HTTPS_ENABLED === "true",
      maxAge: parseInt(process.env.SESSION_LIFETIME),
    },
  })
);
app.use(express.static(path.join(__dirname, "..", "auth-frontend", "dist")));
app.use(morgan("dev"));

app.use("/", require("./routes/root"));

app.use("/authTest", require("./routes/authTest"));

app.all("*", (req, res) => {
  res.sendFile(
    path.join(__dirname, "..", "auth-frontend", "dist", "index.html")
  );
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send(err.message);
});

module.exports = app;
