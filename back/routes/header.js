const express = require("express");
const crypto = require("crypto");
const slowFunction = require("../utils/slowFunction");

const router = express.Router();

// sin cache
router.get("/no-cache", async (req, res) => {
  const result = await slowFunction();

  res.json({
    source: "http-no-cache",
    ...result,
  });
});

// cache-control público
router.get("/cache", async (req, res) => {
  const result = await slowFunction();

  res.setHeader("Cache-Control", "public, max-age=10");

  res.json({
    source: "http-cache",
    ...result,
  });
});

// cache privado
router.get("/cache-private", async (req, res) => {
  const result = await slowFunction();

  res.setHeader("Cache-Control", "private, max-age=10");

  res.json({
    source: "http-cache-private",
    ...result,
  });
});

// etag
router.get("/etag", async (req, res) => {
  const result = await slowFunction(2, false);

  const etag = crypto
    .createHash("md5")
    .update(JSON.stringify(result))
    .digest("hex");

  res.setHeader("ETag", etag);
  res.setHeader("Cache-Control", "public, max-age=0");

  if (req.headers["if-none-match"] === etag) {
    return res.status(304).end();
  }

  res.json({
    source: "http-etag",
    ...result,
  });
});

module.exports = router;
