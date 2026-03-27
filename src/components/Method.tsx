"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Target, BarChart3, Rocket } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const steps = [
  {
    number: "01",
    icon: <Target size={28} className="text-gold" />,
    title: "Forge Your Offer",
    description:
      "We reverse-engineer your ideal client's biggest pain point and package your expertise into a premium offer that sells at $3k–$15k — without a hard pitch.",
  },
  {
    number: "02",
    icon: <BarChart3 size={28} className="text-gold" />,
    title: "Build the Engine",
    description:
      "Install our automated client acquisition system: organic + paid funnels, application flows, and a booking pipeline that fills your calendar with qualified leads.",
  },
  {
    number: "03",
    icon: <Rocket size={28} className="text-gold" />,
    title: "Ascend to Freedom",
    description:
      "Scale with group programs, digital assets, and a lean team. You stop trading hours for dollars and start building real wealth — on your terms.",
  },
];

export default function Method() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const cards = sectionRef.current.querySelectorAll("[data-step-card]");

    if (prefersReduced) {
      gsap.set(cards, { opacity: 1, y: 0 });
      return;
    }

    gsap.fromTo(
      cards,
      { opacity: 0, y: 50 },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        stagger: 0.2,
        ease: "power3.out",
        scrollTrigger: { trigger: sectionRef.current, start: "top 75%", once: true },
      }
    );
  }, []);

  return (
    <section
      ref={sectionRef}
      id="process"
      className="relative py-24 md:py-32 px-6 lg:px-12"
    >
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <span className="section-label">THE METHOD</span>
          <h2 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold text-cream mt-4">
            Three Steps to <span className="text-gold italic">Scale</span>
          </h2>
          <p className="font-body text-muted text-lg mt-4 max-w-2xl mx-auto">
            A battle-tested framework used by 200+ coaches to break through the revenue ceiling.
          </p>
        </div>

        {/* Steps */}
        <div className="grid md:grid-cols-3 gap-8">
          {steps.map((step, i) => (
            <div
              key={i}
              data-step-card
              className="opacity-0 relative bg-surface border border-border rounded-3xl p-8 pt-14 group
                hover:border-gold/30 transition-all duration-500"
            >
              {/* Watermark Number */}
              <span className="absolute top-4 right-6 font-heading text-[80px] font-bold text-gold/5 leading-none select-none">
                {step.number}
              </span>

              <div className="relative z-10">
                <div className="w-12 h-12 rounded-xl bg-gold/10 flex items-center justify-center mb-5">
                  {step.icon}
                </div>
                <h3 className="font-heading text-2xl md:text-3xl font-semibold text-cream mb-3 group-hover:text-gold transition-colors">
                  {step.title}
                </h3>
                <p className="font-body text-muted text-sm leading-relaxed">
                  {step.description}
                </p>
              </div>

              {/* Step indicator line */}
              {i < steps.length - 1 && (
                <div className="hidden md:block absolute top-1/2 -right-4 w-8 h-px bg-border" />
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
