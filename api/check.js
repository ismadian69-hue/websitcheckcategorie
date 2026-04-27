export default async function handler(req, res) {
const apiKey = process.env.VT_API_KEY;

if (!apiKey) {
return res.status(200).json({
status: "Error",
category: "-",
message: "VT_API_KEY missing"
});
}

const { domain } = req.query;

if (!domain) {
return res.status(200).json({
status: "Error",
category: "-",
message: "No domain"
});
}

try {
const response = await fetch(
`https://www.virustotal.com/api/v3/domains/${domain}`,
{
method: "GET",
headers: {
"x-apikey": apiKey
}
}
);

```
const data = await response.json();

if (!response.ok) {
  return res.status(200).json({
    status: "Error",
    category: "-",
    message: data.error?.message || "VirusTotal API error"
  });
}

const category =
  Object.values(data.data?.attributes?.categories || {})[0] ||
  "Unknown";

return res.status(200).json({
  status: "Success",
  category: category
});
```

} catch (error) {
return res.status(200).json({
status: "Error",
category: "-",
message: error.message
});
}
}
