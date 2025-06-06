'use client';

import { useCallback } from 'react';
import Particles from 'react-tsparticles';
import { loadSlim } from 'tsparticles-slim';
import type { Container, Engine } from 'tsparticles-engine';

export default function ParticlesBackground({ 
  theme = 'nature',
  className = "absolute inset-0 z-10",
  particleCount = 15,
  speed = 0.3,
  opacity = 0.15
}: {
  theme?: 'nature' | 'default';
  className?: string;
  particleCount?: number;
  speed?: number;
  opacity?: number;
}) {
  const particlesInit = useCallback(async (engine: Engine) => {
    await loadSlim(engine);
  }, []);

  const particlesLoaded = useCallback(async (container: Container | undefined) => {
    console.log(container);
  }, []);

  const getParticleConfig = () => {
    if (theme === 'nature') {
      // Single, simple SVG for better performance
      const leafSVG =
        'data:image/svg+xml;utf8,<svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M8 14C8 14 12 10 12 6C12 4 10 2 8 2C6 2 4 4 4 6C4 10 8 14 8 14Z" fill="%234a8f1a"/></svg>';

      const treeSVG =
        'data:image/svg+xml;utf8,<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M12 22C12 22 4 16 4 10C4 7 6 4 12 4C18 4 20 7 20 10C20 16 12 22 12 22Z" fill="%232f6310"/><path d="M12 4V2" stroke="%238B5A2B" stroke-width="2"/><path d="M12 2C12 2 10 0 8 0C6 0 4 2 4 2" stroke="%238B5A2B" stroke-width="2"/></svg>';

      return {
        color: {
          value: ['#2f6310', '#3d7f15', '#4a8f1a'],
        },
        shape: {
          type: ['image'],
          image: [
            { src: leafSVG, width: 16, height: 16 },
            { src: treeSVG, width: 24, height: 24 },
          ],
        },
        size: {
          value: { min: 12, max: 24 },
          random: true,
          anim: {
            enable: false
          }
        },
        rotate: {
          value: {
            min: 0,
            max: 360
          },
          direction: "random",
          random: true,
          animation: {
            enable: true,
            speed: 0.5
          }
        },
        move: {
          enable: true,
          speed: speed * 0.15,
          direction: "bottom" as const,
          random: true,
          straight: false,
          outModes: {
            default: "out" as const,
            bottom: "out" as const,
            left: "out" as const,
            right: "out" as const,
            top: "out" as const
          },
          attract: {
            enable: false
          },
          trail: {
            enable: false
          },
          gravity: {
            enable: true,
            acceleration: 0.1
          }
        },
        opacity: {
          value: opacity,
          random: true,
          anim: {
            enable: false
          }
        },
        links: {
          enable: false
        },
        life: {
          count: 1,
          duration: {
            sync: false
          }
        },
        wobble: {
          enable: true,
          distance: 10,
          speed: 0.1
        }
      };
    }
    return {
      color: {
        value: ['#2f6310', '#3d7f15', '#4a8f1a'],
      },
      shape: {
        type: ['circle'],
      },
      size: {
        value: { min: 1, max: 3 },
      },
    };
  };

  const particleConfig = getParticleConfig();

  return (
    <Particles
      id="tsparticles"
      init={particlesInit}
      loaded={particlesLoaded}
      options={{
        background: {
          color: {
            value: 'transparent',
          },
        },
        fpsLimit: 60,
        interactivity: {
          events: {
            onClick: {
              enable: false,
            },
            onHover: {
              enable: false,
            },
            resize: true,
          },
          modes: {
            push: {
              quantity: 1,
            },
            repulse: {
              distance: 20,
              duration: 0.4,
            },
          },
        },
        particles: {
          ...particleConfig,
          number: {
            value: particleCount,
            density: {
              enable: true,
              area: 800,
            },
          },
        },
        detectRetina: false,
      }}
      className={className}
    />
  );
} 