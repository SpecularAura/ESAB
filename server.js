const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const mongoose = require("mongoose");
const session = require("express-session");
const MongoStore = require("connect-mongo");
const credentials = require("./middleware/credentials");
const corsOptions = require("./config/corsOptions");

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
app.use(morgan("dev"));

app.use("/", require("./routes/root"));
app.use("/register", require("./routes/register"));
app.use("/auth", require("./routes/auth"));
app.use("/logout", require("./routes/logout"));

app.use("/authTest", require("./routes/authTest"));

app.all("*", (req, res) => {
  res.status(404);
  if (req.accepts("json")) {
    res.sendFile(path.join(__dirname, "views", "404.html"));
  } else if (req.accepts("html")) {
    res.json({ error: "404 Not Found" });
  } else {
    res.type("txt").send("404 Not Found");
  }
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send(err.message);
});

module.exports = app;
