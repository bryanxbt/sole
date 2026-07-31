"use client";

import Image from "next/image";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { useRef } from "react";

type Props = {
  className?: string;
  size?: number;
  src?: string;
  alt?: string;
  float?: boolean;
  rotateOnScroll?: boolean;
  priority?: boolean;
};

export function FloatingInsole({
  className = "",
  size = 420,
  src = "/images/insole-cutout.png",
  alt = "Sole — Arch Support insole",
  float = true,
  rotateOnScroll = false,
  priority = false,
}: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const rotate = useTransform(
    scrollYProgress,
    [0, 1],
    rotateOnScroll ? [-8, 12] : [0, 0]
  );
  const y = useTransform(
    scrollYProgress,
    [0, 1],
    rotateOnScroll ? [30, -30] : [0, 0]
  );
  const smoothRotate = useSpring(rotate, { stiffness: 60, damping: 20 });
  const smoothY = useSpring(y, { stiffness: 60, damping: 20 });

  return (
    <div
      ref={ref}
      className={`relative ${className}`}
      style={{ width: size, maxWidth: "100%" }}
    >
      <motion.div
        style={{
          rotate: rotateOnScroll ? smoothRotate : undefined,
          y: rotateOnScroll ? smoothY : undefined,
        }}
        animate={
          float
            ? {
                y: [0, -16, 0],
                rotate: rotateOnScroll ? undefined : [-2.5, 2.5, -2.5],
              }
            : undefined
        }
        transition={
          float
            ? {
                duration: 7,
                repeat: Infinity,
                ease: "easeInOut",
              }
            : undefined
        }
        className="relative will-change-transform"
      >
        <Image
          src={src}
          alt={alt}
          width={size}
          height={size}
          priority={priority}
          className="h-auto w-full select-none pointer-events-none"
          style={{
            filter:
              "drop-shadow(0 28px 40px rgba(26, 20, 16, 0.18)) drop-shadow(0 8px 16px rgba(232, 90, 28, 0.1))",
          }}
          draggable={false}
          sizes="(max-width: 768px) 80vw, 420px"
        />
      </motion.div>
    </div>
  );
}
