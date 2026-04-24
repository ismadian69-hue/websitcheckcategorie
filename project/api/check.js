export default async function handler(req, res) {
  const { domain } = req.query;

  if (!domain) {
    return res.status(400).json({ error: "No domain" });
  }

  try {
    const response = await fetch(
      `https://www.virustotal.com/api/v3/domains/${domain}`,
      {
        headers: {
          "x-apikey": process.env.VT_API_KEY
        }
      }
    );

    const data = await response.json();

    const category = Object.values(
      data.data?.attributes?.categories || {}
    )[0] || "Unknown";

    res.status(200).json({ domain, category });

  } catch {
    res.status(500).json({ error: "API error" });
  }
}
