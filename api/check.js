export default async function handler(req, res) {
const { domain } = req.query;

if (!domain) {
return res.status(200).json({
status: "Error",
category: "-"
});
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

```
const data = await response.json();

if (!response.ok) {
  return res.status(200).json({
    status: "Error",
    category: "-"
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
category: "-"
});
}
}
