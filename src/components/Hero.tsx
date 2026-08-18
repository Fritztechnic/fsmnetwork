"use client";

import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Copy } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import Particles from "@/components/Particles";

const SERVER_IP = "FSMnetwork.de";

// Scroll parallax: translate rate + fade-out speed per hero element.
const PARALLAX = [
  { ref: "bg", rate: 0.15, fade: 0 },
  { ref: "logo", rate: -0.35, fade: 1.1 },
  { ref: "title", rate: -0.55, fade: 1.3 },
  { ref: "subtitle", rate: -0.7, fade: 1.5 },
  { ref: "ip", rate: -0.85, fade: 1.7 },
  { ref: "buttons", rate: -1.0, fade: 2 },
] as const;

// Mouse-tilt parallax: how far each element drifts toward the cursor (px, deg).
const TILT = [
  { ref: "bg", x: 4, y: 4, rotate: 0 },
  { ref: "logo", x: -6, y: -6, rotate: 1 },
  { ref: "orb1", x: 18, y: 14, rotate: 0 },
  { ref: "orb2", x: -20, y: 16, rotate: 0 },
  { ref: "orb3", x: 15, y: -18, rotate: 0 },
] as const;

export default function Hero() {
  const [showToast, setShowToast] = useState(false);

  const bgRef = useRef<HTMLDivElement>(null);
  const logoRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const ipRef = useRef<HTMLButtonElement>(null);
  const buttonsRef = useRef<HTMLDivElement>(null);
  const orb1Ref = useRef<HTMLDivElement>(null);
  const orb2Ref = useRef<HTMLDivElement>(null);
  const orb3Ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduceMotion) return;

    const elements = {
      bg: bgRef.current,
      logo: logoRef.current,
      title: titleRef.current,
      subtitle: subtitleRef.current,
      ip: ipRef.current,
      buttons: buttonsRef.current,
      orb1: orb1Ref.current,
      orb2: orb2Ref.current,
      orb3: orb3Ref.current,
    };

    let scrollCurrent = 0;
    const pointerTarget = { x: 0, y: 0 };
    const pointerCurrent = { x: 0, y: 0 };
    let raf = 0;

    const onPointerMove = (e: PointerEvent) => {
      pointerTarget.x = (e.clientX / window.innerWidth) * 2 - 1;
      pointerTarget.y = (e.clientY / window.innerHeight) * 2 - 1;
    };
    window.addEventListener("pointermove", onPointerMove, { passive: true });

    const tick = () => {
      scrollCurrent += (window.scrollY - scrollCurrent) * 0.08;
      pointerCurrent.x += (pointerTarget.x - pointerCurrent.x) * 0.06;
      pointerCurrent.y += (pointerTarget.y - pointerCurrent.y) * 0.06;
      const p = Math.min(scrollCurrent, 700) / 700;

      for (const { ref, rate, fade } of PARALLAX) {
        const el = elements[ref];
        if (!el) continue;
        const tilt = TILT.find((t) => t.ref === ref);
        const tx = tilt ? pointerCurrent.x * tilt.x : 0;
        const ty = (tilt ? pointerCurrent.y * tilt.y : 0) + scrollCurrent * rate;
        const rotate = tilt?.rotate ? pointerCurrent.x * tilt.rotate : 0;
        const opacity = fade === 0 ? 1 : Math.max(0, 1 - p * fade);
        const scale = ref === "bg" ? 1 + p * 0.06 : 1 - p * 0.08;
        el.style.transform = `translate(${tx}px, ${ty}px) scale(${scale})${rotate ? ` rotate(${rotate}deg)` : ""}`;
        if (fade !== 0) el.style.opacity = String(opacity);
      }

      for (const key of ["orb1", "orb2", "orb3"] as const) {
        const el = elements[key];
        const tilt = TILT.find((t) => t.ref === key);
        if (!el || !tilt) continue;
        const scrollRate = key === "orb2" ? -0.4 : key === "orb3" ? 0.55 : 0.25;
        el.style.transform = `translate(${pointerCurrent.x * tilt.x}px, ${scrollCurrent * scrollRate + pointerCurrent.y * tilt.y}px)`;
      }

      raf = requestAnimationFrame(tick);
    };

    raf = requestAnimationFrame(tick);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("pointermove", onPointerMove);
    };
  }, []);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(SERVER_IP);
      setShowToast(true);
      setTimeout(() => setShowToast(false), 2000);
    } catch {
      // Clipboard API unavailable
    }
  };

  return (
    <>
      <Particles />
      <section id="home" className="relative min-h-screen flex flex-col items-center justify-center text-center py-32 px-6 z-[1] overflow-hidden">
        {/* Background image overlay — matches original ::before */}
        <div
          ref={bgRef}
          className="absolute inset-0 -z-[1] pointer-events-none will-change-transform"
          style={{
            background:
              "linear-gradient(to bottom, transparent 60%, var(--raw-bg-primary) 100%), url(/fsm_background.png) center center / cover no-repeat",
          }}
          aria-hidden="true"
        />

        {/* Floating glow orbs, drift idly + parallax on scroll */}
        <div ref={orb1Ref} className="absolute top-[10%] left-[8%] -z-[1] pointer-events-none will-change-transform" aria-hidden="true">
          <div className="w-64 h-64 rounded-full blur-3xl opacity-25 animate-orb-float-a" style={{ background: "var(--raw-accent-cyan)" }} />
        </div>
        <div ref={orb2Ref} className="absolute top-[55%] right-[6%] -z-[1] pointer-events-none will-change-transform" aria-hidden="true">
          <div className="w-72 h-72 rounded-full blur-3xl opacity-20 animate-orb-float-b" style={{ background: "var(--raw-accent-purple)" }} />
        </div>
        <div ref={orb3Ref} className="absolute bottom-[8%] left-[35%] -z-[1] pointer-events-none will-change-transform" aria-hidden="true">
          <div className="w-56 h-56 rounded-full blur-3xl opacity-20 animate-orb-float-c" style={{ background: "#66ff66" }} />
        </div>

        <div className="reveal-up inline-flex items-center gap-2 mb-6 py-1.5 px-4 rounded-full bg-white/[.03] border border-white/[.08] backdrop-blur-[10px] text-[0.7rem] font-semibold uppercase tracking-[0.15em] text-text-secondary">
          <span className="w-[6px] h-[6px] rounded-full bg-status-green shadow-[0_0_6px_rgba(102,255,102,.5)]" />
          Community Minecraft Server
        </div>

        <div ref={logoRef} className="reveal-up will-change-transform">
          <Image
            src="/logo.png"
            alt="FSM Network Logo"
            width={350}
            height={350}
            className="w-[clamp(230px,45vw,350px)] h-auto mb-6"
            style={{ filter: "drop-shadow(0 0 30px rgba(0,229,255,.2))" }}
            priority
            draggable={false}
          />
        </div>

        <h1
          ref={titleRef}
          className="reveal-up will-change-transform font-display text-[clamp(3rem,8vw,6rem)] font-bold leading-[1.1] mb-4"
          style={{ filter: "drop-shadow(0 0 40px rgba(100,255,100,.25))", animationDelay: "100ms" }}
        >
          FSM Network
        </h1>

        <p
          ref={subtitleRef}
          className="reveal-up will-change-transform text-[clamp(1rem,2.5vw,1.25rem)] text-text-secondary max-w-[500px] mb-10 font-light"
          style={{ animationDelay: "200ms" }}
        >
          Dein Server für unvergessliche Abenteuer.
        </p>

        <button
          ref={ipRef}
          type="button"
          onClick={handleCopy}
          className="reveal-up will-change-transform inline-flex items-center gap-3 bg-white/[.03] border border-white/[.08] rounded-xl py-3.5 px-6 mb-8 cursor-pointer transition-all duration-300 backdrop-blur-[10px] hover:border-accent-cyan hover:shadow-[0_0_30px_rgba(0,229,255,.3)]"
          style={{ animationDelay: "300ms" }}
        >
          <div className="text-left">
            <div className="text-[0.75rem] text-text-secondary uppercase tracking-[0.1em]">
              Server IP
            </div>
            <div className="font-display text-[1.4rem] font-semibold text-accent-cyan">
              {SERVER_IP}
            </div>
          </div>
          <div className="flex items-center justify-center w-9 h-9 bg-[rgba(0,229,255,.1)] rounded-lg">
            <Copy className="w-[18px] h-[18px]" color="var(--raw-accent-cyan)" strokeWidth={2} />
          </div>
        </button>

        <div ref={buttonsRef} className="reveal-up will-change-transform flex gap-4 flex-wrap justify-center" style={{ animationDelay: "400ms" }}>
          <a
            href="https://dc.fsmnetwork.de/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 py-3 px-7 rounded-xl font-display text-base font-semibold tracking-[0.03em] transition-all duration-300 hover:-translate-y-px hover:opacity-90"
            style={{
              background: "linear-gradient(135deg, #00e5ff, #b44aff)",
              color: "var(--raw-bg-primary)",
            }}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
              <path d="M20.3 5.3A17.6 17.6 0 0 0 15.9 4c-.2.4-.5.9-.6 1.3a16.5 16.5 0 0 0-4.6 0c-.2-.4-.4-.9-.6-1.3-1.5.3-3 .7-4.4 1.3C3 9 2.2 12.6 2.5 16.1a17.7 17.7 0 0 0 5.3 2.6c.4-.6.8-1.2 1.1-1.9-.6-.2-1.2-.5-1.7-.9l.4-.3c3.3 1.5 6.9 1.5 10.2 0l.4.3c-.5.3-1.1.6-1.7.9.3.7.7 1.3 1.1 1.9a17.6 17.6 0 0 0 5.3-2.6c.4-4-.6-7.6-2.6-10.8ZM9.7 13.9c-1 0-1.8-.9-1.8-2s.8-2 1.8-2 1.8.9 1.8 2-.8 2-1.8 2Zm5.4 0c-1 0-1.8-.9-1.8-2s.8-2 1.8-2 1.8.9 1.8 2-.8 2-1.8 2Z" />
            </svg>
            Discord beitreten
          </a>
          <Link
            href="/#spielmodi"
            className="group inline-flex items-center gap-2 py-3 px-7 rounded-xl font-display text-base font-semibold tracking-[0.03em] bg-white/[.03] text-text-primary border border-white/[.08] backdrop-blur-[10px] transition-all duration-300 hover:-translate-y-px hover:border-white/[.18]"
          >
            Spielmodi ansehen
            <ArrowRight className="w-[18px] h-[18px] transition-transform duration-300 group-hover:translate-x-1" strokeWidth={2} />
          </Link>
        </div>

        <div
          className="reveal-up flex items-center gap-3 mt-8 text-[0.75rem] text-text-secondary uppercase tracking-[0.08em]"
          style={{ animationDelay: "500ms" }}
        >
          <span>Kostenlos</span>
          <span className="w-1 h-1 rounded-full bg-white/20" aria-hidden="true" />
          <span>Kein Pay2Win</span>
          <span className="w-1 h-1 rounded-full bg-white/20" aria-hidden="true" />
          <span>Community-geführt</span>
        </div>
      </section>

      {/* Toast */}
      <div className={`toast ${showToast ? "show" : ""}`}>
        IP kopiert!
      </div>
    </>
  );
}
