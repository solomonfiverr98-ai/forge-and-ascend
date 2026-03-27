"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const metrics = [
  { value: 127000, prefix: "$", suffix: "", label: "Average Revenue Growth", display: "$127,000" },
  { value: 340, prefix: "", suffix: "%", label: "ROI for Our Clients", display: "340%" },
  { value: 90, prefix: "", suffix: " Days", label: "To First Premium Client", display: "90 Days" },
];

export default function SocialProof() {
  const sectionRef = useRef<HTMLElement>(null);
  const counterRefs = useRef<(HTMLSpanElement | null)[]>([]);

  useEffect(() => {
    if (!sectionRef.current) return;
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    metrics.forEach((metric, i) => {
      const el = counterRefs.current[i];
      if (!el) return;

      if (prefersReduced) {
        el.textContent = metric.display;
        return;
      }

      const obj = { value: 0 };
      gsap.to(obj, {
        value: metric.value,
        duration: 2.2,
        ease: "power1.out",
        scrollTrigger: { trigger: el, start: "top 85%", once: true },
        onUpdate: () => {
          const val = metric.value >= 1000
            ? Math.floor(obj.value).toLocaleString()
            : Math.floor(obj.value).toString();
          el.textContent = `${metric.prefix}${val}${metric.suffix}`;
        },
      });
    });

    // Fade-in cards
    if (!prefersReduced) {
      gsap.fromTo(
        sectionRef.current.querySelectorAll("[data-metric-card]"),
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.7,
          stagger: 0.2,
          ease: "power2.out",
          scrollTrigger: { trigger: sectionRef.current, start: "top 80%", once: true },
        }
      );
    }
  }, []);

  return (
    <section
      ref={sectionRef}
      id="results"
      className="relative py-24 md:py-32 px-6 lg:px-12 bg-surface"
    >
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <span className="section-label">PROVEN RESULTS</span>
          <h2 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold text-cream mt-4">
            Numbers Don&apos;t <span className="text-gold italic">Lie</span>
          </h2>
        </div>

        {/* Metric Cards */}
        <div className="grid md:grid-cols-3 gap-8">
          {metrics.map((metric, i) => (
            <div
              key={i}
              data-metric-card
              className="opacity-0 text-center p-10 rounded-3xl bg-background border border-border
                hover:border-gold/30 transition-all duration-500 group"
            >
              <span
                ref={(el) => { counterRefs.current[i] = el; }}
                className="font-heading text-5xl md:text-6xl lg:text-7xl font-bold text-gold
                  group-hover:drop-shadow-[0_0_20px_rgba(201,168,76,0.3)] transition-all duration-500"
              >
                {metric.display}
              </span>
              <p className="font-body text-muted text-base mt-4 tracking-wide">
                {metric.label}
              </p>
            </div>
          ))}
        </div>

        {/* Client logos placeholder */}
        <div className="flex items-center justify-center gap-10 mt-16 flex-wrap opacity-40">
          {["Forbes", "Inc.", "Entrepreneur", "Fast Company"].map((name) => (
            <span key={name} className="font-heading text-xl md:text-2xl text-muted/60 tracking-widest">
              {name}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
