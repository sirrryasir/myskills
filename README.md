# 🚀 My Skills Repository

A comprehensive collection of **400+ AI Agent Skills** designed to give your AI assistants specialized superpowers. This repository includes the full suite of **Caveman**, **Superpowers**, and **Humanizer** skills, along with hundreds of agency-level professional roles.

---

## 📂 Repository Structure

- `skills/`: The core directory containing all skill bundles.
  - `caveman/`: Skills for token efficiency and terse communication.
  - `superpowers/`: Advanced software development methodology (TDD, Brainstorming, etc.).
  - `humanizer/`: Tools to make AI text sound human and natural.
  - `agency-*/`: Specialized professional roles (SEO, Backend Architect, etc.).

---

## 💻 Installation (Desktop/Laptop)

These skills work with modern AI agents like **Antigravity**, **Claude Code**, **Cursor**, and **Gemini CLI**.

### 🪟 Windows
Copy the desired folders to your local agents directory:
```powershell
# Create the directory if it doesn't exist
New-Item -ItemType Directory -Path "$HOME\.agents\skills" -Force

# Copy a skill (example: caveman)
Copy-Item -Path ".\skills\caveman" -Destination "$HOME\.agents\skills\" -Recurse
```

### 🍎 macOS & 🐧 Linux
Use the following commands in your terminal:
```bash
# Create the directory
mkdir -p ~/.agents/skills

# Copy a skill (example: humanizer)
cp -r ./skills/humanizer ~/.agents/skills/
```

---

## 🌐 Using with Web Interfaces (Claude.ai / ChatGPT)

Even if you don't use a local terminal agent, you can still use these skills in your browser!

### 1. Claude.ai Projects / Custom Instructions
1. Open the `SKILL.md` file of the skill you want to use.
2. Copy the entire text.
3. Paste it into:
   - **Claude.ai**: "Project Instructions" (for specific projects).
   - **ChatGPT**: "Custom Instructions" (for all chats).
   - **System Prompt**: Simply paste it at the start of a new chat and say: *"Follow these instructions for this session."*

### 2. Manual Triggering
You can also just upload the `SKILL.md` file to a chat and ask the AI to "Internalize this skill and use it for the rest of our conversation."

---

## 🛠️ Included Power-Skills

### 🪨 Caveman
- **Goal:** Talk less, save tokens (~75% reduction).
- **Trigger:** "Talk like caveman" or "Caveman mode".

### ✍️ Humanizer
- **Goal:** Remove "AI-isms" and make text sound natural.
- **Trigger:** "Humanize this text" or "Rewrite this in a human voice".

### 🦸 Superpowers
- **Goal:** Systematic software development.
- **Workflow:** `brainstorming` → `writing-plans` → `test-driven-development`.

---

## 🤝 Contributing
Feel free to add your own skills to the `skills/` folder! Make sure each skill is in its own directory with a `SKILL.md` file.

---

*Maintained by [Sirrryasir](https://github.com/sirrryasir)*
