# NovaVault – Hyper-Animated Portfolio & Digital Asset Showcase

NovaVault is an ultra-premium, interactive creative engineering portfolio and digital asset showcase engineered for **Muhammad Abdullah**. Built with **React 18**, **Three.js (WebGL)**, and **Tailwind CSS**, it features high-end Cyber-Minimalism glassmorphic aesthetics, client-side digital product distribution (Free & Paid downloads), an embedded **Google Gemini AI Concierge**, real database integration with **Supabase PostgreSQL**, and a secured, responsive **Admin Back-Office** (`/#/admin`).

---

## ⚡ Key Highlights & Architecture

- **3D WebGL Particle Hero**: Interactive Three.js particle canvas with ~2600 reactive points using `BufferGeometry` and `Float32Array` adhering to `ui-ux-pro-max` performance benchmarks (smooth 60 FPS on desktop and mobile).
- **Cyber-Minimalism & Dark Mode**: OLED deep black canvas (`#0A0A0C`), frosted glassmorphic card overlays (`backdrop-blur-xl`), Electric Cyan (`#00F5FF`), Neon Violet (`#7B2CBF`), and glowing coordinate tracking.
- **Client-Side Digital Asset Distribution**:
  - **Free Downloads**: Immediate browser trigger generating authentic `.zip` packages on the fly with `JSZip`, containing source code, `README.md`, `package.json`, and licensing documents, accompanied by celebratory confetti.
  - **Paid / Monetized Assets**: Instant routing to hosted checkout (Stripe Payment Links or Lemon Squeezy).
- **Embedded AI Portfolio Concierge**: Floating glassmorphic chat widget powered by Google's Gemini API with bounded system prompt and smart conversational fallback for Abdullah's projects, tech stack, and contract inquiries.
- **Secured Admin Back-Office (`/#/admin`)**:
  - **Project Manager**: Data table with live search, category filtering, featured toggling, edit and delete actions.
  - **New Project Creator**: 4-step wizard with real-time review, tag management, and feature bullets.
  - **File Bucket Uploader**: Drag-and-drop dropzone with animated upload simulation and cloud storage integration.
  - **AI Knowledge Sync**: Live editor for system prompt guidelines and creator facts.
  - **Inquiry Inbox**: Review contact briefs with direct `mailto:` reply triggers and read/unread statuses.
  - **Backend & Cloud Settings**: Seamless toggle between **Instant LocalDB**, **Supabase Cloud**, and **Firebase Cloud**, complete with a **live connection test** and **1-click database seeding**.
- **Static Hosting & GitHub Pages CI/CD**: Ready for static export with relative pathing (`./`), automated `.github/workflows/deploy.yml`, and 1-click `deploy-github.bat`.

---

## 🗄️ Real Database Integration (Supabase PostgreSQL)

NovaVault works **100% out-of-the-box** using **Instant LocalDB** (zero cloud setup required).

When you are ready to connect a live Supabase PostgreSQL database:
1. Create a free project at [supabase.com](https://supabase.com).
2. Go to the **SQL Editor** in Supabase and run the following schema:

```sql
-- 1. Projects Table
CREATE TABLE IF NOT EXISTS projects (
    id TEXT PRIMARY KEY,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()),
    title TEXT NOT NULL,
    slug TEXT UNIQUE NOT NULL,
    tagline TEXT,
    description TEXT,
    category TEXT NOT NULL,
    tags TEXT[] DEFAULT '{}',
    thumbnail_url TEXT NOT NULL,
    gallery_urls TEXT[] DEFAULT '{}',
    video_preview_url TEXT,
    download_file_url TEXT,
    file_size TEXT,
    is_paid BOOLEAN DEFAULT FALSE,
    price NUMERIC(10, 2) DEFAULT 0.00,
    checkout_url TEXT,
    featured BOOLEAN DEFAULT FALSE,
    download_count INTEGER DEFAULT 0,
    live_demo_url TEXT,
    features TEXT[] DEFAULT '{}'
);

-- 2. Inquiries Table
CREATE TABLE IF NOT EXISTS inquiries (
    id TEXT PRIMARY KEY,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    name TEXT NOT NULL,
    email TEXT NOT NULL,
    project_type TEXT,
    message TEXT NOT NULL,
    read BOOLEAN DEFAULT FALSE
);

-- 3. Row Level Security Policies
ALTER TABLE projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE inquiries ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public projects viewable" ON projects FOR SELECT USING (true);
CREATE POLICY "Full access on projects" ON projects FOR ALL USING (true);
CREATE POLICY "Public inquiries insert" ON inquiries FOR INSERT WITH CHECK (true);
CREATE POLICY "Full access on inquiries" ON inquiries FOR ALL USING (true);
```

3. In NovaVault Admin (`/#/admin` -> **Backend & Cloud**):
   - Select **Supabase Cloud**.
   - Paste your **Project URL** and **Anon Key**.
   - Click **Test Connection** to verify connection.
   - Click **Seed Database Now** to instantly push all 6 curated showcase projects into your Supabase database!

---

## 🚀 Live Deployment to GitHub Pages

NovaVault includes an automated 1-click deployment script:

### Option 1: 1-Click Deployment Script
Simply double-click:
```
deploy-github.bat
```
This script will:
1. Compile the production bundle into `./dist`.
2. Connect your GitHub account via browser authorization if needed.
3. Automatically create/connect the GitHub repository and push your code.
4. Deploy the live site to the `gh-pages` branch on GitHub Pages.

### Option 2: Manual Terminal Commands
```bash
# 1. Compile production bundle
npm run build

# 2. Deploy to GitHub Pages branch
npm run deploy
```

---

## 💻 Local Development

```bash
# Install dependencies
npm install

# Start local dev server
npm run dev

# Preview production build locally
npm run preview
```

---

## 📬 Contact & Author
- **Creator:** Muhammad Abdullah
- **Email:** [m.abdullah79789@gmail.com](mailto:m.abdullah79789@gmail.com)
- **GitHub:** [github.com/nextlevelbuilder](https://github.com/nextlevelbuilder)
- **Role:** Digital Systems Engineer & Creative Technologist
