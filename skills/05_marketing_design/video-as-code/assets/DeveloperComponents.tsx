import React from "react";
import {
  AbsoluteFill,
  useVideoConfig,
  interpolate,
  spring,
} from "remotion";

// ============================================================
// SPRING PHYSICS — Snappy elastic overshoot entrance
// ============================================================
const snappySpring = (frame: number, fps: number, delay = 0) => {
  return spring({
    frame: frame - delay,
    fps,
    config: {
      damping: 12,
      mass: 0.5,
      stiffness: 120,
    },
  });
};

// ============================================================
// 1. BLUEPRINT GRID — Pitch-black OLED with precision grid
// ============================================================
export const BlueprintGrid: React.FC = () => {
  return (
    <AbsoluteFill style={{ backgroundColor: "#060606", overflow: "hidden" }}>
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage: `
            linear-gradient(to right, #121212 1px, transparent 1px),
            linear-gradient(to bottom, #121212 1px, transparent 1px)
          `,
          backgroundSize: "72px 72px",
          opacity: 0.85,
        }}
      />
      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "radial-gradient(circle at center, transparent 20%, #060606 85%)",
          pointerEvents: "none",
        }}
      />
    </AbsoluteFill>
  );
};

// ============================================================
// 2. GLASSMAC WINDOW — Flat charcoal panel with file tabs
// ============================================================
export interface FileTab {
  name: string;
  icon?: string; // emoji or short string like "TS" or "⚛"
  active?: boolean;
}

export const GlassmacWindow: React.FC<{
  children: React.ReactNode;
  title?: string;
  tabs?: FileTab[];
  style?: React.CSSProperties;
  frame: number;
  entranceDelay?: number;
}> = ({
  children,
  title = "untitled.tsx",
  tabs,
  style,
  frame,
  entranceDelay = 0,
}) => {
  const { fps } = useVideoConfig();
  const entrance = snappySpring(frame, fps, entranceDelay);

  const scale = interpolate(entrance, [0, 1], [0.96, 1]);
  const translateY = interpolate(entrance, [0, 1], [40, 0]);
  const opacity = interpolate(entrance, [0, 1], [0, 1]);

  return (
    <div
      style={{
        transform: `translateY(${translateY}px) scale(${scale})`,
        opacity,
        backgroundColor: "#0d0d0d",
        border: "1px solid #1f1f1f",
        borderRadius: 12,
        boxShadow: "0 25px 60px rgba(0, 0, 0, 0.8)",
        overflow: "hidden",
        display: "flex",
        flexDirection: "column",
        width: "100%",
        fontFamily: "Inter, -apple-system, sans-serif",
        ...style,
      }}
    >
      {/* Traffic-light header */}
      <div
        style={{
          height: 40,
          backgroundColor: "#121212",
          display: "flex",
          alignItems: "center",
          padding: "0 18px",
          position: "relative",
          borderBottom: tabs ? "none" : "1px solid #1f1f1f",
        }}
      >
        <div style={{ display: "flex", gap: 7, zIndex: 10 }}>
          <div
            style={{
              width: 11,
              height: 11,
              borderRadius: 6,
              backgroundColor: "#e05a47",
              opacity: 0.8,
            }}
          />
          <div
            style={{
              width: 11,
              height: 11,
              borderRadius: 6,
              backgroundColor: "#e2b34c",
              opacity: 0.8,
            }}
          />
          <div
            style={{
              width: 11,
              height: 11,
              borderRadius: 6,
              backgroundColor: "#3dbb56",
              opacity: 0.8,
            }}
          />
        </div>
        {/* Center title (only if no tabs) */}
        {!tabs && (
          <div
            style={{
              position: "absolute",
              inset: 0,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "#88888e",
              fontSize: 13,
              fontWeight: 500,
              fontFamily: "'Geist Mono', monospace",
              letterSpacing: "-0.01em",
            }}
          >
            {title}
          </div>
        )}
      </div>

      {/* File tab bar */}
      {tabs && (
        <div
          style={{
            display: "flex",
            backgroundColor: "#0a0a0a",
            borderBottom: "1px solid #1f1f1f",
            height: 36,
            alignItems: "stretch",
            overflow: "hidden",
          }}
        >
          {tabs.map((tab, i) => (
            <div
              key={i}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 6,
                padding: "0 16px",
                fontSize: 13,
                fontFamily: "'Geist Mono', monospace",
                color: tab.active ? "#e4e4e7" : "#52525b",
                backgroundColor: tab.active ? "#0d0d0d" : "transparent",
                borderRight: "1px solid #1a1a1a",
                borderBottom: tab.active
                  ? "2px solid #e05a47"
                  : "2px solid transparent",
                cursor: "default",
                whiteSpace: "nowrap",
              }}
            >
              {tab.icon && (
                <span style={{ fontSize: 12, opacity: 0.7 }}>{tab.icon}</span>
              )}
              {tab.name}
            </div>
          ))}
        </div>
      )}

      {/* Body */}
      <div
        style={{
          flex: 1,
          padding: 24,
          position: "relative",
          overflow: "hidden",
        }}
      >
        {children}
      </div>
    </div>
  );
};

// ============================================================
// 3. PASTEL SYNTAX LEXER — Improved tokenizer
// ============================================================
const PASTEL_TOKEN_COLORS: Record<string, string> = {
  keyword: "#e05a47",
  component: "#ebd49b",
  string: "#9bc3a5",
  tag: "#7faae4",
  punctuation: "#636369",
  text: "#e4e4e7",
  comment: "#52525b",
  type: "#ebd49b",
  number: "#d19a66",
  property: "#c8ccd4",
};

function tokenizeLine(line: string): { text: string; color: string }[] {
  const tokens: { text: string; color: string }[] = [];
  let i = 0;

  while (i < line.length) {
    // Whitespace
    if (line[i] === " " || line[i] === "\t") {
      let ws = "";
      while (i < line.length && (line[i] === " " || line[i] === "\t")) {
        ws += line[i];
        i++;
      }
      tokens.push({ text: ws, color: PASTEL_TOKEN_COLORS.text });
      continue;
    }

    // Line comments
    if (line[i] === "/" && line[i + 1] === "/") {
      tokens.push({ text: line.slice(i), color: PASTEL_TOKEN_COLORS.comment });
      break;
    }

    // Strings (single, double, backtick)
    if (line[i] === '"' || line[i] === "'" || line[i] === "`") {
      const quote = line[i];
      let str = quote;
      i++;
      while (i < line.length && line[i] !== quote) {
        if (line[i] === "\\") {
          str += line[i];
          i++;
        }
        if (i < line.length) {
          str += line[i];
          i++;
        }
      }
      if (i < line.length) {
        str += line[i];
        i++;
      }
      tokens.push({ text: str, color: PASTEL_TOKEN_COLORS.string });
      continue;
    }

    // JSX tags: < /> or < >
    if (line[i] === "<") {
      let tag = "<";
      i++;
      if (i < line.length && line[i] === "/") {
        tag += "/";
        i++;
      }
      // Consume tag name
      while (i < line.length && /[a-zA-Z0-9._-]/.test(line[i])) {
        tag += line[i];
        i++;
      }
      tokens.push({ text: tag, color: PASTEL_TOKEN_COLORS.tag });
      continue;
    }

    if (line[i] === ">" || (line[i] === "/" && line[i + 1] === ">")) {
      if (line[i] === "/" && line[i + 1] === ">") {
        tokens.push({ text: "/>", color: PASTEL_TOKEN_COLORS.tag });
        i += 2;
      } else {
        tokens.push({ text: ">", color: PASTEL_TOKEN_COLORS.tag });
        i++;
      }
      continue;
    }

    // Punctuation
    if (/[{}()[\].,;:=+\-*!?&|@#]/.test(line[i])) {
      // Multi-char operators
      const twoChar = line.slice(i, i + 2);
      const threeChar = line.slice(i, i + 3);
      if (
        threeChar === "===" ||
        threeChar === "!==" ||
        threeChar === "..."
      ) {
        tokens.push({
          text: threeChar,
          color: PASTEL_TOKEN_COLORS.punctuation,
        });
        i += 3;
        continue;
      }
      if (
        twoChar === "=>" ||
        twoChar === "==" ||
        twoChar === "!=" ||
        twoChar === "+=" ||
        twoChar === "-=" ||
        twoChar === "&&" ||
        twoChar === "||"
      ) {
        tokens.push({
          text: twoChar,
          color: PASTEL_TOKEN_COLORS.punctuation,
        });
        i += 2;
        continue;
      }
      tokens.push({
        text: line[i],
        color: PASTEL_TOKEN_COLORS.punctuation,
      });
      i++;
      continue;
    }

    // Words (identifiers, keywords)
    if (/[a-zA-Z_$]/.test(line[i])) {
      let word = "";
      while (i < line.length && /[a-zA-Z0-9_$]/.test(line[i])) {
        word += line[i];
        i++;
      }

      const KEYWORDS = new Set([
        "import",
        "export",
        "default",
        "function",
        "const",
        "let",
        "var",
        "return",
        "if",
        "else",
        "await",
        "async",
        "from",
        "class",
        "extends",
        "new",
        "typeof",
        "type",
        "interface",
        "implements",
        "throw",
        "try",
        "catch",
        "finally",
        "for",
        "while",
        "of",
        "in",
        "switch",
        "case",
        "break",
        "continue",
        "void",
        "null",
        "undefined",
      ]);

      const COMPONENTS = new Set([
        "React",
        "AbsoluteFill",
        "Sequence",
        "spring",
        "interpolate",
        "useCurrentFrame",
        "useVideoConfig",
        "useState",
        "useEffect",
        "useCallback",
        "useMemo",
        "useRef",
        "FormData",
        "Promise",
        "console",
        "document",
        "window",
        "JSON",
        "Math",
        "Date",
        "Array",
        "Object",
        "String",
        "Number",
        "Boolean",
        "Map",
        "Set",
        "Error",
      ]);

      if (KEYWORDS.has(word)) {
        tokens.push({ text: word, color: PASTEL_TOKEN_COLORS.keyword });
      } else if (COMPONENTS.has(word)) {
        tokens.push({ text: word, color: PASTEL_TOKEN_COLORS.component });
      } else if (/^[A-Z]/.test(word)) {
        // PascalCase = likely component/type
        tokens.push({ text: word, color: PASTEL_TOKEN_COLORS.type });
      } else if (/^(true|false)$/.test(word)) {
        tokens.push({ text: word, color: PASTEL_TOKEN_COLORS.number });
      } else {
        tokens.push({ text: word, color: PASTEL_TOKEN_COLORS.text });
      }
      continue;
    }

    // Numbers
    if (/[0-9]/.test(line[i])) {
      let num = "";
      while (i < line.length && /[0-9.]/.test(line[i])) {
        num += line[i];
        i++;
      }
      tokens.push({ text: num, color: PASTEL_TOKEN_COLORS.number });
      continue;
    }

    // Fallback: single character
    tokens.push({ text: line[i], color: PASTEL_TOKEN_COLORS.text });
    i++;
  }

  return tokens;
}

// ============================================================
// 4. TYPING SCHEDULE — Auto-scaled to fit scene duration
// ============================================================
interface TypingSchedule {
  charFrames: Record<string, number>;
  lineEndFrames: Record<number, number>;
  totalDuration: number;
}

function buildTypingSchedule(
  code: string[],
  targetFrames: number
): TypingSchedule {
  // Phase 1: Build raw weighted timeline (unscaled)
  const rawCharWeights: { lineIndex: number; charIndex: number; weight: number }[] = [];
  const rawLineEndWeights: { lineIndex: number; weight: number }[] = [];
  let totalWeight = 5; // Initial pause weight

  for (let lineIndex = 0; lineIndex < code.length; lineIndex++) {
    const line = code[lineIndex];

    if (line.trim().length === 0) {
      totalWeight += 4;
      rawLineEndWeights.push({ lineIndex, weight: totalWeight });
      continue;
    }

    // Inter-line pause
    totalWeight += 8;

    let isIndenting = true;
    for (let charIndex = 0; charIndex < line.length; charIndex++) {
      const char = line[charIndex];

      if ((char === " " || char === "\t") && isIndenting) {
        totalWeight += 0.2; // Indents are near-instant
        rawCharWeights.push({ lineIndex, charIndex, weight: totalWeight });
        continue;
      }
      isIndenting = false;

      let charWeight = 1.0; // Base character weight
      // Organic variance
      charWeight += Math.sin(charIndex * 0.8) * 0.3;

      // Hesitation on structural punctuation
      if ("(){}[]".includes(char)) {
        charWeight += 2.0;
      } else if (";,".includes(char)) {
        charWeight += 3.0;
      } else if ("=><".includes(char)) {
        charWeight += 1.5;
      }

      totalWeight += Math.max(0.3, charWeight);
      rawCharWeights.push({ lineIndex, charIndex, weight: totalWeight });
    }

    // End-of-line pause (Enter key + thinking)
    totalWeight += 12;
    rawLineEndWeights.push({ lineIndex, weight: totalWeight });
  }

  // Phase 2: Scale all weights to fit within targetFrames
  // Leave 20% margin at the end so typing finishes before scene fades
  const usableFrames = targetFrames * 0.80;
  const scale = usableFrames / totalWeight;

  const charFrames: Record<string, number> = {};
  const lineEndFrames: Record<number, number> = {};

  for (const entry of rawCharWeights) {
    charFrames[`${entry.lineIndex}-${entry.charIndex}`] = entry.weight * scale;
  }
  for (const entry of rawLineEndWeights) {
    lineEndFrames[entry.lineIndex] = entry.weight * scale;
  }

  return { charFrames, lineEndFrames, totalDuration: totalWeight * scale };
}

// ============================================================
// 5. TYPEWRITER CODE — With line numbers + active line
// ============================================================
export const TypewriterCode: React.FC<{
  code: string[];
  frame: number;
  sceneDuration?: number;
  startDelay?: number;
  highlightLines?: number[];
  showLineNumbers?: boolean;
}> = ({
  code,
  frame,
  sceneDuration = 180,
  startDelay = 15,
  highlightLines = [],
  showLineNumbers = true,
}) => {
  const relativeFrame = Math.max(0, frame - startDelay);
  const availableFrames = sceneDuration - startDelay;

  const { charFrames, lineEndFrames } = React.useMemo(
    () => buildTypingSchedule(code, availableFrames),
    [code, availableFrames]
  );

  const activeLineIndex = code.findIndex(
    (_, idx) => relativeFrame < (lineEndFrames[idx] || 0)
  );
  const finalActiveLineIndex =
    activeLineIndex === -1 ? code.length - 1 : activeLineIndex;

  const highlightSet = new Set(highlightLines);

  // Calculate the widest line number for alignment
  const lineNumberWidth = String(code.length).length;

  return (
    <div
      style={{
        fontFamily: "'Geist Mono', monospace",
        fontSize: 15,
        lineHeight: 1.75,
        color: PASTEL_TOKEN_COLORS.text,
        textAlign: "left",
      }}
    >
      {code.map((line, lineIndex) => {
        const tokens = tokenizeLine(line);
        let charIndexOffset = 0;

        // Is this line started typing yet?
        const prevLineEnd =
          lineIndex > 0 ? lineEndFrames[lineIndex - 1] || 0 : 0;
        const lineStarted = relativeFrame > prevLineEnd;
        // Is this line fully typed?
        const lineFullyTyped =
          relativeFrame >= (lineEndFrames[lineIndex] || 0);

        const renderedTokens = tokens.map((token, tokenIndex) => {
          let renderedText = "";

          for (let i = 0; i < token.text.length; i++) {
            const absIdx = charIndexOffset + i;
            const scheduledFrame = charFrames[`${lineIndex}-${absIdx}`];

            if (scheduledFrame === undefined) {
              // Whitespace that wasn't scheduled — show if line started
              if (lineStarted) renderedText += token.text[i];
            } else if (scheduledFrame <= relativeFrame) {
              renderedText += token.text[i];
            }
          }

          charIndexOffset += token.text.length;
          if (renderedText.length === 0) return null;

          return (
            <span key={`${lineIndex}-${tokenIndex}`} style={{ color: token.color }}>
              {renderedText}
            </span>
          );
        });

        const isActive = lineIndex === finalActiveLineIndex;
        const isHighlighted = highlightSet.has(lineIndex + 1);
        const cursorBlink = Math.floor(frame / 6) % 2 === 0;

        // Active line background
        let rowBg = "transparent";
        if (isActive && !lineFullyTyped) {
          rowBg = "rgba(224, 90, 71, 0.05)";
        } else if (isHighlighted) {
          rowBg = "rgba(127, 170, 228, 0.07)";
        }

        return (
          <div
            key={lineIndex}
            style={{
              whiteSpace: "pre",
              display: "flex",
              alignItems: "center",
              backgroundColor: rowBg,
              borderLeft: isHighlighted
                ? "2px solid rgba(127, 170, 228, 0.4)"
                : "2px solid transparent",
              paddingLeft: 8,
              paddingRight: 12,
              marginLeft: -10,
              marginRight: -12,
              borderRadius: 2,
              transition: "background-color 0.15s ease",
              minHeight: 26,
            }}
          >
            {/* Line number gutter */}
            {showLineNumbers && (
              <span
                style={{
                  display: "inline-block",
                  width: lineNumberWidth * 10 + 8,
                  textAlign: "right",
                  color: isActive ? "#636369" : "#2a2a2e",
                  fontSize: 13,
                  marginRight: 20,
                  userSelect: "none",
                  flexShrink: 0,
                }}
              >
                {lineIndex + 1}
              </span>
            )}
            {/* Code content — NO flex:1 so cursor stays inline */}
            <span>{renderedTokens}</span>
            {/* Blinking cursor */}
            {isActive && !lineFullyTyped && (
              <span
                style={{
                  display: "inline-block",
                  width: 8,
                  height: 17,
                  backgroundColor: "#e05a47",
                  marginLeft: 2,
                  opacity: cursorBlink ? 1 : 0,
                  flexShrink: 0,
                }}
              />
            )}
          </div>
        );
      })}
    </div>
  );
};

// ============================================================
// 6. CRISP TERMINAL — Solid black with organic cascade output
// ============================================================
export const CrispTerminal: React.FC<{
  frame: number;
  prompt: string;
  outputs: string[];
  startDelay?: number;
  typingSpeed?: number;
  outputDelay?: number;
}> = ({
  frame,
  prompt,
  outputs,
  startDelay = 10,
  typingSpeed = 0.5,
  outputDelay = 15,
}) => {
  const relativeFrame = Math.max(0, frame - startDelay);
  const promptTypedLength = Math.floor(relativeFrame * typingSpeed);
  const promptCompleted = promptTypedLength >= prompt.length;

  const currentPrompt = prompt.slice(0, promptTypedLength);
  const showCursor = !promptCompleted || Math.floor(frame / 8) % 2 === 0;

  const outputStartFrame =
    startDelay + prompt.length / typingSpeed + outputDelay;

  // Organic cascade: first lines fast, pause before "success"
  const getOutputVisible = (idx: number) => {
    let cumDelay = 0;
    for (let j = 0; j <= idx; j++) {
      cumDelay += j < 2 ? 6 : j < 3 ? 18 : 30;
    }
    return frame >= outputStartFrame + cumDelay;
  };

  return (
    <div
      style={{
        fontFamily: "'Geist Mono', monospace",
        fontSize: 15,
        color: "#e4e4e7",
        backgroundColor: "#080808",
        borderRadius: 8,
        border: "1px solid #1f1f1f",
        padding: 20,
        boxShadow: "0 20px 40px rgba(0, 0, 0, 0.7)",
      }}
    >
      <div style={{ display: "flex", alignItems: "center", marginBottom: 12 }}>
        <span style={{ color: "#e05a47", marginRight: 10, fontWeight: "bold" }}>
          ❯
        </span>
        <span style={{ color: "#e4e4e7" }}>{currentPrompt}</span>
        {showCursor && (
          <div
            style={{
              width: 8,
              height: 16,
              backgroundColor: "#e05a47",
              marginLeft: 2,
            }}
          />
        )}
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
        {outputs.map((line, i) => {
          if (!getOutputVisible(i)) return null;
          let color = "#88888e";
          if (
            line.toLowerCase().includes("success") ||
            line.toLowerCase().includes("done") ||
            line.toLowerCase().includes("ready") ||
            line.toLowerCase().includes("✓")
          ) {
            color = "#9bc3a5";
          } else if (
            line.toLowerCase().includes("warn") ||
            line.toLowerCase().includes("compile")
          ) {
            color = "#ebd49b";
          } else if (
            line.toLowerCase().includes("error") ||
            line.toLowerCase().includes("fail")
          ) {
            color = "#e05a47";
          }
          return (
            <div key={i} style={{ color, fontSize: 14, lineHeight: 1.5 }}>
              {line}
            </div>
          );
        })}
      </div>
    </div>
  );
};

// ============================================================
// 7. SCENE CROSS-FADE WRAPPER — Smooth opacity transitions
// ============================================================
export const SceneFade: React.FC<{
  children: React.ReactNode;
  frame: number;
  duration: number;
  fadeIn?: number;
  fadeOut?: number;
}> = ({ children, frame, duration, fadeIn = 12, fadeOut = 12 }) => {
  const opacity = interpolate(
    frame,
    [0, fadeIn, duration - fadeOut, duration],
    [0, 1, 1, 0],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );

  const scale = interpolate(
    frame,
    [0, fadeIn, duration - fadeOut, duration],
    [0.97, 1, 1, 0.97],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );

  return (
    <AbsoluteFill
      style={{
        opacity,
        transform: `scale(${scale})`,
      }}
    >
      {children}
    </AbsoluteFill>
  );
};

// ============================================================
// 8. FILE TREE — Flat charcoal file explorer panel
// ============================================================
export interface FileTreeItem {
  name: string;
  indent: number; // 0 = root, 1 = child, 2 = grandchild
  isActive?: boolean;
  icon?: string; // "▸" for folders, "  " for files
}

export const FileTree: React.FC<{
  files: FileTreeItem[];
  frame: number;
  entranceDelay?: number;
  style?: React.CSSProperties;
}> = ({ files, frame, entranceDelay = 0, style }) => {
  const { fps } = useVideoConfig();
  const entrance = snappySpring(frame, fps, entranceDelay);

  const translateY = interpolate(entrance, [0, 1], [40, 0]);
  const opacity = interpolate(entrance, [0, 1], [0, 1]);

  // Active file highlight animation
  const highlightSpring = spring({
    frame: frame - entranceDelay - 15,
    fps,
    config: { damping: 14, mass: 0.5, stiffness: 100 },
  });

  return (
    <div
      style={{
        transform: `translateY(${translateY}px)`,
        opacity,
        backgroundColor: "#0d0d0d",
        border: "1px solid #1f1f1f",
        borderRadius: 12,
        padding: "16px 0",
        fontFamily: "'Geist Mono', monospace",
        fontSize: 14,
        color: "#88888e",
        display: "flex",
        flexDirection: "column",
        gap: 2,
        boxShadow: "0 20px 50px rgba(0, 0, 0, 0.6)",
        ...style,
      }}
    >
      {files.map((file, i) => (
        <div
          key={i}
          style={{
            padding: "7px 16px",
            paddingLeft: 16 + file.indent * 18,
            position: "relative",
            color: file.isActive ? "#e4e4e7" : "#88888e",
            fontWeight: file.isActive ? 500 : 400,
            display: "flex",
            alignItems: "center",
            gap: 6,
          }}
        >
          {/* Active file highlight background */}
          {file.isActive && (
            <div
              style={{
                position: "absolute",
                inset: "0 8px",
                backgroundColor: "rgba(224, 90, 71, 0.08)",
                border: "1px solid rgba(224, 90, 71, 0.2)",
                borderRadius: 6,
                zIndex: -1,
                opacity: highlightSpring,
              }}
            />
          )}
          <span style={{ color: "#52525b", fontSize: 12 }}>
            {file.icon || "  "}
          </span>
          {file.name}
        </div>
      ))}
    </div>
  );
};

// ============================================================
// 9. BROWSER MOCK — Address bar + preview with state transition
// ============================================================
export const BrowserMock: React.FC<{
  url: string;
  highlightPath?: string;
  frame: number;
  entranceDelay?: number;
  children: React.ReactNode;
  style?: React.CSSProperties;
}> = ({ url, highlightPath, frame, entranceDelay = 0, children, style }) => {
  const { fps } = useVideoConfig();
  const entrance = snappySpring(frame, fps, entranceDelay);

  const translateY = interpolate(entrance, [0, 1], [40, 0]);
  const scale = interpolate(entrance, [0, 1], [0.97, 1]);
  const opacity = interpolate(entrance, [0, 1], [0, 1]);

  return (
    <div
      style={{
        transform: `translateY(${translateY}px) scale(${scale})`,
        opacity,
        backgroundColor: "#0d0d0d",
        border: "1px solid #1f1f1f",
        borderRadius: 12,
        overflow: "hidden",
        display: "flex",
        flexDirection: "column",
        boxShadow: "0 25px 60px rgba(0, 0, 0, 0.7)",
        ...style,
      }}
    >
      {/* Address bar */}
      <div
        style={{
          height: 44,
          backgroundColor: "#121212",
          borderBottom: "1px solid #1f1f1f",
          display: "flex",
          alignItems: "center",
          padding: "0 16px",
          gap: 12,
        }}
      >
        {/* Traffic lights */}
        <div style={{ display: "flex", gap: 7 }}>
          <div style={{ width: 11, height: 11, borderRadius: 6, backgroundColor: "#e05a47", opacity: 0.8 }} />
          <div style={{ width: 11, height: 11, borderRadius: 6, backgroundColor: "#e2b34c", opacity: 0.8 }} />
          <div style={{ width: 11, height: 11, borderRadius: 6, backgroundColor: "#3dbb56", opacity: 0.8 }} />
        </div>
        {/* Refresh icon */}
        <span style={{ color: "#52525b", fontSize: 14 }}>↻</span>
        {/* URL */}
        <div
          style={{
            flex: 1,
            height: 28,
            backgroundColor: "#0a0a0a",
            borderRadius: 6,
            border: "1px solid #1a1a1a",
            display: "flex",
            alignItems: "center",
            padding: "0 12px",
            fontFamily: "'Geist Mono', monospace",
            fontSize: 13,
            color: "#52525b",
          }}
        >
          {url}
          {highlightPath && (
            <span style={{ color: "#e4e4e7" }}>{highlightPath}</span>
          )}
        </div>
      </div>

      {/* Preview content area */}
      <div
        style={{
          flex: 1,
          position: "relative",
          backgroundColor: "#080808",
          overflow: "hidden",
        }}
      >
        {children}
      </div>
    </div>
  );
};

// ============================================================
// 10. BROWSER STATE VIEWS — 404 and Dashboard skeleton
// ============================================================
export const NotFoundView: React.FC<{ opacity?: number }> = ({ opacity = 1 }) => {
  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        fontFamily: "Inter, -apple-system, sans-serif",
        opacity,
      }}
    >
      <span style={{ color: "#e4e4e7", fontWeight: 700, fontSize: 34, marginRight: 16 }}>
        404
      </span>
      <div style={{ width: 1, height: 40, backgroundColor: "#1f1f1f", marginRight: 16 }} />
      <span style={{ color: "#52525b", fontSize: 22, fontWeight: 400 }}>
        This page could not be found.
      </span>
    </div>
  );
};

export const DashboardSkeleton: React.FC<{ opacity?: number }> = ({ opacity = 1 }) => {
  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        padding: 32,
        opacity,
        display: "flex",
        flexDirection: "column",
        gap: 16,
      }}
    >
      <h2 style={{ color: "#e4e4e7", fontFamily: "Inter, sans-serif", fontSize: 22, fontWeight: 600, margin: 0 }}>
        Dashboard
      </h2>
      {/* Stat cards row */}
      <div style={{ display: "flex", gap: 14 }}>
        {[1, 2, 3].map((i) => (
          <div
            key={i}
            style={{
              flex: 1,
              height: 80,
              backgroundColor: "#111111",
              border: "1px solid #1a1a1a",
              borderRadius: 8,
            }}
          />
        ))}
      </div>
      {/* Chart + sidebar row */}
      <div style={{ display: "flex", gap: 14, flex: 1 }}>
        <div
          style={{
            flex: 2,
            backgroundColor: "#111111",
            border: "1px solid #1a1a1a",
            borderRadius: 8,
            position: "relative",
            overflow: "hidden",
          }}
        >
          {/* Minimal chart bars */}
          {[40, 100, 160, 220, 280].map((x, i) => (
            <div
              key={i}
              style={{
                position: "absolute",
                bottom: 16,
                left: x,
                width: 32,
                height: [120, 200, 150, 250, 90][i],
                background: `rgba(224, 90, 71, ${0.08 + i * 0.04})`,
                borderRadius: "4px 4px 0 0",
              }}
            />
          ))}
        </div>
        <div
          style={{
            flex: 1,
            backgroundColor: "#111111",
            border: "1px solid #1a1a1a",
            borderRadius: 8,
            padding: 20,
            display: "flex",
            flexDirection: "column",
            gap: 14,
          }}
        >
          {[100, 80, 90, 60].map((w, i) => (
            <div
              key={i}
              style={{
                width: `${w}%`,
                height: 14,
                borderRadius: 7,
                backgroundColor: "#1a1a1a",
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

// ============================================================
// 11. FLOATING CODE — Small positioned code snippet
// ============================================================
export const FloatingCode: React.FC<{
  code: string[];
  frame: number;
  entranceDelay?: number;
  style?: React.CSSProperties;
}> = ({ code, frame, entranceDelay = 0, style }) => {
  const { fps } = useVideoConfig();
  const entrance = snappySpring(frame, fps, entranceDelay);

  const translateY = interpolate(entrance, [0, 1], [40, 0]);
  const scale = interpolate(entrance, [0, 1], [0.95, 1]);
  const opacity = interpolate(entrance, [0, 1], [0, 1]);

  return (
    <div
      style={{
        transform: `translateY(${translateY}px) scale(${scale})`,
        opacity,
        backgroundColor: "#0d0d0d",
        border: "1px solid #1f1f1f",
        borderRadius: 10,
        padding: "18px 22px",
        fontFamily: "'Geist Mono', monospace",
        fontSize: 15,
        lineHeight: 1.7,
        boxShadow: "0 20px 50px rgba(0, 0, 0, 0.7)",
        ...style,
      }}
    >
      {code.map((line, i) => {
        const tokens = tokenizeLine(line);
        return (
          <div key={i} style={{ whiteSpace: "pre" }}>
            {tokens.map((t, j) => (
              <span key={j} style={{ color: t.color }}>{t.text}</span>
            ))}
          </div>
        );
      })}
    </div>
  );
};
