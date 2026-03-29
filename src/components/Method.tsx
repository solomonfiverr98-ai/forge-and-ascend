"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Target, Layers, Rocket } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const steps = [
  {
    number: "01",
    icon: <Target className="w-8 h-8 text-white" />,
    title: "Clarity & Positioning",
    description: "We define your unique authority and ideal client so your page speaks directly to buyers not browsers.",
  },
  {
    number: "02",
    icon: <Layers className="w-8 h-8 text-white" />,
    title: "Premium Presence Build",
    description: "We build your conversion-focused landing page with proven psychology, premium design, and seamless booking.",
  },
  {
    number: "03",
    icon: <Rocket className="w-8 h-8 text-white" />,
    title: "Launch & Scale",
    description: "Go live with a 24/7 sales machine that books qualified calls while you focus on coaching.",
  },
];

export default function Method() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const headlineItems = sectionRef.current.querySelectorAll("[data-fade-up]");
    const stepItems = sectionRef.current.querySelectorAll("[data-step-item]");

    if (prefersReduced) {
      gsap.set([...Array.from(headlineItems), ...Array.from(stepItems)], { opacity: 1, y: 0 });
      return;
    }

    gsap.fromTo(
      headlineItems,
      { opacity: 0, y: 30 },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        stagger: 0.1,
        ease: "power3.out",
        scrollTrigger: { trigger: sectionRef.current, start: "top 85%", once: true },
      }
    );

    gsap.fromTo(
      stepItems,
      { opacity: 0, y: 40 },
      {
        opacity: 1,
        y: 0,
        duration: 0.7,
        stagger: 0.2,
        ease: "power2.out",
        scrollTrigger: { trigger: sectionRef.current, start: "top 80%", once: true },
      }
    );
  }, []);

  return (
    <section
      ref={sectionRef}
      id="process"
      className="relative py-16 md:py-24 px-6 md:px-12 lg:px-16 bg-[#0D0D0D] overflow-hidden"
    >
      <div className="max-w-7xl mx-auto">
        {/* Label and Headline */}
        <div className="text-center mb-24">
          <span 
            data-fade-up 
            className="opacity-0 block uppercase text-[#C9A84C] text-[12px] tracking-[0.2em] font-body font-semibold mb-6"
          >
            THE METHOD
          </span>
          <h2 
            data-fade-up 
            className="opacity-0 font-heading text-[clamp(36px,5vw,56px)] leading-tight text-[#F5F5F5]"
          >
            How We Forge Your<br />
            High-Ticket Presence
          </h2>
        </div>

        {/* Steps Grid */}
        <div className="relative grid md:grid-cols-3 gap-12 lg:gap-16">
          
          {/* Connecting Dashed Line (Desktop Only) */}
          <div className="hidden md:block absolute top-[36px] left-[15%] right-[15%] h-[1px] border-t border-dashed border-[#C9A84C]/40 z-0" />

          {steps.map((step, i) => (
            <div
              key={i}
              data-step-item
              className="opacity-0 flex flex-col items-center text-center relative z-10"
            >
              {/* Icon Container */}
              <div className="relative flex items-center justify-center mb-12">
                {/* Watermark Number */}
                <div 
                  className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 font-heading text-[140px] font-bold text-[#C9A84C] opacity-10 leading-none select-none -z-10"
                >
                  {step.number}
                </div>

                {/* Icon Circle */}
                <div className="w-[72px] h-[72px] rounded-full bg-[#C9A84C] flex items-center justify-center shadow-lg shadow-[#C9A84C]/20">
                  {step.icon}
                </div>
              </div>

              {/* Step Content */}
              <h3 className="font-heading text-[28px] text-[#F5F5F5] mb-4 leading-tight">
                {step.title}
              </h3>
              
              <p className="font-body text-[#6B6B6B] text-[15px] leading-relaxed max-w-[220px]">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
