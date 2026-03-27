import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import PainSection from "@/components/PainSection";
import SocialProof from "@/components/SocialProof";
import Method from "@/components/Method";
import Offer from "@/components/Offer";
import Testimonials from "@/components/Testimonials";
import FAQ from "@/components/FAQ";
import BookingCTA from "@/components/BookingCTA";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <PainSection />
        <SocialProof />
        <Method />
        <Offer />
        <Testimonials />
        <FAQ />
        <BookingCTA />
      </main>
      <Footer />
    </>
  );
}
