// src/App.jsx
import { useState } from "react";
import Tabs from "./components/Tabs";
import EndpointTester from "./components/EndpointTester";

export default function App() {
  const [activeTab, setActiveTab] = useState(0);

  const showLength = (res) => {
    let { data, source } = res.data;
    return JSON.stringify(
      {
        source,
        length: Object.keys(data).length,
      },
      null,
      2,
    );
  };

  const httpTabs = [
    {
      label: "HTTP Cache",
      content: (
        <div key="http-cache">
          <EndpointTester label="No cache" path="/header/no-cache" />
          <EndpointTester label="Cache-Control public" path="/header/cache" />
          <EndpointTester
            label="Cache-Control private"
            path="/header/cache-private"
          />
          <EndpointTester label="ETag" path="/header/etag" />
        </div>
      ),
    },
    {
      label: "Node Memory",
      content: (
        <div key="node-memory">
          <EndpointTester label="Sin cache" path="/node/data" />
          <EndpointTester label="Memory cache" path="/node/data-memory" />
        </div>
      ),
    },
    {
      label: "Redis",
      content: (
        <div key="redis">
          <EndpointTester label="Sin cache" path="/redis/data" />
          <EndpointTester label="Redis cache" path="/redis/data-cache" />
          <EndpointTester
            label="DB sin cache"
            path="/redis/list"
            resultParser={showLength}
          />
          <EndpointTester
            label="DB cache"
            path="/redis/list-cache"
            resultParser={showLength}
          />
        </div>
      ),
    },
  ];

  return (
    <div style={{ padding: 20 }}>
      <h1>Cache Comparison Lab</h1>

      <Tabs tabs={httpTabs} active={activeTab} onChange={setActiveTab} />
    </div>
  );
}
