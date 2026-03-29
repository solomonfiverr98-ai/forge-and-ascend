"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { Star, ChevronLeft, ChevronRight } from "lucide-react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const testimonials = [
  {
    quote: "Before Forge & Ascend my site was getting traffic but zero calls. Within 3 weeks I booked 8 discovery calls and closed 3 at $4,500 each.",
    name: "Marcus T.",
    role: "Business Coach",
    photo: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100",
  },
  {
    quote: "I was charging $1,500 per client. The positioning work helped me raise to $6,000 and fill 4 spots in one week.",
    name: "Priya S.",
    role: "Executive Coach",
    photo: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100",
  },
  {
    quote: "My old website looked like everyone else's. This page makes me look like the obvious choice. Best investment I've made.",
    name: "David A.",
    role: "Solopreneur",
    photo: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100",
  },
  {
    quote: "From $3k months to $12k months in 90 days. Everything exceeded my expectations.",
    name: "Amina K.",
    role: "Life Coach",
    photo: "https://images.unsplash.com/photo-1531123897727-8f129e1688ce?w=100",
  },
];

export default function Testimonials() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const sectionRef = useRef<HTMLElement>(null);
  const [itemsPerPage, setItemsPerPage] = useState(3);

  useEffect(() => {
    const updateItemsPerPage = () => {
      if (window.innerWidth < 768) setItemsPerPage(1);
      else if (window.innerWidth < 1280) setItemsPerPage(2);
      else setItemsPerPage(3);
    };

    updateItemsPerPage();
    window.addEventListener("resize", updateItemsPerPage);
    return () => window.removeEventListener("resize", updateItemsPerPage);
  }, []);

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  useEffect(() => {
    const interval = setInterval(nextSlide, 5000);
    return () => clearInterval(interval);
  }, [currentIndex]);

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
      id="results"
      className="relative py-16 md:py-24 px-6 md:px-12 lg:px-16 bg-[#0D0D0D] overflow-hidden"
    >
      <div className="max-w-7xl mx-auto">
        {/* Label and Headline */}
        <div className="text-center mb-16">
          <span 
            data-fade-up 
            className="opacity-0 block uppercase text-[#C9A84C] text-[12px] tracking-[0.2em] font-body font-semibold mb-6"
          >
            CLIENT STORIES
          </span>
          <h2 
            data-fade-up 
            className="opacity-0 font-heading text-[clamp(36px,5vw,56px)] leading-tight text-[#F5F5F5]"
          >
            Real Coaches. <span className="text-[#C9A84C] italic">Real Results.</span>
          </h2>
        </div>

        {/* Carousel Container */}
        <div className="relative group">
          <div className="overflow-hidden">
            <div 
              className="flex transition-transform duration-700 ease-in-out gap-6"
              style={{ transform: `translateX(-${currentIndex * (100 / itemsPerPage)}%)` }}
            >
              {testimonials.map((testimonial, i) => (
                <div 
                  key={i}
                  className="flex-shrink-0 w-full md:w-[calc(50%-12px)] xl:w-[calc(33.333%-16px)]"
                >
                  <div className="bg-[#1A1A1A] border border-[#2A2A2A] rounded-[2rem] p-8 h-full flex flex-col items-start transition-all duration-300 hover:-translate-y-2 hover:border-[#C9A84C]/20">
                    {/* Stars */}
                    <div className="flex gap-1 mb-6">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Star key={star} size={16} className="fill-[#C9A84C] text-[#C9A84C]" />
                      ))}
                    </div>

                    {/* Quote */}
                    <blockquote className="font-heading italic text-[20px] text-[#E8E0D0] leading-relaxed mb-10 flex-grow">
                      &quot;{testimonial.quote}&quot;
                    </blockquote>

                    {/* Author */}
                    <div className="flex items-center gap-4">
                      <div className="relative w-14 h-14 rounded-full border-2 border-[#C9A84C] overflow-hidden">
                        <Image src={testimonial.photo} alt={testimonial.name} fill className="object-cover" />
                      </div>
                      <div>
                        <p className="font-body text-[#F5F5F5] text-[15px] font-semibold">
                          {testimonial.name}
                        </p>
                        <p className="font-body text-[#6B6B6B] text-[13px]">
                          {testimonial.role}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Navigation Arrows */}
          <button 
            onClick={prevSlide}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-1/2 md:-translate-x-full w-12 h-12 rounded-full bg-[#1A1A1A] border border-[#2A2A2A] text-[#C9A84C] flex items-center justify-center transition-all hover:bg-[#C9A84C] hover:text-[#0D0D0D] z-20"
          >
            <ChevronLeft size={24} />
          </button>
          <button 
            onClick={nextSlide}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 md:translate-x-full w-12 h-12 rounded-full bg-[#1A1A1A] border border-[#2A2A2A] text-[#C9A84C] flex items-center justify-center transition-all hover:bg-[#C9A84C] hover:text-[#0D0D0D] z-20"
          >
            <ChevronRight size={24} />
          </button>
        </div>

        {/* Navigation Dots */}
        <div className="flex justify-center gap-3 mt-12">
          {Array.from({ length: testimonials.length }).map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrentIndex(i)}
              className={`h-2 rounded-full transition-all duration-300 ${
                currentIndex === i ? "w-8 bg-[#C9A84C]" : "w-2 bg-[#2A2A2A]"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
