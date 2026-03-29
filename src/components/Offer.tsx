"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const features = [
  "Custom high-converting landing page",
  "Positioning and authority framework",
  "Offer packaging and pricing strategy",
  "Discovery call script and close system",
  "90-day launch and scale roadmap",
  "Weekly 1:1 coaching calls",
];

export default function Offer() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const headlineItems = sectionRef.current.querySelectorAll("[data-fade-up]");
    const offerCard = sectionRef.current.querySelector("[data-offer-card]");

    if (prefersReduced) {
      gsap.set([...Array.from(headlineItems), offerCard], { opacity: 1, y: 0 });
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
      offerCard,
      { opacity: 0, y: 40 },
      {
        opacity: 1,
        y: 0,
        duration: 0.9,
        ease: "power2.out",
        scrollTrigger: { trigger: sectionRef.current, start: "top 75%", once: true },
      }
    );
  }, []);

  return (
    <section
      ref={sectionRef}
      id="offer"
      className="relative py-16 md:py-24 px-6 md:px-12 lg:px-16 bg-[#1A1A1A]"
    >
      <div className="max-w-7xl mx-auto">
        {/* Label and Headline */}
        <div className="text-center mb-16">
          <span 
            data-fade-up 
            className="opacity-0 block uppercase text-[#C9A84C] text-[12px] tracking-[0.2em] font-body font-semibold mb-6"
          >
            THE PROGRAM
          </span>
          <h2 
            data-fade-up 
            className="opacity-0 font-heading text-[clamp(36px,5vw,56px)] leading-tight text-[#F5F5F5]"
          >
            Everything You Need to<br />
            Attract Premium Clients
          </h2>
        </div>

        {/* Offer Card */}
        <div 
          data-offer-card
          className="opacity-0 bg-[#0D0D0D] border border-[rgba(201,168,76,0.3)] rounded-[2.5rem] p-8 md:p-12 lg:p-16 max-w-5xl mx-auto"
        >
          <div className="flex flex-col lg:flex-row gap-12 lg:gap-16">
            
            {/* LEFT SIDE */}
            <div className="lg:w-[60%] flex flex-col items-start">
              <h3 className="font-heading text-[32px] text-[#F5F5F5] mb-2 leading-tight">
                The Forge &amp; Ascend Accelerator
              </h3>
              <p className="font-body text-[#6B6B6B] text-[16px] mb-10">
                12-Week High-Ticket Transformation
              </p>

              <ul className="flex flex-col gap-5">
                {features.map((feature, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <span className="text-[#C9A84C] text-[18px] mt-0.5 font-bold">✦</span>
                    <span className="font-body text-[#E8E0D0] text-[16px] leading-relaxed">
                      {feature}
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            {/* RIGHT SIDE */}
            <div className="lg:w-[40%] flex flex-col items-center lg:items-end text-center lg:text-right">
              <span className="block uppercase text-[#C9A84C] text-[12px] tracking-[0.2em] font-body font-bold mb-4">
                INVESTMENT
              </span>
              
              <div className="font-heading text-[clamp(60px,8vw,72px)] text-[#C9A84C] font-bold leading-none mb-2">
                $5,000
              </div>
              
              <p className="font-body text-[#6B6B6B] text-[14px] mb-8">
                Or 3 payments of $1,800
              </p>

              <div className="bg-[rgba(201,168,76,0.1)] border border-[#C9A84C]/30 rounded-full px-5 py-2 mb-2">
                <p className="text-[#C9A84C] font-body text-[13px] font-semibold">
                  ⚡ Only 5 spots available this month
                </p>
              </div>
              
              <p className="font-body text-[#6B6B6B] text-[14px] italic">
                ✓ Money-Back Guarantee
              </p>

              <a 
                href="#apply"
                className="w-full mt-10 bg-[#C9A84C] text-[#0D0D0D] rounded-full py-5 px-8 font-body font-bold text-[16px] transition-all duration-300 hover:scale-[1.03] text-center"
              >
                Apply for Your Spot →
              </a>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}
