"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import { GlowMenu } from "@/components/ui/glow-menu"
import { useAuth } from "@/hooks/use-auth"
import { useCart } from "@/hooks/use-cart"
import { LogOut } from "lucide-react"

export function Navbar() {
  const { isAuthenticated, user, logout } = useAuth()
  const { itemCount } = useCart()

  return (
    <motion.header
      className="fixed top-0 left-0 right-0 z-50 p-6"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 2 }}
    >
      <div className="flex items-center justify-between max-w-7xl mx-auto">
        {/* Logo */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 2.2 }}
        >
          <Link href="/" className="text-white text-2xl font-bold tracking-wider">
            TRYKON
          </Link>
        </motion.div>

        {/* Navigation Menu */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 2.4 }}
        >
          <GlowMenu itemCount={itemCount} />
        </motion.div>

        {/* Auth Section */}
        <motion.div
          className="flex items-center gap-4"
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
      </div>
    </motion.header>
  )
}
