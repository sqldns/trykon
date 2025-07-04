"use client"

export default function ShippingPage() {
  return (
    <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center px-4 py-20">
      <div className="max-w-2xl w-full">
        <h1 className="text-4xl font-bold mb-6 text-center">Shipping Information</h1>
        <div className="bg-white/5 rounded-xl p-8 border border-white/10 backdrop-blur-sm">
          <ul className="list-disc pl-6 space-y-2 mb-4 text-white/80">
            <li>Orders are processed within 1-2 business days.</li>
            <li>Standard shipping takes 3-7 business days across India.</li>
            <li>Tracking details will be emailed once your order ships.</li>
            <li>Contact support for international shipping options.</li>
          </ul>
          <p className="text-white/60">Last updated: June 2024</p>
        </div>
      </div>
    </div>
  )
} 