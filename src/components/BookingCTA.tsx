"use client";

import { useState, FormEvent } from "react";
import { Calendar, FileText, ArrowRight, CheckCircle, Loader2 } from "lucide-react";
import Script from "next/script";

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
    <section id="apply" className="relative py-24 md:py-32 px-6 lg:px-12 overflow-hidden">
      {/* FORGE Watermark */}
      <div className="watermark text-[18vw] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
        FORGE
      </div>

      <div className="relative z-10 max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <span className="section-label">TAKE THE FIRST STEP</span>
          <h2 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold text-cream mt-4">
            Ready to <span className="text-gold italic">Ascend?</span>
          </h2>
          <p className="font-body text-muted text-lg mt-4 max-w-xl mx-auto">
            Book a free 30-minute strategy call or fill out an application — and let&apos;s see if you&apos;re a fit.
          </p>
        </div>

        {/* Tab Switcher */}
        <div className="flex justify-center gap-3 mb-8">
          <button
            onClick={() => setActiveTab("calendly")}
            id="tab-calendly"
            className={`flex items-center gap-2 px-6 py-3 rounded-full font-body text-sm font-semibold transition-all duration-300 ${
              activeTab === "calendly"
                ? "bg-gold text-background shadow-[0_0_20px_rgba(201,168,76,0.3)]"
                : "bg-surface border border-border text-muted hover:text-cream hover:border-gold/30"
            }`}
          >
            <Calendar size={16} />
            Schedule a Call
          </button>
          <button
            onClick={() => setActiveTab("form")}
            id="tab-form"
            className={`flex items-center gap-2 px-6 py-3 rounded-full font-body text-sm font-semibold transition-all duration-300 ${
              activeTab === "form"
                ? "bg-gold text-background shadow-[0_0_20px_rgba(201,168,76,0.3)]"
                : "bg-surface border border-border text-muted hover:text-cream hover:border-gold/30"
            }`}
          >
            <FileText size={16} />
            Apply Now
          </button>
        </div>

        {/* Tab Content */}
        <div className="bg-surface border border-border rounded-3xl overflow-hidden min-h-[500px]">
          {/* Calendly Tab */}
          {activeTab === "calendly" && (
            <div className="p-2">
              <div
                className="calendly-inline-widget"
                data-url="https://calendly.com/solomonfiverr98/30min?background_color=1a1a1a&text_color=f5f5f5&primary_color=c9a84c"
              />
              <Script
                src="https://assets.calendly.com/assets/external/widget.js"
                strategy="lazyOnload"
              />
            </div>
          )}

          {/* Form Tab */}
          {activeTab === "form" && (
            <div className="p-8 md:p-12">
              {formState === "success" ? (
                <div className="flex flex-col items-center justify-center py-12 text-center">
                  <CheckCircle size={56} className="text-gold mb-6" />
                  <h3 className="font-heading text-3xl font-bold text-cream mb-3">
                    Application Received!
                  </h3>
                  <p className="font-body text-muted text-base max-w-md">
                    We&apos;ll review your application and get back to you within 24 hours.
                    Check your inbox for a confirmation.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="grid md:grid-cols-2 gap-5">
                    <div>
                      <label className="block font-body text-cream text-sm font-medium mb-2">
                        Full Name *
                      </label>
                      <input
                        type="text"
                        name="name"
                        required
                        id="lead-name"
                        className="w-full bg-background border border-border rounded-xl px-4 py-3 font-body text-cream text-sm
                          placeholder:text-muted/50 focus:outline-none focus:border-gold/50 transition-colors"
                        placeholder="John Smith"
                      />
                    </div>
                    <div>
                      <label className="block font-body text-cream text-sm font-medium mb-2">
                        Email *
                      </label>
                      <input
                        type="email"
                        name="email"
                        required
                        id="lead-email"
                        className="w-full bg-background border border-border rounded-xl px-4 py-3 font-body text-cream text-sm
                          placeholder:text-muted/50 focus:outline-none focus:border-gold/50 transition-colors"
                        placeholder="john@example.com"
                      />
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-5">
                    <div>
                      <label className="block font-body text-cream text-sm font-medium mb-2">
                        Phone
                      </label>
                      <input
                        type="tel"
                        name="phone"
                        id="lead-phone"
                        className="w-full bg-background border border-border rounded-xl px-4 py-3 font-body text-cream text-sm
                          placeholder:text-muted/50 focus:outline-none focus:border-gold/50 transition-colors"
                        placeholder="+1 (555) 000-0000"
                      />
                    </div>
                    <div>
                      <label className="block font-body text-cream text-sm font-medium mb-2">
                        Business Type
                      </label>
                      <select
                        name="business_type"
                        id="lead-business-type"
                        className="w-full bg-background border border-border rounded-xl px-4 py-3 font-body text-cream text-sm
                          focus:outline-none focus:border-gold/50 transition-colors"
                      >
                        <option value="">Select...</option>
                        <option value="life_coaching">Life Coaching</option>
                        <option value="business_coaching">Business Coaching</option>
                        <option value="executive_coaching">Executive Coaching</option>
                        <option value="health_wellness">Health & Wellness</option>
                        <option value="relationship">Relationship</option>
                        <option value="other">Other</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block font-body text-cream text-sm font-medium mb-2">
                      Current Monthly Revenue
                    </label>
                    <select
                      name="monthly_revenue"
                      id="lead-revenue"
                      className="w-full bg-background border border-border rounded-xl px-4 py-3 font-body text-cream text-sm
                        focus:outline-none focus:border-gold/50 transition-colors"
                    >
                      <option value="">Select...</option>
                      <option value="0-3k">$0 – $3,000</option>
                      <option value="3k-5k">$3,000 – $5,000</option>
                      <option value="5k-10k">$5,000 – $10,000</option>
                      <option value="10k+">$10,000+</option>
                    </select>
                  </div>

                  <div>
                    <label className="block font-body text-cream text-sm font-medium mb-2">
                      What&apos;s your #1 goal for the next 90 days?
                    </label>
                    <textarea
                      name="goal"
                      rows={3}
                      id="lead-goal"
                      className="w-full bg-background border border-border rounded-xl px-4 py-3 font-body text-cream text-sm
                        placeholder:text-muted/50 focus:outline-none focus:border-gold/50 transition-colors resize-none"
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
                    className="group w-full bg-gold text-background py-4 rounded-full font-body font-semibold text-base
                      hover:bg-gold-hover transition-all duration-300 flex items-center justify-center gap-2
                      hover:shadow-[0_0_30px_rgba(201,168,76,0.4)] disabled:opacity-60 disabled:cursor-not-allowed"
                  >
                    {formState === "loading" ? (
                      <>
                        <Loader2 size={18} className="animate-spin" />
                        Submitting...
                      </>
                    ) : (
                      <>
                        Submit Application
                        <ArrowRight size={18} className="transition-transform group-hover:translate-x-1" />
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
