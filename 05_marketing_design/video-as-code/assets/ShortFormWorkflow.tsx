import React from "react";
import {
  AbsoluteFill,
  Series,
  useCurrentFrame,
  useVideoConfig,
  interpolate,
  spring,
} from "remotion";
import {
  BlueprintGrid,
  GlassmacWindow,
} from "../components/DelbaComponents";
import {
  MCPDiagram,
  RAGVisualizer,
  ToolCallingVisualizer,
} from "../components/AIVisualizers";

// --- HOOK TEXT COMPONENT WITH MONOCHROME / SOLID ACCENTS (NO GRADIENT AI SLOP) ---
const SpeechHook: React.FC<{
  text: string;
  coloredWords: string[];
  color?: string;
  frame: number;
  duration: number;
}> = ({ text, coloredWords, color = "#e05a47", frame, duration }) => {
  const { fps } = useVideoConfig();

  const entrance = spring({
    frame,
    fps,
    config: { damping: 18, mass: 0.7, stiffness: 120 },
  });

  const scale = interpolate(entrance, [0, 1], [0.96, 1]);
  const opacity = interpolate(frame, [0, 8, duration - 10, duration], [0, 1, 1, 0]);

  const words = text.split(" ");

  return (
    <div
      style={{
        width: "92%",
        textAlign: "center",
        transform: `scale(${scale})`,
        opacity,
        zIndex: 10,
        padding: "0 24px",
      }}
    >
      <h2
        style={{
          fontSize: 52,
          fontWeight: 800,
          color: "#ffffff",
          lineHeight: 1.35,
          letterSpacing: "-0.04em",
          margin: 0,
          fontFamily: "Inter, -apple-system, sans-serif",
        }}
      >
        {words.map((word, i) => {
          const cleanWord = word.replace(/[^a-zA-Z0-9\u00c0-\u017f]/g, "");
          const isHighlighted = coloredWords.some(
            (w) => w.toLowerCase() === cleanWord.toLowerCase()
          );

          return (
            <span
              key={i}
              style={{
                color: isHighlighted ? color : "rgba(255, 255, 255, 0.45)", // Solid clean highlighting
                fontWeight: isHighlighted ? 900 : 700,
                borderBottom: isHighlighted ? `3px solid ${color}` : "none", // Precision flat bottom line
                paddingBottom: isHighlighted ? 2 : 0,
                marginRight: 12,
                display: "inline-block",
                transition: "all 0.15s ease-out",
              }}
            >
              {word}
            </span>
          );
        })}
      </h2>
    </div>
  );
};

// --- DYNAMIC PORTRAIT LAYOUT FOR SCENES ---
interface PortraitSceneProps {
  id: string;
  title: string;
  speechText: string;
  highlightedSpeechWords: string[];
  speechColor: string;
  visualizerType: "mcp" | "rag" | "tool";
  duration: number;
  frame: number;
}

const PortraitScene: React.FC<PortraitSceneProps> = ({
  title,
  speechText,
  highlightedSpeechWords,
  speechColor,
  visualizerType,
  duration,
  frame,
}) => {
  const { fps } = useVideoConfig();

  // Snappy entrance for the visualizer window
  const windowEntrance = spring({
    frame,
    fps,
    config: { damping: 16, mass: 0.7, stiffness: 120 },
  });

  const windowTranslateY = interpolate(windowEntrance, [0, 1], [150, 0]);
  const windowOpacity = interpolate(windowEntrance, [0, 1], [0, 1]);

  return (
    <AbsoluteFill
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "120px 30px 140px 30px", // space for bottom reels captions
      }}
    >
      {/* 1. TOP HALF: PREMIUM COMPACT GRAPHICS WINDOW */}
      <div
        style={{
          width: "92%",
          maxWidth: 920,
          flex: 1.3,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          transform: `translateY(${windowTranslateY}px)`,
          opacity: windowOpacity,
        }}
      >
        <GlassmacWindow title={title} frame={frame} entranceDelay={0} style={{ height: "82%", width: "100%" }}>
          {visualizerType === "mcp" && <MCPDiagram frame={frame} delay={15} />}
          {visualizerType === "rag" && <RAGVisualizer frame={frame} delay={15} />}
          {visualizerType === "tool" && <ToolCallingVisualizer frame={frame} delay={15} />}
        </GlassmacWindow>
      </div>

      {/* 2. GAP / DIVIDER */}
      <div style={{ height: 20 }} />

      {/* 3. BOTTOM HALF: BOLD, SYNC'ED SUBTITLE SPEECH */}
      <div
        style={{
          width: "100%",
          flex: 0.7,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <SpeechHook
          text={speechText}
          coloredWords={highlightedSpeechWords}
          color={speechColor}
          frame={frame}
          duration={duration}
        />
      </div>
    </AbsoluteFill>
  );
};

const PortraitSceneRenderer: React.FC<{ scene: any }> = ({ scene }) => {
  const frame = useCurrentFrame();
  return (
    <PortraitScene
      id={scene.id}
      title={scene.title}
      speechText={scene.speechText}
      highlightedSpeechWords={scene.highlightedSpeechWords}
      speechColor={scene.speechColor}
      visualizerType={scene.visualizerType}
      duration={scene.duration}
      frame={frame}
    />
  );
};

// --- DYNAMIC VERTICAL SHORT FORM ENGINE ---
export const ShortFormWorkflow: React.FC = () => {
  // Timeline defining a continuous, premium 16-second Reel/Short on Model Context Protocol
  const scenes = [
    {
      id: "mcp-hook",
      title: "Model Context Protocol",
      speechText: "Kani waa Model Context Protocol (MCP) oo badalaya habka AI-da u shaqayso!",
      highlightedSpeechWords: ["MCP", "badalaya", "AI-da"],
      speechColor: "#e05a47", // Anthropic Apricot Accent
      visualizerType: "mcp" as const,
      duration: 150, // 5 seconds
    },
    {
      id: "rag-sync",
      title: "RAG & Vector Searches",
      speechText: "Wuxuu isku xiraa koodhkaaga gaarka ah iyo databases-ka si toos ah!",
      highlightedSpeechWords: ["koodhkaaga", "databases-ka", "toos"],
      speechColor: "#9bc3a5", // Anthropic Sage/Mint Accent
      visualizerType: "rag" as const,
      duration: 150, // 5 seconds
    },
    {
      id: "tool-calling",
      title: "Dynamic Tool Loops",
      speechText: "Hadda AI-du waxay qori kartaa faylal, fulin kartaa terminal adoo eegaya!",
      highlightedSpeechWords: ["AI-du", "qori", "terminal"],
      speechColor: "#7faae4", // Anthropic Pastel Slate Blue Accent
      visualizerType: "tool" as const,
      duration: 180, // 6 seconds
    },
  ];

  return (
    <AbsoluteFill style={{ backgroundColor: "#020202", fontFamily: "Inter, sans-serif" }}>
      {/* Precision blueprint-grid background */}
      <BlueprintGrid />

      <Series>
        {scenes.map((scene) => (
          <Series.Sequence key={scene.id} durationInFrames={scene.duration}>
            <PortraitSceneRenderer scene={scene} />
          </Series.Sequence>
        ))}
      </Series>
    </AbsoluteFill>
  );
};
