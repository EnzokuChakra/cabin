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
  opacity = 0.15,
  isWinter = false
}: {
  theme?: 'nature' | 'default';
  className?: string;
  particleCount?: number;
  speed?: number;
  opacity?: number;
  isWinter?: boolean;
}) {
  const particlesInit = useCallback(async (engine: Engine) => {
    await loadSlim(engine);
  }, []);

  const particlesLoaded = useCallback(async (container: Container | undefined) => {
    console.log(container);
  }, []);

  const getParticleConfig = () => {
    if (theme === 'nature') {
      if (isWinter) {
        // Winter snowflakes
        const snowflakeSVG1 = 
          'data:image/svg+xml;utf8,<svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M10 2L10 18M2 10L18 10M5.5 5.5L14.5 14.5M14.5 5.5L5.5 14.5" stroke="%23E6F3FF" stroke-width="1.5" stroke-linecap="round"/><circle cx="10" cy="10" r="1" fill="%23E6F3FF"/></svg>';
        
        const snowflakeSVG2 = 
          'data:image/svg+xml;utf8,<svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M8 1L8 15M1 8L15 8M3.5 3.5L12.5 12.5M12.5 3.5L3.5 12.5" stroke="%23B8E6FF" stroke-width="1" stroke-linecap="round"/><circle cx="8" cy="8" r="0.8" fill="%23B8E6FF"/></svg>';

        const snowflakeSVG3 = 
          'data:image/svg+xml;utf8,<svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M6 1L6 11M1 6L11 6M2.5 2.5L9.5 9.5M9.5 2.5L2.5 9.5" stroke="%23FFFFFF" stroke-width="0.8" stroke-linecap="round"/></svg>';

        return {
          color: {
            value: ['#E6F3FF', '#B8E6FF', '#FFFFFF', '#D1E7FF'],
          },
          shape: {
            type: ['image', 'circle'],
            image: [
              { src: snowflakeSVG1, width: 20, height: 20 },
              { src: snowflakeSVG2, width: 16, height: 16 },
              { src: snowflakeSVG3, width: 12, height: 12 },
            ],
          },
          size: {
            value: { min: 3, max: 8 },
            random: true,
            anim: {
              enable: true,
              speed: 2,
              size_min: 2,
              sync: false
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
              speed: 1
            }
          },
          move: {
            enable: true,
            speed: speed * 0.8,
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
              acceleration: 0.05
            }
          },
          opacity: {
            value: opacity * 1.5,
            random: true,
            anim: {
              enable: true,
              speed: 1,
              opacity_min: 0.1,
              sync: false
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
            distance: 15,
            speed: 0.2
          }
        };
      } else {
        // Summer leaves (existing code)
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
            value: isWinter ? particleCount * 1.5 : particleCount,
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