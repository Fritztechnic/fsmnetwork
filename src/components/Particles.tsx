"use client";

import { useEffect, useState } from "react";

const COUNT = 30;

function generateParticles() {
  return Array.from({ length: COUNT }, (_, i) => ({
    id: i,
    left: `${Math.random() * 100}%`,
    top: `${Math.random() * 100}%`,
    duration: `${6 + Math.random() * 14}s`,
    delay: `${Math.random() * 15}s`,
    size: `${1 + Math.random() * 2.5}px`,
    color: Math.random() > 0.5 ? "var(--raw-accent-purple)" : "var(--raw-accent-cyan)",
  }));
}

export default function Particles() {
  // Generated client-side only, after mount, to avoid an SSR/CSR random-value hydration mismatch.
  const [particles, setParticles] = useState<ReturnType<typeof generateParticles>>([]);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect -- client-only randomization to avoid SSR/CSR hydration mismatch
    setParticles(generateParticles());
  }, []);

  return (
    <div className="particles">
      {particles.map((p) => (
        <div
          key={p.id}
          className="particle"
          style={{
            left: p.left,
            top: p.top,
            animationDuration: p.duration,
            animationDelay: p.delay,
            width: p.size,
            height: p.size,
            background: p.color,
          }}
        />
      ))}
    </div>
  );
}
