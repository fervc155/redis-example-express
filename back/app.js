const express = require("express");

const headerRoutes = require("./routes/header");
const nodeRoutes = require("./routes/node");
const redisRoutes = require("./routes/redis");

const app = express();
const cors = require("cors");
app.use(cors());

app.use("/header", headerRoutes);
app.use("/node", nodeRoutes);
app.use("/redis", redisRoutes);

app.get("/", (req, res) => {
  res.send("API running with HTTP + Memory + Redis cache");
});

app.listen(3000, () => {
  console.log("Server running on http://localhost:3000");
});
