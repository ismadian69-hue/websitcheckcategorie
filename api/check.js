export default async function handler(req, res) {
  const { domain } = req.query;

  if (!domain) {
    return res.status(400).json({
      status: "Error",
      category: "-",
      message: "No domain"
    });
  }

  try {
    const clean = domain.toLowerCase();

    let category = "Other";

    if (
      clean.includes("google") ||
      clean.includes("bing") ||
      clean.includes("yahoo")
    ) {
      category = "Search Engine";
    } 
    
    else if (
      clean.includes("facebook") ||
      clean.includes("instagram") ||
      clean.includes("twitter") ||
      clean.includes("tiktok")
    ) {
      category = "Social Media";
    }

    else if (
      clean.includes("youtube") ||
      clean.includes("netflix")
    ) {
      category = "Entertainment";
    }

    else if (
      clean.includes("amazon") ||
      clean.includes("ebay")
    ) {
      category = "E-commerce";
    }

    return res.status(200).json({
      status: "Success",
      category: category
    });

  } catch (error) {
    return res.status(500).json({
      status: "Error",
      category: "-"
    });
  }
}
