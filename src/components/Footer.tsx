import { Activity, FileText, MessagesSquare } from "lucide-react";

const year = new Date().getFullYear();

const footerLinks = [
  { href: "https://dc.fsmnetwork.de/", label: "Discord", Icon: MessagesSquare },
  { href: "https://status.fsmnetwork.de/", label: "Status", Icon: Activity },
  { href: "/impressum", label: "Impressum", Icon: FileText },
];

export default function Footer() {
  return (
    <footer className="relative z-[1] border-t border-white/[.08] py-10 px-6 text-center">
      <div className="max-w-[900px] mx-auto flex flex-col items-center gap-4">
        <div className="flex gap-8 flex-wrap justify-center">
          {footerLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              target={link.href.startsWith("http") ? "_blank" : undefined}
              rel={link.href.startsWith("http") ? "noopener noreferrer" : undefined}
              className="inline-flex items-center gap-1.5 text-text-secondary text-[0.9rem] transition-colors duration-300 hover:text-accent-cyan"
            >
              <link.Icon className="w-4 h-4" strokeWidth={1.75} />
              {link.label}
            </a>
          ))}
        </div>
        <p className="text-text-secondary text-[0.8rem] opacity-60">
          © {year} FSM Network. Alle Rechte vorbehalten.
        </p>
        <p className="text-text-secondary text-[0.8rem] opacity-40">
          FSMnetwork.de
        </p>
      </div>

    </footer>
  );
}
