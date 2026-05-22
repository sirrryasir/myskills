import React from "react";
import {
  useCurrentFrame,
  useVideoConfig,
  interpolate,
  spring,
} from "remotion";

const snappySpring = (frame: number, fps: number, delay = 0) => {
  return spring({
    frame: frame - delay,
    fps,
    config: {
      damping: 18,
      mass: 0.8,
      stiffness: 120,
    },
  });
};

// --- 1. MODEL CONTEXT PROTOCOL (MCP) ANMATED DIAGRAM (CLEAN MINIMALIST EDITIONS) ---
export const MCPDiagram: React.FC<{ frame: number; delay?: number }> = ({ frame, delay = 0 }) => {
  const { fps } = useVideoConfig();
  const activeFrame = Math.max(0, frame - delay);

  // Springs for entrance of nodes
  const clientEntrance = snappySpring(activeFrame, fps, 10);
  const serverEntrance = snappySpring(activeFrame, fps, 30);

  // Message flow animation (ping-pong)
  const messageProgress = interpolate(
    activeFrame % 90,
    [15, 40, 50, 75],
    [0, 1, 1, 0],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );

  const messageX = interpolate(messageProgress, [0, 1], [-190, 190]);
  const messageOpacity = interpolate(
    activeFrame % 90,
    [15, 20, 35, 40, 50, 55, 70, 75],
    [0, 1, 1, 0, 0, 1, 1, 0]
  );

  const isServerResponding = activeFrame % 90 >= 50;

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "space-between",
        height: "100%",
        padding: "20px 0",
        position: "relative",
      }}
    >
      {/* Editorial Monospace Title */}
      <div
        style={{
          color: "#ffffff",
          fontSize: 22,
          fontWeight: 700,
          letterSpacing: "-0.02em",
          fontFamily: "'Geist Mono', monospace",
          textTransform: "uppercase",
        }}
      >
        Model Context Protocol
      </div>

      <div style={{ display: "flex", alignItems: "center", gap: 100, position: "relative", width: "100%", justifyContent: "center", margin: "40px 0" }}>
        {/* Node 1: Client (Claude) - Sharp Flat Charcoal Card */}
        <div
          style={{
            transform: `scale(${clientEntrance})`,
            opacity: clientEntrance,
            width: 220,
            height: 180,
            borderRadius: 12,
            backgroundColor: "#111111",
            border: "2px solid #e05a47", // Solid Apricot
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            boxShadow: "0 15px 35px rgba(0,0,0,0.6)",
            zIndex: 5,
          }}
        >
          <span style={{ fontSize: 44 }}>🧠</span>
          <span style={{ color: "#ffffff", fontSize: 20, fontWeight: "bold", marginTop: 12, fontFamily: "Inter, sans-serif" }}>MCP Client</span>
          <span style={{ color: "#88888e", fontSize: 13, marginTop: 4, fontFamily: "'Geist Mono', monospace" }}>Claude Desktop</span>
        </div>

        {/* Clean Connection Line */}
        <div
          style={{
            position: "absolute",
            width: 320,
            height: 2,
            backgroundColor: "#1f1f1f",
            zIndex: 1,
          }}
        >
          {/* Animated Message Flowing (Solid flat pill, zero neon glow) */}
          <div
            style={{
              position: "absolute",
              left: "50%",
              transform: `translateX(${messageX}px) translateY(-50%)`,
              opacity: messageOpacity,
              backgroundColor: isServerResponding ? "#7faae4" : "#e05a47",
              color: "#080808",
              padding: "6px 14px",
              borderRadius: 6,
              fontSize: 14,
              fontWeight: 800,
              fontFamily: "'Geist Mono', monospace",
              whiteSpace: "nowrap",
              border: "1px solid rgba(0,0,0,0.1)",
            }}
          >
            {isServerResponding ? "JSON-RPC Res" : "JSON-RPC Req"}
          </div>
        </div>

        {/* Node 2: Server - Sharp Flat Charcoal Card */}
        <div
          style={{
            transform: `scale(${serverEntrance})`,
            opacity: serverEntrance,
            width: 220,
            height: 180,
            borderRadius: 12,
            backgroundColor: "#111111",
            border: "2px solid #7faae4", // Solid Slate Blue
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            boxShadow: "0 15px 35px rgba(0,0,0,0.6)",
            zIndex: 5,
          }}
        >
          <span style={{ fontSize: 44 }}>📂</span>
          <span style={{ color: "#ffffff", fontSize: 20, fontWeight: "bold", marginTop: 12, fontFamily: "Inter, sans-serif" }}>MCP Server</span>
          <span style={{ color: "#88888e", fontSize: 13, marginTop: 4, fontFamily: "'Geist Mono', monospace" }}>Filesystem API</span>
        </div>
      </div>

      {/* Description Log (Flat monochrome panel) */}
      <div
        style={{
          width: "95%",
          padding: 16,
          borderRadius: 8,
          backgroundColor: "#080808",
          border: "1px solid #1f1f1f",
          color: "#88888e",
          fontSize: 15,
          fontWeight: 500,
          textAlign: "center",
          fontFamily: "'Geist Mono', monospace",
          lineHeight: 1.5,
        }}
      >
        {isServerResponding ? (
          <span style={{ color: "#7faae4" }}>❯ Server exposes: resources, prompts, and tools</span>
        ) : (
          <span style={{ color: "#e05a47" }}>❯ Client issues: tools/list or tools/call</span>
        )}
      </div>
    </div>
  );
};

// --- 2. RAG VISUALIZER (CLEAN FLAT SCHEMATIC) ---
export const RAGVisualizer: React.FC<{ frame: number; delay?: number }> = ({ frame, delay = 0 }) => {
  const { fps } = useVideoConfig();
  const activeFrame = Math.max(0, frame - delay);

  // Stages
  const queryEntrance = snappySpring(activeFrame, fps, 10);
  const searchProgress = interpolate(activeFrame, [35, 65], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const dbMatchEntrance = snappySpring(activeFrame, fps, 55);
  const promptInjection = snappySpring(activeFrame, fps, 85);

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        height: "100%",
        justifyContent: "space-between",
        padding: "15px 0",
      }}
    >
      <div
        style={{
          color: "#ffffff",
          fontSize: 22,
          fontWeight: 700,
          letterSpacing: "-0.02em",
          fontFamily: "'Geist Mono', monospace",
          textTransform: "uppercase",
          textAlign: "center",
          marginBottom: 16,
        }}
      >
        Vector Database Sync (RAG)
      </div>

      {/* Query Block */}
      <div
        style={{
          opacity: queryEntrance,
          transform: `translateY(${interpolate(queryEntrance, [0, 1], [20, 0])}px)`,
          padding: "14px 18px",
          backgroundColor: "#111111",
          border: "1px solid #1f1f1f",
          borderRadius: 8,
          fontSize: 16,
          color: "#ebd49b",
          display: "flex",
          alignItems: "center",
          gap: 16,
          fontFamily: "Inter, sans-serif",
        }}
      >
        <span style={{ fontSize: 24 }}>❓</span>
        <div>
          <div style={{ fontWeight: "bold", fontSize: 18, color: "#ffffff" }}>User Query</div>
          <div style={{ color: "#88888e", fontSize: 14, marginTop: 2, fontFamily: "'Geist Mono', monospace" }}>"How do I setup context engineering?"</div>
        </div>
      </div>

      {/* Database Search Indicator Line */}
      <div style={{ display: "flex", justifyContent: "center", position: "relative", height: 50, alignItems: "center" }}>
        <div
          style={{
            height: interpolate(searchProgress, [0, 1], [0, 45]),
            width: 2,
            backgroundImage: "linear-gradient(to bottom, #ebd49b, #9bc3a5)",
            opacity: searchProgress,
          }}
        />
        {searchProgress > 0 && searchProgress < 1 && (
          <div
            style={{
              position: "absolute",
              width: 10,
              height: 10,
              borderRadius: 5,
              backgroundColor: "#9bc3a5", // sage green search bubble
              top: interpolate(searchProgress, [0, 1], [0, 40]),
            }}
          />
        )}
      </div>

      {/* Vector Match Block */}
      <div
        style={{
          opacity: dbMatchEntrance,
          transform: `scale(${dbMatchEntrance})`,
          padding: "14px 18px",
          backgroundColor: "#111111",
          border: "2px solid #9bc3a5", // Pastel Sage Green
          borderRadius: 8,
          fontSize: 16,
          color: "#9bc3a5",
          display: "flex",
          alignItems: "center",
          gap: 16,
          fontFamily: "Inter, sans-serif",
          boxShadow: "0 10px 25px rgba(0,0,0,0.5)",
        }}
      >
        <span style={{ fontSize: 24 }}>⚡</span>
        <div style={{ flex: 1 }}>
          <div style={{ fontWeight: "bold", fontSize: 18, color: "#ffffff" }}>Vector Match (94% Similarity)</div>
          <div style={{ color: "#88888e", fontSize: 13, marginTop: 4, fontFamily: "'Geist Mono', monospace", lineHeight: 1.4 }}>
            Chunk: "Context engineering scales workflows by pruning system memories..."
          </div>
        </div>
      </div>

      {/* Connection Arrow */}
      <div style={{ display: "flex", justifyContent: "center", height: 50, alignItems: "center" }}>
        <div
          style={{
            height: interpolate(promptInjection, [0, 1], [0, 45]),
            width: 2,
            backgroundImage: "linear-gradient(to bottom, #9bc3a5, #7faae4)",
            opacity: promptInjection,
          }}
        />
      </div>

      {/* Augmented Context Prompt Block */}
      <div
        style={{
          opacity: promptInjection,
          transform: `translateY(${interpolate(promptInjection, [0, 1], [20, 0])}px)`,
          padding: "14px 18px",
          backgroundColor: "#111111",
          border: "2px solid #7faae4", // Pastel Slate Blue
          borderRadius: 8,
          fontSize: 16,
          color: "#ffffff",
          boxShadow: "0 10px 25px rgba(0,0,0,0.5)",
        }}
      >
        <div style={{ fontWeight: "bold", color: "#7faae4", display: "flex", justifyContent: "space-between", fontSize: 18, fontFamily: "Inter, sans-serif" }}>
          <span>🧠 Augmented Context Prompt</span>
          <span style={{ fontSize: 12, color: "#88888e", fontFamily: "'Geist Mono', monospace" }}>LLM Input</span>
        </div>
        <div style={{ fontSize: 13, fontFamily: "'Geist Mono', monospace", color: "#e4e4e7", marginTop: 8, lineHeight: 1.4 }}>
          [System instructions...]<br />
          [Vector DB Context: Context engineering...] <br />
          [Question: How do I setup...]
        </div>
      </div>
    </div>
  );
};

// --- 3. TOOL CALLING VISUALIZER (CLEAN DUAL MONOSPACE BLOCKS) ---
export const ToolCallingVisualizer: React.FC<{ frame: number; delay?: number }> = ({ frame, delay = 0 }) => {
  const { fps } = useVideoConfig();
  const activeFrame = Math.max(0, frame - delay);

  const step1 = snappySpring(activeFrame, fps, 10);
  const step2 = snappySpring(activeFrame, fps, 45);
  const step3 = snappySpring(activeFrame, fps, 85);

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        height: "100%",
        gap: 20,
        justifyContent: "center",
      }}
    >
      <div
        style={{
          color: "#ffffff",
          fontSize: 22,
          fontWeight: 700,
          letterSpacing: "-0.02em",
          fontFamily: "'Geist Mono', monospace",
          textTransform: "uppercase",
          textAlign: "center",
          marginBottom: 16,
        }}
      >
        LLM Tool Calling Loop
      </div>

      {/* Step 1: User Request */}
      <div
        style={{
          opacity: step1,
          transform: `translateX(${interpolate(step1, [0, 1], [-30, 0])}px)`,
          padding: 14,
          borderRadius: 8,
          backgroundColor: "#111111",
          border: "1px solid #1f1f1f",
          fontSize: 16,
          fontFamily: "Inter, sans-serif",
        }}
      >
        <div style={{ color: "#88888e", fontSize: 12, fontWeight: "bold", fontFamily: "'Geist Mono', monospace" }}>USER REQUEST</div>
        <div style={{ color: "#ffffff", marginTop: 4, fontWeight: 600 }}>"Create a file named demo.txt and write 'Done' inside it."</div>
      </div>

      {/* Step 2: LLM Tool Call Request */}
      {activeFrame >= 45 && (
        <div
          style={{
            opacity: step2,
            transform: `translateX(${interpolate(step2, [0, 1], [30, 0])}px)`,
            padding: 14,
            borderRadius: 8,
            backgroundColor: "#111111",
            border: "2px solid #ebd49b", // Pastel Yellow
            fontSize: 15,
            fontFamily: "'Geist Mono', monospace",
            boxShadow: "0 10px 25px rgba(0,0,0,0.5)",
          }}
        >
          <div style={{ color: "#ebd49b", fontSize: 12, fontWeight: "bold" }}>🤖 ASSISTANT (TOOL CALL)</div>
          <pre style={{ margin: "8px 0 0 0", color: "#ebd49b", fontSize: 14, lineHeight: 1.4 }}>{`{
  "name": "write_file",
  "arguments": {
    "path": "demo.txt",
    "content": "Done"
  }
}`}</pre>
        </div>
      )}

      {/* Step 3: Host Execution */}
      {activeFrame >= 85 && (
        <div
          style={{
            opacity: step3,
            transform: `translateY(${interpolate(step3, [0, 1], [20, 0])}px)`,
            padding: 14,
            borderRadius: 8,
            backgroundColor: "#111111",
            border: "2px solid #9bc3a5", // Pastel Sage Green
            fontSize: 16,
            fontFamily: "Inter, sans-serif",
            boxShadow: "0 10px 25px rgba(0,0,0,0.5)",
          }}
        >
          <div style={{ color: "#9bc3a5", fontSize: 12, fontWeight: "bold", fontFamily: "'Geist Mono', monospace" }}>⚙️ SYSTEM (TOOL RESPONSE)</div>
          <div style={{ color: "#ffffff", marginTop: 4, fontFamily: "'Geist Mono', monospace", fontSize: 14, fontWeight: 600 }}>
            "Successfully created file demo.txt with 4 bytes."
          </div>
        </div>
      )}
    </div>
  );
};
