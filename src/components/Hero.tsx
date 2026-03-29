"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
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
      { 
        opacity: 1, 
        y: 0, 
        duration: 0.8, 
        stagger: 0.1, 
        ease: "power3.out", 
        delay: 0.2 
      }
    );
  }, []);

  return (
    <section
      ref={containerRef}
      id="hero"
      className="relative min-h-[100dvh] bg-[#0D0D0D] flex items-center overflow-hidden py-16 md:py-24"
    >
      {/* Giant "ASCEND" Watermark */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none select-none z-0"
        style={{
          fontSize: "15vw",
          color: "#C9A84C",
          opacity: 0.03,
          fontFamily: "var(--font-heading)",
          fontWeight: 700,
          whiteSpace: "nowrap",
        }}
      >
        ASCEND
      </div>

      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 md:px-12 lg:px-16">
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-8">
          
          {/* LEFT SIDE — 55% */}
          <div className="flex flex-col gap-8 w-full lg:w-[55%] items-center lg:items-start text-center lg:text-left">
            {/* Label */}
            <div data-hero className="opacity-0">
              <span className="text-[#C9A84C] uppercase text-[12px] tracking-[0.2em] font-body font-semibold">
                ✦ HIGH-TICKET COACHING ACCELERATOR
              </span>
            </div>

            {/* Headline — 3 Separate Lines */}
            <div data-hero className="opacity-0">
              <h1 className="font-heading leading-[1.1]">
                  <span className="block text-[clamp(48px,6vw,88px)] font-['Cormorant_Garamond'] text-[#F5F5F5] leading-[1.1] whitespace-nowrap">
                    Turn Your Expertise
                  </span>
                  <span className="block text-[clamp(48px,6vw,88px)] font-['Cormorant_Garamond'] text-[#F5F5F5] leading-[1.1] whitespace-nowrap">
                    Into a Business
                  </span>
                  <span className="block text-[clamp(48px,6vw,88px)] font-['Cormorant_Garamond'] italic text-[#C9A84C] leading-[1.1] whitespace-nowrap">
                    That Runs Without You.
                  </span>
              </h1>
            </div>

            {/* Subtext */}
            <p
              data-hero
              className="opacity-0 font-body text-[clamp(16px,2vw,18px)] text-[#6B6B6B] max-w-lg leading-relaxed"
            >
              Join 200+ coaches who went from inconsistent $3k months to predictable $15k+ revenue 
              using our proven system.
            </p>

            {/* CTA Buttons */}
            <div data-hero className="opacity-0 flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
              <a
                href="#apply"
                className="inline-flex items-center justify-center px-8 py-4 rounded-full bg-[#C9A84C] text-[#0D0D0D] font-body font-semibold text-base transition-transform hover:scale-[1.02]"
              >
                Book Your Free Call <ArrowRight className="ml-2 w-5 h-5" />
              </a>
              <a
                href="#results"
                className="inline-flex items-center justify-center px-8 py-4 rounded-full border border-[#2A2A2A] text-[#E8E0D0] font-body font-semibold text-base transition-transform hover:scale-[1.02]"
              >
                See Client Results
              </a>
            </div>

            {/* Social Proof */}
            <div data-hero className="opacity-0 flex items-center gap-4 mt-2">
              <div className="flex -space-x-3">
                {[
                  "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100",
                  "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100",
                  "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100",
                ].map((src, i) => (
                  <div key={i} className="relative w-10 h-10 rounded-full border-2 border-[#0D0D0D] overflow-hidden">
                    <Image src={src} alt={`Coach ${i+1}`} fill className="object-cover" />
                  </div>
                ))}
              </div>
              <p className="text-[#6B6B6B] font-body text-[14px]">
                Trusted by 200+ coaches
              </p>
            </div>
          </div>

          {/* RIGHT SIDE — 45% (Hidden on Mobile) */}
          <div className="hidden lg:flex relative lg:w-[45%] justify-center">
            {/* Organic Blob Image */}
            <div 
              data-hero
              className="opacity-0 relative w-full max-w-[500px] aspect-square lg:h-[500px] overflow-hidden"
              style={{
                borderRadius: "60% 40% 70% 30% / 50% 60% 40% 50%"
              }}
            >
              <Image 
                src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800" 
                alt="Coach Result" 
                fill 
                className="object-cover"
                priority
              />
            </div>

            {/* Floating Card — Bottom Left */}
            <div 
              data-hero
              className="opacity-0 absolute -bottom-6 -left-4 bg-[rgba(201,168,76,0.15)] border border-[rgba(201,168,76,0.3)] backdrop-blur-md rounded-2xl p-5 shadow-2xl z-20"
            >
              <p className="font-body text-[12px] text-[#C9A84C]/70 mb-1 uppercase tracking-wider">
                Average Client Result
              </p>
              <p className="font-heading text-[24px] text-[#C9A84C] font-bold leading-tight">
                $8,400/mo in 90 days
              </p>
            </div>

            {/* Floating Badge — Top Right */}
            <div 
              data-hero
              className="opacity-0 absolute -top-4 -right-4 bg-[#C9A84C] text-[#0D0D0D] rounded-full px-5 py-2.5 font-body text-[12px] font-semibold shadow-xl z-20"
            >
              ✦ 5 Spots Left
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
