# 🥤 Coke or Pepsi?

Find out which soft drink brand any restaurant serves.

---

## 🚀 Deploy to Vercel (5 minutes)

### Step 1 — Get your Anthropic API Key
1. Go to https://console.anthropic.com
2. Sign up or log in
3. Click **API Keys** in the sidebar → **Create Key**
4. Copy the key (starts with `sk-ant-...`) — save it somewhere safe

### Step 2 — Put the project on GitHub
1. Go to https://github.com and create a free account if needed
2. Click **New repository** → name it `coke-or-pepsi` → **Create**
3. Upload all these project files to the repo
   - Easiest: drag and drop the files into the GitHub web UI

### Step 3 — Deploy on Vercel
1. Go to https://vercel.com and sign up with your GitHub account
2. Click **Add New Project**
3. Select your `coke-or-pepsi` repo → click **Import**
4. Under **Environment Variables**, add:
   - **Name:** `ANTHROPIC_API_KEY`
   - **Value:** your key from Step 1
5. Click **Deploy**

That's it! Vercel gives you a live URL like `https://coke-or-pepsi.vercel.app` 🎉

---

## 💻 Run locally (optional)

```bash
npm install
npm run dev
```

You'll need a `.env` file for local dev:
```
ANTHROPIC_API_KEY=sk-ant-your-key-here
```

---

## 📁 Project Structure

```
coke-or-pepsi/
├── api/
│   └── check.js        ← Serverless function (keeps API key secret)
├── src/
│   ├── App.jsx         ← Main React app
│   └── main.jsx        ← Entry point
├── index.html
├── package.json
├── vite.config.js
└── vercel.json
```

---

## 💰 Cost

Each search uses ~1,000–2,000 tokens. At Anthropic's rates, roughly **$0.001–0.003 per search**.
Monitor usage at https://console.anthropic.com/usage
