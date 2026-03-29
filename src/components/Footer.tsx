"use client";

// Lucide brand icons were removed in v1.x; using custom SVGs for social icons.

export default function Footer() {
  return (
    <footer className="bg-[#0A0A0A] py-16 md:py-24 border-t border-[rgba(201,168,76,0.1)]">
      <div className="w-full max-w-7xl mx-auto px-6 md:px-12 lg:px-16">
        
        {/* Large Gold Title */}
        <div className="text-center mb-20">
          <h2 className="font-heading italic text-[clamp(40px,10vw,120px)] text-[#C9A84C] uppercase leading-none select-none tracking-tight">
            FORGE &amp; ASCEND
          </h2>
        </div>

        {/* 3 Columns */}
        <div className="grid md:grid-cols-3 gap-16 md:gap-8 mb-20 text-center md:text-left">
          
          {/* Column 1: Brand */}
          <div className="flex flex-col items-center md:items-start">
            <div className="flex items-center gap-2 mb-4">
              <span className="text-[#C9A84C] text-lg">✦</span>
              <span className="font-heading text-xl font-bold text-[#F5F5F5] tracking-wider">
                FORGE &amp; ASCEND
              </span>
            </div>
            <p className="font-body text-[#6B6B6B] text-[15px] max-w-[280px] mb-8">
              Helping expert coaches turn their knowledge into high-ticket systems that scale.
            </p>
            
            {/* Social Icons */}
            <div className="flex gap-6">
              {[
                { 
                  icon: (
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/>
                    </svg>
                  ), 
                  href: "#" 
                },
                { 
                  icon: (
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M18.901 1.153h3.68l-8.04 9.19L24 22.846h-7.406l-5.8-7.584-6.638 7.584H.474l8.6-9.83L0 1.154h7.594l5.243 6.932ZM17.61 20.644h2.039L6.486 3.24h-2.195Z"/>
                    </svg>
                  ), 
                  href: "#" 
                },
                { 
                  icon: (
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect width="4" height="12" x="2" y="9"/><circle cx="4" cy="4" r="2"/>
                    </svg>
                  ), 
                  href: "#" 
                },
                { 
                  icon: (
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
                    </svg>
                  ), 
                  href: "#" 
                },
              ].map((social, i) => (
                <a 
                  key={i} 
                  href={social.href} 
                  className="text-white/60 hover:text-white transition-colors duration-300"
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div className="flex flex-col items-center md:items-start">
            <h4 className="font-body text-[12px] font-bold uppercase tracking-[0.2em] text-[#C9A84C] mb-8">
              QUICK LINKS
            </h4>
            <div className="flex flex-col gap-4">
              {["About", "Results", "The Method", "Apply"].map((link) => (
                <a 
                  key={link} 
                  href={`#${link.toLowerCase().replace(" ", "-")}`} 
                  className="font-body text-[#6B6B6B] hover:text-[#E8E0D0] transition-colors text-[15px]"
                >
                  {link}
                </a>
              ))}
            </div>
          </div>

          {/* Column 3: Contact */}
          <div className="flex flex-col items-center md:items-start">
            <h4 className="font-body text-[12px] font-bold uppercase tracking-[0.2em] text-[#C9A84C] mb-8">
              CONTACT
            </h4>
            <div className="flex flex-col gap-4 text-[#6B6B6B] font-body text-[15px]">
              <a href="mailto:hello@forgeandascend.com" className="hover:text-[#E8E0D0] transition-colors">
                hello@forgeandascend.com
              </a>
              <a href="tel:+15551234567" className="hover:text-[#E8E0D0] transition-colors">
                +1 (555) 123-4567
              </a>
            </div>
          </div>

        </div>

        {/* Divider & Copyright */}
        <div className="border-t border-[rgba(201,168,76,0.1)] pt-12 flex flex-col items-center">
          <p className="font-body text-[#6B6B6B] text-[13px]">
            © 2026 Forge &amp; Ascend. All rights reserved.
          </p>
        </div>

      </div>
    </footer>
  );
}
