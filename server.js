const express = require("express");
const fetch = require("node-fetch");
const cors = require("cors");

const app = express();
app.use(cors());

app.get("/fetch-html", async (req, res) => {
  const url = req.query.url;

  if (!url) {
    return res.status(400).json({ error: "URL is required" });
  }

  try {
    const response = await fetch(url);
    const html = await response.text();
    res.json({ html });
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch" });
  }
});

app.listen(5000, () => {
  console.log("Server running on http://localhost:5000");
});