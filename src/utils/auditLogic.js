export async function runAudit(url) {
  let score = 100;
  const issues = [];
  const insights = [];

  try {
    // --- FETCH HTML ---
    const response = await fetch(`https://corsproxy.io/?${encodeURIComponent(url)}`);
    const html = await response.text();

    // --- VALIDATION ---
    if (!html || html.length < 300) {
      throw new Error("Invalid or empty HTML response");
    }

    const parser = new DOMParser();
    const doc = parser.parseFromString(html, "text/html");

    // --- TITLE ---
    const title = doc.querySelector("title")?.innerText?.trim() || "";
    if (title.length < 10) {
      score -= 10;
      issues.push("Weak or missing title tag");
    }

    // --- HEADINGS ---
    const h1Tags = doc.querySelectorAll("h1");
    if (h1Tags.length === 0) {
      score -= 15;
      issues.push("No H1 heading (AI struggles to identify topic)");
    }

    // --- CONTENT ---
    const bodyText = doc.body?.innerText?.trim() || "";
    const wordCount = bodyText.split(/\s+/).filter(Boolean).length;

    if (wordCount < 300) {
      score -= 15;
      issues.push("Thin content (low context for AI systems)");
    }

    // --- FAQ SIGNAL ---
    if (!bodyText.toLowerCase().includes("faq")) {
      score -= 10;
      issues.push("No FAQ-style content (limits AI extraction)");
    }

    // --- STRUCTURED DATA ---
    const hasSchema = html.includes("application/ld+json");
    if (!hasSchema) {
      score -= 20;
      issues.push("Missing structured data (AI can't easily interpret content)");
    }

    // --- HTTPS ---
    if (!url.startsWith("https")) {
      score -= 5;
      issues.push("Not using HTTPS");
    }

    // --- SMALL VARIATION (avoid identical scores) ---
    score += url.length % 5;

    // --- BOUNDS ---
    score = Math.max(0, Math.min(100, score));

    // --- INSIGHTS ---
    insights.push(
      hasSchema
        ? "Structured data improves AI understanding"
        : "AI must infer structure without schema"
    );

    insights.push(
      wordCount > 800
        ? "Content depth supports LLM summarization"
        : "Content may be too shallow for strong AI answers"
    );

    insights.push(
      h1Tags.length > 0
        ? "Clear headings help AI identify topics"
        : "Missing headings reduce clarity"
    );

    // --- RETURN ---
    return {
      score,
      issues,
      insights,
      metadata: {
        title,
        wordCount,
        hasSchema,
        h1Count: h1Tags.length,
      },
    };
  } catch (error) {
    return {
      score: 0,
      issues: ["Failed to analyze site", error.message],
      insights: [],
      metadata: {},
    };
  }
}