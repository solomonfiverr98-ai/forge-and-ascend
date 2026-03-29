"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const painPoints = [
  {
    icon: "💸",
    title: "Traffic That Doesn't Convert",
    description: "You're spending on ads and posting daily but visitors bounce in under 5 seconds. Your page has no hook.",
  },
  {
    icon: "🎯",
    title: "No Clear Authority Signal",
    description: "Your site looks like everyone else's. High-ticket clients can't tell why you over the competition.",
  },
  {
    icon: "📅",
    title: "Empty Discovery Calls",
    description: "Your calendar should be full of qualified $5k+ clients — not tire kickers who ghost after the call.",
  },
];

export default function PainSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const cards = sectionRef.current.querySelectorAll("[data-pain-card]");
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
      className="relative py-16 md:py-24 bg-[#0D0D0D] overflow-hidden"
    >
      <div className="w-full max-w-7xl mx-auto px-6 md:px-12 lg:px-16">
        {/* Label and Headline */}
        <div className="text-center mb-16">
          <span 
            data-fade-up 
            className="opacity-0 block uppercase text-[#C9A84C] text-[12px] tracking-[0.2em] font-body font-semibold mb-6"
          >
            SOUND FAMILIAR?
          </span>
          <h2 
            data-fade-up 
            className="opacity-0 font-heading text-[clamp(36px,5vw,56px)] leading-tight text-[#E8E0D0]"
          >
            Your Expertise Is Worth More<br />
            Than Your Website Shows
          </h2>
        </div>

        {/* Pain Cards */}
        <div className="grid md:grid-cols-3 gap-8">
          {painPoints.map((pain, i) => (
            <div
              key={i}
              data-pain-card
              className="opacity-0 group bg-[#1A1A1A] border border-[#2A2A2A] rounded-[2rem] p-10 transition-all duration-300 hover:-translate-y-[6px] hover:shadow-2xl hover:shadow-[#C9A84C]/5"
            >
              {/* Icon Circle */}
              <div className="w-10 h-10 rounded-full bg-[#C9A84C] flex items-center justify-center text-xl mb-8">
                {pain.icon}
              </div>
              
              <h3 className="font-heading text-[24px] text-[#F5F5F5] mb-4 leading-tight">
                {pain.title}
              </h3>
              
              <p className="font-body text-[#6B6B6B] text-[15px] leading-relaxed">
                {pain.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
