"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight, Star } from "lucide-react";

const testimonials = [
  {
    name: "Marcus T.",
    role: "Business Coach",
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop&crop=face",
    quote:
      "Before Forge & Ascend my site was getting traffic but zero calls. Within 3 weeks I booked 8 discovery calls and closed 3 at $4,500 each.",
  },
  {
    name: "Priya S.",
    role: "Executive Coach",
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face",
    quote:
      "I was charging $1,500 per client. The positioning work helped me raise to $6,000 and fill 4 spots in one week.",
  },
  {
    name: "David A.",
    role: "Solopreneur",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face",
    quote:
      "My old website looked like everyone else's. This page makes me look like the obvious choice. Best investment I've made.",
  },
  {
    name: "Amina K.",
    role: "Life Coach",
    image: "https://images.unsplash.com/photo-1531123897727-8f129e1688ce?w=100&h=100&fit=crop&crop=face",
    quote:
      "From $3k months to $12k months in 90 days. Everything exceeded my expectations.",
  },
];

export default function Testimonials() {
  const [page, setPage] = useState(0);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  // How many cards visible per page
  const getPerPage = useCallback(() => {
    if (typeof window === "undefined") return 3;
    if (window.innerWidth >= 1024) return 3;
    if (window.innerWidth >= 768) return 2;
    return 1;
  }, []);

  const [perPage, setPerPage] = useState(3);

  useEffect(() => {
    const update = () => setPerPage(getPerPage());
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, [getPerPage]);

  const totalPages = Math.ceil(testimonials.length / perPage);

  const goTo = useCallback(
    (index: number) => {
      const clamped = ((index % totalPages) + totalPages) % totalPages;
      setPage(clamped);
    },
    [totalPages]
  );

  // Auto-scroll every 5s
  useEffect(() => {
    timerRef.current = setInterval(() => goTo(page + 1), 5000);
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [page, goTo]);

  const prev = () => {
    goTo(page - 1);
    if (timerRef.current) clearInterval(timerRef.current);
  };
  const next = () => {
    goTo(page + 1);
    if (timerRef.current) clearInterval(timerRef.current);
  };

  const startIdx = page * perPage;
  const visible = testimonials.slice(startIdx, startIdx + perPage);

  return (
    <section className="relative py-16 md:py-24 px-6 md:px-12 lg:px-16 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-4">
          <span className="section-label">TESTIMONIALS</span>
        </div>
        <h2 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold text-cream text-center mb-6">
          Real Coaches, <span className="text-gold italic">Real Results</span>
        </h2>
        <p className="font-body text-center mb-10 max-w-xl mx-auto" style={{ color: "#6B6B6B" }}>
          Don&apos;t take our word for it — hear from coaches who transformed their businesses.
        </p>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
          {visible.map((t, i) => (
            <div
              key={`${page}-${i}`}
              className="rounded-3xl p-8 flex flex-col justify-between transition-all duration-500"
              style={{ background: "#1A1A1A", border: "1px solid #2A2A2A" }}
            >
              {/* Stars */}
              <div>
                <div className="flex gap-1 mb-4">
                  {[1, 2, 3, 4, 5].map((s) => (
                    <Star key={s} size={16} className="fill-current" style={{ color: "#C9A84C" }} />
                  ))}
                </div>

                {/* Quote */}
                <blockquote className="font-body text-lg leading-relaxed mb-6" style={{ color: "rgba(245,245,245,0.9)" }}>
                  &ldquo;{t.quote}&rdquo;
                </blockquote>
              </div>

              {/* Author */}
              <div className="flex items-center gap-4 mt-auto">
                <Image
                  src={t.image}
                  alt={t.name}
                  width={48}
                  height={48}
                  className="rounded-full object-cover"
                />
                <div>
                  <p className="font-body font-semibold" style={{ color: "#F5F5F5" }}>
                    {t.name}
                  </p>
                  <p className="font-body text-sm" style={{ color: "#6B6B6B" }}>
                    {t.role}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Navigation */}
        <div className="flex items-center justify-center gap-4">
          <button
            onClick={prev}
            id="testimonials-prev"
            className="w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300"
            style={{ border: "1px solid #2A2A2A", background: "rgba(26,26,26,0.5)", color: "#F5F5F5" }}
            aria-label="Previous testimonials"
          >
            <ChevronLeft size={20} />
          </button>

          {/* Dots */}
          <div className="flex gap-2">
            {Array.from({ length: totalPages }).map((_, i) => (
              <button
                key={i}
                onClick={() => {
                  goTo(i);
                  if (timerRef.current) clearInterval(timerRef.current);
                }}
                className="h-2.5 rounded-full transition-all duration-300"
                style={{
                  width: page === i ? "2rem" : "0.625rem",
                  background: page === i ? "#C9A84C" : "#2A2A2A",
                }}
                aria-label={`Go to page ${i + 1}`}
              />
            ))}
          </div>

          <button
            onClick={next}
            id="testimonials-next"
            className="w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300"
            style={{ border: "1px solid #2A2A2A", background: "rgba(26,26,26,0.5)", color: "#F5F5F5" }}
            aria-label="Next testimonials"
          >
            <ChevronRight size={20} />
          </button>
        </div>
      </div>
    </section>
  );
}
