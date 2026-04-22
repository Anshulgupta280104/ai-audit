export async function runAudit(url) {
  let score = 100;
  const issues = [];
  const insights = [];

   function normalizeUrl(input) {
    if (!input.startsWith("http://") && !input.startsWith("https://")) {
      return "https://" + input;
    }
    return input;
  }

  try {
    // --- FETCH ---
    const response = await fetch(
  `http://localhost:5000/fetch-html?url=${encodeURIComponent(url)}`
);
const html = await response.text();

    // --- HARD FAIL DETECTION (REAL FIX) ---
    const lowerHtml = html.toLowerCase();

    const isBlocked =
      !html ||
      html.length < 800 ||
      lowerHtml.includes("enable javascript") ||
      lowerHtml.includes("access denied") ||
      lowerHtml.includes("captcha") ||
      lowerHtml.includes("cloudflare");

    if (isBlocked) {
      return {
        score: 50,
        issues: ["Site blocked or heavily JS-rendered (incomplete HTML)"],
        insights: ["Client-side audit cannot fully evaluate this site"],
        metadata: {},
      };
    }

    const parser = new DOMParser();
    const doc = parser.parseFromString(html, "text/html");

    if (!doc.body) {
      return {
        score: 50,
        issues: ["Invalid HTML structure"],
        insights: ["Parsing failed due to malformed content"],
        metadata: {},
      };
    }

    // --- SAFE PENALTY SYSTEM ---
    let penalty = 0;

    // --- SPA DETECTION ---
    const isLikelySPA =
      html.includes('id="root"') ||
      html.includes('id="__next"');

    if (isLikelySPA) {
      penalty += 10;
      issues.push("JS-rendered site (limited audit visibility)");
    }

    // --- TITLE ---
    const title = doc.querySelector("title")?.innerText?.trim() || "";
    if (title.length < 10) {
      penalty += 8;
      issues.push("Weak or missing title");
    }

    // --- META ---
    const metaDesc = doc.querySelector('meta[name="description"]')?.content || "";
    if (metaDesc.length < 50) {
      penalty += 8;
      issues.push("Weak meta description");
    }

    // --- HEADINGS ---
    const h1Tags = doc.querySelectorAll("h1");
    if (h1Tags.length === 0) {
      penalty += 10;
      issues.push("Missing H1");
    }

    // --- CONTENT ---
    const bodyText = doc.body.innerText || "";
    const wordCount = bodyText.split(/\s+/).filter(Boolean).length;

    if (wordCount < 300) {
      penalty += 10;
      issues.push("Thin content");
    }

    if (bodyText.length < 500) {
      penalty += 6;
      issues.push("Low informational depth");
    }

    // --- STRUCTURED DATA ---
    const hasSchema = !!doc.querySelector('script[type="application/ld+json"]');
    if (!hasSchema) {
      penalty += 10;
      issues.push("No structured data");
    }

    // --- IMAGES ---
    const images = doc.querySelectorAll("img");
    let missingAlt = 0;

    images.forEach(img => {
      if (!img.alt) missingAlt++;
    });

    if (images.length > 0 && missingAlt / images.length > 0.5) {
      penalty += 6;
      issues.push("Images missing alt text");
    }

    // --- LINKS ---
    const links = doc.querySelectorAll("a");
    if (links.length < 5) {
      penalty += 4;
      issues.push("Low internal linking");
    }

    // --- HTTPS ---
    if (!url.startsWith("https")) {
      penalty += 5;
      issues.push("Not HTTPS");
    }

    // --- APPLY PENALTY (CONTROLLED) ---
    score = 100 - penalty;

    // --- SAFETY FLOOR (IMPORTANT) ---
    if (score < 40) {
      score = 45;
      insights.push("Score normalized due to limited audit reliability");
    }

    // --- FINAL BOUNDS ---
    score = Math.max(0, Math.min(100, score));

    // --- INSIGHTS ---
    insights.push(
      hasSchema
        ? "Structured data helps AI systems"
        : "AI must infer structure without schema"
    );

    insights.push(
      wordCount > 800
        ? "Good content depth for LLMs"
        : "Content depth is limited"
    );

    insights.push(
      h1Tags.length > 0
        ? "Clear heading structure present"
        : "Missing clear headings"
    );

    if (isLikelySPA) {
      insights.push("Dynamic rendering reduces audit accuracy");
    }

    return {
      score,
      issues,
      insights,
      metadata: {
        title,
        wordCount,
        hasSchema,
        h1Count: h1Tags.length,
        isLikelySPA,
      },
    };

  } catch (error) {
    return {
      score: 50,
      issues: ["Audit failed", error.message],
      insights: ["Likely CORS or network issue"],
      metadata: {},
    };
  }
}