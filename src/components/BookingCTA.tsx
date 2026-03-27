"use client";

import { useState, FormEvent } from "react";
import { Calendar, FileText, ArrowRight, CheckCircle, Loader2, Lock } from "lucide-react";
import dynamic from "next/dynamic";

const InlineWidget = dynamic(
  () => import("react-calendly").then((mod) => mod.InlineWidget),
  { ssr: false }
);

export default function BookingCTA() {
  const [activeTab, setActiveTab] = useState<"calendly" | "form">("calendly");
  const [formState, setFormState] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setFormState("loading");
    setErrorMsg("");

    const formData = new FormData(e.currentTarget);
    const data = {
      name: formData.get("name") as string,
      email: formData.get("email") as string,
      phone: formData.get("phone") as string,
      business_type: formData.get("business_type") as string,
      monthly_revenue: formData.get("monthly_revenue") as string,
      goal: formData.get("goal") as string,
    };

    try {
      const res = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (res.ok) {
        setFormState("success");
      } else {
        const json = await res.json();
        setErrorMsg(json.error || "Something went wrong.");
        setFormState("error");
      }
    } catch {
      setErrorMsg("Network error. Please try again.");
      setFormState("error");
    }
  };

  return (
    <section id="apply" className="relative py-16 md:py-24 px-6 md:px-12 lg:px-16 overflow-hidden">
      {/* FORGE Watermark */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none select-none"
        style={{
          fontSize: "18vw",
          color: "#C9A84C",
          opacity: 0.03,
          fontFamily: "var(--font-heading)",
          fontWeight: 700,
          whiteSpace: "nowrap",
        }}
      >
        FORGE
      </div>

      <div className="relative z-10 max-w-4xl mx-auto">
        <div className="text-center mb-4">
          <span className="section-label">TAKE THE FIRST STEP</span>
        </div>
        <h2 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold text-cream text-center mb-6">
          Ready to <span className="text-gold italic">Ascend?</span>
        </h2>
        <p className="font-body text-lg text-center max-w-xl mx-auto mb-10" style={{ color: "#6B6B6B" }}>
          Book a free 30-minute strategy call or fill out an application — and let&apos;s see if you&apos;re a fit.
        </p>

        {/* Tab Switcher */}
        <div className="flex justify-center gap-3 mb-8">
          <button
            onClick={() => setActiveTab("calendly")}
            id="tab-calendly"
            className="flex items-center gap-2 px-6 py-3 rounded-full font-body text-sm font-semibold transition-all duration-300"
            style={
              activeTab === "calendly"
                ? { background: "#C9A84C", color: "#0D0D0D", boxShadow: "0 0 20px rgba(201,168,76,0.3)" }
                : { border: "1px solid #2A2A2A", color: "rgba(232,224,208,0.6)" }
            }
          >
            <Calendar size={16} />
            Book Instantly
          </button>
          <button
            onClick={() => setActiveTab("form")}
            id="tab-form"
            className="flex items-center gap-2 px-6 py-3 rounded-full font-body text-sm font-semibold transition-all duration-300"
            style={
              activeTab === "form"
                ? { background: "#C9A84C", color: "#0D0D0D", boxShadow: "0 0 20px rgba(201,168,76,0.3)" }
                : { border: "1px solid #2A2A2A", color: "rgba(232,224,208,0.6)" }
            }
          >
            <FileText size={16} />
            Send a Message
          </button>
        </div>

        {/* Tab Content */}
        <div className="rounded-3xl overflow-hidden min-h-[500px]" style={{ background: "#1A1A1A" }}>
          {/* Calendly Tab */}
          {activeTab === "calendly" && (
            <InlineWidget
              url="https://calendly.com/solomonfiverr98/30min"
              styles={{ minHeight: "650px", width: "100%" }}
              pageSettings={{
                backgroundColor: "0D0D0D",
                primaryColor: "C9A84C",
                textColor: "F5F5F5",
              }}
            />
          )}

          {/* Form Tab */}
          {activeTab === "form" && (
            <div className="p-8 md:p-12">
              {formState === "success" ? (
                <div className="flex flex-col items-center justify-center py-12 text-center">
                  <CheckCircle size={56} style={{ color: "#C9A84C" }} className="mb-6" />
                  <h3 className="font-heading text-3xl font-bold text-cream mb-3">
                    Application Received!
                  </h3>
                  <p className="font-body text-base max-w-md" style={{ color: "#6B6B6B" }}>
                    We&apos;ll review your application and get back to you within 24 hours.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="grid md:grid-cols-2 gap-5">
                    <div>
                      <label className="block font-body text-sm font-medium mb-2" style={{ color: "#F5F5F5" }}>
                        Full Name *
                      </label>
                      <input
                        type="text"
                        name="name"
                        required
                        id="lead-name"
                        className="w-full rounded-xl px-4 py-3 font-body text-sm
                          focus:outline-none transition-colors"
                        style={{ background: "#0D0D0D", border: "1px solid #2A2A2A", color: "#F5F5F5" }}
                        placeholder="John Smith"
                      />
                    </div>
                    <div>
                      <label className="block font-body text-sm font-medium mb-2" style={{ color: "#F5F5F5" }}>
                        Email Address *
                      </label>
                      <input
                        type="email"
                        name="email"
                        required
                        id="lead-email"
                        className="w-full rounded-xl px-4 py-3 font-body text-sm
                          focus:outline-none transition-colors"
                        style={{ background: "#0D0D0D", border: "1px solid #2A2A2A", color: "#F5F5F5" }}
                        placeholder="john@example.com"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block font-body text-sm font-medium mb-2" style={{ color: "#F5F5F5" }}>
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      id="lead-phone"
                      className="w-full rounded-xl px-4 py-3 font-body text-sm
                        focus:outline-none transition-colors"
                      style={{ background: "#0D0D0D", border: "1px solid #2A2A2A", color: "#F5F5F5" }}
                      placeholder="+1 (555) 000-0000"
                    />
                  </div>

                  <div>
                    <label className="block font-body text-sm font-medium mb-2" style={{ color: "#F5F5F5" }}>
                      What type of coaching do you do?
                    </label>
                    <select
                      name="business_type"
                      id="lead-business-type"
                      className="w-full rounded-xl px-4 py-3 font-body text-sm
                        focus:outline-none transition-colors"
                      style={{ background: "#0D0D0D", border: "1px solid #2A2A2A", color: "#F5F5F5" }}
                    >
                      <option value="">Select...</option>
                      <option value="life_coaching">Life Coaching</option>
                      <option value="business_coaching">Business Coaching</option>
                      <option value="executive_coaching">Executive Coaching</option>
                      <option value="health_wellness">Health &amp; Wellness</option>
                      <option value="relationship">Relationship</option>
                      <option value="other">Other</option>
                    </select>
                  </div>

                  <div>
                    <label className="block font-body text-sm font-medium mb-2" style={{ color: "#F5F5F5" }}>
                      Current monthly revenue?
                    </label>
                    <select
                      name="monthly_revenue"
                      id="lead-revenue"
                      className="w-full rounded-xl px-4 py-3 font-body text-sm
                        focus:outline-none transition-colors"
                      style={{ background: "#0D0D0D", border: "1px solid #2A2A2A", color: "#F5F5F5" }}
                    >
                      <option value="">Select...</option>
                      <option value="0-3k">$0 – $3,000</option>
                      <option value="3k-5k">$3,000 – $5,000</option>
                      <option value="5k-10k">$5,000 – $10,000</option>
                      <option value="10k+">$10,000+</option>
                    </select>
                  </div>

                  <div>
                    <label className="block font-body text-sm font-medium mb-2" style={{ color: "#F5F5F5" }}>
                      What is your goal in 90 days?
                    </label>
                    <textarea
                      name="goal"
                      rows={3}
                      id="lead-goal"
                      className="w-full rounded-xl px-4 py-3 font-body text-sm
                        focus:outline-none transition-colors resize-none"
                      style={{ background: "#0D0D0D", border: "1px solid #2A2A2A", color: "#F5F5F5" }}
                      placeholder="e.g., Close my first $5k client, build a group program..."
                    />
                  </div>

                  {formState === "error" && (
                    <p className="font-body text-red-400 text-sm">{errorMsg}</p>
                  )}

                  <button
                    type="submit"
                    id="lead-submit"
                    disabled={formState === "loading"}
                    className="group w-full py-4 rounded-full font-body font-semibold text-base
                      transition-all duration-300 flex items-center justify-center gap-2
                      hover:shadow-[0_0_30px_rgba(201,168,76,0.4)] disabled:opacity-60 disabled:cursor-not-allowed"
                    style={{ background: "#C9A84C", color: "#0D0D0D" }}
                  >
                    {formState === "loading" ? (
                      <>
                        <Loader2 size={18} className="animate-spin" />
                        Submitting...
                      </>
                    ) : (
                      <>
                        Apply for Your Strategy Call
                        <ArrowRight size={18} className="transition-transform group-hover:translate-x-1" />
                      </>
                    )}
                  </button>

                  <p className="text-center font-body text-xs flex items-center justify-center gap-1.5" style={{ color: "#6B6B6B" }}>
                    <Lock size={12} />
                    We respect your privacy. No spam ever.
                  </p>
                </form>
              )}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
