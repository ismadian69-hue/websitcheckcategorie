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

try {
const url = "https://www.virustotal.com/api/v3/domains/" + domain;

```
const response = await fetch(url, {
  headers: {
    "x-apikey": apiKey
  }
});

const data = await response.json();

if (!response.ok) {
  return res.status(200).json({
    status: "Error",
    category: "-",
    message: "API request failed"
  });
}

let category = "Unknown";

if (
  data &&
  data.data &&
  data.data.attributes &&
  data.data.attributes.categories
) {
  const values = Object.values(data.data.attributes.categories);
  if (values.length > 0) {
    category = values[0];
  }
}

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
