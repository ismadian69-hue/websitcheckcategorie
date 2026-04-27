const axios = require("axios");

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

try {
const response = await axios.get(
"https://www.virustotal.com/api/v3/domains/" + domain,
{
headers: {
"x-apikey": key
}
}
);

```
const data = response.data;

const cats = data.data.attributes.categories || {};
const values = Object.values(cats);

return res.status(200).json({
  status: "Success",
  category: values[0] || "Unknown"
});
```

} catch (e) {
return res.status(200).json({
status: "Error",
category: "-",
message: "API request failed"
});
}
};
