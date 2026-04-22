# 🚀 AI Readiness Audit — Prototype for AI-First Web Evaluation

## 🧠 The Shift

AI systems are increasingly acting as intermediaries between users and the web.

Users are no longer only:

* Browsing websites
* Clicking links

They are also:

* Asking AI for answers
* Consuming summarized content
* Relying on machine-generated responses

👉 This introduces a new requirement:

> Websites should be structured not only for humans or search engines, but also for AI systems.

---

## 💡 The Idea

**AI Readiness Audit** is a lightweight prototype that evaluates how well a website is structured for:

* Large Language Models (LLMs)
* Search copilots
* Automated agents

It provides a simple estimate of how easily a site can be understood and processed by machines.

---

## ⚙️ What This Prototype Does

* Accepts a **URL input**
* Fetches HTML via a backend proxy
* Generates an **AI Readiness Score (0–100)**
* Breaks down results into:

  * Structural quality
  * Content depth
  * Machine interpretability
* Provides basic, actionable insights

> The approach is heuristic-based and focuses on structural signals rather than full crawling.

---

## 🎯 Why This Exists

Most existing tools focus on:

* SEO optimization
* Performance metrics

Fewer tools consider:

> ❗ Whether an AI system can reliably interpret and use the content of a website.

This project explores that gap using simple, transparent rules.

---

## 🏗 Design Philosophy

### 1. Keep It Simple

No crawling or heavy processing.

Only:

* Clear assumptions
* Practical checks
* Deterministic scoring

---

### 2. Focus on Clarity

The goal is not complexity, but **useful feedback**.

Results are designed to be easy to understand and act upon.

---

### 3. Designed for Extension

This prototype can be extended with:

* Headless browser rendering (Puppeteer)
* LLM-based evaluation
* Structured data validation
* Advanced content analysis

---

## 🛠 Tech Stack

* React (Create React App)
* Node.js + Express (backend proxy)
* JavaScript (ES6+)
* DOMParser (HTML parsing)

---

## 📦 How to Run

### Install dependencies

```bash
npm install
```

---

### Start frontend

```bash
npm start
```

Open:

```
http://localhost:3000
```

---

### Start backend

```bash
npm run server
```

Runs on:

```
http://localhost:5000
```

---

## ⚠️ Limitations

* Does not execute JavaScript (no full browser rendering)
* Results may be incomplete for SPA-based websites
* Some websites block automated requests

---

## 📌 Example URLs

Recommended:

* https://example.com
* https://wikipedia.org

---

## 👤 Author

Anshul Gupta
