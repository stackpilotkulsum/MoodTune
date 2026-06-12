import { useEffect, useState } from "react";
import Particles, { initParticlesEngine } from "@tsparticles/react";
import { loadSlim } from "@tsparticles/slim";

function ParticlesBackground({ moodColor, particleType }) {
  const [init, setInit] = useState(false);

  useEffect(() => {
    initParticlesEngine(async (engine) => {
      await loadSlim(engine);
    }).then(() => {
      setInit(true);
    });
  }, []);

  const getOptions = () => {
    const baseColor = moodColor || "#ffffff";
    
    // Default bubbles for Calm
    let options = {
      fullScreen: { enable: false, zIndex: 0 },
      particles: {
        number: { value: 30, density: { enable: true, value_area: 800 } },
        color: { value: baseColor },
        shape: { type: "circle" },
        opacity: { value: 0.3, random: true, anim: { enable: true, speed: 1, opacity_min: 0.1, sync: false } },
        size: { value: 6, random: true, anim: { enable: true, speed: 2, size_min: 0.1, sync: false } },
        move: { enable: true, speed: 1, direction: "top", random: true, straight: false, out_mode: "out", bounce: false },
      },
      interactivity: {
        detect_on: "canvas",
        events: { onHover: { enable: true, mode: "repulse" }, onClick: { enable: true, mode: "push" }, resize: true },
        modes: { repulse: { distance: 100, duration: 0.4 }, push: { quantity: 4 } },
      },
      detectRetina: true,
    };

    if (particleType === 'rain') {
      options.particles.move.direction = "bottom";
      options.particles.move.speed = 15;
      options.particles.move.straight = true;
      options.particles.shape.type = "line";
      options.particles.size.value = 10;
      options.particles.opacity.value = 0.5;
      options.particles.number.value = 80;
    } else if (particleType === 'fire') {
      options.particles.move.direction = "top";
      options.particles.move.speed = 3;
      options.particles.shape.type = "circle";
      options.particles.size.value = { min: 1, max: 4 };
      options.particles.opacity.value = { min: 0.1, max: 0.8 };
      options.particles.color.value = ["#f87171", "#ef4444", "#dc2626", "#fbbf24"];
      options.particles.number.value = 60;
    } else if (particleType === 'sunbeams') {
      options.particles.move.direction = "none";
      options.particles.move.speed = 2;
      options.particles.shape.type = ["circle", "triangle", "polygon"];
      options.particles.size.value = { min: 3, max: 8 };
      options.particles.color.value = ["#fbbf24", "#f59e0b", "#ffffff", "#fef3c7"];
      options.particles.number.value = 50;
      options.interactivity.events.onHover.mode = "bubble";
    } else if (particleType === 'stars') {
      options.particles.move.direction = "none";
      options.particles.move.speed = 6;
      options.particles.move.outModes = "bounce";
      options.particles.shape.type = "star";
      options.particles.size.value = { min: 2, max: 5 };
      options.particles.number.value = 60;
      options.particles.links = { enable: true, distance: 150, color: baseColor, opacity: 0.4, width: 1 };
    }

    return options;
  };

  if (!init) {
    return null;
  }

  return (
    <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', pointerEvents: 'none', zIndex: 0 }}>
      <Particles
        id="tsparticles"
        options={getOptions()}
        style={{ width: '100%', height: '100%', position: 'absolute' }}
      />
    </div>
  );
}

export default ParticlesBackground;
