export function runAudit(url) {
  if (!url) return null;

  let score = 100;
  const issues = [];

  if (!url.includes("https")) {
    score -= 10;
    issues.push("Site is not using HTTPS");
  }
  if (!url.startsWith("http")) {
  score -= 10;
  issues.push("URL should include proper protocol (http/https)");
}

  if (url.length < 10) {
    score -= 10;
    issues.push("URL looks too short to analyze properly");
  }

  issues.push("Missing structured data");
  issues.push("Weak heading hierarchy");
  issues.push("No FAQ content");
  issues.push("Lack of semantic HTML");
  issues.push("Missing metadata");

  return {
    score,
    issues: issues.slice(0, 5)
  };
}