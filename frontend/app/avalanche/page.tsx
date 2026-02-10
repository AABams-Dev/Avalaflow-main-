'use client'
import { Navbar } from '@/components/Navbar'
import { motion } from 'framer-motion'
import Image from 'next/image'

export default function AvalanchePage() {
    return (
        <div className="min-h-screen bg-gray-50 text-gray-900 font-sans">
            <Navbar />
            <main className="pt-32 pb-20 px-6 max-w-5xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                >
                    <div className="text-center mb-16">
                        <span className="inline-block py-1 px-3 rounded-full bg-avax-red/10 text-avax-red text-xs font-bold uppercase tracking-widest mb-4">
                            Infrastructure
                        </span>
                        <h1 className="text-5xl font-black tracking-tight mb-6">Powered by Avalanche</h1>
                        <p className="text-xl text-gray-500 max-w-2xl mx-auto italic">
                            Lightning-fast, eco-friendly, and secure. The ultimate foundation for digital collectibles.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
                        <div className="bg-white p-8 rounded-3xl shadow-soft border border-gray-100">
                            <div className="w-12 h-12 bg-avax-red/10 rounded-2xl flex items-center justify-center text-avax-red text-2xl mb-6">⚡</div>
                            <h3 className="text-xl font-bold mb-4">Epic Speed</h3>
                            <p className="text-gray-500">Sub-second finality means your digital twin is minted and verified almost instantly when you scan your figure.</p>
                        </div>
                        <div className="bg-white p-8 rounded-3xl shadow-soft border border-gray-100">
                            <div className="w-12 h-12 bg-avax-red/10 rounded-2xl flex items-center justify-center text-avax-red text-2xl mb-6">💰</div>
                            <h3 className="text-xl font-bold mb-4">Low Fees</h3>
                            <p className="text-gray-500">Avalanche's efficient architecture ensures that minting and leveling up your units costs only fractions of a dollar.</p>
                        </div>
                        <div className="bg-white p-8 rounded-3xl shadow-soft border border-gray-100">
                            <div className="w-12 h-12 bg-avax-red/10 rounded-2xl flex items-center justify-center text-avax-red text-2xl mb-6">🌿</div>
                            <h3 className="text-xl font-bold mb-4">Eco-Friendly</h3>
                            <p className="text-gray-500">Built on Proof-of-Stake, Avalanche minimizes carbon footprint while maximizing performance for our physical world.</p>
                        </div>
                    </div>

                    <div className="bg-avax-red rounded-[3rem] p-12 text-white flex flex-col md:flex-row items-center gap-12 overflow-hidden relative">
                        <div className="relative z-10 flex-1">
                            <h2 className="text-3xl font-black mb-6 uppercase italic tracking-tighter">The Avalanche C-Chain</h2>
                            <p className="text-lg opacity-90 mb-8 leading-relaxed">
                                Avalaflow utilizes the Avalanche C-Chain for smart contract execution. This guarantees high throughput and EVM compatibility, allowing us to leverage the best tools in the Web3 space while providing the reliability our collectors deserve.
                            </p>
                            <a href="https://avax.network" target="_blank" rel="noopener noreferrer" className="inline-block px-8 py-4 bg-white text-avax-red font-bold rounded-full hover:bg-gray-100 transition-all uppercase text-sm tracking-widest">
                                Discover Avalanche
                            </a>
                        </div>
                        <div className="flex-1 relative flex justify-center">
                            <span className="text-[12rem] opacity-20">🏔️</span>
                        </div>
                        {/* Decorative elements */}
                        <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-[80px] -mr-32 -mt-32"></div>
                    </div>
                </motion.div>
            </main>
        </div>
    )
}
