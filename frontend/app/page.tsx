'use client'
import { Navbar } from '@/components/Navbar'
import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'framer-motion'

// Mock Data for "Featured Collection"
const FEATURED_FIGURES = [
  { id: '1', name: 'Molly 1.0', collection: 'Pop Mart', image: '/images/molly.png', status: 'available' },
  { id: '2', name: 'Stitch 626', collection: 'Disney', image: '/images/stitch.png', status: 'sold' },
  { id: '3', name: 'Labubu', collection: 'Kasing Lung', image: '/images/labubu.png', status: 'available' },
]

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50 selection:bg-avax-red/20">
      <Navbar />

      <main className="pt-32 pb-20 px-6 max-w-7xl mx-auto">

        {/* Hero Section */}
        <section className="text-center mb-40 relative">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="relative z-10"
          >
            <div className="flex justify-center mb-10">
              <motion.div
                whileHover={{ rotate: 5, scale: 1.05 }}
                className="relative w-32 h-32 md:w-40 md:h-40 rounded-3xl overflow-hidden shadow-2xl shadow-avax-red/30 border border-white/50 bg-white/10 backdrop-blur-md transition-all duration-500"
              >
                <Image
                  src="/logo.png"
                  alt="Avalaflow Logo"
                  fill
                  className="object-cover"
                />
              </motion.div>
            </div>
            <motion.span
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="inline-block py-1.5 px-4 rounded-full bg-avax-red/10 text-avax-red text-xs font-bold uppercase tracking-[0.2em] mb-8"
            >
              Avalanche Powered
            </motion.span>
            <h1 className="text-6xl md:text-8xl font-black tracking-tight text-gray-900 mb-8 max-w-5xl mx-auto leading-[0.9] uppercase italic">
              Digital <span className="text-avax-red">Souls</span> for <span className="text-avax-red-dark underline decoration-avax-red/20 underline-offset-8">Physical</span> Relics.
            </h1>
            <p className="text-xl text-gray-500 max-w-2xl mx-auto mb-12 leading-relaxed font-medium">
              Avalaflow bridges the gap between your physical workspace and the digital realm. Scan, mint, and level up your collectors items on the world&apos;s fastest blockchain.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
              <Link href="/scan"
                className="px-10 py-5 bg-avax-red text-white text-lg font-black uppercase tracking-wider rounded-2xl shadow-xl shadow-avax-red/20 hover:bg-avax-red-dark hover:shadow-avax-red/40 hover:-translate-y-1 active:scale-95 transition-all w-full sm:w-auto"
              >
                Initiate Scan
              </Link>
              <Link href="/dashboard"
                className="px-10 py-5 bg-white text-gray-900 border border-gray-200 text-lg font-black uppercase tracking-wider rounded-2xl hover:bg-gray-50 hover:border-gray-900 transition-all w-full sm:w-auto"
              >
                Access Armory
              </Link>
            </div>
          </motion.div>

          {/* Background Decor */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-avax-red/5 rounded-full blur-[120px] -z-10 pointer-events-none" />
        </section>

        {/* How it Works Section */}
        <section className="mb-40">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-black uppercase italic tracking-tighter text-gray-900">The Workflow</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {[
              { step: "01", title: "Scan", desc: "Touch your mobile device to the NFC tag embedded in your physical figure.", icon: "📡" },
              { step: "02", title: "Verify", desc: "Our system authenticates the unique digital signature on the Avalanche C-Chain.", icon: "🛡️" },
              { step: "03", title: "Evolve", desc: "Mint your digital twin and earn XP through real-world interaction.", icon: "💎" }
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.2 }}
                className="relative p-10 bg-white rounded-[2.5rem] border border-gray-100 shadow-soft hover:shadow-xl transition-all group"
              >
                <div className="text-4xl mb-6 group-hover:scale-125 transition-transform duration-500">{item.icon}</div>
                <div className="text-avax-red font-mono text-xs font-bold mb-2 tracking-widest uppercase">Process {item.step}</div>
                <h3 className="text-2xl font-black uppercase italic mb-4">{item.title}</h3>
                <p className="text-gray-500 leading-relaxed font-medium">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Featured Collection Grid */}
        <section id="drops" className="relative">
          <div className="absolute -left-20 top-0 w-64 h-64 bg-avax-red/5 rounded-full blur-[100px] -z-10" />

          <div className="flex flex-col md:flex-row items-baseline justify-between mb-16 gap-4">
            <div>
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="flex items-center gap-3 mb-4"
              >
                <div className="w-12 h-[1px] bg-avax-red" />
                <span className="text-avax-red font-mono text-xs font-black uppercase tracking-[0.3em]">Live Inventory</span>
              </motion.div>
              <h2 className="text-5xl md:text-6xl font-black uppercase italic tracking-tighter text-gray-900 leading-none">
                Exclusive <span className="text-avax-red">Drops</span>.
              </h2>
            </div>
            <Link href="/dashboard" className="group flex items-center gap-3 text-gray-400 hover:text-avax-red transition-all font-bold uppercase tracking-widest text-xs">
              Explore All Artifacts
              <span className="w-8 h-8 rounded-full border border-gray-200 flex items-center justify-center group-hover:border-avax-red group-hover:bg-avax-red group-hover:text-white transition-all">
                &rarr;
              </span>
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {FEATURED_FIGURES.map((figure, i) => (
              <motion.div
                key={figure.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.8 }}
                className="group relative"
              >
                {/* Card Outer Glow */}
                <div className="absolute -inset-1 bg-gradient-to-r from-avax-red/20 to-avax-red-dark/20 rounded-[2.5rem] blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                <div className="relative bg-white rounded-[2.5rem] p-5 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-100 group-hover:border-avax-red/10 transition-all duration-500">
                  {/* Image Container */}
                  <div className="aspect-[4/5] bg-gray-50 rounded-[2rem] mb-6 overflow-hidden relative">
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10" />

                    {/* Placeholder Emoji for now, but styled better */}
                    <div className="absolute inset-0 flex items-center justify-center text-8xl filter drop-shadow-2xl transition-all duration-700 group-hover:scale-110 group-hover:rotate-6">
                      {i === 0 ? '🤖' : i === 1 ? '🧬' : '👾'}
                    </div>

                    {/* Badge */}
                    <div className={`absolute top-4 right-4 z-20 backdrop-blur-md px-4 py-2 rounded-2xl text-[10px] font-black uppercase tracking-[0.1em] shadow-lg border border-white/50 ${figure.status === 'available'
                      ? 'bg-green-500/10 text-green-600'
                      : 'bg-gray-500/10 text-gray-500'
                      }`}>
                      <div className="flex items-center gap-2">
                        <span className={`w-1.5 h-1.5 rounded-full ${figure.status === 'available' ? 'bg-green-500 animate-pulse' : 'bg-gray-400'}`} />
                        {figure.status === 'available' ? 'Verified Mint' : 'Archived'}
                      </div>
                    </div>

                    {/* Hover Stats Overlay */}
                    <div className="absolute bottom-6 left-6 right-6 z-20 translate-y-10 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
                      <div className="bg-white/80 backdrop-blur-xl p-4 rounded-2xl border border-white/50 shadow-2xl">
                        <div className="flex justify-between items-center text-[10px] font-black uppercase tracking-widest text-gray-400 mb-2">
                          <span>Power Level</span>
                          <span className="text-avax-red">88%</span>
                        </div>
                        <div className="w-full h-1 bg-gray-100 rounded-full overflow-hidden">
                          <div className="h-full bg-avax-red w-[88%]" />
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Metadata */}
                  <div className="px-2">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="text-2xl font-black uppercase italic text-gray-900 group-hover:text-avax-red transition-colors">{figure.name}</h3>
                      <span className="font-mono text-[10px] font-bold text-gray-400 bg-gray-100 px-2 py-1 rounded-lg">#00{figure.id}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-avax-red" />
                      <p className="text-xs font-mono text-gray-400 uppercase tracking-widest">{figure.collection}</p>
                    </div>
                  </div>

                  {/* Action Link */}
                  <Link href="/scan" className="absolute inset-0 z-30" />
                </div>
              </motion.div>
            ))}
          </div>
        </section>

      </main>

      <footer className="border-t border-gray-100 bg-white py-12">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-3">
            <div className="relative w-8 h-8 rounded-lg overflow-hidden border border-gray-100">
              <Image
                src="/logo.png"
                alt="Avalaflow Logo"
                fill
                className="object-cover"
              />
            </div>
            <span className="text-lg font-bold text-gray-900">Avalaflow</span>
            <span className="text-sm text-gray-400">© 2026</span>
          </div>
          <div className="flex gap-6 text-sm text-gray-500">
            <Link href="/terms" className="hover:text-avax-red">Terms</Link>
            <Link href="/privacy" className="hover:text-avax-red">Privacy</Link>
            <Link href="/avalanche" className="hover:text-avax-red">Avalanche</Link>
          </div>
        </div>
      </footer>
    </div>
  )
}
