const https = require("https");

module.exports = (req, res) => {
const domain = req.query.domain;
const key = process.env.VT_API_KEY;

if (!domain) {
return res.status(200).json({
status: "Error",
category: "-",
message: "No domain"
});
}

const options = {
hostname: "[www.virustotal.com](http://www.virustotal.com)",
path: "/api/v3/domains/" + domain,
method: "GET",
headers: {
"x-apikey": key
}
};

const request = https.request(options, (response) => {
let data = "";

```
response.on("data", (chunk) => {
  data += chunk;
});

response.on("end", () => {
  try {
    const json = JSON.parse(data);

    if (!json.data) {
      return res.status(200).json({
        status: "Error",
        category: "-",
        message: "No data"
      });
    }

    const cats = json.data.attributes.categories || {};
    const values = Object.values(cats);
    const category = values[0] || "Unknown";

    return res.status(200).json({
      status: "Success",
      category: category
    });

  } catch (e) {
    return res.status(200).json({
      status: "Error",
      category: "-",
      message: "Parse error"
    });
  }
});
```

});

request.on("error", () => {
return res.status(200).json({
status: "Error",
category: "-",
message: "Request failed"
});
});

request.end();
};
