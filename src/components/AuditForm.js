import { useState } from "react";

function AuditForm({ onAudit }) {
  const [url, setUrl] = useState("");

  return (
    <div>
     <input
  type="text"
  placeholder="Enter website URL"
  value={url}
  onChange={(e) => setUrl(e.target.value)}
  style={{
    padding: "10px",
    width: "70%",
    border: "1px solid #ccc",
    borderRadius: "6px"
  }}
/>

<button
  onClick={() => onAudit(url)}
  style={{
    padding: "10px 16px",
    marginLeft: "10px",
    backgroundColor: "#4CAF50",
    color: "white",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer"
  }}
>
  Audit
</button>
    </div>
  );
}

export default AuditForm;