'use client'
import { Navbar } from '@/components/Navbar'
import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'

export default function GenericScanPage() {
    const router = useRouter()
    const [status, setStatus] = useState('READY_FOR_HANDSHAKE')

    // Auto-redirect to a demo ID after a few seconds to simulate a successful scan
    // In a real mobile environment, this would be handled by the NFC listener
    useEffect(() => {
        const timer = setTimeout(() => {
            setStatus('TAG_DETECTED_SYNCING')
            setTimeout(() => {
                // Redirect to a specific demo ID
                router.push('/scan/demo-unit-101')
            }, 1500)
        }, 3000)

        return () => clearTimeout(timer)
    }, [router])

    return (
        <div className="min-h-screen bg-black text-white selection:bg-avax-red/30 font-sans overflow-hidden">
            <Navbar />
            <main className="flex flex-col items-center justify-center min-h-screen p-6 relative">

                {/* Background Pulse */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-avax-red/10 rounded-full blur-[100px] animate-pulse" />

                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="z-10 text-center"
                >
                    <div className="relative mb-12">
                        <motion.div
                            animate={{
                                scale: [1, 1.1, 1],
                                opacity: [0.5, 1, 0.5]
                            }}
                            transition={{ duration: 2, repeat: Infinity }}
                            className="w-48 h-48 md:w-64 md:h-64 rounded-full border-2 border-avax-red/30 flex items-center justify-center"
                        >
                            <div className="w-40 h-40 md:w-52 md:h-52 rounded-full border border-avax-red/50 flex items-center justify-center bg-avax-red/5">
                                <span className="text-7xl">📡</span>
                            </div>
                        </motion.div>

                        {/* Scanning lines */}
                        <motion.div
                            animate={{ top: ['0%', '100%', '0%'] }}
                            transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                            className="absolute left-0 right-0 h-0.5 bg-avax-red/50 shadow-[0_0_15px_rgba(232,65,66,0.8)] z-20"
                        />
                    </div>

                    <h2 className="text-3xl md:text-5xl font-black uppercase italic tracking-tighter mb-4">
                        Scanning for <span className="text-avax-red">Artifacts</span>
                    </h2>

                    <div className="flex items-center justify-center gap-3 font-mono text-xs tracking-[0.3em] text-avax-red font-bold">
                        <span className="w-2 h-2 bg-avax-red rounded-full animate-ping" />
                        {status}
                    </div>

                    <p className="mt-8 text-gray-500 max-w-sm mx-auto text-sm leading-relaxed">
                        Hold your physical Avaflow unit close to the NFC reader on your device to synchronize digital soul.
                    </p>

                    <button
                        onClick={() => router.push('/scan/demo-unit-101')}
                        className="mt-12 px-6 py-3 bg-white/5 border border-white/10 rounded-full text-[10px] font-black uppercase tracking-[0.2em] hover:bg-white/10 transition-all text-gray-400"
                    >
                        Skip to Demo Scan (Developer Mode)
                    </button>
                </motion.div>
            </main>
        </div>
    )
}
