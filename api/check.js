export default async function handler(req, res) {
const domain = req.query.domain;
const apiKey = process.env.VT_API_KEY;

if (!domain) {
return res.status(200).json({
status: "Error",
category: "-",
message: "No domain"
});
}

if (!apiKey) {
return res.status(200).json({
status: "Error",
category: "-",
message: "API Key Missing"
});
}

try {
const response = await fetch(
"https://www.virustotal.com/api/v3/domains/" + domain,
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
    message: "VirusTotal Error"
  });
}

const categories = data.data.attributes.categories || {};
const category = Object.values(categories)[0] || "Unknown";

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
