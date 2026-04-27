module.exports = async (req, res) => {
const domain = req.query.domain;
const key = process.env.VT_API_KEY;

if (!domain) {
return res.status(200).json({
status: "Error",
category: "-",
message: "No domain"
});
}

if (!key) {
return res.status(200).json({
status: "Error",
category: "-",
message: "Missing API key"
});
}

try {
const r = await fetch(
"https://www.virustotal.com/api/v3/domains/" + domain,
{
headers: {
"x-apikey": key
}
}
);

```
const j = await r.json();

if (!r.ok) {
  return res.status(200).json({
    status: "Error",
    category: "-",
    message: "API failed"
  });
}

let cat = "Unknown";

if (
  j.data &&
  j.data.attributes &&
  j.data.attributes.categories
) {
  const vals = Object.values(j.data.attributes.categories);
  if (vals.length) cat = vals[0];
}

return res.status(200).json({
  status: "Success",
  category: cat
});
```

} catch (e) {
return res.status(200).json({
status: "Error",
category: "-",
message: String(e.message)
});
}
};
