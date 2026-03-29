"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const metrics = [
  {
    value: "$127,000",
    label: "Generated in 6 months by a business coach in Lagos",
  },
  {
    value: "340%",
    label: "Average increase in discovery call bookings",
  },
  {
    value: "90 Days",
    label: "Average time to hit consistent $10k months",
  },
];

export default function SocialProof() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const cards = sectionRef.current.querySelectorAll("[data-metric-card]");
    const headlineItems = sectionRef.current.querySelectorAll("[data-fade-up]");

    if (prefersReduced) {
      gsap.set([...Array.from(cards), ...Array.from(headlineItems)], { opacity: 1, y: 0 });
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
      cards,
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
      id="results"
      className="relative py-16 md:py-24 px-6 md:px-12 lg:px-16 bg-[#1A1A1A]"
    >
      <div className="max-w-7xl mx-auto">
        {/* Label and Headline */}
        <div className="text-center mb-16">
          <span 
            data-fade-up 
            className="opacity-0 block uppercase text-[#C9A84C] text-[12px] tracking-[0.2em] font-body font-semibold mb-6"
          >
            PROVEN RESULTS
          </span>
          <h2 
            data-fade-up 
            className="opacity-0 font-heading text-[clamp(36px,5vw,56px)] leading-tight text-[#F5F5F5]"
          >
            Numbers Don&apos;t Lie
          </h2>
        </div>

        {/* Metric Cards */}
        <div className="grid md:grid-cols-3 gap-8">
          {metrics.map((metric, i) => (
            <div
              key={i}
              data-metric-card
              className="opacity-0 bg-[#0D0D0D] border border-[#2A2A2A] rounded-[2rem] p-12 text-center transition-all duration-300 hover:-translate-y-[6px] hover:shadow-2xl hover:shadow-[#C9A84C]/5"
            >
              <div className="font-heading text-[clamp(48px,6vw,72px)] text-[#C9A84C] font-bold leading-none mb-6">
                {metric.value}
              </div>
              
              <p className="font-body text-[#6B6B6B] text-[14px] leading-relaxed max-w-[200px] mx-auto">
                {metric.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
