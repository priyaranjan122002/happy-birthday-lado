import React, { useEffect, useRef } from 'react';

interface Petal {
  x: number;
  y: number;
  size: number;
  speedY: number;
  speedX: number;
  angle: number;
  spin: number;
  opacity: number;
  color: string;
}

export const FloatingPetals: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', handleResize);

    // Create 40 floating petals + 30 twinkling stardust particles
    const petalColors = [
      'rgba(244, 194, 194, 0.55)', // soft rose
      'rgba(255, 182, 193, 0.45)', // light pink
      'rgba(232, 195, 116, 0.4)',  // champagne gold
      'rgba(251, 113, 133, 0.35)', // warm peach rose
    ];

    const petals: Petal[] = Array.from({ length: 42 }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      size: Math.random() * 8 + 5,
      speedY: Math.random() * 0.9 + 0.4,
      speedX: (Math.random() - 0.5) * 0.8,
      angle: Math.random() * 360,
      spin: (Math.random() - 0.5) * 0.03,
      opacity: Math.random() * 0.5 + 0.3,
      color: petalColors[Math.floor(Math.random() * petalColors.length)],
    }));

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      for (let i = 0; i < petals.length; i++) {
        const p = petals[i];
        p.y += p.speedY;
        p.x += Math.sin(p.angle) * 0.7 + p.speedX;
        p.angle += p.spin;

        if (p.y > height + 20) {
          p.y = -20;
          p.x = Math.random() * width;
        }
        if (p.x > width + 20) p.x = -20;
        if (p.x < -20) p.x = width + 20;

        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate(p.angle);
        ctx.fillStyle = p.color;

        // Draw organic petal curve
        ctx.beginPath();
        ctx.moveTo(0, 0);
        ctx.bezierCurveTo(-p.size / 2, -p.size / 2, -p.size, p.size / 2, 0, p.size);
        ctx.bezierCurveTo(p.size, p.size / 2, p.size / 2, -p.size / 2, 0, 0);
        ctx.fill();

        ctx.restore();
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none fixed inset-0 z-10 h-full w-full opacity-70"
      aria-hidden="true"
    />
  );
};
