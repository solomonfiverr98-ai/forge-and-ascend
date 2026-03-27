"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { ArrowRight, Play, Star } from "lucide-react";
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
    >
      {/* ASCEND Watermark */}
      <div className="watermark text-[15vw] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
        ASCEND
      </div>

      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 lg:px-12">
        <div className="grid lg:grid-cols-[55%_45%] gap-12 lg:gap-6 items-center">
          {/* Left Content */}
          <div className="flex flex-col gap-6">
            {/* Label */}
            <div data-hero className="opacity-0">
              <span className="section-label">HIGH-TICKET COACHING ACCELERATOR</span>
            </div>

            {/* Headline */}
            <h1
              data-hero
              className="opacity-0 font-heading text-4xl md:text-6xl lg:text-[88px] font-bold leading-[0.95] text-cream"
            >
              Build a Business{" "}
              <span className="text-gold italic">That Runs</span>{" "}
              Without You
            </h1>

            {/* Subtext */}
            <p
              data-hero
              className="opacity-0 font-body text-muted text-lg md:text-xl max-w-lg leading-relaxed"
            >
              Turn your expertise into a premium coaching business. Go from inconsistent $3k months
              to predictable $15k+ revenue with our proven system.
            </p>

            {/* CTA Buttons */}
            <div data-hero className="opacity-0 flex flex-col sm:flex-row flex-wrap gap-3 sm:gap-4 mt-2">
              <a
                href="#apply"
                id="hero-cta-primary"
                className="group bg-gold text-background px-8 py-4 rounded-full font-body font-semibold text-base
                  hover:bg-gold-hover transition-all duration-300 flex items-center gap-2
                  hover:shadow-[0_0_30px_rgba(201,168,76,0.4)]"
              >
                Book Free Strategy Call
                <ArrowRight size={18} className="transition-transform group-hover:translate-x-1" />
              </a>
              <a
                href="#process"
                id="hero-cta-secondary"
                className="group border border-border text-cream px-8 py-4 rounded-full font-body font-semibold text-base
                  hover:border-gold/50 hover:text-gold transition-all duration-300 flex items-center gap-2"
              >
                <Play size={16} className="fill-current" />
                See How It Works
              </a>
            </div>

            {/* Social Proof */}
            <div data-hero className="opacity-0 flex items-center gap-4 mt-4">
              <div className="avatar-stack flex">
                {[1, 2, 3, 4].map((i) => (
                  <Image
                    key={i}
                    src={`https://images.unsplash.com/photo-${
                      i === 1
                        ? "1507003211169-0a1dd7228f2d"
                        : i === 2
                        ? "1494790108377-be9c29b29330"
                        : i === 3
                        ? "1472099645785-5658abf4ff4e"
                        : "1438761681033-6461ffad8d80"
                    }?w=80&h=80&fit=crop&crop=face`}
                    alt={`Client ${i}`}
                    width={36}
                    height={36}
                    className="rounded-full object-cover"
                  />
                ))}
              </div>
              <div>
                <div className="flex items-center gap-1">
                  {[1, 2, 3, 4, 5].map((s) => (
                    <Star key={s} size={14} className="text-gold fill-gold" />
                  ))}
                </div>
                <p className="text-muted text-sm font-body">
                  Trusted by <span className="text-cream font-semibold">200+</span> coaches
                </p>
              </div>
            </div>
          </div>

          {/* Right — Blob Image */}
          <div className="relative flex items-center justify-center">
            {/* Blob Image */}
            <div
              data-hero
              className="opacity-0 blob-shape w-[320px] h-[380px] md:w-[400px] md:h-[480px] lg:w-[460px] lg:h-[540px] relative"
            >
              <Image
                src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=800&h=1000&fit=crop&crop=face"
                alt="Professional coach in modern setting"
                fill
                className="object-cover"
                priority
              />
            </div>

            {/* Floating Metric Card */}
            <div
              data-hero
              className="opacity-0 animate-float absolute left-2 md:-left-4 top-16 md:top-20 bg-surface/90 backdrop-blur-md border border-border
                rounded-2xl px-4 py-3 md:px-5 md:py-4 shadow-2xl"
            >
              <p className="text-gold font-heading text-3xl font-bold">$127k</p>
              <p className="text-muted text-xs font-body">Avg. Revenue Growth</p>
            </div>

            {/* Floating Badge */}
            <div
              data-hero
              className="opacity-0 animate-float-delayed absolute right-2 md:-right-2 bottom-16 md:bottom-24 bg-gold text-background
                rounded-full px-4 py-2.5 md:px-5 md:py-3 shadow-2xl"
            >
              <p className="font-body text-sm font-bold">5 Spots Left</p>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom gradient fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent pointer-events-none" />
    </section>
  );
}
