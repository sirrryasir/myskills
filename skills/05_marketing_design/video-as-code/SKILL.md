---
name: video-as-code
description: "Generate next-generation professional-grade developer-education videos and browser animations in Remotion using Video-as-Code principles. Purges neons, glows, and AI slop. Builds clinical blueprint grids, graphite flat windows, monospace pastel code blocks, elegant serif Fraunces typography, and flat high-contrast SpeechHook active subtitles. Use when: (1) Creating technical coding video-as-code, (2) Generating short-form portrait 9:16 reels for socials, (3) Designing widescreen 16:9 developer animations."
---

# Video-as-Code Producer Skill

This skill guides the creation of professional developer-education video animations in Remotion. It focuses on achieving the clean, clinical, premium **"editorial-meets-technical minimalism"** aesthetic seen on high-end developer platforms, completely free of "AI vibe" and glowing neon slop.

---

## 📐 The Aesthetic Rules

When generating code or editing Remotion compositions, you MUST strictly adhere to the following design system tokens and rules:

### 1. 🖼️ Canvas Background (Blueprint Grid)
* **Rule**: NEVER use colorful radial spotlight gradients, neon glows, or glowing halos.
* **Implementation**: Use a solid OLED pitch-black background (`#060606` or `#020202`) overlaid with a highly precise 1px static charcoal grid system (`#121212` or `#111111`). Add a subtle radial vignette to slightly darken the outer edges.

### 2. 🎛️ IDE/Terminal Windows (macOS Style)
* **Rule**: Strip all glassmorphism blurs, heavy dropshadows, glowing borders, and bright neon title rings.
* **Implementation**: Windows should be styled as flat charcoal panels (`#0d0d0d`) with a razor-sharp border (`1px solid #1f1f1f`) and organic traffic lights (`#ff5f56`, `#ffbd2e`, `#27c93f`). Title bar headers should be small, muted gray, and styled in a clean monospace font.
* **Sizing & Scale**: Ensure window containers take up an appropriate amount of screen real estate for clean developer readability.
  - For Widescreen (1920x1080): Window width should be between `1200px` and `1400px` to occupy the focus area perfectly.
  - For Short-form (1080x1920): Window width should be between `900px` and `980px` to fit the portrait screen comfortably and ensure text legibility.

### 3. 🔠 Typography
* **Widescreen Headers**: Clash the expressiveness of a traditional literary serif font like **Fraunces** (`fontFamily: "'Fraunces', Georgia, serif"`, lightweight `fontWeight: 400`) with precise clean code layouts for a high-end platform aesthetic.
* **Subtitles & UI Text**: Use **Inter** (`fontFamily: "Inter, sans-serif"`, bold weights for active keywords, muted gray for inactive).
* **Monospace blocks**: Use **Geist Mono** or **JetBrains Mono**.
* **Global imports**: Make sure Google Fonts are imported at the top of the CSS stack:
  ```css
  @import url('https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,100..900;1,9..144,100..900&family=Inter:wght@100..900&display=swap');
  ```

### 4. 🎨 Pastels Syntax Highlight
* Avoid standard glowing IDE theme colors. Use a highly curated pastels highlight palette:
  - **Keyword/Function**: `#ebd49b` (Soft Amber)
  - **System Prompt/Outputs**: `#9bc3a5` (Sage Green)
  - **Literal/Strings**: `#e05a47` (Rose Red)
  - **Typing Cursor / Accent active state**: `#7faae4` (Slate Blue)

---

## 🗂️ Reusable Bundled Assets

To avoid writing complex animation logic from scratch, copy or import the pre-built professional components bundled within this skill's `assets/` directory:

1. [**`DeveloperComponents.tsx`**](file:///home/yasir/.agents/skills/05_marketing_design/video-as-code/assets/DeveloperComponents.tsx):

   **Sequential Scene Components:**
   * `<BlueprintGrid />` — Pitch-black OLED canvas with precision 72px charcoal grid and radial vignette.
   * `<GlassmacWindow />` — Flat graphite code frame with traffic lights. Accepts optional `tabs?: FileTab[]` prop for IDE-style file tab bar.
   * `<TypewriterCode />` — Human-like typing scheduler auto-scaled to `sceneDuration`. Features: `showLineNumbers`, `highlightLines`, active line tint.
   * `<CrispTerminal />` — Zero-glow terminal with organic cascade output timing.
   * `<SceneFade />` — Cross-fade wrapper for smooth opacity + scale transitions at scene boundaries.

   **Spatial Scene Components (for multi-panel layouts):**
   * `<FileTree />` — Flat charcoal file explorer with folder/file hierarchy and animated active-file highlight. Use for spatial scenes showing project structure.
   * `<BrowserMock />` — Full browser chrome with address bar (URL + highlighted path), traffic lights, and a content area for state transitions. Wraps child content.
   * `<NotFoundView />` / `<DashboardSkeleton />` — Pre-built browser state views for 404 and dashboard skeleton transitions. Use inside `<BrowserMock>`.
   * `<FloatingCode />` — Small positioned code snippet panel with syntax highlighting. For spatial scenes where code is a supporting element, not the main focus.

2. [**`AIVisualizers.tsx`**](file:///home/yasir/.agents/skills/05_marketing_design/video-as-code/assets/AIVisualizers.tsx):
   * Contains `<LLMToolLoop />` and `<RAGFlow />` schematics designed as flat, razor-sharp charcoal boxes with thin solid borders and pastels accents.

Copy these directly into the target project's `src/components/` directory when creating a new composition.

---

## 🎬 Custom Branding Option

See [**`branding.md`**](file:///home/yasir/.agents/skills/05_marketing_design/video-as-code/references/branding.md) for custom branding rules matching:
1. **Yasir Hassan Portfolio Style** (`yaasir.dev` - clean slate/anthropic pastels).
2. **Vercel / Next.js Style** (strict high-contrast monochrome & literary Fraunces serif titles).
3. **Ardaykaab Academy Style** (Excalidraw whiteboard schematic grids).

---

## 🔄 Video Schema Timeline Pattern

This skill uses a sequential schema timeline array to configure the scenes, making it extremely easy for any AI agent to produce a full technical video by simply rewriting the schema config.

### 📋 Composition Schema Interface
```typescript
export interface FileTab {
  name: string;
  icon?: string;    // e.g. "TS", "⚛", "📄"
  active?: boolean;
}

export interface SceneConfig {
  id: string;
  type: "title" | "terminal" | "code" | "preview";
  duration: number;        // in frames (usually 30 frames per second)
  title?: string;
  subtitle?: string;
  prompt?: string;
  outputs?: string[];
  code?: string[];
  filename?: string;
  tabs?: FileTab[];        // IDE file tab bar (code scenes)
  highlightLines?: number[]; // 1-indexed lines to accent-highlight
  url?: string;
}
```

### 🛠️ Step-by-Step Production Workflow

1. **Step 1: Ingest Script & Audio**:
   * Gather the speech transcription/audio. Break down the script into sequences of 3-5 seconds.
2. **Step 2: Define Scene Types**:
   * **Sequential**: `title` for title hooks, `terminal` for terminal commands, `code` for code typing demonstrations.
   * **Spatial**: For multi-panel layouts (file tree + browser + code), build a custom spatial scene using `<FileTree>`, `<BrowserMock>`, and `<FloatingCode>` positioned with absolute coordinates on the canvas.
3. **Step 3: Modify Timeline Config**:
   * Open the target timeline config (e.g. `src/compositions/VideoCreatorWorkflow.tsx` or `src/compositions/ShortFormWorkflow.tsx`) and update the `defaultTimeline` array with the new script scenes.
4. **Step 4: Sync Captions**:
   * For short-form videos, open the caption configuration array, split the text into timed arrays (mapped to the speech frames), and sync them with `<SpeechHook />` to produce professional visual cues.

---

## 🧩 Composition Patterns

### Sequential (Slide-Based)
Best for: Code tutorials, concept explanations, terminal demos.
Reference: `src/compositions/NextjsServerActions.tsx`

### Spatial (Multi-Panel)
Best for: Routing concepts, file→preview relationships, architecture overviews.
Reference: `src/compositions/NextjsPageRouter.tsx`

The spatial pattern places multiple components on screen simultaneously with staggered spring entrances, enabling cause-and-effect storytelling (e.g., "add this file → the 404 becomes a dashboard").
