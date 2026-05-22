---
name: ardaykaab-slides
description: Use when the user asks to create, modify, or generate HTML slides and diagrams for Ardaykaab Academy courses. It enforces the "Lead Academy" whiteboard aesthetic for Excalidraw, macOS window styling for code blocks, and strict text centering rules for diagrams.
---

# Ardaykaab Academy Slide Generator Skill

This skill defines the technical implementation and visual aesthetic required for creating pedagogical slides at Ardaykaab Academy, specifically for backend video tutorials. 

When you need to add a new slide deck or modify an existing one, you must strictly follow these design systems to ensure consistency across all course materials.

## The Generation Pipeline

Ardaykaab slides are generated using a Python script (e.g., `build_ardaykaab_slides.py`) that outputs standalone HTML files containing embedded React, Excalidraw, and Highlight.js via CDNs. 

## 1. Excalidraw Diagram Aesthetic ("Lead Academy" Style)

The diagrams must look like they were sketched on a professional dark whiteboard.
Whenever creating or updating Excalidraw JSON elements within the Python script, strictly enforce these properties:

### Shape Properties
- `fillStyle`: `"hachure"` (Always use the sketchy fill, never "solid").
- `roughness`: `1` (Provides a natural, hand-drawn look).
- `backgroundColor`: `"transparent"` (Shapes must let the dark background show through).
- `strokeColor`: Use `#ffffff` (White) for base shapes and `#FF6000` (Ardaykaab Orange) for accent shapes, arrows, or titles.
- `strokeWidth`: `2` or `3` (for thick, visible lines).

### Text Properties
- Typography must be LARGE and spacious. Never use font sizes below `20` for diagrams meant to be read on a video.
- `fontSize`: Typically `20` to `24` for standard text, and `32` for titles.
- `fontFamily`: `1` (Virgil/Hand-drawn) for regular text, `2` (Helvetica) or `3` (Cascadia) for code snippets inside diagrams.

### ⚠️ CRITICAL: Text Centering Bug in Excalidraw UMD
When embedding static JSON into the Excalidraw React component, the auto-layout engine (`boundElements`, `containerId`, `verticalAlign: "middle"`) often fails to correctly center text vertically on the first render, pushing text to the top of its container.

**Do NOT use auto-centering.** To perfectly center text inside a shape (like a box or circle), you MUST:
1. Strip out `containerId`, `boundElements`, and `verticalAlign`.
2. Manually calculate the exact `Y` coordinate for the text to offset it from the top of the container.
3. Manually set the `width` and `height` of the text element to match its container.
4. Set `"textAlign": "center"`.

**Correct Example (Manual Centering):**
```json
// The Box
{"type": "rectangle", "id": "box1", "x": 100, "y": 150, "width": 240, "height": 80, "strokeColor": "#ffffff", "backgroundColor": "transparent", "fillStyle": "hachure", "strokeWidth": 2, "roughness": 1}

// The Text (Notice X, Width match exactly. Y is manually shifted down to 175 to account for text height, no containerId used)
{"type": "text", "id": "t1", "x": 100, "y": 175, "width": 240, "height": 30, "text": "Route 1 Crash", "fontSize": 20, "fontFamily": 1, "strokeColor": "#ffffff", "roughness": 1, "textAlign": "center"}
```

## 2. Code Block Aesthetic (macOS Windows)

Code blocks must look like native macOS terminal or editor windows, not standard markdown blocks. 
Always use the `make_mac_code` helper function (or equivalent HTML structure) when injecting code:

```html
<div class="mac-window">
  <div class="mac-header">
    <div class="mac-buttons">
      <span class="mac-btn close"></span>
      <span class="mac-btn minimize"></span>
      <span class="mac-btn expand"></span>
    </div>
    <div class="mac-title">filename.js</div>
  </div>
  <pre><code class="language-javascript">
// Your code here
  </code></pre>
</div>
```

**Styling Requirements:**
- Background: Very dark grey/black (`#0d1117`).
- Traffic light buttons: `#ff5f56`, `#ffbd2e`, `#27c93f`.
- Syntax Highlighting: Must use `Highlight.js` included in the HTML template via CDN (e.g., `atom-one-dark` or `github-dark` theme).

## 3. Highlights and Annotations (Underlines & Circles)

A key part of the Lead Academy aesthetic is the strategic use of hand-drawn annotations to draw attention to specific parts of the text or diagram.

**⚠️ CRITICAL RULE:** Do NOT randomly add highlights to every slide. Highlighting is **not mandatory**. It should only be used when a specific word, phrase, or label genuinely needs emphasis (e.g., to guide the viewer's eye to the core takeaway).

When you do need to emphasize something, use one of these two methods:

### Method A: The Underline (For phrases or sentences)
Use a hand-drawn line (`type: "line"`) placed underneath the text you want to emphasize.
- Examples: Underlining "Context Engineering", "clearly,", or "One Protocol. Every Service."
- Properties: `strokeColor: "#FF6000"`, `roughness: 2` or `3`, `strokeWidth: 3` or `4`.

### Method B: The Circle/Pill (For small labels or single keywords)
Use a hand-drawn ellipse (`type: "ellipse"`) around a short label.
- Examples: Circling a label like "SLIDE 9" or a single critical metric.
- Properties: `strokeColor: "#FF6000"`, `backgroundColor: "transparent"`, `fillStyle: "hachure"`, `roughness: 2`, `strokeWidth: 2`.

## 4. Slide Layouts

- Always use `grid-2` for comparing Concepts vs Solutions.
- Do not cram information into one slide. Break complex concepts into multiple slides.
- Use `var(--accent-primary)` (which should be `#FF6000`) to highlight key words in standard HTML headings.

Following this skill ensures all future curriculum additions remain professional, visually engaging, and consistent with the Ardaykaab Academy brand.
