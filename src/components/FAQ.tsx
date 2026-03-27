"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";

const faqs = [
  {
    question: "Who is this for?",
    answer:
      "Coaches, consultants, and solopreneurs who are already getting results for clients but struggling to attract consistent high-ticket leads online.",
  },
  {
    question: "How long until I see results?",
    answer:
      "Most clients see their first qualified discovery calls within 2 weeks of launching. Full momentum typically hits by week 6-8.",
  },
  {
    question: "What if I don't have testimonials yet?",
    answer:
      "We work with where you are. We help you package your existing results into compelling proof even if you're still building your portfolio.",
  },
  {
    question: "Is there a guarantee?",
    answer:
      "Yes. If you don't book at least 5 qualified discovery calls within 60 days we will work with you for free until you do.",
  },
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggle = (i: number) => setOpenIndex(openIndex === i ? null : i);

  return (
    <section className="relative py-16 md:py-24 px-6 md:px-12 lg:px-16" style={{ background: "#1A1A1A" }}>
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-[40%_60%] gap-12 lg:gap-16">
          {/* Left — Heading */}
          <div>
            <span className="section-label mb-4 block">FAQ</span>
            <h2 className="font-heading text-4xl md:text-5xl font-bold text-cream mb-6">
              Common <span className="text-gold italic">Questions</span>
            </h2>
            <p className="font-body text-base leading-relaxed" style={{ color: "#6B6B6B" }}>
              Still on the fence? These answers should help. If not, book a call and we&apos;ll talk it through.
            </p>
          </div>

          {/* Right — Accordion */}
          <div className="space-y-4">
            {faqs.map((faq, i) => (
              <div
                key={i}
                className="rounded-2xl transition-all duration-300"
                style={{
                  border: openIndex === i ? "1px solid rgba(201,168,76,0.3)" : "1px solid #2A2A2A",
                  background: openIndex === i ? "#0D0D0D" : "rgba(13,13,13,0.5)",
                }}
              >
                <button
                  onClick={() => toggle(i)}
                  id={`faq-${i}`}
                  className="w-full flex items-center justify-between px-6 py-5 text-left"
                >
                  <span className="font-body font-semibold text-base pr-4" style={{ color: "#F5F5F5" }}>
                    {faq.question}
                  </span>
                  <ChevronDown
                    size={20}
                    className={`flex-shrink-0 transition-transform duration-300 ${
                      openIndex === i ? "rotate-180" : ""
                    }`}
                    style={{ color: "#C9A84C" }}
                  />
                </button>
                <div
                  className={`overflow-hidden transition-all duration-400 ${
                    openIndex === i ? "max-h-60 pb-5" : "max-h-0"
                  }`}
                >
                  <p className="px-6 font-body text-sm leading-relaxed" style={{ color: "#6B6B6B" }}>
                    {faq.answer}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
