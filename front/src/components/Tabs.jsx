// src/components/Tabs.jsx
export default function Tabs({ tabs, active, onChange }) {
  return (
    <div>
      <div style={{ display: "flex", gap: 10 }}>
        {tabs.map((t, i) => (
          <button
            key={i}
            onClick={() => onChange(i)}
            style={{
              fontWeight: active === i ? "bold" : "normal",
            }}
          >
            {t.label}
          </button>
        ))}
      </div>

      <div style={{ marginTop: 20 }}>{tabs[active].content}</div>
    </div>
  );
}
