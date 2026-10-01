import { storageAdapter } from './storageAdapter';

export const askAIConcierge = async (userMessage, chatHistory = []) => {
  const projects = storageAdapter.getProjects();
  const knowledge = storageAdapter.getAIKnowledge();
  const config = storageAdapter.getBackendConfig();

  const apiKey = config.geminiApiKey || import.meta.env.VITE_GEMINI_API_KEY;

  // Build the dynamic system prompt with live project catalog
  const systemPrompt = `
You are the AI Concierge for Muhammad Abdullah's Creative Portfolio & Digital Asset Vault (NovaVault).
Your goal is to assist visitors, explain project functionalities, guide them on downloads, and answer questions about Abdullah's skills and availability.

Creator Profile:
- Name: ${knowledge.creatorName}
- Title: ${knowledge.title}
- Focus: ${knowledge.focus}
- Tone: ${knowledge.tone}
- Additional Guidelines: ${knowledge.customNotes}

Available Projects in NovaVault:
${JSON.stringify(
  projects.map((p) => ({
    title: p.title,
    category: p.category,
    is_paid: p.is_paid,
    price: p.price,
    tagline: p.tagline,
    tags: p.tags,
    features: p.features,
    download_size: p.file_size
  })),
  null,
  2
)}

Strict Rules:
1. Only answer questions related to Abdullah's projects, skills, background, digital products, and services.
2. For free assets, tell visitors to click the green 'Direct Download' button to instantly obtain the package.
3. For paid assets, instruct them to click 'Buy Now' for checkout.
4. For bespoke freelance contracts or custom development, guide them to the Contact section below.
5. Keep your tone energetic, cyber-futuristic, yet crisp and professional.
`;

  // 1. Try real Gemini API if key exists
  if (apiKey) {
    try {
      const contents = [
        {
          role: 'user',
          parts: [{ text: systemPrompt + '\n\nUser Question: ' + userMessage }]
        }
      ];

      const res = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ contents })
        }
      );

      if (res.ok) {
        const json = await res.json();
        const candidate = json.candidates?.[0]?.content?.parts?.[0]?.text;
        if (candidate) return candidate;
      } else {
        console.warn('Gemini API call failed with status:', res.status);
      }
    } catch (err) {
      console.error('Error invoking Gemini API:', err);
    }
  }

  // 2. Intelligent Offline Fallback Engine
  const q = userMessage.toLowerCase();

  // Match specific projects
  for (const p of projects) {
    const titleWords = p.title.toLowerCase().split(' ');
    if (titleWords.some(w => w.length > 3 && q.includes(w))) {
      const pricing = p.is_paid ? `is a premium asset priced at $${p.price.toFixed(2)}` : 'is completely FREE to download';
      const features = (p.features || []).slice(0, 3).map(f => `• ${f}`).join('\n');
      return `**${p.title}** (${p.category})\n\n${p.description}\n\nKey Highlights:\n${features}\n\n📦 **Access**: This asset ${pricing}. ${p.is_paid ? 'Click "Buy Now" on the card to get instant checkout access.' : 'Click "Direct Download" on the card to download the .zip immediately!'}`;
    }
  }

  // Match free downloads
  if (q.includes('free') || q.includes('download') || q.includes('cost') || q.includes('pricing')) {
    const freeList = projects.filter(p => !p.is_paid).map(p => `• **${p.title}** (${p.category})`).join('\n');
    return `NovaVault has several high-tier free releases available for direct one-click download:\n\n${freeList}\n\nSimply click the green **"Direct Download"** button on any of these project cards to immediately receive the asset package in your browser!`;
  }

  // Match contact / hire
  if (q.includes('contact') || q.includes('hire') || q.includes('email') || q.includes('work') || q.includes('contract')) {
    return `Muhammad Abdullah is currently open for select creative engineering contracts, 3D WebGL interfaces, and custom frontend systems. You can reach out directly using the **Contact & Inquiries** section at the bottom of the page, or by emailing **abdullah@example.com**!`;
  }

  // Match skills / tech stack
  if (q.includes('skill') || q.includes('stack') || q.includes('tech') || q.includes('three.js') || q.includes('react')) {
    return `Abdullah specializes in:\n• **3D & Creative Engineering**: Three.js, WebGL, GLSL Shaders, Web Audio API, Canvas 2D.\n• **Frontend Architecture**: React 18, Vite, Tailwind CSS, TypeScript, Zustand.\n• **Backend & Distributed Systems**: Supabase, Firebase, PostgreSQL, Serverless.\n• **AI Agentics & LLMs**: Gemini API, autonomous workflow orchestration.`;
  }

  // General default welcoming response
  return `Greetings! I am NovaVault's AI Concierge for **${knowledge.creatorName}**.\n\nI can help you explore projects (like *AetherOS*, *VoxelVerse 3D*, or *HyperVault Pro*), assist with instant digital downloads, or explain our technical architectures.\n\nWhat would you like to explore today?`;
};
