# My Skills

This repository is a comprehensive library of over 400 specialized AI agent skills. While it features advanced toolsets like Caveman, Superpowers, and Humanizer, the bulk of the collection consists of hundreds of professional agency roles designed for high-level technical and business tasks.

## Repository structure

All skills are located in the `skills` directory, organized by category and origin.

- `skills/caveman/`: A set of 7 skills focused on extreme token efficiency.
- `skills/superpowers/`: A collection of 14 skills implementing a structured software development methodology.
- `skills/humanizer/`: Specialized logic for removing AI writing artifacts.
- `skills/agency-*/`: Over 400 distinct professional roles, including backend architects, SEO specialists, security auditors, and more.

## Setup

These skills are designed for agents that support directory-based skill loading, such as Antigravity, Claude Code, Cursor, and Gemini CLI.

### Windows

To use a skill locally, move its folder to your agent's configuration path.

```powershell
# Create the target directory
New-Item -ItemType Directory -Path "$HOME\.agents\skills" -Force

# Copy a specific skill set (e.g., the entire superpowers collection)
Copy-Item -Path ".\skills\superpowers" -Destination "$HOME\.agents\skills\" -Recurse
```

### macOS and Linux

```bash
# Create the target directory
mkdir -p ~/.agents/skills

# Copy a specific skill set
cp -r ./skills/humanizer ~/.agents/skills/
```

## Using skills in web interfaces

For browser-based tools like Claude.ai or ChatGPT, you can apply these skills manually.

1.  Navigate to the directory of the skill you want to use.
2.  Open the `SKILL.md` file.
3.  Copy its content and paste it into your **Project Instructions** or **Custom Instructions**.

## Skill categories

### Featured collections

These are the most advanced methodologies included in the repository:

- **Caveman**: Dramatically reduces output costs by enforcing a terse, telegraphic communication style.
- **Superpowers**: Provides an autonomous development workflow (Brainstorming → Planning → TDD).
- **Humanizer**: Audits text for "AI-isms" and rewrites it to sound natural and human-written.

### Professional Agency Library

The repository contains over 400 `agency-*` skills. These are highly specific professional personas that allow an agent to act as an expert in:

- **Engineering**: Backend architects, database optimizers, and security engineers.
- **Marketing**: SEO specialists, growth hackers, and content strategists.
- **Business**: CFO advisors, legal compliance checkers, and project managers.
- **Creative**: UI designers, game designers, and narrative architects.

## Adding new skills

To add to this collection, create a new subdirectory within `skills/` and include a `SKILL.md` file that follows the standard Antigravity frontmatter format.
