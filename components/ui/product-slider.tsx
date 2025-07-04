"use client"

import { motion, useScroll, useTransform } from "framer-motion"
import { useRef } from "react"
import Link from "next/link"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { useEffect } from "react"

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger)
}

const products = [
  {
    id: "1",
    name: "Compression Tank",
    price: 2499,
    image: "/placeholder.svg?height=400&width=300&text=Premium+Tank",
    category: "Tanks",
    sizes: ["S", "M", "L", "XL"],
    description: "Premium compression tank for maximum performance",
  },
  {
    id: "2",
    name: "Performance Shorts",
    price: 1999,
    image: "/placeholder.svg?height=400&width=300&text=Performance+Shorts",
    category: "Shorts",
    sizes: ["S", "M", "L", "XL"],
    description: "Lightweight shorts for intense workouts",
  },
  {
    id: "3",
    name: "Training Tee",
    price: 1799,
    image: "/placeholder.svg?height=400&width=300&text=Training+Tee",
    category: "T-Shirts",
    sizes: ["S", "M", "L", "XL", "XXL"],
    description: "Breathable training tee for all-day comfort",
  },
  {
    id: "4",
    name: "Flex Joggers",
    price: 2799,
    image: "/placeholder.svg?height=400&width=300&text=Flex+Joggers",
    category: "Joggers",
    sizes: ["S", "M", "L", "XL"],
    description: "Flexible joggers for ultimate mobility",
  },
  {
    id: "5",
    name: "Power Hoodie",
    price: 3499,
    image: "/placeholder.svg?height=400&width=300&text=Power+Hoodie",
    category: "Hoodies",
    sizes: ["S", "M", "L", "XL", "XXL"],
    description: "Premium hoodie for post-workout comfort",
  },
  {
    id: "6",
    name: "Elite Tank",
    price: 2299,
    image: "/placeholder.svg?height=400&width=300&text=Elite+Tank",
    category: "Tanks",
    sizes: ["S", "M", "L", "XL"],
    description: "Elite performance tank for champions",
  },
  {
    id: "7",
    name: "Shadow Tee",
    price: 4999,
    image: "/images/drop-hero.png",
    category: "Limited",
    sizes: ["S", "M", "L", "XL"],
    description: "Exclusive shadow collection piece",
  },
  {
    id: "8",
    name: "Pro Shorts",
    price: 2299,
    image: "/placeholder.svg?height=400&width=300&text=Pro+Shorts",
    category: "Shorts",
    sizes: ["S", "M", "L", "XL"],
    description: "Professional grade training shorts",
  },
]

export function ProductSlider() {
  const containerRef = useRef<HTMLDivElement>(null)
  const sliderRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  })

  const x = useTransform(scrollYProgress, [0, 1], ["0%", "-50%"])

  useEffect(() => {
    if (typeof window !== "undefined" && sliderRef.current) {
      const slider = sliderRef.current
      const cards = slider.querySelectorAll(".product-card")

      gsap.fromTo(
        cards,
        {
          opacity: 0,
          y: 100,
          scale: 0.8,
        },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.8,
          stagger: 0.1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: slider,
            start: "top 80%",
            end: "bottom 20%",
            toggleActions: "play none none reverse",
          },
        },
      )

      // Hover animations
      cards.forEach((card) => {
        const cardElement = card as HTMLElement
        cardElement.addEventListener("mouseenter", () => {
          gsap.to(cardElement, {
            y: -20,
            scale: 1.05,
            duration: 0.3,
            ease: "power2.out",
          })
        })

        cardElement.addEventListener("mouseleave", () => {
          gsap.to(cardElement, {
            y: 0,
            scale: 1,
            duration: 0.3,
            ease: "power2.out",
          })
        })
      })
    }
  }, [])

  return (
    <section ref={containerRef} className="py-20 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <motion.h2
          className="text-4xl md:text-5xl font-bold text-black mb-12 text-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          Featured Products
        </motion.h2>

        <motion.div ref={sliderRef} className="flex gap-6 w-max" style={{ x }}>
          {[...products, ...products].map((product, index) => (
            <motion.div
              key={`${product.id}-${index}`}
              className="product-card flex-shrink-0 w-80 bg-gray-50 rounded-2xl overflow-hidden group hover:shadow-xl transition-shadow duration-300"
            >
              <div className="aspect-[3/4] overflow-hidden">
                <img
                  src={product.image || "/placeholder.svg"}
                  alt={product.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold text-black mb-2">{product.name}</h3>
                <p className="text-gray-600 mb-2">{product.description}</p>
                <p className="text-gray-500 mb-4">{product.category}</p>
                <div className="flex items-center justify-between">
                  <span className="text-2xl font-bold text-black">₹{product.price}</span>
                  <Link
                    href={`/product/${product.id}`}
                    className="bg-black text-white px-6 py-2 rounded-lg hover:bg-gray-800 transition-colors"
                  >
                    View
                  </Link>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
