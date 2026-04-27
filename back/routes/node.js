const express = require("express");
const slowFunction = require("../utils/slowFunction");

const router = express.Router();

// cache en memoria simple
const cache = {};

// sin cache
router.get("/data", async (req, res) => {
  const result = await slowFunction();

  res.json({
    source: "node-server",
    ...result,
  });
});

// con cache
router.get("/data-memory", async (req, res) => {
  const key = "data";

  if (cache[key]) {
    return res.json({
      source: "node-memory-cache",
      ...cache[key],
    });
  }

  const result = await slowFunction();
  cache[key] = result;

  res.json({
    source: "node-server",
    ...result,
  });
});

module.exports = router;
