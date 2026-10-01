# NovaVault – Hyper-Animated Portfolio & Digital Asset Showcase

NovaVault is a next-generation creative engineering portfolio and digital asset vault engineered for **Muhammad Abdullah**. Built with **React 18**, **Three.js (WebGL)**, and **Tailwind CSS**, it features high-end Cyber-Minimalism glassmorphic aesthetics, client-side digital product distribution (Free & Paid downloads), an embedded **Google Gemini AI Concierge**, and a secured, responsive **Admin Back-Office** (`/#/admin`).

---

## ⚡ Key Highlights & Architecture

- **3D WebGL Particle Hero**: Interactive Three.js particle system with ~2600 points using `BufferGeometry` and `Float32Array`, adhering strictly to `ui-ux-pro-max` performance benchmarks (60 FPS on desktop and mobile).
- **Cyber-Minimalism & Dark Mode**: OLED deep black canvas (`#0A0A0C`), frosted glassmorphic card overlays (`backdrop-blur-xl`), Electric Cyan (`#00F5FF`), Neon Violet (`#7B2CBF`), and glowing border coordinate tracking.
- **Client-Side Digital Asset Distribution**:
  - **Free Downloads**: Immediate browser trigger downloading authentic `.zip` asset packages.
  - **Paid / Monetized Assets**: Instant routing to hosted checkout (Stripe Payment Links or Lemon Squeezy).
- **Embedded AI Portfolio Concierge**: Floating glassmorphic chat widget powered by Google's Gemini API with bounded system prompt and smart conversational fallback for Abdullah's projects, tech stack, and contract inquiries.
- **Secured Admin Back-Office (`/#/admin`)**:
  - **Project Manager**: Data table with live search, category filtering, featured toggling, and delete actions.
  - **New Project Creator**: 4-step wizard with real-time review and media uploaders.
  - **File Bucket Uploader**: Drag-and-drop dropzone with animated upload simulation.
  - **AI Knowledge Sync**: Live editor for system instructions and creator facts.
  - **Inquiry Inbox**: Review messages with direct `mailto:` reply triggers.
  - **Backend & Cloud Settings**: Seamless toggle between **Instant LocalDB**, **Supabase Cloud**, and **Firebase Cloud**.
- **Static Hosting & GitHub Pages CI/CD**: Ready for static export with relative pathing (`./`) and automated `.github/workflows/deploy.yml`.

---

## 🗄️ Database Schema (Supabase PostgreSQL)

To sync with Supabase Cloud, execute this SQL script in the Supabase SQL Editor:

```sql
CREATE TABLE projects (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
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
    download_count INTEGER DEFAULT 0
);
```

---

## 🚀 Getting Started

### Local Development
```bash
# Install dependencies
npm install

# Start Vite development server
npm run dev
```

### Production Build & Preview
```bash
# Compile optimized static bundle to /dist
npm run build

# Preview static distribution locally
npm run preview
```

### Admin Access
Navigate to `/#/admin` in the browser:
- **Default Email**: `admin@novavault.io`
- **Default Passkey**: `novavault2026`

---

## 🌐 GitHub Pages Deployment

1. Initialize repository and commit your files:
   ```bash
   git add .
   git commit -m "feat: initial release of NovaVault portfolio & asset showcase"
   ```
2. Create a repository on GitHub (e.g. `novavault`) and connect remote:
   ```bash
   git remote add origin https://github.com/<your-username>/novavault.git
   git branch -M main
   git push -u origin main
   ```
3. In GitHub repository **Settings → Pages**:
   - Set **Source** to **GitHub Actions**.
   - The automated workflow `.github/workflows/deploy.yml` will automatically build and publish the site!
