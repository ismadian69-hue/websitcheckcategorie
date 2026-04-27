const axios = require("axios");

module.exports = async (req, res) => {
const domain = req.query.domain;
const key = process.env.VT_API_KEY;

try {
const r = await axios.get(
"https://www.virustotal.com/api/v3/domains/" + domain,
{
headers: {
"x-apikey": key
}
}
);

```
const cats = r.data.data.attributes.categories || {};
const vals = Object.values(cats);

return res.status(200).json({
  status: "Success",
  category: vals[0] || "Unknown"
});
```

} catch (e) {
return res.status(200).json({
status: "Error",
category: "-",
code: e.response?.status || 0,
message: e.response?.data?.error?.message || e.message
});
}
};
