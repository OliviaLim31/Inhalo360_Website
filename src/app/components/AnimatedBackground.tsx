import { useEffect, useRef } from 'react';

export function AnimatedBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let particles: Particle[] = [];
    let mouseX = 0;
    let mouseY = 0;

    const setCanvasSize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    setCanvasSize();
    window.addEventListener('resize', setCanvasSize);

    // 鼠标跟踪
    const handleMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    };
    window.addEventListener('mousemove', handleMouseMove);

    class Particle {
      x: number;
      y: number;
      baseX: number;
      baseY: number;
      size: number;
      speedX: number;
      speedY: number;
      opacity: number;
      pulsePhase: number;
      pulseSpeed: number;
      layer: number; // 添加层次

      constructor() {
        this.baseX = Math.random() * canvas.width;
        this.baseY = Math.random() * canvas.height;
        this.x = this.baseX;
        this.y = this.baseY;

        // 创建大小层次：小、中、大
        const sizeType = Math.random();
        if (sizeType < 0.6) {
          // 60% 小粒子
          this.size = Math.random() * 30 + 20;
          this.opacity = Math.random() * 0.3 + 0.2;
          this.layer = 1;
        } else if (sizeType < 0.9) {
          // 30% 中粒子
          this.size = Math.random() * 60 + 50;
          this.opacity = Math.random() * 0.24 + 0.16;
          this.layer = 2;
        } else {
          // 10% 大粒子
          this.size = Math.random() * 100 + 80;
          this.opacity = Math.random() * 0.16 + 0.12;
          this.layer = 3;
        }

        this.speedX = (Math.random() - 0.5) * 0.5;
        this.speedY = (Math.random() - 0.5) * 0.5;
        this.pulsePhase = Math.random() * Math.PI * 2;
        this.pulseSpeed = 0.02 + Math.random() * 0.02;
      }

      update() {
        // 基础移动
        this.baseX += this.speedX;
        this.baseY += this.speedY;

        // 边界检测
        if (this.baseX > canvas.width) this.baseX = 0;
        if (this.baseX < 0) this.baseX = canvas.width;
        if (this.baseY > canvas.height) this.baseY = 0;
        if (this.baseY < 0) this.baseY = canvas.height;

        // 鼠标交互 - 微妙的吸引效果
        const dx = mouseX - this.baseX;
        const dy = mouseY - this.baseY;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < 200) {
          const force = (200 - distance) / 200;
          this.x = this.baseX + (dx * force * 0.05);
          this.y = this.baseY + (dy * force * 0.05);
        } else {
          this.x = this.baseX;
          this.y = this.baseY;
        }

        // 脉冲动画
        this.pulsePhase += this.pulseSpeed;
      }

      draw() {
        if (!ctx) return;

        // 脉冲效果
        const pulse = Math.sin(this.pulsePhase) * 0.3 + 0.7;
        const currentOpacity = this.opacity * pulse;

        // 渐变效果
        const gradient = ctx.createRadialGradient(
          this.x,
          this.y,
          0,
          this.x,
          this.y,
          this.size * pulse
        );

        gradient.addColorStop(0, `rgba(147, 197, 253, ${currentOpacity * 1.2})`);
        gradient.addColorStop(0.3, `rgba(96, 165, 250, ${currentOpacity * 0.8})`);
        gradient.addColorStop(0.6, `rgba(59, 130, 246, ${currentOpacity * 0.4})`);
        gradient.addColorStop(1, `rgba(59, 130, 246, 0)`);

        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size * pulse, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    // 初始化粒子 - 减少数量但提高质量
    const initParticles = () => {
      particles = [];
      const numberOfParticles = Math.floor((canvas.width * canvas.height) / 20000);
      for (let i = 0; i < numberOfParticles; i++) {
        particles.push(new Particle());
      }
    };

    initParticles();

    // 绘制连接线 - 优化算法
    const drawLines = () => {
      if (!ctx) return;

      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < 250) {
            const opacity = (1 - distance / 250) * 0.5;

            // 创建渐变线条
            const gradient = ctx.createLinearGradient(
              particles[i].x,
              particles[i].y,
              particles[j].x,
              particles[j].y
            );
            gradient.addColorStop(0, `rgba(96, 165, 250, ${opacity})`);
            gradient.addColorStop(0.5, `rgba(59, 130, 246, ${opacity * 1.2})`);
            gradient.addColorStop(1, `rgba(96, 165, 250, ${opacity})`);

            ctx.strokeStyle = gradient;
            ctx.lineWidth = 1.2;
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.stroke();
          }
        }
      }
    };

    // 动画循环
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particles.forEach((particle) => {
        particle.update();
        // particle.draw(); // 隐藏点(泡泡)，只保留线条
      });

      drawLines();

      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', setCanvasSize);
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0"
      style={{ opacity: 1 }}
    />
  );
}
