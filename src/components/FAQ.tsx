"use client";

import { useState, useEffect, useRef } from "react";
import { Plus, Minus } from "lucide-react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const faqs = [
  {
    question: "Who is this for?",
    answer: "Coaches, consultants, and solopreneurs who are already getting results for clients but struggling to attract consistent high-ticket leads online.",
  },
  {
    question: "How long until I see results?",
    answer: "Most clients see their first qualified discovery calls within 2 weeks of launching. Full momentum typically hits by week 6-8.",
  },
  {
    question: "What if I don't have testimonials yet?",
    answer: "We work with where you are. We help you package your existing results into compelling proof even if you're still building your portfolio.",
  },
  {
    question: "Is there a guarantee?",
    answer: "Yes. If you don't book at least 5 qualified discovery calls within 60 days we will work with you for free until you do.",
  },
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;
    const headlineItems = sectionRef.current.querySelectorAll("[data-fade-up]");
    
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
  }, []);

  return (
    <section
      ref={sectionRef}
      id="faq"
      className="relative py-16 md:py-24 bg-[#1A1A1A] overflow-hidden"
    >
      <div className="w-full max-w-7xl mx-auto px-6 md:px-12 lg:px-16">
        <div className="flex flex-col lg:flex-row gap-16 lg:gap-24">
          
          {/* LEFT SIDE */}
          <div className="lg:w-[40%] text-center lg:text-left">
            <h2 
              data-fade-up 
              className="opacity-0 font-heading text-[clamp(48px,6vw,56px)] text-[#F5F5F5] leading-tight mb-8"
            >
              Got<br />
              <span className="text-[#C9A84C] italic">Questions?</span>
            </h2>
            <p 
              data-fade-up 
              className="opacity-0 font-body text-[14px] text-[#C9A84C] inline-flex items-center gap-2 hover:translate-x-1 transition-transform"
            >
              Still on the fence? Book a call and we&apos;ll talk it through &rarr;
            </p>
          </div>

          {/* RIGHT SIDE — Accordion */}
          <div className="lg:w-[60%] flex flex-col">
            {faqs.map((faq, i) => (
              <div 
                key={i}
                className="border-b border-[#2A2A2A] last:border-0"
              >
                <button
                  onClick={() => setOpenIndex(openIndex === i ? null : i)}
                  className="w-full py-8 flex items-center justify-between group"
                >
                  <span className="font-heading text-[20px] md:text-[24px] text-[#F5F5F5] text-left transition-colors group-hover:text-[#C9A84C]">
                    {faq.question}
                  </span>
                  <div className="text-[#C9A84C] flex-shrink-0">
                    {openIndex === i ? <Minus size={20} /> : <Plus size={20} />}
                  </div>
                </button>
                
                <div 
                  className={`overflow-hidden transition-all duration-300 ease-in-out ${
                    openIndex === i ? "max-h-[200px] pb-8 opacity-100" : "max-h-0 opacity-0"
                  }`}
                >
                  <p className="font-body text-[#6B6B6B] text-[16px] leading-relaxed">
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
