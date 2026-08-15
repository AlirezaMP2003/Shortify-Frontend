import Navbar from "../components/Navbar"
import Hero from "../components/landing/Hero"
import DashboardPreview from "../components/landing/DashboardPreview"
import HowItWorks from "../components/landing/HowItWorks"
import Features from "../components/landing/Features"
import SecuritySection from "../components/landing/SecuritySection"
import AnalyticsSection from "../components/landing/AnalyticsSection"
import ApiSection from "../components/landing/ApiSection"
import CTASection from "../components/landing/CTASection"
import Footer from "../components/Footer"

function LandingPage() {
  return (
    <div className="min-h-screen">

      <Navbar />

      <main>

        <Hero />
        <DashboardPreview />
        <HowItWorks />
        <Features />
        <SecuritySection />
        <AnalyticsSection />
        <ApiSection />
        <CTASection />

      </main>

      <Footer />

    </div>
  )
}

export default LandingPage