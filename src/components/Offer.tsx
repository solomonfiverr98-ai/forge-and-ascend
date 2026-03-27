"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Check, ArrowRight } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const features = [
  "1-on-1 weekly strategy calls (12 weeks)",
  "Custom client acquisition funnel build",
  "Premium offer positioning workshop",
  "Private community of 6- & 7-figure coaches",
  "Complete sales script & objection handling templates",
  "Lifetime access to Forge & Ascend Vault (templates, SOPs, swipes)",
  "Two bonus deep-dive masterclasses",
  "90-day post-program alumni support",
];

export default function Offer() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const card = sectionRef.current.querySelector("[data-offer-card]");

    if (prefersReduced || !card) {
      gsap.set(card!, { opacity: 1, y: 0 });
      return;
    }

    gsap.fromTo(
      card,
      { opacity: 0, y: 40 },
      {
        opacity: 1,
        y: 0,
        duration: 0.9,
        ease: "power3.out",
        scrollTrigger: { trigger: sectionRef.current, start: "top 75%", once: true },
      }
    );
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative py-16 md:py-24 px-6 md:px-12 lg:px-16 bg-surface"
    >
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-10">
          <span className="section-label">THE OFFER</span>
          <h2 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold text-cream mt-4">
            Everything You Need to{" "}
            <span className="text-gold italic">Ascend</span>
          </h2>
        </div>

        {/* Offer Card */}
        <div
          data-offer-card
          className="opacity-0 bg-background border border-gold/20 rounded-3xl overflow-hidden
            shadow-[0_0_60px_rgba(201,168,76,0.06)]"
        >
          <div className="grid lg:grid-cols-[60%_40%]">
            {/* Left — What's Included */}
            <div className="p-10 md:p-12">
              <h3 className="font-heading text-3xl md:text-4xl font-bold text-cream mb-2">
                The Forge & Ascend Accelerator
              </h3>
              <p className="font-body text-muted text-base mb-8">
                12-week intensive for coaches ready to build a real business.
              </p>

              <ul className="space-y-4">
                {features.map((feature, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <span className="text-gold mt-0.5 flex-shrink-0">✦</span>
                    <span className="font-body text-cream/90 text-sm leading-relaxed">
                      {feature}
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Right — Pricing */}
            <div className="bg-surface/50 border-t lg:border-t-0 lg:border-l border-border p-10 md:p-12 flex flex-col justify-center">
              <div className="mb-8">
                <p className="font-body text-muted text-sm mb-2 uppercase tracking-wider">Investment</p>
                <div className="flex items-baseline gap-2 mb-1">
                  <span className="font-heading text-5xl md:text-6xl font-bold text-gold">$5,000</span>
                </div>
                <p className="font-body text-muted text-sm">or 3 payments of $1,800</p>
              </div>

              {/* Scarcity */}
              <div className="bg-gold/10 border border-gold/20 rounded-xl px-5 py-3 mb-8">
                <p className="font-body text-gold text-sm font-semibold text-center">
                  ⚡ Only 5 spots available this quarter
                </p>
              </div>

              {/* Guarantee */}
              <div className="mb-8">
                <div className="flex items-center gap-2 mb-2">
                  <Check size={18} className="text-gold" />
                  <span className="font-body text-cream text-sm font-semibold">
                    Money-Back Guarantee
                  </span>
                </div>
                <p className="font-body text-muted text-xs leading-relaxed">
                  If you don&apos;t land your first premium client within 90 days of completing the program, we&apos;ll refund every penny.
                </p>
              </div>

              {/* CTA */}
              <a
                href="#apply"
                id="offer-cta"
                className="group bg-gold text-background w-full py-4 rounded-full font-body font-semibold text-center
                  hover:bg-gold-hover transition-all duration-300 flex items-center justify-center gap-2
                  hover:shadow-[0_0_30px_rgba(201,168,76,0.4)]"
              >
                Claim Your Spot
                <ArrowRight size={18} className="transition-transform group-hover:translate-x-1" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
