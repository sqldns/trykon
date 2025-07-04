"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { LoadingScreen } from "@/components/ui/loading-screen"
import { Navbar } from "@/components/layout/navbar"
import { HeroSection } from "@/components/ui/hero-section"
import { ProductSlider } from "@/components/ui/product-slider"
import { BrandValues } from "@/components/ui/brand-values"
import { PatrioticSection } from "@/components/ui/patriotic-section"
import { Footer } from "@/components/layout/footer"

export default function HomePage() {
  const [isLoading, setIsLoading] = useState(true)

  const handleLoadingComplete = () => {
    setIsLoading(false)
  }

  return (
    <>
      <AnimatePresence>{isLoading && <LoadingScreen onComplete={handleLoadingComplete} />}</AnimatePresence>

      {!isLoading && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.8 }}>
          <Navbar />
          <HeroSection />
          <ProductSlider />
          <BrandValues />
          <PatrioticSection />
          <Footer />
        </motion.div>
      )}
    </>
  )
}
