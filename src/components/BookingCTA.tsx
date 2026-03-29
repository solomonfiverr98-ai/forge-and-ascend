"use client";

import { useState, useEffect, useRef } from "react";
import { InlineWidget } from "react-calendly";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function BookingCTA() {
  const [activeTab, setActiveTab] = useState<"call" | "apply">("call");
  const sectionRef = useRef<HTMLElement>(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    business_type: "",
    monthly_revenue: "",
    goal: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

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

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError("");

    try {
      const response = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error("Failed to submit. Please try again.");
      }

      setSubmitted(true);
      setFormData({
        name: "",
        email: "",
        phone: "",
        business_type: "",
        monthly_revenue: "",
        goal: "",
      });
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Something went wrong.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section
      ref={sectionRef}
      id="apply"
      className="relative py-16 md:py-24 bg-[#0D0D0D] overflow-hidden"
    >
      {/* Giant "FORGE" Watermark */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none select-none z-0"
        style={{
          fontSize: "20vw",
          color: "#C9A84C",
          opacity: 0.03,
          fontFamily: "var(--font-heading)",
          fontWeight: 700,
          whiteSpace: "nowrap",
        }}
      >
        FORGE
      </div>

      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 md:px-12 lg:px-16 text-center">
        {/* Label and Headline */}
        <div className="mb-12 max-w-3xl mx-auto">
          <span 
            data-fade-up 
            className="opacity-0 block uppercase text-[#C9A84C] text-[12px] tracking-[0.2em] font-body font-semibold mb-6"
          >
            TAKE THE FIRST STEP
          </span>
          <h2 
            data-fade-up 
            className="opacity-0 font-heading text-[clamp(40px,6vw,64px)] text-[#F5F5F5] leading-tight mb-6"
          >
            Ready to Forge Your Legacy?
          </h2>
          <p 
            data-fade-up 
            className="opacity-0 font-body text-[16px] text-[#6B6B6B] leading-relaxed"
          >
            Book a free strategy call or apply for the accelerator below.
          </p>
        </div>

        {/* Tab Switcher */}
        <div 
          data-fade-up 
          className="opacity-0 flex flex-col sm:flex-row items-center justify-center gap-4 mb-12"
        >
          <button
            onClick={() => setActiveTab("call")}
            className={`w-full sm:w-auto px-8 py-4 rounded-full font-body font-semibold text-base transition-all duration-300 ${
              activeTab === "call" ? "bg-[#C9A84C] text-[#0D0D0D]" : "border border-[#2A2A2A] text-[#E8E0D0]/60 hover:text-[#E8E0D0]"
            }`}
          >
             📅 Schedule a Call
          </button>
          <button
            onClick={() => setActiveTab("apply")}
            className={`w-full sm:w-auto px-8 py-4 rounded-full font-body font-semibold text-base transition-all duration-300 ${
              activeTab === "apply" ? "bg-[#C9A84C] text-[#0D0D0D]" : "border border-[#2A2A2A] text-[#E8E0D0]/60 hover:text-[#E8E0D0]"
            }`}
          >
             ✍ Apply Now
          </button>
        </div>

        {/* Tab Content */}
        <div data-fade-up className="opacity-0">
          {activeTab === "call" ? (
            <div className="bg-[#1A1A1A] rounded-[2.5rem] overflow-hidden shadow-2xl p-1 md:p-6 lg:p-8">
              <InlineWidget 
                url="https://calendly.com/solomonfiverr98/30min"
                styles={{ minHeight: '650px', width: '100%' }}
                pageSettings={{
                  backgroundColor: '0D0D0D',
                  hideEventTypeDetails: false,
                  primaryColor: 'C9A84C',
                  textColor: 'F5F5F5'
                }}
              />
            </div>
          ) : (
            <div className="bg-white rounded-[2.5rem] shadow-2xl p-8 md:p-12 lg:p-16 text-left">
              {submitted ? (
                <div className="text-center py-12">
                  <div className="w-20 h-20 bg-[#C9A84C]/10 rounded-full flex items-center justify-center mx-auto mb-6">
                    <span className="text-3xl">✦</span>
                  </div>
                  <h3 className="font-heading text-3xl text-[#0D0D0D] mb-4">Application Received</h3>
                  <p className="font-body text-[#6B6B6B] text-lg">
                    We&apos;ve received your application. Our team will review it and get back to you within 24 hours.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="flex flex-col gap-10">
                  <div className="grid md:grid-cols-2 gap-10">
                    <div className="flex flex-col gap-2">
                      <label htmlFor="name" className="font-body text-[12px] uppercase tracking-widest text-[#6B6B6B] font-bold">
                        Full Name *
                      </label>
                      <input
                        required
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        placeholder="John Doe"
                        className="bg-transparent border-0 border-b border-[#E0E0E0] py-4 focus:ring-0 focus:border-[#C9A84C] transition-colors font-body text-[16px] text-[#0D0D0D] placeholder:text-[#C0C0C0]"
                      />
                    </div>
                    <div className="flex flex-col gap-2">
                      <label htmlFor="email" className="font-body text-[12px] uppercase tracking-widest text-[#6B6B6B] font-bold">
                        Email Address *
                      </label>
                      <input
                        required
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        placeholder="john@example.com"
                        className="bg-transparent border-0 border-b border-[#E0E0E0] py-4 focus:ring-0 focus:border-[#C9A84C] transition-colors font-body text-[16px] text-[#0D0D0D] placeholder:text-[#C0C0C0]"
                      />
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-10">
                    <div className="flex flex-col gap-2">
                      <label htmlFor="phone" className="font-body text-[12px] uppercase tracking-widest text-[#6B6B6B] font-bold">
                        Phone Number
                      </label>
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        placeholder="+1 (555) 000-0000"
                        className="bg-transparent border-0 border-b border-[#E0E0E0] py-4 focus:ring-0 focus:border-[#C9A84C] transition-colors font-body text-[16px] text-[#0D0D0D] placeholder:text-[#C0C0C0]"
                      />
                    </div>
                    <div className="flex flex-col gap-2">
                      <label htmlFor="business_type" className="font-body text-[12px] uppercase tracking-widest text-[#6B6B6B] font-bold">
                        What type of coaching do you do?
                      </label>
                      <input
                        type="text"
                        id="business_type"
                        name="business_type"
                        value={formData.business_type}
                        onChange={handleInputChange}
                        placeholder="Executive Coaching, Life Coaching, etc."
                        className="bg-transparent border-0 border-b border-[#E0E0E0] py-4 focus:ring-0 focus:border-[#C9A84C] transition-colors font-body text-[16px] text-[#0D0D0D] placeholder:text-[#C0C0C0]"
                      />
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-10">
                    <div className="flex flex-col gap-2">
                      <label htmlFor="monthly_revenue" className="font-body text-[12px] uppercase tracking-widest text-[#6B6B6B] font-bold">
                        Numbers Don&apos;t Lie: Current monthly revenue?
                      </label>
                      <input
                        type="text"
                        id="monthly_revenue"
                        name="monthly_revenue"
                        value={formData.monthly_revenue}
                        onChange={handleInputChange}
                        placeholder="$3,000 / month"
                        className="bg-transparent border-0 border-b border-[#E0E0E0] py-4 focus:ring-0 focus:border-[#C9A84C] transition-colors font-body text-[16px] text-[#0D0D0D] placeholder:text-[#C0C0C0]"
                      />
                    </div>
                    <div className="flex flex-col gap-2">
                      <label htmlFor="goal" className="font-body text-[12px] uppercase tracking-widest text-[#6B6B6B] font-bold">
                        What is your goal in 90 days?
                      </label>
                      <input
                        type="text"
                        id="goal"
                        name="goal"
                        value={formData.goal}
                        onChange={handleInputChange}
                        placeholder="Hit consistent $10k months"
                        className="bg-transparent border-0 border-b border-[#E0E0E0] py-4 focus:ring-0 focus:border-[#C9A84C] transition-colors font-body text-[16px] text-[#0D0D0D] placeholder:text-[#C0C0C0]"
                      />
                    </div>
                  </div>

                  {error && <p className="text-red-500 font-body text-sm">{error}</p>}

                  <div className="mt-6 flex flex-col items-center gap-6">
                    <button
                      disabled={isSubmitting}
                      type="submit"
                      className="w-full bg-[#C9A84C] text-[#0D0D0D] rounded-full py-5 px-8 font-body font-bold text-lg transition-all duration-300 hover:scale-[1.02] disabled:opacity-50"
                    >
                      {isSubmitting ? "Submitting..." : "Apply for Your Strategy Call →"}
                    </button>
                    <p className="font-body text-[13px] text-[#6B6B6B] flex items-center gap-2">
                      🔒 We respect your privacy. No spam ever.
                    </p>
                  </div>
                </form>
              )}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
