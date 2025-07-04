"use client"

import { motion } from "framer-motion"
import Link from "next/link"

export function Footer() {
  const footerLinks = [
    { label: "Terms of Service", href: "/terms" },
    { label: "Privacy Policy", href: "/privacy" },
    { label: "Shipping Info", href: "/shipping" },
    { label: "About Us", href: "/about" },
    { label: "Support", href: "/support" },
  ]

  return (
    <footer className="bg-black py-20">
      <div className="max-w-7xl mx-auto px-6 text-center">
        <motion.h2
          className="text-6xl md:text-8xl font-bold text-white mb-12"
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1 }}
          viewport={{ once: true }}
        >
          TRYKON.
        </motion.h2>

        <motion.div
          className="flex flex-wrap justify-center gap-8 mb-12"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          viewport={{ once: true }}
        >
          {footerLinks.map((link, index) => (
            <Link key={link.href} href={link.href} className="text-white/70 hover:text-white transition-colors text-lg">
              {link.label}
            </Link>
          ))}
        </motion.div>

        <motion.div
          className="border-t border-white/20 pt-8"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          viewport={{ once: true }}
        >
          <p className="text-white/50">© 2024 TRYKON. All rights reserved. Made with ❤️ in India.</p>
        </motion.div>
      </div>
    </footer>
  )
}
