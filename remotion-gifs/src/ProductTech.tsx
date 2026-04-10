import { useCurrentFrame, useVideoConfig, interpolate, Easing } from "remotion";

const COLORS = {
  blue: "#4e6ec9",
  magenta: "#c94eac",
  gold: "#c9a94e",
  cream: "#faf8f5",
  dark: "#0a0a0a",
  darkCard: "#0e0e0e",
};

// A single equalizer bar that pulses
const EqBar = ({
  x,
  baseHeight,
  maxHeight,
  phaseOffset,
  color,
  width,
}: {
  x: number;
  baseHeight: number;
  maxHeight: number;
  phaseOffset: number;
  color: string;
  width: number;
}) => {
  const frame = useCurrentFrame();
  const { fps, height } = useVideoConfig();

  // Slow sine wave — period ~2.5s
  const t = (frame / fps) * 2 * Math.PI * 0.4 + phaseOffset;
  const sine = (Math.sin(t) + 1) / 2; // 0..1
  const barHeight = baseHeight + (maxHeight - baseHeight) * sine;

  return (
    <div
      style={{
        position: "absolute",
        bottom: 0,
        left: x,
        width,
        height: barHeight,
        backgroundColor: color,
        borderRadius: "4px 4px 0 0",
        opacity: 0.85,
      }}
    />
  );
};

// Floating corner blocks (like the hero page)
const FloatingBlock = ({
  startX,
  startY,
  size,
  color,
  speed,
  phaseOffset,
}: {
  startX: number;
  startY: number;
  size: number;
  color: string;
  speed: number;
  phaseOffset: number;
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const t = (frame / fps) * speed + phaseOffset;
  const dx = Math.sin(t) * 8;
  const dy = Math.cos(t * 0.7) * 6;

  return (
    <div
      style={{
        position: "absolute",
        left: startX + dx,
        top: startY + dy,
        width: size,
        height: size,
        backgroundColor: color,
        opacity: 0.9,
      }}
    />
  );
};

// Diagonal light streak
const LightStreak = () => {
  const frame = useCurrentFrame();
  const { fps, width, height, durationInFrames } = useVideoConfig();

  // Sweep across every ~3.3s (full loop)
  const progress = interpolate(
    frame % durationInFrames,
    [0, durationInFrames],
    [0, 1],
  );

  const x = interpolate(progress, [0, 1], [-200, width + 200]);

  return (
    <div
      style={{
        position: "absolute",
        top: 0,
        left: x - 120,
        width: 240,
        height,
        background: `linear-gradient(90deg, transparent 0%, ${COLORS.magenta}22 40%, ${COLORS.magenta}55 50%, ${COLORS.magenta}22 60%, transparent 100%)`,
        transform: "skewX(-20deg)",
        pointerEvents: "none",
      }}
    />
  );
};

// Checkerboard cluster (mirroring the hero page)
const Checker = ({
  x,
  y,
  cellSize,
  color,
}: {
  x: number;
  y: number;
  cellSize: number;
  color: string;
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const pulse = (Math.sin(frame / fps) + 1) / 2;

  const cells = [true, false, false, true, true, false];
  return (
    <div
      style={{
        position: "absolute",
        left: x,
        top: y,
        display: "grid",
        gridTemplateColumns: `repeat(2, ${cellSize}px)`,
        gap: 0,
        opacity: 0.7 + pulse * 0.3,
      }}
    >
      {cells.map((filled, i) =>
        filled ? (
          <div
            key={i}
            style={{ width: cellSize, height: cellSize, backgroundColor: color }}
          />
        ) : (
          <div key={i} style={{ width: cellSize, height: cellSize }} />
        ),
      )}
    </div>
  );
};

// Horizontal accent bar (like the hero card top strip)
const AccentBar = () => {
  const frame = useCurrentFrame();
  const { fps, width } = useVideoConfig();
  const progress = interpolate(
    frame,
    [0, 1.5 * fps],
    [0, 1],
    { extrapolateRight: "clamp", easing: Easing.out(Easing.quad) },
  );
  const barWidth = width * progress;

  return (
    <div
      style={{
        position: "absolute",
        top: 56,
        left: 0,
        width: barWidth,
        height: 8,
        backgroundColor: COLORS.magenta,
        borderRadius: "0 4px 4px 0",
      }}
    />
  );
};

export const ProductTech = () => {
  const { width, height } = useVideoConfig();

  const bars = [
    { x: 100, base: 80, max: 300, phase: 0.0, color: COLORS.blue, w: 60 },
    { x: 180, base: 60, max: 260, phase: 0.8, color: COLORS.blue, w: 60 },
    { x: 260, base: 100, max: 340, phase: 1.6, color: COLORS.magenta, w: 60 },
    { x: 340, base: 50, max: 220, phase: 2.4, color: COLORS.blue, w: 60 },
    { x: 420, base: 80, max: 310, phase: 3.2, color: COLORS.blue, w: 60 },
    { x: 500, base: 70, max: 280, phase: 0.4, color: COLORS.gold, w: 60 },
    { x: 580, base: 90, max: 320, phase: 1.2, color: COLORS.blue, w: 60 },
    { x: 660, base: 55, max: 240, phase: 2.0, color: COLORS.magenta, w: 60 },
    { x: 740, base: 85, max: 300, phase: 2.8, color: COLORS.blue, w: 60 },
    { x: 820, base: 60, max: 270, phase: 3.6, color: COLORS.gold, w: 60 },
    { x: 900, base: 80, max: 310, phase: 1.0, color: COLORS.blue, w: 60 },
    { x: 980, base: 50, max: 230, phase: 1.8, color: COLORS.blue, w: 60 },
    { x: 1060, base: 90, max: 340, phase: 2.6, color: COLORS.magenta, w: 60 },
  ];

  return (
    <div
      style={{
        width,
        height,
        backgroundColor: COLORS.dark,
        position: "relative",
        overflow: "hidden",
        fontFamily: "sans-serif",
      }}
    >
      {/* Equalizer bars at the bottom */}
      <div
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          height,
        }}
      >
        {bars.map((b, i) => (
          <EqBar
            key={i}
            x={b.x}
            baseHeight={b.base}
            maxHeight={b.max}
            phaseOffset={b.phase}
            color={b.color}
            width={b.w}
          />
        ))}
      </div>

      {/* Light streak sweep */}
      <LightStreak />

      {/* Accent bar at top */}
      <AccentBar />

      {/* Floating corner blocks — top-left */}
      <FloatingBlock
        startX={20}
        startY={20}
        size={44}
        color={COLORS.magenta}
        speed={0.9}
        phaseOffset={0}
      />
      <FloatingBlock
        startX={80}
        startY={60}
        size={24}
        color={COLORS.magenta}
        speed={1.1}
        phaseOffset={1.2}
      />

      {/* Top-right corner blocks */}
      <FloatingBlock
        startX={width - 80}
        startY={30}
        size={52}
        color={COLORS.magenta}
        speed={0.8}
        phaseOffset={2.0}
      />
      <FloatingBlock
        startX={width - 40}
        startY={90}
        size={28}
        color={COLORS.magenta}
        speed={1.3}
        phaseOffset={0.5}
      />

      {/* Checkerboard clusters */}
      <Checker x={width - 120} y={height - 140} cellSize={36} color={COLORS.gold} />
      <Checker x={30} y={height - 120} cellSize={32} color={COLORS.magenta} />

      {/* Vertical left strip */}
      <FloatingBlock
        startX={0}
        startY={height * 0.2}
        size={12}
        color={COLORS.blue}
        speed={0.5}
        phaseOffset={0.3}
      />
    </div>
  );
};
