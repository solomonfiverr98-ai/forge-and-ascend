"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { ArrowRight, Star } from "lucide-react";
import { gsap } from "gsap";

export default function Hero() {
  const containerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (!containerRef.current || prefersReduced) {
      if (containerRef.current) {
        gsap.set(containerRef.current.querySelectorAll("[data-hero]"), { opacity: 1, y: 0 });
      }
      return;
    }

    const elements = containerRef.current.querySelectorAll("[data-hero]");
    gsap.fromTo(
      elements,
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 0.8, stagger: 0.12, ease: "power3.out", delay: 0.5 }
    );
  }, []);

  return (
    <section
      ref={containerRef}
      id="hero"
      className="relative min-h-dvh flex items-center overflow-hidden pt-20 pb-16"
      style={{ background: "#0D0D0D" }}
    >
      {/* ASCEND Watermark */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none select-none"
        style={{
          fontSize: "15vw",
          color: "#C9A84C",
          opacity: 0.03,
          fontFamily: "var(--font-heading)",
          fontWeight: 700,
          letterSpacing: "0.05em",
          whiteSpace: "nowrap",
        }}
      >
        ASCEND
      </div>

      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 md:px-12 lg:px-16">
        <div className="flex flex-col lg:flex-row lg:items-center gap-12 lg:gap-6">
          {/* LEFT SIDE — 55% */}
          <div className="flex flex-col gap-6 lg:w-[55%]">
            {/* Label */}
            <div data-hero className="opacity-0">
              <span
                className="font-body uppercase tracking-[0.2em] text-xs"
                style={{ color: "#C9A84C", fontSize: "12px" }}
              >
                ✦ HIGH-TICKET COACHING ACCELERATOR
              </span>
            </div>

            {/* Headline */}
            <div data-hero className="opacity-0">
              <h1 className="font-heading text-4xl md:text-6xl lg:text-[88px] font-bold leading-[0.95]">
                <span style={{ color: "#F5F5F5" }}>Turn Your Expertise</span>
                <br />
                <span style={{ color: "#F5F5F5" }}>Into a Business</span>
                <br />
                <span className="italic" style={{ color: "#C9A84C" }}>
                  That Runs Without You.
                </span>
              </h1>
            </div>

            {/* Subtext */}
            <p
              data-hero
              className="opacity-0 font-body text-lg max-w-lg leading-relaxed"
              style={{ color: "#6B6B6B", fontSize: "18px" }}
            >
              Join 200+ coaches who went from inconsistent $3k months to predictable $15k+ revenue
              using our proven system.
            </p>

            {/* CTA Buttons */}
            <div data-hero className="opacity-0 flex flex-col sm:flex-row gap-3 sm:gap-4 mt-2">
              <a
                href="#apply"
                id="hero-cta-primary"
                className="group px-8 py-4 rounded-full font-body font-semibold text-base
                  transition-all duration-300 flex items-center justify-center gap-2
                  hover:shadow-[0_0_30px_rgba(201,168,76,0.4)]"
                style={{ background: "#C9A84C", color: "#0D0D0D" }}
              >
                Book Your Free Call
                <ArrowRight size={18} className="transition-transform group-hover:translate-x-1" />
              </a>
              <a
                href="#results"
                id="hero-cta-secondary"
                className="group px-8 py-4 rounded-full font-body font-semibold text-base
                  transition-all duration-300 flex items-center justify-center gap-2"
                style={{ border: "1px solid #2A2A2A", color: "#E8E0D0" }}
              >
                See Client Results
              </a>
            </div>

            {/* Social Proof */}
            <div data-hero className="opacity-0 flex items-center gap-4 mt-4">
              <div className="flex -space-x-2">
                {[
                  "1507003211169-0a1dd7228f2d",
                  "1494790108377-be9c29b29330",
                  "1472099645785-5658abf4ff4e",
                ].map((id, i) => (
                  <Image
                    key={i}
                    src={`https://images.unsplash.com/photo-${id}?w=80&h=80&fit=crop&crop=face`}
                    alt={`Client ${i + 1}`}
                    width={36}
                    height={36}
                    className="rounded-full object-cover border-2"
                    style={{ borderColor: "#0D0D0D" }}
                  />
                ))}
              </div>
              <div>
                <div className="flex items-center gap-0.5 mb-0.5">
                  {[1, 2, 3, 4, 5].map((s) => (
                    <Star key={s} size={13} className="fill-current" style={{ color: "#C9A84C" }} />
                  ))}
                </div>
                <p className="text-sm font-body" style={{ color: "#6B6B6B" }}>
                  Trusted by <span className="font-semibold" style={{ color: "#F5F5F5" }}>200+</span> coaches
                </p>
              </div>
            </div>
          </div>

          {/* RIGHT SIDE — 45% */}
          <div className="relative flex items-center justify-center lg:w-[45%]">
            {/* Blob Image */}
            <div
              data-hero
              className="opacity-0 relative overflow-hidden"
              style={{
                borderRadius: "60% 40% 70% 30% / 50% 60% 40% 50%",
                width: "min(400px, 85vw)",
                aspectRatio: "4/5",
              }}
            >
              <Image
                src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&h=1000&fit=crop&crop=face"
                alt="Professional coach"
                fill
                className="object-cover"
                priority
              />
            </div>

            {/* Floating Card — Bottom Left */}
            <div
              data-hero
              className="opacity-0 absolute left-0 sm:-left-2 bottom-8 md:bottom-12 rounded-2xl p-4 backdrop-blur-md"
              style={{
                background: "rgba(201, 168, 76, 0.15)",
                border: "1px solid rgba(201, 168, 76, 0.3)",
              }}
            >
              <p className="font-body text-xs mb-0.5" style={{ color: "#C9A84C" }}>
                Average Client Result
              </p>
              <p className="font-heading text-xl font-bold" style={{ color: "#C9A84C" }}>
                $8,400/mo in 90 days
              </p>
            </div>

            {/* Floating Badge — Top Right */}
            <div
              data-hero
              className="opacity-0 absolute right-0 sm:-right-2 top-4 md:top-8 rounded-full px-4 py-2"
              style={{ background: "#C9A84C", color: "#0D0D0D" }}
            >
              <p className="font-body text-sm font-bold">✦ 5 Spots Left</p>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom gradient fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#0D0D0D] to-transparent pointer-events-none" />
    </section>
  );
}
