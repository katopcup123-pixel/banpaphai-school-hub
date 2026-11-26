import { createShader, isWebGPUSupported } from "./lib/shaders-bundle.js";

// Clean pearlescent white animated WebGPU shader background using npm `shaders`
async function initCleanWhiteShader() {
  const host = document.getElementById("shaderBgHost");
  if (!host) return;

  if (!isWebGPUSupported()) {
    host.classList.add("shader-fallback");
    return;
  }

  try {
    const canvas = document.createElement("canvas");
    canvas.style.width = "100%";
    canvas.style.height = "100%";
    canvas.style.display = "block";
    host.appendChild(canvas);

    await createShader(canvas, {
      components: [
        {
          type: "MeshGradient",
          props: {
            colorA: "#FFFFFF",
            colorB: "#EEF3FA",
            stops: [
              { color: "#FFFFFF", position: 0 },
              { color: "#F7F9FC", position: 0.42 },
              { color: "#ECF2FB", position: 0.74 },
              { color: "#FDF7EA", position: 1 }
            ],
            colorSpace: "oklab",
            count: 5,
            smoothness: 3,
            variation: 0.25,
            swirl: 0.22,
            drift: 0.45,
            speed: 0.35
          },
          children: []
        },
        {
          type: "SimplexNoise",
          props: {
            colorA: "#FFFFFF",
            colorB: "#E2E8F0",
            colorSpace: "oklab",
            scale: 2.6,
            balance: 0.25,
            contrast: 0,
            seed: 12,
            speed: 0.25,
            opacity: 0.08,
            blendMode: "softLight"
          },
          children: []
        }
      ]
    });
    host.classList.add("shader-active");
  } catch (_) {
    host.classList.add("shader-fallback");
  }
}

initCleanWhiteShader();

