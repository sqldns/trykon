"use client"

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center px-4 py-20">
      <div className="max-w-2xl w-full">
        <h1 className="text-4xl font-bold mb-6 text-center">Privacy Policy</h1>
        <div className="bg-white/5 rounded-xl p-8 border border-white/10 backdrop-blur-sm">
          <p className="mb-4">Your privacy is important to us. This policy explains how we collect, use, and protect your information.</p>
          <ul className="list-disc pl-6 space-y-2 mb-4 text-white/80">
            <li>We collect only necessary information for order processing and support.</li>
            <li>Your data is never sold or shared with third parties.</li>
            <li>All transactions are secured with industry-standard encryption.</li>
            <li>Contact us for any privacy-related concerns.</li>
          </ul>
          <p className="text-white/60">Last updated: June 2024</p>
        </div>
      </div>
    </div>
  )
} 