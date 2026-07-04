"use client";

import { cn } from "@/lib/utils";
import { motion, useMotionTemplate, useMotionValue, useSpring } from "motion/react";
import { useRef } from "react";

interface SpotlightCardProps {
  children: React.ReactNode;
  className?: string;
  spotlightColor?: string;
  spotlightSize?: number;
}

export function SpotlightCard({
  children,
  className,
  spotlightColor = "rgba(11, 11, 11, 0.15)",
  spotlightSize = 300,
}: SpotlightCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  
  const mouseX = useMotionValue(-spotlightSize);
  const mouseY = useMotionValue(-spotlightSize);
  
  const springConfig = { damping: 25, stiffness: 300, mass: 0.5 };
  const smoothMouseX = useSpring(mouseX, springConfig);
  const smoothMouseY = useSpring(mouseY, springConfig);
  
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    
    const rect = cardRef.current.getBoundingClientRect();
    mouseX.set(e.clientX - rect.left);
    mouseY.set(e.clientY - rect.top);
  };
  
  const spotlightGradient = useMotionTemplate`
    radial-gradient(
      ${spotlightSize}px circle at ${smoothMouseX}px ${smoothMouseY}px,
      ${spotlightColor},
      transparent 80%
    )
  `;
  
  return (
    <motion.div
      ref={cardRef}
      className={cn(
        "group relative overflow-hidden rounded-xl border border-gray-200 bg-white shadow-md hover:shadow-xl",
        "dark:border-gray-700 dark:bg-gray-800",
        className
      )}
      onMouseMove={handleMouseMove}
      whileHover={{ 
        y: -4,
        transition: { duration: 0.2 }
      }}
    >
      {/* Spotlight gradient overlay */}
      <motion.div
        className="pointer-events-none absolute inset-0 z-10 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{ background: spotlightGradient }}
      />
      
      {/* Content */}
      <div className="relative z-20">
        {children}
      </div>
    </motion.div>
  );
}