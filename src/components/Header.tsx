"use client";

import Link from "next/link";
import Image from "next/image";
import { MessagesSquare } from "lucide-react";
import { useEffect, useState } from "react";

const navLinks = [
  { href: "/#home", label: "Home" },
  { href: "/#spielmodi", label: "Spielmodi" },
  { href: "https://dc.fsmnetwork.de/", label: "Discord", external: true },
];

export default function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 py-3.5 backdrop-blur-[20px] border-b border-white/[.08] transition-colors duration-300 ${
        open ? "bg-[#0a0a0ff2]" : "bg-[#0a0a0fcc]"
      } ${scrolled ? "navbar-scrolled" : ""}`}
    >
      <Link href="/#home" className="flex items-center gap-3">
        <Image
          src="/logo.png"
          alt="FSM Network Logo"
          width={36}
          height={36}
          className="h-[36px] w-auto"
          priority
        />
        <span
          className="font-display text-2xl font-bold"
          style={{
            background: "linear-gradient(135deg, #00e5ff, #b44aff)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
          }}
        >
          FSM Network
        </span>
      </Link>

      {/* Desktop nav */}
      <ul className="flex gap-3 items-center list-none max-md:hidden">
        {navLinks.map((link) =>
          link.external ? (
            <li key={link.label}>
              <a
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 py-1.5 px-4 rounded-lg font-display text-[0.95rem] font-semibold tracking-[0.03em] bg-white/[.03] text-text-primary border border-white/[.08] backdrop-blur-[10px] transition-all duration-300 hover:border-white/[.18] hover:-translate-y-px"
              >
                <MessagesSquare className="w-4 h-4" strokeWidth={1.75} />
                {link.label}
              </a>
            </li>
          ) : (
            <li key={link.label}>
              <Link
                href={link.href}
                className="inline-flex items-center py-1.5 px-4 rounded-lg font-display text-[0.95rem] font-semibold tracking-[0.03em] bg-white/[.03] text-text-primary border border-white/[.08] backdrop-blur-[10px] transition-all duration-300 hover:border-white/[.18] hover:-translate-y-px"
              >
                {link.label}
              </Link>
            </li>
          ),
        )}
        <li>
          <a
            href="https://status.fsmnetwork.de/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 py-1.5 px-4 rounded-lg font-display text-[0.95rem] font-semibold tracking-[0.03em] bg-white/[.03] text-text-primary border border-white/[.08] backdrop-blur-[10px] transition-all duration-300 hover:border-accent-purple hover:-translate-y-px hover:shadow-[0_0_30px_rgba(180,74,255,.3)]"
          >
            <span className="w-[7px] h-[7px] rounded-full bg-status-green flex-shrink-0 shadow-[0_0_6px_rgba(102,255,102,.4)]" />
            Status
          </a>
        </li>
      </ul>

      {/* Mobile toggle */}
      <button
        type="button"
        className="hidden max-md:flex flex-col gap-[5px] cursor-pointer bg-none border-none p-1"
        onClick={() => setOpen((v) => !v)}
        aria-label="Menü öffnen"
      >
        <span
          className={`block w-6 h-0.5 bg-text-primary rounded-sm transition-all duration-300 ${
            open ? "rotate-45 translate-y-[3.5px]" : ""
          }`}
        />
        <span
          className={`block w-6 h-0.5 bg-text-primary rounded-sm transition-all duration-300 ${
            open ? "opacity-0" : ""
          }`}
        />
        <span
          className={`block w-6 h-0.5 bg-text-primary rounded-sm transition-all duration-300 ${
            open ? "-rotate-45 -translate-y-[3.5px]" : ""
          }`}
        />
      </button>

      {/* Mobile menu */}
      {open && (
        <div className="hidden max-md:flex absolute top-full left-0 right-0 flex-col bg-[#0a0a0ff2] backdrop-blur-[20px] py-4 px-6 gap-2 border-b border-white/[.08]">
          <ul className="flex flex-col gap-2 list-none">
            {navLinks.map((link) =>
              link.external ? (
                <li key={link.label}>
                  <a
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => setOpen(false)}
                    className="flex items-center gap-2 py-2 font-display text-[0.95rem] font-semibold tracking-[0.03em] text-text-primary"
                  >
                    <MessagesSquare className="w-4 h-4" strokeWidth={1.75} />
                    {link.label}
                  </a>
                </li>
              ) : (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    onClick={() => setOpen(false)}
                    className="block py-2 font-display text-[0.95rem] font-semibold tracking-[0.03em] text-text-primary"
                  >
                    {link.label}
                  </Link>
                </li>
              ),
            )}
            <li>
              <a
                href="https://status.fsmnetwork.de/"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setOpen(false)}
                className="inline-flex items-center gap-1.5 py-2 font-display text-[0.95rem] font-semibold tracking-[0.03em] text-text-primary"
              >
                <span className="w-[7px] h-[7px] rounded-full bg-status-green flex-shrink-0 shadow-[0_0_6px_rgba(102,255,102,.4)]" />
                Status
              </a>
            </li>
          </ul>
        </div>
      )}
    </nav>
  );
}
