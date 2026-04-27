const express = require("express");
const Redis = require("ioredis");
const slowFunction = require("../utils/slowFunction");
const db = require("../db");

const router = express.Router();
const redis = new Redis();

/**
 * SIMPLE DATA
 */

// sin cache
router.get("/data", async (req, res) => {
  const result = await slowFunction();

  res.json({
    source: "redis-server",
    ...result,
  });
});

// con cache redis
router.get("/data-cache", async (req, res) => {
  const cacheKey = "data";

  const cached = await redis.get(cacheKey);

  if (cached) {
    return res.json({
      source: "redis-cache",
      ...JSON.parse(cached),
    });
  }

  const result = await slowFunction();

  await redis.set(cacheKey, JSON.stringify(result), "EX", 10);

  res.json({
    source: "redis-server",
    ...result,
  });
});

/**
 * DB EXAMPLE
 */

// función lenta DB
const getProducts = () => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      db.all("SELECT * FROM products", (err, rows) => {
        if (err) reject(err);
        else resolve(rows);
      });
    }, 1000);
  });
};

// sin cache
router.get("/list", async (req, res) => {
  const data = await getProducts();

  res.json({
    source: "db",
    data,
  });
});

// con cache
router.get("/list-cache", async (req, res) => {
  const cacheKey = "products";

  const cached = await redis.get(cacheKey);

  if (cached) {
    return res.json({
      source: "redis-cache",
      data: JSON.parse(cached),
    });
  }

  const data = await getProducts();

  await redis.set(cacheKey, JSON.stringify(data), "EX", 20);

  res.json({
    source: "db",
    data,
  });
});

module.exports = router;
