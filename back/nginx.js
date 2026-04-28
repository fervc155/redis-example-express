const express = require("express");

const app = express();
const cors = require("cors");
app.use(cors());
// función lenta simulada
const slowFunction = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        timestamp: Date.now(),
        random: Math.random(),
      });
    }, 1000);
  });
};

// endpoint SIN cache (Nginx hará el cache)
app.get("/data", async (req, res) => {
  const result = await slowFunction();

  res.json({
    source: "nginx-origin-server",
    ...result,
  });
});

app.listen(4000, () => {
  console.log("Nginx test API running on http://localhost:4000");
});
