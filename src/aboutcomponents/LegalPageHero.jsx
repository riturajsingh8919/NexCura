"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";

const LegalPageHero = ({ title, description, image }) => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    const circles = [];
    const colors = [
      "rgba(103, 183, 255, 0.2)",
      "rgba(252, 219, 158, 0.2)",
      "rgba(191, 227, 241, 0.2)",
      "rgba(255, 177, 203, 0.2)",
      "rgba(220, 215, 247, 0.2)",
    ];

    // Set canvas size
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    // Create circles
    for (let i = 0; i < 10; i++) {
      circles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        radius: Math.random() * 100 + 50,
        color: colors[Math.floor(Math.random() * colors.length)],
        speedX: (Math.random() - 0.5) * 0.5,
        speedY: (Math.random() - 0.5) * 0.5,
      });
    }

    // Animation loop
    const animate = () => {
      requestAnimationFrame(animate);
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      circles.forEach((circle) => {
        circle.x += circle.speedX;
        circle.y += circle.speedY;

        // Bounce off edges
        if (
          circle.x + circle.radius > canvas.width ||
          circle.x - circle.radius < 0
        ) {
          circle.speedX = -circle.speedX;
        }
        if (
          circle.y + circle.radius > canvas.height ||
          circle.y - circle.radius < 0
        ) {
          circle.speedY = -circle.speedY;
        }

        // Draw circle
        ctx.beginPath();
        ctx.arc(circle.x, circle.y, circle.radius, 0, Math.PI * 2);
        ctx.fillStyle = circle.color;
        ctx.fill();
      });
    };

    animate();

    return () => {
      window.removeEventListener("resize", resizeCanvas);
    };
  }, []);

  return (
    <div
      className="relative w-full flex items-center justify-center overflow-hidden pt-[64px] z-0"
      style={{
        background:
          "linear-gradient(90deg, #2E1B47 0%, #6A4A9A 50%, #A68CFF 100%)",
      }}
    >
      {/* Animated background canvas */}
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />

      <div className="relative z-10 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center pt-12 lg:pt-4 lg:pb-0">
          {/* Left Content - with standard container padding */}
          <div className="space-y-4 px-4 lg:pl-[max(1rem,calc((100vw-1280px)/2+1rem))]">
            <h1 className="text-3xl xl:text-4xl font-bold text-white leading-tight">
              {title}
            </h1>

            <p className="text-sm xl:text-lg font-semibold text-white leading-relaxed">
              {description}
            </p>
          </div>
          
          {/* Right Image - extends to screen edge */}
          <div className="relative w-full flex items-end lg:justify-end lg:pr-0">
            <Image
              src={image}
              alt={title}
              width={500}
              height={500}
              className="w-full h-auto object-cover object-right"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default LegalPageHero;

