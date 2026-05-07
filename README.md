# My Skills

This repository is a collection of 400+ specialized skills for AI agents. It includes the complete sets from Caveman, Superpowers, and Humanizer, along with hundreds of professional role definitions for various industries.

## Repository structure

All xirfado are located in the `skills` directory, grouped by their origin or category.

- `skills/caveman/`: Focuses on extreme token efficiency and brief, technical responses.
- `skills/superpowers/`: Covers a structured software development methodology, including TDD and brainstorming.
- `skills/humanizer/`: Contains the logic for removing AI patterns and artifacts from text.
- `skills/agency-*/`: Hundreds of specific roles ranging from backend architecture to SEO strategy.

## Setup

These skills are designed for agents that support directory-based skill loading, such as Antigravity, Claude Code, Cursor, and Gemini CLI.

### Windows

To use a skill locally, move its folder to your agent's configuration path.

```powershell
# Create the target directory
New-Item -ItemType Directory -Path "$HOME\.agents\skills" -Force

# Copy a specific skill set
Copy-Item -Path ".\skills\caveman" -Destination "$HOME\.agents\skills\" -Recurse
```

### macOS and Linux

```bash
# Create the target directory
mkdir -p ~/.agents/skills

# Copy a specific skill set
cp -r ./skills/humanizer ~/.agents/skills/
```

## Using skills in web interfaces

If you are using Claude.ai or ChatGPT, you can still apply these skills to your conversations.

1.  Open the `SKILL.md` file for the specific skill you want to use.
2.  Copy the entire content of the file.
3.  Paste it into the **Project Instructions** (on Claude) or **Custom Instructions** (on ChatGPT).

You can also upload the `SKILL.md` file directly to a chat and instruct the AI to follow those guidelines for the remainder of the session.

## Core skill sets

### Caveman
Designed for speed and cost-saving. It reduces output tokens by approximately 75% by using a telegraphic communication style. You can activate it by asking the agent to use "caveman mode."

### Humanizer
Analyzes text for common LLM artifacts like em-dash overuse, rule-of-three patterns, and inflated significance. It rewrites text to sound more like a natural human voice.

### Superpowers
A comprehensive development workflow. It forces the agent to follow a specific sequence: brainstorming requirements, creating an implementation plan, and then executing using Test-Driven Development.

## Adding new skills

To add to this collection, create a new subdirectory within `skills/` and include a `SKILL.md` file that follows the standard Antigravity frontmatter format.
