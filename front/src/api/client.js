const BASE_URL = "http://localhost:3000";

const etagStore = {};

export async function fetchEndpoint(path) {
  const start = performance.now();

  const headers = {};

  // 🔥 Soporta URL completa (para nginx) o path normal
  const url = path.startsWith("http") ? path : `${BASE_URL}${path}`;

  // 🔥 ETag solo para endpoints locales (no nginx)
  if (path.includes("/etag") && !path.startsWith("http") && etagStore[path]) {
    headers["If-None-Match"] = etagStore[path];
  }

  const res = await fetch(url, { headers });

  const end = performance.now();

  let data = null;

  // 304 = no content
  if (res.status !== 304) {
    data = await res.json();
  }

  // guardar etag si viene
  const etag = res.headers.get("etag");
  if (etag && !path.startsWith("http")) {
    etagStore[path] = etag;
  }

  // 🔥 nginx cache header
  const cacheStatus = res.headers.get("X-Cache-Status");

  return {
    data: data || { cached: true, status: 304 },
    time: Math.round(end - start),
    status: res.status,
    cacheStatus,
  };
}
