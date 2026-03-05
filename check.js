export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { restaurant } = req.body;
  if (!restaurant) {
    return res.status(400).json({ error: "Restaurant name is required" });
  }

  const systemPrompt = `You are a beverage expert who knows which restaurant chains serve Coca-Cola products vs Pepsi products.

When given a restaurant name, identify whether they serve Coke (Coca-Cola products), Pepsi products, or if it's unknown/varies by location.

IMPORTANT: You MUST search the web for current and accurate information about this restaurant's beverage contracts. Beverage partnerships change over time, so search for the most recent information.

After searching, respond with ONLY valid JSON in this exact format (no markdown, no explanation):
{
  "restaurant": "Official restaurant name",
  "brand": "coke" | "pepsi" | "unknown",
  "confidence": 0-100,
  "headline": "Short punchy verdict (e.g. 'Classic Coca-Cola territory' or 'Proudly Pepsi')",
  "explanation": "2-3 sentences explaining the beverage partnership and any notable details.",
  "products": ["list", "of", "specific", "drinks", "available"],
  "note": "Any relevant caveats (e.g. varies by location, recent change, etc.) - can be empty string",
  "chain_type": "fast food" | "casual dining" | "pizza" | "coffee" | "fast casual" | "other"
}`;

  try {
    const response = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": process.env.ANTHROPIC_API_KEY,
        "anthropic-version": "2023-06-01",
      },
      body: JSON.stringify({
        model: "claude-sonnet-4-20250514",
        max_tokens: 1000,
        system: systemPrompt,
        tools: [{ type: "web_search_20250305", name: "web_search" }],
        messages: [
          {
            role: "user",
            content: `What beverage products (Coke or Pepsi) does ${restaurant} serve? Search for current information.`,
          },
        ],
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      return res.status(500).json({ error: data.error?.message || "Anthropic API error" });
    }

    const textContent = data.content
      .filter((b) => b.type === "text")
      .map((b) => b.text)
      .join("");

    const clean = textContent.replace(/```json|```/g, "").trim();
    const jsonMatch = clean.match(/\{[\s\S]*\}/);
    if (!jsonMatch) {
      return res.status(500).json({ error: "Could not parse AI response" });
    }

    const result = JSON.parse(jsonMatch[0]);
    return res.status(200).json(result);
  } catch (err) {
    return res.status(500).json({ error: err.message || "Unexpected error" });
  }
}
