"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";

const faqs = [
  {
    question: "Who is this program for?",
    answer:
      "Forge & Ascend is built for experienced coaches, consultants, and service providers who already deliver real results for their clients — but are stuck at $3k–$8k/month and want to break through to consistent $15k+ months with premium offers.",
  },
  {
    question: "What if I don't have an audience yet?",
    answer:
      "You don't need one. Our client acquisition system works with organic outreach, strategic partnerships, and targeted ads. Several of our top performers started with zero following and closed $10k+ clients within 60 days.",
  },
  {
    question: "How much time do I need to commit per week?",
    answer:
      "Expect 5–8 hours per week: 1 hour for your strategy call, 2–3 hours for implementation, and 2–4 hours for client outreach and content. This is designed for working coaches, not people with infinite free time.",
  },
  {
    question: "What's the refund policy?",
    answer:
      "We offer a 90-day money-back guarantee. If you complete the program, implement the system, and don't land your first premium client — we refund 100%. No hoops, no fine print.",
  },
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggle = (i: number) => setOpenIndex(openIndex === i ? null : i);

  return (
    <section className="relative py-24 md:py-32 px-6 lg:px-12 bg-surface">
      <div className="max-w-6xl mx-auto">
        <div className="grid lg:grid-cols-[40%_60%] gap-12 lg:gap-16">
          {/* Left — Heading */}
          <div>
            <span className="section-label">FAQ</span>
            <h2 className="font-heading text-4xl md:text-5xl font-bold text-cream mt-4">
              Common <span className="text-gold italic">Questions</span>
            </h2>
            <p className="font-body text-muted text-base mt-4 leading-relaxed">
              Still on the fence? These answers should help. If not, book a call and we&apos;ll talk it through.
            </p>
          </div>

          {/* Right — Accordion */}
          <div className="space-y-4">
            {faqs.map((faq, i) => (
              <div
                key={i}
                className={`border rounded-2xl transition-all duration-300 ${
                  openIndex === i
                    ? "border-gold/30 bg-background"
                    : "border-border bg-background/50 hover:border-border"
                }`}
              >
                <button
                  onClick={() => toggle(i)}
                  id={`faq-${i}`}
                  className="w-full flex items-center justify-between px-6 py-5 text-left"
                >
                  <span className="font-body text-cream font-semibold text-base pr-4">
                    {faq.question}
                  </span>
                  <ChevronDown
                    size={20}
                    className={`text-gold flex-shrink-0 transition-transform duration-300 ${
                      openIndex === i ? "rotate-180" : ""
                    }`}
                  />
                </button>
                <div
                  className={`overflow-hidden transition-all duration-400 ${
                    openIndex === i ? "max-h-60 pb-5" : "max-h-0"
                  }`}
                >
                  <p className="px-6 font-body text-muted text-sm leading-relaxed">
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
