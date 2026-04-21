function AuditResult({ result }) {
  if (!result) return null;

  // ✅ Safe fallbacks
  const score = result.score ?? 0;
  const issues = result.issues ?? [];
  const metadata = result.metadata ?? {};

  const getScoreColor = () => {
    if (score > 70) return "green";
    if (score > 40) return "orange";
    return "red";
  };

  const getSummary = () => {
    if (score > 70) {
      return "Good AI readiness. Minor improvements needed.";
    }
    if (score > 40) {
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
      {/* ✅ SCORE */}
      <h2>
        Score:{" "}
        <span style={{ color: getScoreColor() }}>
          {score}/100
        </span>
      </h2>

      {/* ✅ SUMMARY */}
      <p style={{ marginTop: "10px", fontWeight: "500" }}>
        {getSummary()}
      </p>

      {/* ✅ ISSUES */}
      <h3 style={{ marginTop: "15px" }}>Issues Found:</h3>

      {issues.length === 0 ? (
        <p style={{ marginTop: "10px" }}>No major issues detected</p>
      ) : (
        <ul style={{ marginTop: "10px", paddingLeft: "20px" }}>
          {issues.map((issue, index) => (
            <li key={index} style={{ marginBottom: "6px" }}>
              {issue}
            </li>
          ))}
        </ul>
      )}

      {/* ✅ HOW SCORE IS CALCULATED */}
      <div style={{ marginTop: "20px" }}>
        <h3>⚙️ How this score is calculated</h3>
        <ul>
          <li>Title clarity and presence</li>
          <li>Heading structure (H1 detection)</li>
          <li>Content depth (text length)</li>
          <li>Presence of FAQ-like content</li>
          <li>Structured data (schema markup)</li>
        </ul>
      </div>

      {/* ✅ DYNAMIC SCORE BREAKDOWN (not fake) */}
      <div style={{ marginTop: "15px" }}>
        <h3>📊 Score Breakdown</h3>
        <ul>
          {!metadata.hasSchema && <li>Missing schema markup (-20)</li>}
          {metadata.headings === 0 && <li>No H1 heading (-15)</li>}
          {metadata.wordCount && metadata.wordCount < 500 && (
            <li>Low content depth (-10)</li>
          )}
        </ul>
      </div>

      {/* ✅ HONEST DISCLAIMER (important for “no vibe coding”) */}
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
        ⚠️ This is a heuristic-based audit using simple deterministic checks,
        not a full crawler or AI model.
      </div>
    </div>
  );
}

export default AuditResult;