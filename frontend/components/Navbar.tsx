'use client'
import Link from 'next/link'
import Image from 'next/image'
import { ConnectButton } from '@rainbow-me/rainbowkit'

export function Navbar() {
    return (
        <nav className="fixed top-0 left-0 right-0 z-[100] transition-all duration-300">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 mt-4">
                <div className="flex h-20 items-center justify-between rounded-[2rem] border border-white/20 bg-white/40 backdrop-blur-2xl px-6 shadow-2xl shadow-black/5 active:scale-[0.99] transition-transform">
                    <Link href="/" className="flex items-center gap-3 group">
                        <div className="relative w-10 h-10 overflow-hidden rounded-xl shadow-lg shadow-avax-red/20 group-hover:scale-110 transition-all duration-500">
                            <Image
                                src="/logo.png"
                                alt="Avalaflow Logo"
                                fill
                                className="object-cover"
                            />
                        </div>
                        <span className="text-2xl font-black italic tracking-tighter text-gray-900 group-hover:text-avax-red transition-all hidden sm:block">AVALAFLOW</span>
                    </Link>

                    <div className="flex items-center gap-4 sm:gap-8">
                        <Link href="/dashboard" className="text-xs font-black uppercase tracking-[0.2em] text-gray-500 hover:text-avax-red transition-all">
                            Armory
                        </Link>

                        <div className="scale-90 sm:scale-100 origin-right">
                            <ConnectButton />
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    )
}
