"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import { GlowMenu } from "@/components/ui/glow-menu"
import { useAuth } from "@/hooks/use-auth"
import { useCart } from "@/hooks/use-cart"
import { LogOut } from "lucide-react"
import { useState, useEffect } from "react"
import { Menu } from "lucide-react"

export function Navbar() {
  const { isAuthenticated, user, logout } = useAuth()
  const { itemCount } = useCart()
  const [mobileOpen, setMobileOpen] = useState(false)

  // Prevent background scroll when mobile menu is open
  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = ""
    }
    return () => { document.body.style.overflow = "" }
  }, [mobileOpen])

  return (
    <motion.header
      className="fixed top-0 left-0 right-0 z-50 p-4 md:p-6"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 2 }}
    >
      {/* SVG filter for liquid effect (shared with footer) */}
      <svg width="0" height="0">
        <filter id="liquid-grey-navbar" x="0" y="0">
          <feTurbulence id="turb" baseFrequency="0.02 0.03" numOctaves="2" result="turb" seed="3"/>
          <feDisplacementMap in2="turb" in="SourceGraphic" scale="20" xChannelSelector="R" yChannelSelector="G"/>
          <feColorMatrix type="matrix" values="0.5 0 0 0 0.3  0 0.5 0 0 0.3  0 0 0.5 0 0.3  0 0 0 1 0"/>
        </filter>
      </svg>
      <div className="flex items-center justify-between max-w-7xl mx-auto">
        {/* Logo */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 2.2 }}
        >
          <Link href="/" className="text-white text-2xl font-bold tracking-wider select-none group">
            <motion.span
              className="inline-block"
              whileHover={{ filter: 'url(#liquid-grey-navbar)', color: '#fff' }}
              transition={{ duration: 0.7, ease: 'easeInOut' }}
              style={{ display: 'inline-block' }}
            >
              TRYKON
            </motion.span>
          </Link>
        </motion.div>

        {/* Desktop Navigation Menu */}
        <motion.div
          className="hidden md:block"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 2.4 }}
        >
          <GlowMenu itemCount={itemCount} />
        </motion.div>

        {/* Desktop Auth Section */}
        <motion.div
          className="hidden md:flex items-center gap-4"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 2.6 }}
        >
          {isAuthenticated ? (
            <div className="flex items-center gap-4">
              <span className="text-white/80 text-sm">Welcome, {user?.username}</span>
              <button
                onClick={logout}
                className="flex items-center gap-2 text-white/80 hover:text-white transition-colors text-sm"
              >
                <LogOut className="h-4 w-4" />
                Logout
              </button>
            </div>
          ) : (
            <>
              <Link
                href="/auth/signin"
                className="text-white/80 hover:text-white transition-colors text-sm font-medium"
              >
                Sign In
              </Link>
              <Link
                href="/auth/signup"
                className="bg-white text-black px-4 py-2 rounded-lg hover:bg-white/90 transition-colors text-sm font-medium"
              >
                Sign Up
              </Link>
            </>
          )}
        </motion.div>

        {/* Mobile Hamburger */}
        <button
          className="md:hidden flex items-center justify-center p-2 rounded-lg bg-white/10 hover:bg-white/20 transition-colors"
          onClick={() => setMobileOpen((v) => !v)}
          aria-label="Open menu"
        >
          <Menu className="h-7 w-7 text-white" />
        </button>
      </div>

      {/* Mobile Drawer */}
      {mobileOpen && (
        <motion.div
          className="md:hidden fixed inset-0 z-[100] bg-black/90 flex flex-col items-center justify-center gap-8 px-4 py-8 overflow-y-auto"
          initial={{ opacity: 0, y: -40 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -40 }}
          aria-modal="true"
          role="dialog"
        >
          <button
            className="absolute top-6 right-6 text-white text-3xl"
            onClick={() => setMobileOpen(false)}
            aria-label="Close menu"
          >
            ×
          </button>
          <div className="w-full flex flex-col items-center gap-8 mt-12">
            <GlowMenu itemCount={itemCount} />
            <div className="flex flex-col gap-4 w-full items-center">
              {isAuthenticated ? (
                <>
                  <span className="text-white/80 text-lg text-center">Welcome, {user?.username}</span>
                  <button
                    onClick={() => { logout(); setMobileOpen(false) }}
                    className="flex items-center gap-2 text-white/80 hover:text-white transition-colors text-lg justify-center"
                  >
                    <LogOut className="h-5 w-5" />
                    Logout
                  </button>
                </>
              ) : (
                <>
                  <Link
                    href="/auth/signin"
                    className="text-white/80 hover:text-white transition-colors text-lg font-medium text-center"
                    onClick={() => setMobileOpen(false)}
                  >
                    Sign In
                  </Link>
                  <Link
                    href="/auth/signup"
                    className="bg-white text-black px-6 py-3 rounded-lg hover:bg-white/90 transition-colors text-lg font-medium text-center"
                    onClick={() => setMobileOpen(false)}
                  >
                    Sign Up
                  </Link>
                </>
              )}
            </div>
          </div>
        </motion.div>
      )}
    </motion.header>
  )
}
