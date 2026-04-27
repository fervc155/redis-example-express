// src/api/client.js
const BASE_URL = "http://localhost:3000";

const etagStore = {};

export async function fetchEndpoint(path) {
  const start = performance.now();

  const headers = {};

  // 🔥 solo aplica para etag endpoint
  if (path.includes("/etag") && etagStore[path]) {
    headers["If-None-Match"] = etagStore[path];
  }

  const res = await fetch(`${BASE_URL}${path}`, { headers });

  const end = performance.now();

  let data = null;

  // 304 no content
  if (res.status !== 304) {
    data = await res.json();
  }

  // guardar etag si viene
  const etag = res.headers.get("etag");
  if (etag) {
    etagStore[path] = etag;
  }

  return {
    data: data || { cached: true, status: 304 },
    time: Math.round(end - start),
    status: res.status,
  };
}
