"use client"

import type React from "react"

import { motion } from "framer-motion"
import { useState } from "react"
import { Navbar } from "@/components/layout/navbar"
import { ThreeBackground } from "@/components/ui/three-background"
import { useAuth } from "@/hooks/use-auth"
import { MessageCircle, Send, Clock, CheckCircle, AlertCircle } from "lucide-react"
import Link from "next/link"

interface SupportTicket {
  id: string
  subject: string
  message: string
  status: "open" | "in-progress" | "resolved"
  createdAt: string
  replies: Array<{
    id: string
    message: string
    isAdmin: boolean
    timestamp: string
  }>
}

const mockTickets: SupportTicket[] = [
  {
    id: "SUP001",
    subject: "Size exchange request",
    message: "I need to exchange my compression tank from size M to L. The M size is too tight.",
    status: "open",
    createdAt: "2024-01-18T10:30:00Z",
    replies: [
      {
        id: "1",
        message: "Thank you for contacting us. We'll process your exchange request within 24 hours.",
        isAdmin: true,
        timestamp: "2024-01-18T11:00:00Z",
      },
    ],
  },
  {
    id: "SUP002",
    subject: "Delivery status inquiry",
    message: "My order TRY002 shows 'In Transit' for 5 days. Can you provide an update?",
    status: "resolved",
    createdAt: "2024-01-15T14:20:00Z",
    replies: [
      {
        id: "2",
        message: "Your order is currently with our delivery partner. Expected delivery: Jan 20, 2024.",
        isAdmin: true,
        timestamp: "2024-01-15T15:00:00Z",
      },
      {
        id: "3",
        message: "Order delivered successfully. Thank you for your patience!",
        isAdmin: true,
        timestamp: "2024-01-20T16:30:00Z",
      },
    ],
  },
]

export default function SupportPage() {
  const { isAuthenticated, user } = useAuth()
  const [tickets, setTickets] = useState<SupportTicket[]>(mockTickets)
  const [newTicket, setNewTicket] = useState({ subject: "", message: "" })
  const [showNewTicketForm, setShowNewTicketForm] = useState(false)
  const [form, setForm] = useState({ name: "", email: "", message: "" })
  const [status, setStatus] = useState<null | "success" | "error" | "loading">(null)

  const handleSubmitTicket = (e: React.FormEvent) => {
    e.preventDefault()
    if (!newTicket.subject.trim() || !newTicket.message.trim()) return

    const ticket: SupportTicket = {
      id: `SUP${String(tickets.length + 1).padStart(3, "0")}`,
      subject: newTicket.subject,
      message: newTicket.message,
      status: "open",
      createdAt: new Date().toISOString(),
      replies: [],
    }

    setTickets([ticket, ...tickets])
    setNewTicket({ subject: "", message: "" })
    setShowNewTicketForm(false)
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus("loading")
    try {
      const res = await fetch("/api/support", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      })
      if (res.ok) setStatus("success")
      else setStatus("error")
    } catch {
      setStatus("error")
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "open":
        return <AlertCircle className="h-5 w-5 text-orange-400" />
      case "in-progress":
        return <Clock className="h-5 w-5 text-blue-400" />
      case "resolved":
        return <CheckCircle className="h-5 w-5 text-green-400" />
      default:
        return <MessageCircle className="h-5 w-5 text-gray-400" />
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "open":
        return "bg-orange-500/20 text-orange-400"
      case "in-progress":
        return "bg-blue-500/20 text-blue-400"
      case "resolved":
        return "bg-green-500/20 text-green-400"
      default:
        return "bg-gray-500/20 text-gray-400"
    }
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-black relative">
        <ThreeBackground />
        <Navbar />

        <div className="relative z-10 pt-32 pb-20">
          <div className="max-w-2xl mx-auto px-6 text-center">
            <motion.div
              className="bg-white/5 backdrop-blur-sm rounded-2xl p-12 border border-white/10"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <MessageCircle className="h-16 w-16 text-white/60 mx-auto mb-6" />
              <h1 className="text-3xl font-bold text-white mb-4">Support Center</h1>
              <p className="text-white/80 mb-8">Please sign in to access support and view your tickets.</p>
              <Link
                href="/auth/signin"
                className="inline-block bg-white text-black px-8 py-3 rounded-lg font-semibold hover:bg-white/90 transition-colors"
              >
                Sign In to Continue
              </Link>
            </motion.div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-black relative">
      <ThreeBackground />
      <Navbar />

      <div className="relative z-10 pt-32 pb-20">
        <div className="max-w-4xl mx-auto px-6">
          {/* Header */}
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">Support Center</h1>
            <p className="text-white/80 text-xl">We're here to help you, {user?.username}</p>
          </motion.div>

          {/* New Ticket Button */}
          <motion.div
            className="mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <button
              onClick={() => setShowNewTicketForm(!showNewTicketForm)}
              className="bg-white text-black px-6 py-3 rounded-lg font-semibold hover:bg-white/90 transition-colors flex items-center gap-2"
            >
              <MessageCircle className="h-5 w-5" />
              Create New Ticket
            </button>
          </motion.div>

          {/* New Ticket Form */}
          {showNewTicketForm && (
            <motion.div
              className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10 mb-8"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              transition={{ duration: 0.5 }}
            >
              <h2 className="text-2xl font-bold text-white mb-6">Create Support Ticket</h2>
              <form onSubmit={handleSubmitTicket} className="space-y-6">
                <div>
                  <label className="block text-white/80 mb-2">Subject</label>
                  <input
                    type="text"
                    value={newTicket.subject}
                    onChange={(e) => setNewTicket({ ...newTicket, subject: e.target.value })}
                    className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-white/50 focus:outline-none focus:border-white/40"
                    placeholder="Brief description of your issue"
                    required
                  />
                </div>

                <div>
                  <label className="block text-white/80 mb-2">Message</label>
                  <textarea
                    value={newTicket.message}
                    onChange={(e) => setNewTicket({ ...newTicket, message: e.target.value })}
                    className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-white/50 focus:outline-none focus:border-white/40 h-32 resize-none"
                    placeholder="Describe your issue in detail..."
                    required
                  />
                </div>

                <div className="flex gap-4">
                  <button
                    type="submit"
                    className="bg-white text-black px-6 py-3 rounded-lg font-semibold hover:bg-white/90 transition-colors flex items-center gap-2"
                  >
                    <Send className="h-4 w-4" />
                    Submit Ticket
                  </button>
                  <button
                    type="button"
                    onClick={() => setShowNewTicketForm(false)}
                    className="bg-white/10 text-white px-6 py-3 rounded-lg hover:bg-white/20 transition-colors"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </motion.div>
          )}

          {/* Tickets List */}
          <motion.div
            className="space-y-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <h2 className="text-2xl font-bold text-white mb-6">Your Support Tickets</h2>

            {tickets.length === 0 ? (
              <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-12 border border-white/10 text-center">
                <MessageCircle className="h-16 w-16 text-white/40 mx-auto mb-4" />
                <p className="text-white/60 text-lg">No support tickets yet</p>
                <p className="text-white/40">Create your first ticket to get help</p>
              </div>
            ) : (
              tickets.map((ticket, index) => (
                <motion.div
                  key={ticket.id}
                  className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10 hover:bg-white/10 transition-all duration-300"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="text-xl font-semibold text-white">{ticket.subject}</h3>
                        <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(ticket.status)}`}>
                          {ticket.status.replace("-", " ").toUpperCase()}
                        </span>
                      </div>
                      <p className="text-white/70 mb-2">{ticket.message}</p>
                      <div className="flex items-center gap-4 text-white/50 text-sm">
                        <span>Ticket #{ticket.id}</span>
                        <span>{new Date(ticket.createdAt).toLocaleDateString()}</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">{getStatusIcon(ticket.status)}</div>
                  </div>

                  {ticket.replies.length > 0 && (
                    <div className="border-t border-white/10 pt-4">
                      <h4 className="text-white/80 font-medium mb-3">Replies ({ticket.replies.length})</h4>
                      <div className="space-y-3">
                        {ticket.replies.map((reply) => (
                          <div
                            key={reply.id}
                            className={`p-3 rounded-lg ${
                              reply.isAdmin ? "bg-blue-500/20 border-l-4 border-blue-500" : "bg-white/5"
                            }`}
                          >
                            <div className="flex items-center justify-between mb-2">
                              <span className="text-white/80 font-medium">
                                {reply.isAdmin ? "TRYKON Support" : "You"}
                              </span>
                              <span className="text-white/50 text-sm">
                                {new Date(reply.timestamp).toLocaleString()}
                              </span>
                            </div>
                            <p className="text-white/90">{reply.message}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  <div className="mt-4 pt-4 border-t border-white/10">
                    <Link
                      href={`/support/ticket/${ticket.id}`}
                      className="text-white/80 hover:text-white transition-colors text-sm font-medium"
                    >
                      View Full Conversation →
                    </Link>
                  </div>
                </motion.div>
              ))
            )}
          </motion.div>

          <div className="mt-8">
            <h2 className="text-2xl font-bold text-white mb-6">Contact Support</h2>
            <div className="bg-white/5 rounded-xl p-8 border border-white/10 backdrop-blur-sm">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="block text-white/80 mb-2">Name</label>
                  <input
                    type="text"
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-white/50 focus:outline-none focus:border-white/40"
                    placeholder="Your name"
                    required
                  />
                </div>
                <div>
                  <label className="block text-white/80 mb-2">Email</label>
                  <input
                    type="email"
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-white/50 focus:outline-none focus:border-white/40"
                    placeholder="you@email.com"
                    required
                  />
                </div>
                <div>
                  <label className="block text-white/80 mb-2">Message</label>
                  <textarea
                    name="message"
                    value={form.message}
                    onChange={handleChange}
                    className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-white/50 focus:outline-none focus:border-white/40 min-h-[120px]"
                    placeholder="How can we help you?"
                    required
                  />
                </div>
                <button
                  type="submit"
                  disabled={status === "loading"}
                  className="w-full bg-white text-black py-3 rounded-lg font-semibold hover:bg-white/90 transition-colors disabled:opacity-50"
                >
                  {status === "loading" ? "Sending..." : "Send Message"}
                </button>
                {status === "success" && <p className="text-green-400 text-center">Message sent! We'll get back to you soon.</p>}
                {status === "error" && <p className="text-red-400 text-center">Something went wrong. Please try again.</p>}
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
