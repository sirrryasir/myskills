import React from "react";
import {
  AbsoluteFill,
  Series,
  useCurrentFrame,
  useVideoConfig,
  interpolate,
  Easing,
} from "remotion";
import {
  BlueprintGrid,
  GlassmacWindow,
  TypewriterCode,
  CrispTerminal,
} from "../components/DelbaComponents";

// --- THE WORKFLOW SCHEMA ---
export interface SceneConfig {
  id: string;
  type: "title" | "terminal" | "code" | "preview";
  duration: number; // in frames
  title?: string;
  subtitle?: string;
  prompt?: string;
  outputs?: string[];
  code?: string[];
  filename?: string;
  url?: string;
}

// --- ULTIMATE TIMELINE CONFIGURATION (EDIT THIS TO GENERATE FUTURE VIDEOS!) ---
export const defaultTimeline: SceneConfig[] = [
  {
    id: "scene-1-title",
    type: "title",
    duration: 75,
    title: "AI Agents in 2026",
    subtitle: "Sida loo kood-gareeyo dynamic workflows",
  },
  {
    id: "scene-2-terminal",
    type: "terminal",
    duration: 105,
    prompt: "bun run archon --agent-mode",
    outputs: [
      "✦ Archon Agent Framework v3.2.0",
      "⌛ Connecting to Gemini-2.5-Pro API...",
      "✓ Handshake established in 210ms",
      "● Guardian Shield active. Intercept decoupled.",
      "🚀 Executing dynamic workflow...",
    ],
  },
  {
    id: "scene-3-code",
    type: "code",
    duration: 150,
    filename: "src/agent.ts",
    code: [
      "import { createAgent } from '@archon/sdk';",
      "",
      "export const developerAgent = createAgent({",
      "  role: 'Software Engineer',",
      "  tools: ['read_file', 'write_file', 'run_command'],",
      "  systemPrompt: 'Follow Karpathy coding principles strictly.',",
      "  onOutput: (stream) => {",
      "    console.log(`[Stream Log]: ${stream}`);",
      "  }",
      "});",
    ],
  },
  {
    id: "scene-4-cta",
    type: "title",
    duration: 90,
    title: "Become a Technical Video Producer",
    subtitle: "Dhis shaqadaada mustaqbalka adoo adeegsanaya Video-as-Code",
  },
];

// --- INDIVIDUAL SCENE COMPONENTS ---

const TitleScene: React.FC<{ config: SceneConfig; frame: number }> = ({ config, frame }) => {
  const opacity = interpolate(frame, [0, 15, config.duration - 15, config.duration], [0, 1, 1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const scale = interpolate(frame, [0, config.duration], [0.96, 1.04], {
    easing: Easing.bezier(0.16, 1, 0.3, 1),
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill style={{ justifyContent: "center", alignItems: "center", opacity }}>
      <div style={{ transform: `scale(${scale})`, textAlign: "center", padding: "0 40px" }}>
        <h1
          style={{
            fontSize: 78,
            fontWeight: 400, // Elegant low weight for Fraunces
            color: "#ffffff",
            letterSpacing: "-0.03em",
            margin: 0,
            lineHeight: 1.15,
            fontFamily: "'Fraunces', Georgia, serif", // High-end literary serif
          }}
        >
          {config.title}
        </h1>
        {config.subtitle && (
          <p
            style={{
              fontSize: 24,
              color: "rgba(255, 255, 255, 0.45)",
              marginTop: 22,
              fontWeight: 500,
              fontFamily: "Inter, -apple-system, sans-serif",
              letterSpacing: "-0.01em",
            }}
          >
            {config.subtitle}
          </p>
        )}
      </div>
    </AbsoluteFill>
  );
};

const TerminalScene: React.FC<{ config: SceneConfig; frame: number }> = ({ config, frame }) => {
  return (
    <AbsoluteFill style={{ justifyContent: "center", alignItems: "center", padding: 80 }}>
      <div style={{ width: 850 }}>
        <GlassmacWindow title="terminal — archon-cli" frame={frame} entranceDelay={0}>
          <CrispTerminal
            frame={frame}
            prompt={config.prompt || "npm run build"}
            outputs={config.outputs || []}
            startDelay={15}
            typingSpeed={0.8}
            outputDelay={15}
          />
        </GlassmacWindow>
      </div>
    </AbsoluteFill>
  );
};

const CodeScene: React.FC<{ config: SceneConfig; frame: number }> = ({ config, frame }) => {
  return (
    <AbsoluteFill style={{ justifyContent: "center", alignItems: "center", padding: 80 }}>
      <div style={{ width: 900 }}>
        <GlassmacWindow title={config.filename || "file.tsx"} frame={frame} entranceDelay={0}>
          <TypewriterCode
            code={config.code || []}
            frame={frame}
            speed={1.4}
            startDelay={20}
          />
        </GlassmacWindow>
      </div>
    </AbsoluteFill>
  );
};

const SceneRenderer: React.FC<{ scene: SceneConfig }> = ({ scene }) => {
  const frame = useCurrentFrame();
  switch (scene.type) {
    case "title":
      return <TitleScene config={scene} frame={frame} />;
    case "terminal":
      return <TerminalScene config={scene} frame={frame} />;
    case "code":
      return <CodeScene config={scene} frame={frame} />;
    default:
      return <TitleScene config={scene} frame={frame} />;
  }
};

// --- CORE WORKFLOW ENGINE ---
export const VideoCreatorWorkflow: React.FC<{
  timeline?: SceneConfig[];
}> = ({ timeline = defaultTimeline }) => {
  return (
    <AbsoluteFill style={{ backgroundColor: "#020202", fontFamily: "Inter, sans-serif" }}>
      {/* Background is clinical blueprint grid */}
      <BlueprintGrid />

      {/* Series organizes layouts sequentially based on scene duration */}
      <Series>
        {timeline.map((scene) => {
          return (
            <Series.Sequence key={scene.id} durationInFrames={scene.duration}>
              <SceneRenderer scene={scene} />
            </Series.Sequence>
          );
        })}
      </Series>
    </AbsoluteFill>
  );
};
