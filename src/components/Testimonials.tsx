"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ChevronLeft, ChevronRight, Star, Quote } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const testimonials = [
  {
    name: "Sarah Mitchell",
    role: "Life Coach",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&h=200&fit=crop&crop=face",
    quote:
      "I went from charging $150/session to closing $8k packages within 6 weeks. The framework is genuinely life-changing. My revenue went from $4k to $18k/month.",
    rating: 5,
  },
  {
    name: "Marcus Johnson",
    role: "Executive Coach",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop&crop=face",
    quote:
      "The funnel they built me generates 15-20 qualified applications per week on autopilot. I went from cold outreach to warm inbound leads in under 30 days.",
    rating: 5,
  },
  {
    name: "Priya Desai",
    role: "Health & Wellness Coach",
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&h=200&fit=crop&crop=face",
    quote:
      "I was terrified to charge more than $500. Now my minimum is $5,000 and I have a waitlist. The positioning work alone was worth the entire investment.",
    rating: 5,
  },
  {
    name: "David Kim",
    role: "Business Coach",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&h=200&fit=crop&crop=face",
    quote:
      "I've invested in 5 different coaching programs. Forge & Ascend is the only one that actually delivered tangible, measurable results. $127k in 4 months.",
    rating: 5,
  },
];

export default function Testimonials() {
  const [current, setCurrent] = useState(0);
  const trackRef = useRef<HTMLDivElement>(null);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const goTo = useCallback((index: number) => {
    const clamped = ((index % testimonials.length) + testimonials.length) % testimonials.length;
    setCurrent(clamped);
  }, []);

  // Auto-scroll every 5 seconds
  useEffect(() => {
    timerRef.current = setInterval(() => goTo(current + 1), 5000);
    return () => { if (timerRef.current) clearInterval(timerRef.current); };
  }, [current, goTo]);

  const prev = () => { goTo(current - 1); if (timerRef.current) clearInterval(timerRef.current); };
  const next = () => { goTo(current + 1); if (timerRef.current) clearInterval(timerRef.current); };

  return (
    <section className="relative py-24 md:py-32 px-6 lg:px-12 overflow-hidden">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-14">
          <span className="section-label">TESTIMONIALS</span>
          <h2 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold text-cream mt-4">
            Real Coaches, <span className="text-gold italic">Real Results</span>
          </h2>
        </div>

        {/* Carousel */}
        <div className="relative">
          <div className="overflow-hidden rounded-3xl">
            <div
              ref={trackRef}
              className="flex transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]"
              style={{ transform: `translateX(-${current * 100}%)` }}
            >
              {testimonials.map((t, i) => (
                <div
                  key={i}
                  className="w-full flex-shrink-0 px-2"
                >
                  <div className="bg-surface border border-border rounded-3xl p-8 md:p-12 flex flex-col md:flex-row gap-8 items-start">
                    {/* Quote icon */}
                    <div className="flex-shrink-0">
                      <div className="w-14 h-14 rounded-2xl bg-gold/10 flex items-center justify-center">
                        <Quote size={24} className="text-gold" />
                      </div>
                    </div>

                    <div className="flex-1">
                      {/* Stars */}
                      <div className="flex gap-1 mb-4">
                        {Array.from({ length: t.rating }).map((_, s) => (
                          <Star key={s} size={16} className="text-gold fill-gold" />
                        ))}
                      </div>

                      {/* Quote */}
                      <blockquote className="font-body text-cream/90 text-lg md:text-xl leading-relaxed mb-6">
                        &ldquo;{t.quote}&rdquo;
                      </blockquote>

                      {/* Author */}
                      <div className="flex items-center gap-4">
                        <Image
                          src={t.image}
                          alt={t.name}
                          width={48}
                          height={48}
                          className="rounded-full object-cover"
                        />
                        <div>
                          <p className="font-body font-semibold text-cream">{t.name}</p>
                          <p className="font-body text-muted text-sm">{t.role}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Navigation Arrows */}
          <div className="flex items-center justify-center gap-4 mt-8">
            <button
              onClick={prev}
              id="testimonials-prev"
              className="w-12 h-12 rounded-full border border-border bg-surface/50 backdrop-blur-sm
                flex items-center justify-center text-cream hover:border-gold/50 hover:text-gold
                transition-all duration-300"
              aria-label="Previous testimonial"
            >
              <ChevronLeft size={20} />
            </button>

            {/* Dots */}
            <div className="flex gap-2">
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  onClick={() => { goTo(i); if (timerRef.current) clearInterval(timerRef.current); }}
                  className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
                    current === i ? "bg-gold w-8" : "bg-border hover:bg-muted"
                  }`}
                  aria-label={`Go to testimonial ${i + 1}`}
                />
              ))}
            </div>

            <button
              onClick={next}
              id="testimonials-next"
              className="w-12 h-12 rounded-full border border-border bg-surface/50 backdrop-blur-sm
                flex items-center justify-center text-cream hover:border-gold/50 hover:text-gold
                transition-all duration-300"
              aria-label="Next testimonial"
            >
              <ChevronRight size={20} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
