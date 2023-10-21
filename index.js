require("dotenv").config();
const fs = require("fs");
const connectDB = require("./config/dbConn");
const https = require("https");
const PORT = process.env.PORT || 3000;
(async () => {
  try {
    await connectDB();
    console.log("MongoDB connected");
    const app = require("./server");
    let server = app;
    if (process.env.HTTPS_ENABLED == "true") {
      const options = {
        key: fs.readFileSync(process.env.KEY_FILE),
        cert: fs.readFileSync(process.env.CERT_FILE),
      };
      server = https.createServer(options, app);
    }
    server.listen(PORT, () => console.log(`Listening on port ${PORT}`));
  } catch (err) {
    console.log(err);
  }
})();
