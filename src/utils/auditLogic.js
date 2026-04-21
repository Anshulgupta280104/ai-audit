export async function runAudit(url) {
  let score = 100;
  const issues = [];
  const insights = [];

  try {
    // Fetch HTML (via proxy if needed)
    const res = await fetch(`https://api.allorigins.win/get?url=${encodeURIComponent(url)}`);
    const data = await res.json();
    const html = data.contents;

    const doc = new DOMParser().parseFromString(html, "text/html");

    // --- TITLE CHECK ---
    const title = doc.querySelector("title")?.innerText || "";
    if (title.length < 10) {
      score -= 10;
      issues.push("Weak or missing title tag");
    }

    // --- HEADINGS CHECK ---
    const h1 = doc.querySelectorAll("h1");
    if (h1.length === 0) {
      score -= 15;
      issues.push("No H1 heading (AI struggles to find page topic)");
    }

    // --- CONTENT LENGTH ---
    const bodyText = doc.body.innerText || "";
    if (bodyText.length < 500) {
      score -= 10;
      issues.push("Thin content (low context for AI models)");
    }

    // --- FAQ DETECTION ---
    if (!bodyText.toLowerCase().includes("faq")) {
      score -= 10;
      issues.push("No FAQ section (reduces AI answer extraction)");
    }

    // --- STRUCTURED DATA ---
    const hasSchema = html.includes("application/ld+json");
    if (!hasSchema) {
      score -= 20;
      issues.push("Missing structured data (schema markup)");
    }

    // --- HTTPS CHECK ---
    if (!url.startsWith("https")) {
      score -= 5;
      issues.push("Not using HTTPS");
    }

    // --- AI INSIGHTS (THIS IS YOUR DIFFERENTIATOR) ---
    insights.push(
      hasSchema
        ? "Structured data detected — improves AI understanding"
        : "No structured data — AI must guess content meaning"
    );

    insights.push(
      bodyText.length > 1000
        ? "Content depth is good for LLM summarization"
        : "Content may be too shallow for reliable AI extraction"
    );

    insights.push(
      h1.length > 0
        ? "Clear heading structure helps AI identify topics"
        : "Lack of headings makes content harder to parse"
    );

    return {
      score: Math.max(score, 0),
      issues,
      insights,
      metadata: {
        title,
        wordCount: bodyText.split(" ").length,
        hasSchema,
        headings: h1.length,
      },
    };
  } catch (err) {
    return {
      score: 0,
      issues: ["Failed to analyze site"],
      insights: [],
    };
  }
}