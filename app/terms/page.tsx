"use client"

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center px-4 py-20">
      <div className="max-w-2xl w-full">
        <h1 className="text-4xl font-bold mb-6 text-center">Terms of Service</h1>
        <div className="bg-white/5 rounded-xl p-8 border border-white/10 backdrop-blur-sm">
          <p className="mb-4">Welcome to TRYKON. By using our website, you agree to the following terms and conditions. Please read them carefully.</p>
          <ul className="list-disc pl-6 space-y-2 mb-4 text-white/80">
            <li>All content and products are for personal use only.</li>
            <li>Unauthorized resale or distribution is prohibited.</li>
            <li>We reserve the right to update these terms at any time.</li>
            <li>For any questions, contact our support team.</li>
          </ul>
          <p className="text-white/60">Last updated: June 2024</p>
        </div>
      </div>
    </div>
  )
} 