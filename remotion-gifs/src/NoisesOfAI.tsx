import { useCurrentFrame, useVideoConfig, interpolate, Easing } from "remotion";

const COLORS = {
  blue: "#4e6ec9",
  magenta: "#c94eac",
  gold: "#c9a94e",
  cream: "#faf8f5",
  dark: "#0a0a0a",
};

// Seeded pseudo-random (deterministic, no Math.random in render)
const seededRandom = (seed: number) => {
  const x = Math.sin(seed + 1) * 10000;
  return x - Math.floor(x);
};

// Grid cell — each one flickers with a unique phase
const NoiseCell = ({
  col,
  row,
  cellW,
  cellH,
  cols,
  rows,
}: {
  col: number;
  row: number;
  cellW: number;
  cellH: number;
  cols: number;
  rows: number;
}) => {
  const frame = useCurrentFrame();
  const { fps, durationInFrames } = useVideoConfig();

  const seed = col * rows + row;
  const randPhase = seededRandom(seed) * Math.PI * 2;
  const randSpeed = 0.3 + seededRandom(seed + 100) * 0.5;
  const randColorChoice = seededRandom(seed + 200);

  // Noise flicker — fast oscillation
  const noiseT = (frame / fps) * randSpeed * 2 * Math.PI + randPhase;
  const noiseSine = (Math.sin(noiseT) + 1) / 2;

  // Signal wave — a horizontal wave that sweeps through periodically
  const loopProgress = (frame % durationInFrames) / durationInFrames;
  const wavePos = loopProgress * (cols + 4) - 2; // travels across cols
  const distFromWave = Math.abs(col - wavePos);
  const signalStrength = interpolate(distFromWave, [0, 3], [1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Also a second vertical wave
  const vWavePos = loopProgress * (rows + 4) - 2;
  const vDist = Math.abs(row - vWavePos);
  const vSignal = interpolate(vDist, [0, 2], [0.7, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const signal = Math.max(signalStrength, vSignal);

  // Color: noise state vs signal state
  const noiseColor =
    randColorChoice < 0.4
      ? COLORS.blue
      : randColorChoice < 0.65
        ? COLORS.magenta
        : randColorChoice < 0.8
          ? COLORS.gold
          : COLORS.dark;

  const opacity = signal > 0.3
    ? signal * 0.9 + noiseSine * 0.1
    : noiseSine * 0.5 + 0.05;

  const cellColor = signal > 0.5 ? COLORS.magenta : noiseColor;

  return (
    <div
      style={{
        position: "absolute",
        left: col * cellW + 1,
        top: row * cellH + 1,
        width: cellW - 2,
        height: cellH - 2,
        backgroundColor: cellColor,
        opacity,
        borderRadius: 2,
      }}
    />
  );
};

// Floating corner blocks
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
  const dx = Math.sin(t) * 6;
  const dy = Math.cos(t * 0.7) * 5;

  return (
    <div
      style={{
        position: "absolute",
        left: startX + dx,
        top: startY + dy,
        width: size,
        height: size,
        backgroundColor: color,
        opacity: 0.85,
      }}
    />
  );
};

// Horizontal signal line that sweeps across
const SignalLine = () => {
  const frame = useCurrentFrame();
  const { fps, width, height, durationInFrames } = useVideoConfig();

  const progress = (frame % durationInFrames) / durationInFrames;
  const y = interpolate(progress, [0.3, 0.7], [height * 0.2, height * 0.8], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.inOut(Easing.quad),
  });

  const lineOpacity = interpolate(
    progress,
    [0.25, 0.35, 0.65, 0.75],
    [0, 0.6, 0.6, 0],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
  );

  return (
    <div
      style={{
        position: "absolute",
        left: 0,
        top: y - 1,
        width,
        height: 3,
        background: `linear-gradient(90deg, transparent 0%, ${COLORS.magenta} 30%, ${COLORS.blue} 70%, transparent 100%)`,
        opacity: lineOpacity,
        borderRadius: 2,
      }}
    />
  );
};

// Accent bar at top (matching hero style)
const AccentBar = () => {
  const frame = useCurrentFrame();
  const { fps, width } = useVideoConfig();
  const progress = interpolate(frame, [0, 1.5 * fps], [0, 1], {
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.quad),
  });

  return (
    <div
      style={{
        position: "absolute",
        top: 56,
        left: 0,
        width: width * progress,
        height: 8,
        backgroundColor: COLORS.blue,
        borderRadius: "0 4px 4px 0",
      }}
    />
  );
};

export const NoisesOfAI = () => {
  const { width, height } = useVideoConfig();

  const cols = 12;
  const rows = 6;
  const cellW = width / cols;
  const cellH = height / rows;

  return (
    <div
      style={{
        width,
        height,
        backgroundColor: COLORS.cream,
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Noise grid */}
      {Array.from({ length: cols }, (_, col) =>
        Array.from({ length: rows }, (_, row) => (
          <NoiseCell
            key={`${col}-${row}`}
            col={col}
            row={row}
            cellW={cellW}
            cellH={cellH}
            cols={cols}
            rows={rows}
          />
        )),
      )}

      {/* Signal line */}
      <SignalLine />

      {/* Accent bar */}
      <AccentBar />

      {/* Corner blocks — dark on light bg */}
      <FloatingBlock
        startX={20}
        startY={20}
        size={44}
        color={COLORS.dark}
        speed={0.9}
        phaseOffset={0}
      />
      <FloatingBlock
        startX={80}
        startY={60}
        size={24}
        color={COLORS.dark}
        speed={1.1}
        phaseOffset={1.2}
      />
      <FloatingBlock
        startX={width - 80}
        startY={30}
        size={52}
        color={COLORS.dark}
        speed={0.8}
        phaseOffset={2.0}
      />
      <FloatingBlock
        startX={width - 40}
        startY={90}
        size={28}
        color={COLORS.dark}
        speed={1.3}
        phaseOffset={0.5}
      />
    </div>
  );
};
