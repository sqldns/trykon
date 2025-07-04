"use client"

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center px-4 py-20">
      <div className="max-w-2xl w-full">
        <h1 className="text-4xl font-bold mb-6 text-center">About TRYKON</h1>
        <div className="bg-white/5 rounded-xl p-8 border border-white/10 backdrop-blur-sm">
          <p className="mb-4">TRYKON is India's premium fitness wear brand, dedicated to empowering champions with high-quality, stylish, and comfortable gymwear.</p>
          <ul className="list-disc pl-6 space-y-2 mb-4 text-white/80">
            <li>Founded with a passion for fitness and fashion.</li>
            <li>All products are designed and made in India.</li>
            <li>We believe in quality, innovation, and community.</li>
            <li>Join us on our journey to redefine fitness apparel.</li>
          </ul>
          <p className="text-white/60">Made with ❤️ in India.</p>
        </div>
      </div>
    </div>
  )
} 