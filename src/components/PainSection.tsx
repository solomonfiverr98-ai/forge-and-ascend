"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { AlertTriangle, Clock, TrendingDown } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const painPoints = [
  {
    icon: <Clock size={28} />,
    emoji: "⏰",
    title: "Trading Time for Money",
    description:
      "You're maxed out at 1-on-1 sessions, working 60-hour weeks, and there's no room to grow. The math doesn't add up for the life you want.",
  },
  {
    icon: <TrendingDown size={28} />,
    emoji: "📉",
    title: "Feast-or-Famine Revenue",
    description:
      "One month 10k, next month $2k. You can't plan your life — let alone your business — when revenue swings wildly every cycle.",
  },
  {
    icon: <AlertTriangle size={28} />,
    emoji: "🔥",
    title: "Imposter Syndrome at Scale",
    description:
      "You know your results are real, but charging premium prices still feels uncomfortable. Meanwhile, less-qualified coaches charge 3x what you do.",
  },
];

export default function PainSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const cards = sectionRef.current.querySelectorAll("[data-pain-card]");

    if (prefersReduced) {
      gsap.set(cards, { opacity: 1, y: 0 });
      return;
    }

    gsap.fromTo(
      cards,
      { opacity: 0, y: 40 },
      {
        opacity: 1,
        y: 0,
        duration: 0.7,
        stagger: 0.15,
        ease: "power2.out",
        scrollTrigger: { trigger: sectionRef.current, start: "top 80%", once: true },
      }
    );
  }, []);

  return (
    <section
      ref={sectionRef}
      id="about"
      className="relative py-16 md:py-24 px-6 md:px-12 lg:px-16"
    >
      <div className="max-w-7xl mx-auto">
        {/* Label */}
        <div className="text-center mb-10">
          <span className="section-label">SOUND FAMILIAR?</span>
          <h2 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold text-cream mt-4">
            The Growth Ceiling <span className="text-gold italic">Is Real</span>
          </h2>
          <p className="font-body text-muted text-lg mt-4 max-w-2xl mx-auto">
            These are the three traps that keep expert coaches stuck below six figures.
          </p>
        </div>

        {/* Pain Cards */}
        <div className="grid md:grid-cols-3 gap-6">
          {painPoints.map((pain, i) => (
            <div
              key={i}
              data-pain-card
              className="opacity-0 card-lift bg-surface border border-border rounded-2xl p-8 group cursor-default"
            >
              <span className="text-4xl mb-4 block">{pain.emoji}</span>
              <h3 className="font-heading text-2xl font-semibold text-cream mb-3 group-hover:text-gold transition-colors">
                {pain.title}
              </h3>
              <p className="font-body text-muted text-sm leading-relaxed">
                {pain.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
