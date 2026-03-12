# 📚 Stack Bible — Solo Builder 2026

Your personal tech stack reference. Built by Rakibul. Visit anytime.

## What's inside

- **17 tools** across Web, Mobile, Voice, AI, Automation, OSINT, OSS, Lead Gen, Games
- Full details for each: What · Who uses it · How to use it · Install commands · Resources
- Search and filter by category
- Mobile friendly — works perfectly on phone

---

## Run locally

```bash
npm install
npm run dev
```

Open http://localhost:5173

---

## Deploy to Netlify (recommended)

1. Push this folder to a GitHub repo
2. Go to netlify.com → "Add new site" → "Import from Git"
3. Select your repo
4. Build command: `npm run build`
5. Publish directory: `dist`
6. Click Deploy

Done. You get a live URL like `your-stack-bible.netlify.app`

---

## Deploy to Vercel

1. Push this folder to a GitHub repo
2. Go to vercel.com → "New Project" → Import repo
3. Framework preset: Vite
4. Click Deploy

Done. You get a live URL like `your-stack-bible.vercel.app`

---

## Update your stack

Edit `src/stackData.js` to add/remove/edit tools. Each tool follows this structure:

```js
{
  id: "unique-id",
  name: "Tool Name",
  icon: "🔥",
  category: "Category",
  categoryColor: "#color",
  level: 85,              // 0-100 expertise importance
  priority: "CRITICAL",  // CRITICAL | HIGH | SITUATIONAL
  tagline: "One line description",
  what: "What it is...",
  who: "Who made/uses it...",
  how: "How to use it...",
  whyYouNeedIt: "Why specifically YOU need it...",
  tools: ["tool1", "tool2"],
  resources: ["resource1", "resource2"],
  usedFor: ["use1", "use2"],
  timeToLearn: "X days/weeks",
  command: "install command",
  install: "how to install",
  color: "#hexcolor",
}
```
