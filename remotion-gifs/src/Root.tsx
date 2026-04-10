import { Composition } from "remotion";
import { ProductTech } from "./ProductTech";
import { NoisesOfAI } from "./NoisesOfAI";

// Landscape format: 800x420 — optimized for web GIF size
const WIDTH = 800;
const HEIGHT = 420;
const FPS = 12;
// ~4 seconds per loop
const DURATION = 4 * FPS;

export const RemotionRoot = () => {
  return (
    <>
      <Composition
        id="ProductTech"
        component={ProductTech}
        durationInFrames={DURATION}
        fps={FPS}
        width={WIDTH}
        height={HEIGHT}
      />
      <Composition
        id="NoisesOfAI"
        component={NoisesOfAI}
        durationInFrames={DURATION}
        fps={FPS}
        width={WIDTH}
        height={HEIGHT}
      />
    </>
  );
};
