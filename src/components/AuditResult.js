function AuditResult({ result }) {
  if (!result) return null;

  const getScoreColor = () => {
    if (result.score > 70) return "green";
    if (result.score > 40) return "orange";
    return "red";
  };

  const getSummary = () => {
  if (result.score > 70) {
    return "Good AI readiness. Minor improvements needed.";
  }
  if (result.score > 40) {
    return "Moderate readiness. Several structural improvements required.";
  }
  return "Low AI readiness. Website may not be easily understood by AI systems.";
};

 return (
  <div
    style={{
      marginTop: "20px",
      padding: "20px",
      border: "1px solid #eee",
      borderRadius: "8px",
      backgroundColor: "#fafafa"
    }}
  >
    <h2>
      Score:{" "}
      <span style={{ color: getScoreColor() }}>
        {result.score}/100
      </span>
    </h2>

    {/* ✅ ADD SUMMARY (optional but strong improvement) */}
    <p style={{ marginTop: "10px", fontWeight: "500" }}>
      {getSummary()}
    </p>

    <h3 style={{ marginTop: "10px" }}>Issues Found:</h3>

    <ul style={{ marginTop: "10px", paddingLeft: "20px" }}>
      {result.issues.map((issue, index) => (
        <li key={index} style={{ marginBottom: "6px" }}>
          {issue}
        </li>
      ))}
    </ul>

    {/* ✅ ADD THIS (IMPORTANT PART) */}
    <div
      style={{
        marginTop: "20px",
        padding: "12px",
        backgroundColor: "#fff3cd",
        borderLeft: "4px solid #ffc107",
        borderRadius: "6px",
        fontSize: "14px",
        color: "#856404"
      }}
    >
      ⚠️ This is a simulated AI readiness audit based on basic heuristics, not a full real-time analysis.
    </div>

  </div>
);
}

export default AuditResult;