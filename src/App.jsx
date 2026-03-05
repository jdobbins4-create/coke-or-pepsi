import { useState, useEffect } from "react";

const COKE_COLOR = "#F40009";
const PEPSI_BLUE = "#004B93";
const PEPSI_RED = "#EE1C25";

const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=DM+Sans:wght@300;400;500;600&display=swap');

  * { box-sizing: border-box; margin: 0; padding: 0; }

  .app {
    min-height: 100vh;
    background: #0a0a0a;
    font-family: 'DM Sans', sans-serif;
    color: #f0f0f0;
    position: relative;
    overflow-x: hidden;
  }

  .bg-orb {
    position: fixed;
    border-radius: 50%;
    filter: blur(120px);
    opacity: 0.15;
    pointer-events: none;
    transition: all 1.5s ease;
  }
  .bg-orb-1 { width: 600px; height: 600px; top: -200px; left: -200px; }
  .bg-orb-2 { width: 500px; height: 500px; bottom: -100px; right: -100px; }

  .container {
    max-width: 760px;
    margin: 0 auto;
    padding: 60px 24px 80px;
  }

  .header {
    text-align: center;
    margin-bottom: 52px;
  }

  .tagline {
    font-size: 11px;
    letter-spacing: 4px;
    text-transform: uppercase;
    color: #888;
    margin-bottom: 16px;
  }

  .title {
    font-family: 'Bebas Neue', sans-serif;
    font-size: clamp(52px, 10vw, 88px);
    line-height: 0.95;
    letter-spacing: 2px;
    margin-bottom: 16px;
  }

  .title .coke { color: ${COKE_COLOR}; }
  .title .or { color: #444; font-size: 0.6em; }
  .title .pepsi { color: ${PEPSI_BLUE}; }

  .subtitle {
    font-size: 15px;
    color: #888;
    font-weight: 300;
    max-width: 400px;
    margin: 0 auto;
    line-height: 1.6;
  }

  .search-box {
    background: #141414;
    border: 1px solid #2a2a2a;
    border-radius: 16px;
    padding: 24px;
    margin-bottom: 28px;
    transition: border-color 0.3s;
  }
  .search-box:focus-within { border-color: #3a3a3a; }

  .search-row {
    display: flex;
    gap: 12px;
    align-items: stretch;
  }

  .input-wrap {
    flex: 1;
    position: relative;
  }

  .search-icon {
    position: absolute;
    left: 16px;
    top: 50%;
    transform: translateY(-50%);
    color: #555;
    font-size: 18px;
  }

  .search-input {
    width: 100%;
    background: #1e1e1e;
    border: 1px solid #2a2a2a;
    border-radius: 10px;
    padding: 14px 16px 14px 46px;
    font-size: 15px;
    font-family: 'DM Sans', sans-serif;
    color: #f0f0f0;
    outline: none;
    transition: border-color 0.2s, background 0.2s;
  }
  .search-input::placeholder { color: #444; }
  .search-input:focus { border-color: #444; background: #222; }

  .search-btn {
    background: #f0f0f0;
    color: #0a0a0a;
    border: none;
    border-radius: 10px;
    padding: 14px 24px;
    font-size: 14px;
    font-weight: 600;
    font-family: 'DM Sans', sans-serif;
    cursor: pointer;
    white-space: nowrap;
    transition: background 0.2s, transform 0.1s;
    letter-spacing: 0.3px;
  }
  .search-btn:hover { background: #ddd; }
  .search-btn:active { transform: scale(0.98); }
  .search-btn:disabled { background: #333; color: #666; cursor: not-allowed; transform: none; }

  .divider {
    font-size: 11px;
    letter-spacing: 3px;
    text-transform: uppercase;
    color: #333;
    text-align: center;
    margin: 20px 0 14px;
  }

  .examples {
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
    justify-content: center;
    margin-top: 10px;
  }

  .example-chip {
    background: #161616;
    border: 1px solid #252525;
    border-radius: 20px;
    padding: 6px 14px;
    font-size: 12px;
    color: #666;
    cursor: pointer;
    transition: all 0.2s;
  }
  .example-chip:hover { background: #1e1e1e; border-color: #333; color: #aaa; }

  .loading {
    text-align: center;
    padding: 60px 20px;
  }

  .spinner {
    width: 40px;
    height: 40px;
    border: 3px solid #222;
    border-top-color: #f0f0f0;
    border-radius: 50%;
    animation: spin 0.8s linear infinite;
    margin: 0 auto 20px;
  }
  @keyframes spin { to { transform: rotate(360deg); } }

  .loading-text {
    font-size: 14px;
    color: #666;
    animation: pulse 1.5s ease-in-out infinite;
  }
  @keyframes pulse { 0%, 100% { opacity: 0.5; } 50% { opacity: 1; } }

  .result-card {
    background: #111;
    border: 1px solid #222;
    border-radius: 20px;
    overflow: hidden;
    animation: slideUp 0.4s ease;
  }
  @keyframes slideUp {
    from { opacity: 0; transform: translateY(20px); }
    to { opacity: 1; transform: translateY(0); }
  }

  .result-header {
    padding: 28px 28px 24px;
    border-bottom: 1px solid #1e1e1e;
  }

  .restaurant-name {
    font-family: 'Bebas Neue', sans-serif;
    font-size: 36px;
    letter-spacing: 1.5px;
    line-height: 1;
    margin-bottom: 6px;
  }

  .restaurant-meta {
    font-size: 13px;
    color: #555;
  }

  .verdict-banner {
    padding: 28px;
    display: flex;
    align-items: center;
    gap: 20px;
    border-bottom: 1px solid #1e1e1e;
  }

  .verdict-logo {
    width: 64px;
    height: 64px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 28px;
    flex-shrink: 0;
  }

  .verdict-text h3 {
    font-family: 'Bebas Neue', sans-serif;
    font-size: 28px;
    letter-spacing: 1px;
    line-height: 1;
    margin-bottom: 4px;
  }
  .verdict-text p {
    font-size: 13px;
    color: #777;
    line-height: 1.5;
  }

  .coke-verdict { background: rgba(244,0,9,0.12); border-left: 4px solid ${COKE_COLOR}; }
  .pepsi-verdict { background: rgba(0,75,147,0.12); border-left: 4px solid ${PEPSI_BLUE}; }
  .unknown-verdict { background: rgba(255,255,255,0.04); border-left: 4px solid #333; }

  .coke-logo-bg { background: rgba(244,0,9,0.15); }
  .pepsi-logo-bg { background: rgba(0,75,147,0.15); }

  .coke-name { color: ${COKE_COLOR}; }
  .pepsi-name { color: #4d9fff; }
  .unknown-name { color: #999; }

  .details-section {
    padding: 24px 28px;
  }

  .details-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 12px;
    margin-bottom: 20px;
  }

  .detail-chip {
    background: #1a1a1a;
    border: 1px solid #252525;
    border-radius: 10px;
    padding: 12px 14px;
  }

  .detail-chip-label {
    font-size: 10px;
    letter-spacing: 2px;
    text-transform: uppercase;
    color: #555;
    margin-bottom: 4px;
  }

  .detail-chip-value {
    font-size: 13px;
    color: #ccc;
    font-weight: 500;
  }

  .products-list { margin-top: 4px; }

  .products-title {
    font-size: 11px;
    letter-spacing: 2px;
    text-transform: uppercase;
    color: #555;
    margin-bottom: 10px;
  }

  .product-tags {
    display: flex;
    flex-wrap: wrap;
    gap: 6px;
  }

  .product-tag {
    font-size: 12px;
    padding: 4px 10px;
    border-radius: 20px;
    font-weight: 500;
  }

  .coke-tag { background: rgba(244,0,9,0.1); color: #ff6b70; border: 1px solid rgba(244,0,9,0.2); }
  .pepsi-tag { background: rgba(0,75,147,0.1); color: #6ab0ff; border: 1px solid rgba(0,75,147,0.2); }
  .unknown-tag { background: rgba(255,255,255,0.05); color: #888; border: 1px solid rgba(255,255,255,0.08); }

  .confidence-row {
    display: flex;
    align-items: center;
    gap: 10px;
    margin-top: 16px;
    padding-top: 16px;
    border-top: 1px solid #1e1e1e;
  }

  .confidence-label { font-size: 11px; color: #555; letter-spacing: 1px; text-transform: uppercase; }

  .confidence-bar-wrap {
    flex: 1;
    height: 4px;
    background: #222;
    border-radius: 2px;
    overflow: hidden;
  }

  .confidence-bar {
    height: 100%;
    border-radius: 2px;
    transition: width 1s ease;
  }

  .confidence-value { font-size: 12px; color: #666; width: 32px; text-align: right; }

  .sources-note {
    font-size: 11px;
    color: #444;
    margin-top: 16px;
    line-height: 1.6;
    font-style: italic;
  }

  .new-search-btn {
    width: 100%;
    background: transparent;
    border: 1px solid #2a2a2a;
    border-radius: 10px;
    padding: 13px;
    color: #666;
    font-size: 13px;
    font-family: 'DM Sans', sans-serif;
    cursor: pointer;
    margin-top: 16px;
    transition: border-color 0.2s, color 0.2s;
  }
  .new-search-btn:hover { border-color: #444; color: #aaa; }

  .footer {
    text-align: center;
    margin-top: 48px;
    padding-top: 24px;
    border-top: 1px solid #161616;
  }

  .disclaimer {
    font-size: 11px;
    color: #3a3a3a;
    line-height: 1.8;
    max-width: 500px;
    margin: 0 auto;
  }

  .disclaimer a {
    color: #4a4a4a;
    text-decoration: none;
  }
  .disclaimer a:hover { color: #666; }

  .error-box {
    background: rgba(255,60,60,0.07);
    border: 1px solid rgba(255,60,60,0.15);
    border-radius: 12px;
    padding: 20px 24px;
    color: #ff8080;
    font-size: 14px;
    text-align: center;
    animation: slideUp 0.3s ease;
  }
`;

const EXAMPLES = ["McDonald's", "Taco Bell", "Subway", "Pizza Hut", "Olive Garden", "Applebee's"];

function CokeIcon() {
  return (
    <svg viewBox="0 0 40 40" width="34" height="34" fill="none">
      <circle cx="20" cy="20" r="20" fill={COKE_COLOR} opacity="0.9"/>
      <text x="20" y="27" textAnchor="middle" fill="white" fontSize="20" fontWeight="bold" fontFamily="serif">C</text>
    </svg>
  );
}

function PepsiIcon() {
  return (
    <svg viewBox="0 0 40 40" width="34" height="34">
      <circle cx="20" cy="20" r="20" fill={PEPSI_BLUE}/>
      <path d="M20 20 A20 20 0 0 0 0 20 Z" fill={PEPSI_RED}/>
      <path d="M20 20 A20 20 0 0 1 40 20 Z" fill="white" opacity="0.9"/>
      <circle cx="20" cy="20" r="7" fill={PEPSI_BLUE}/>
    </svg>
  );
}

async function queryRestaurant(restaurantName) {
  const response = await fetch("/api/check", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ restaurant: restaurantName }),
  });
  const data = await response.json();
  if (!response.ok) throw new Error(data.error || "API error");
  return data;
}

export default function App() {
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);
  const [orbColor1, setOrbColor1] = useState("#888");
  const [orbColor2, setOrbColor2] = useState("#333");

  useEffect(() => {
    if (result) {
      if (result.brand === "coke") { setOrbColor1(COKE_COLOR); setOrbColor2("#8B0000"); }
      else if (result.brand === "pepsi") { setOrbColor1(PEPSI_BLUE); setOrbColor2(PEPSI_RED); }
      else { setOrbColor1("#555"); setOrbColor2("#333"); }
    }
  }, [result]);

  const handleSearch = async (searchQuery) => {
    const q = (searchQuery || query).trim();
    if (!q) return;
    setLoading(true);
    setResult(null);
    setError(null);
    try {
      const data = await queryRestaurant(q);
      setResult(data);
    } catch (e) {
      setError(e.message || "Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setResult(null);
    setError(null);
    setQuery("");
    setOrbColor1("#888");
    setOrbColor2("#333");
  };

  const brandClass = result?.brand === "coke" ? "coke" : result?.brand === "pepsi" ? "pepsi" : "unknown";

  return (
    <>
      <style>{styles}</style>
      <div className="app">
        <div className="bg-orb bg-orb-1" style={{ background: orbColor1 }} />
        <div className="bg-orb bg-orb-2" style={{ background: orbColor2 }} />

        <div className="container">
          <header className="header">
            <p className="tagline">Restaurant Beverage Finder</p>
            <h1 className="title">
              <span className="coke">COKE</span><br />
              <span className="or">OR</span><br />
              <span className="pepsi">PEPSI?</span>
            </h1>
            <p className="subtitle">Find out which soft drink brand your favorite restaurant serves before you go.</p>
          </header>

          <div className="search-box">
            <div className="search-row">
              <div className="input-wrap">
                <span className="search-icon">🔍</span>
                <input
                  className="search-input"
                  type="text"
                  placeholder="Enter a restaurant name..."
                  value={query}
                  onChange={e => setQuery(e.target.value)}
                  onKeyDown={e => e.key === "Enter" && handleSearch()}
                  disabled={loading}
                />
              </div>
              <button
                className="search-btn"
                onClick={() => handleSearch()}
                disabled={loading || !query.trim()}
              >
                {loading ? "Checking..." : "Check"}
              </button>
            </div>
            {!result && !loading && (
              <>
                <div className="divider">Try these</div>
                <div className="examples">
                  {EXAMPLES.map(ex => (
                    <button key={ex} className="example-chip" onClick={() => { setQuery(ex); handleSearch(ex); }}>{ex}</button>
                  ))}
                </div>
              </>
            )}
          </div>

          {loading && (
            <div className="loading">
              <div className="spinner" />
              <p className="loading-text">Searching beverage partnerships...</p>
            </div>
          )}

          {error && <div className="error-box">⚠️ {error}</div>}

          {result && (
            <div className="result-card">
              <div className="result-header">
                <div className="restaurant-name">{result.restaurant}</div>
                <div className="restaurant-meta">{result.chain_type?.toUpperCase()}</div>
              </div>

              <div className={`verdict-banner ${brandClass}-verdict`}>
                <div className={`verdict-logo ${brandClass !== "unknown" ? brandClass + "-logo-bg" : ""}`}>
                  {result.brand === "coke" ? <CokeIcon /> : result.brand === "pepsi" ? <PepsiIcon /> : "❓"}
                </div>
                <div className="verdict-text">
                  <h3 className={`${brandClass}-name`}>
                    {result.brand === "coke" ? "🔴 Coca-Cola" : result.brand === "pepsi" ? "🔵 Pepsi" : "Unknown"}
                  </h3>
                  <p>{result.headline}</p>
                </div>
              </div>

              <div className="details-section">
                <div className="details-grid">
                  <div className="detail-chip">
                    <div className="detail-chip-label">Brand Partner</div>
                    <div className="detail-chip-value">
                      {result.brand === "coke" ? "The Coca-Cola Company" : result.brand === "pepsi" ? "PepsiCo" : "Not confirmed"}
                    </div>
                  </div>
                  <div className="detail-chip">
                    <div className="detail-chip-label">Chain Type</div>
                    <div className="detail-chip-value" style={{ textTransform: "capitalize" }}>{result.chain_type}</div>
                  </div>
                </div>

                <p style={{ fontSize: "14px", color: "#aaa", lineHeight: "1.7", marginBottom: "16px" }}>{result.explanation}</p>

                {result.products?.length > 0 && (
                  <div className="products-list">
                    <div className="products-title">Available Beverages</div>
                    <div className="product-tags">
                      {result.products.map((p, i) => (
                        <span key={i} className={`product-tag ${brandClass}-tag`}>{p}</span>
                      ))}
                    </div>
                  </div>
                )}

                {result.note && <p className="sources-note">ℹ️ {result.note}</p>}

                <div className="confidence-row">
                  <span className="confidence-label">Confidence</span>
                  <div className="confidence-bar-wrap">
                    <div className="confidence-bar" style={{
                      width: `${result.confidence}%`,
                      background: result.brand === "coke" ? COKE_COLOR : result.brand === "pepsi" ? PEPSI_BLUE : "#555"
                    }} />
                  </div>
                  <span className="confidence-value">{result.confidence}%</span>
                </div>

                <button className="new-search-btn" onClick={handleReset}>← Search another restaurant</button>
              </div>
            </div>
          )}
        </div>

        <footer className="footer">
          <p className="disclaimer">
            Not affiliated with The Coca-Cola Company or PepsiCo. Results are AI-generated and may be inaccurate — verify with the restaurant directly. All trademarks belong to their respective owners.
          </p>
        </footer>

      </div>
    </>
  );
}
