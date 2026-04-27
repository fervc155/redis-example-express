// src/components/EndpointTester.jsx
import { useState } from "react";
import { fetchEndpoint } from "../api/client";

export default function EndpointTester({ label, path, resultParser = null }) {
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [resultData, setResultData] = useState(null);
  const run = async () => {
    setLoading(true);
    const res = await fetchEndpoint(path);
    setResult(res);
    setLoading(false);

    setResultData(
      resultParser ? resultParser(res) : JSON.stringify(result.data, null, 2),
    );
  };

  return (
    <div style={{ border: "1px solid #ccc", padding: 12, marginBottom: 10 }}>
      <h3>{label}</h3>

      <button onClick={run} disabled={loading}>
        {loading ? "Loading..." : "Fetch"}
      </button>

      {result && (
        <>
          <p>⏱ {result.time} ms</p>
          <pre>{resultData}</pre>
        </>
      )}
    </div>
  );
}
