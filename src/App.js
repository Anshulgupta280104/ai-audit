import { useState } from "react";
import AuditForm from "./components/AuditForm";
import AuditResult from "./components/AuditResult";
import { runAudit } from "./utils/auditLogic";

<div style={{
  padding: "40px",
  fontFamily: "Arial",
  maxWidth: "600px",
  margin: "auto"
}}></div>



function App() {
  const [result, setResult] = useState(null);

  const handleAudit = async(url) => {
   const data = await runAudit(url);
    setResult(data);
  };

  return (
    <div>
      <h1>AI Readiness Audit</h1>

      <AuditForm onAudit={handleAudit} />
      <AuditResult result={result} />
    </div>
  );
}

export default App;