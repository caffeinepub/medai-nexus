import { useEffect, useRef } from "react";

interface Particle {
  x: number;
  y: number;
  r: number;
  speed: number;
  opacity: number;
  color: string;
  drift: number;
  fast: boolean;
}

export default function ParticleCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    // Deep purple palette -- no neon
    const colors = ["#6D28D9", "#7C3AED", "#8B5CF6", "#A78BFA", "#5B21B6"];

    const particles: Particle[] = Array.from({ length: 150 }, (_, i) => ({
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
      r: Math.random() * 2.2 + 0.4,
      speed: i < 20 ? Math.random() * 2 + 1.2 : Math.random() * 0.4 + 0.1,
      opacity: Math.random() * 0.45 + 0.08,
      color: colors[Math.floor(Math.random() * colors.length)],
      drift: (Math.random() - 0.5) * 0.25,
      fast: i < 20,
    }));

    const drawHexGrid = () => {
      const hexR = 36;
      const hexH = hexR * Math.sqrt(3);
      const cols = Math.ceil(canvas.width / (hexR * 1.5)) + 2;
      const rows = Math.ceil(canvas.height / hexH) + 2;
      ctx.save();
      ctx.strokeStyle = "rgba(109, 40, 217, 0.045)";
      ctx.lineWidth = 0.7;
      for (let row = -1; row < rows; row++) {
        for (let col = -1; col < cols; col++) {
          const cx = col * hexR * 1.5;
          const cy = row * hexH + (col % 2 === 0 ? 0 : hexH / 2);
          ctx.beginPath();
          for (let i = 0; i < 6; i++) {
            const angle = (Math.PI / 180) * (60 * i - 30);
            const hx = cx + hexR * Math.cos(angle);
            const hy = cy + hexR * Math.sin(angle);
            if (i === 0) ctx.moveTo(hx, hy);
            else ctx.lineTo(hx, hy);
          }
          ctx.closePath();
          ctx.stroke();
        }
      }
      ctx.restore();
    };

    let animId: number;
    const draw = () => {
      // Dark void trail
      ctx.fillStyle = "rgba(5, 3, 16, 0.25)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      drawHexGrid();

      // Connecting lines
      ctx.save();
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 110) {
            const alpha = (1 - dist / 110) * 0.1;
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.strokeStyle = particles[i].color;
            ctx.globalAlpha = alpha;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }
      }
      ctx.globalAlpha = 1;
      ctx.restore();

      for (const p of particles) {
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.globalAlpha = p.opacity;
        ctx.shadowBlur = p.fast ? 10 : 5;
        ctx.shadowColor = p.color;
        ctx.fill();
        ctx.globalAlpha = 1;
        ctx.shadowBlur = 0;

        p.y -= p.speed;
        p.x += p.drift;
        if (p.y < -5) {
          p.y = canvas.height + 5;
          p.x = Math.random() * canvas.width;
        }
        if (p.x < -5 || p.x > canvas.width + 5) {
          p.x = Math.random() * canvas.width;
        }
      }
      animId = requestAnimationFrame(draw);
    };
    draw();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none"
      style={{ zIndex: 0 }}
    />
  );
}
