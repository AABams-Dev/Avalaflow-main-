'use client'
import { Navbar } from '@/components/Navbar'
import { useAccount } from 'wagmi'
import { useNFTBalance } from '@/hooks/useNFTBalance'
import { AVALAFLOW_NFT_ADDRESS } from '@/lib/contracts'
import { motion } from 'framer-motion'
import Link from 'next/link'

export default function Dashboard() {
    const { address, isConnected } = useAccount()
    const { data: nfts, isLoading } = useNFTBalance(address, AVALAFLOW_NFT_ADDRESS)

    // Derived figures from live data
    const figures = nfts?.map(nft => ({
        id: nft.tokenId,
        name: nft.metadata?.name || `Unit #${nft.tokenId}`,
        level: (nft.metadata?.attributes?.find(a => a.traitType === 'Level')?.value as number) || 1,
        xp: (nft.metadata?.attributes?.find(a => a.traitType === 'Experience')?.value as number) || 0,
        maxXp: 100, // Default or calculated
        type: (nft.metadata?.attributes?.find(a => a.traitType === 'Type')?.value as string) || 'Standard',
        image: nft.metadata?.image || ''
    })) || []

    if (!isConnected) {
        return (
            <div className="min-h-screen bg-black text-white flex flex-col font-sans">
                <Navbar />
                <div className="flex-1 flex items-center justify-center p-6 text-center">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="bg-neutral-900/50 p-12 rounded-[3rem] border border-white/5"
                    >
                        <div className="text-6xl mb-6">🔐</div>
                        <h2 className="text-2xl font-black uppercase italic tracking-tighter mb-4 text-avax-red">Access Restricted</h2>
                        <p className="text-gray-500 font-mono text-xs uppercase tracking-widest">Neural Link Required // Connect Wallet to Proceed</p>
                    </motion.div>
                </div>
            </div>
        )
    }

    return (
        <div className="min-h-screen bg-black text-white selection:bg-avax-red/30 font-sans">
            <Navbar />
            <main className="pt-32 px-4 sm:px-6 max-w-7xl mx-auto pb-20">
                <header className="mb-20 flex flex-col md:flex-row md:items-end justify-between border-b border-white/5 pb-12">
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                    >
                        <h1 className="text-6xl md:text-8xl font-black italic tracking-tighter mb-4 uppercase">Armory</h1>
                        <div className="flex items-center gap-2 font-mono text-xs text-avax-red/60 bg-avax-red/5 px-4 py-2 rounded-full border border-avax-red/10 overflow-hidden text-ellipsis whitespace-nowrap max-w-[300px] sm:max-w-none">
                            <span className="w-2 h-2 bg-avax-red rounded-full animate-pulse flex-shrink-0" />
                            SECURE_STORAGE // {address}
                        </div>
                    </motion.div>
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="text-right mt-8 md:mt-0"
                    >
                        <div className="text-5xl font-black italic font-mono text-avax-red">
                            {isLoading ? '...' : figures.length.toString().padStart(2, '0')}
                        </div>
                        <div className="text-[10px] text-gray-500 uppercase tracking-[0.3em] font-bold">Active_Units</div>
                    </motion.div>
                </header>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
                    {isLoading ? (
                        <div className="col-span-full py-32 text-center text-avax-red font-black italic text-2xl animate-pulse tracking-tighter uppercase">
                            Synchronizing_Neural_Link...
                        </div>
                    ) : (
                        <>
                            {figures.map((f, i) => (
                                <motion.div
                                    key={f.id}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: i * 0.1 }}
                                    className="group relative bg-neutral-900/50 rounded-[2.5rem] border border-white/10 hover:border-avax-red/50 transition-all duration-500"
                                >
                                    {/* Card Glow */}
                                    <div className="absolute -inset-0.5 bg-gradient-to-br from-avax-red/40 to-transparent rounded-[2.5rem] opacity-0 group-hover:opacity-100 blur-xl transition-opacity duration-700" />

                                    <div className="relative bg-neutral-950 rounded-[2.5rem] p-5 h-full flex flex-col overflow-hidden">
                                        <div className="aspect-[4/5] bg-neutral-900 rounded-[1.8rem] mb-6 overflow-hidden relative border border-white/5 flex items-center justify-center group-hover:bg-black transition-colors">
                                            {f.image ? (
                                                <img src={f.image} alt={f.name} className="absolute inset-0 w-full h-full object-cover opacity-60 group-hover:opacity-100 transition-all duration-700 scale-110 group-hover:scale-100" />
                                            ) : (
                                                <div className="text-7xl filter drop-shadow-[0_0_20px_rgba(232,65,66,0.5)] group-hover:scale-125 transition-transform duration-500">
                                                    {Number(f.id) % 2 === 0 ? '🤖' : '👽'}
                                                </div>
                                            )}

                                            <div className="absolute top-4 right-4">
                                                <div className="w-3 h-3 bg-avax-red rounded-full shadow-[0_0_15px_rgba(232,65,66,1)] animate-pulse" />
                                            </div>

                                            <div className="absolute bottom-4 left-4">
                                                <span className="px-3 py-1 bg-white/5 backdrop-blur-md rounded-lg text-[9px] font-black uppercase tracking-widest text-white/50 border border-white/10">
                                                    {f.type}
                                                </span>
                                            </div>
                                        </div>

                                        <div className="mt-auto">
                                            <div className="flex justify-between items-start mb-6">
                                                <h3 className="text-xl font-black italic uppercase tracking-tighter group-hover:text-avax-red transition-colors">{f.name}</h3>
                                                <span className="font-mono text-avax-red text-xs font-black bg-avax-red/10 px-2 py-0.5 rounded">LVL.{f.level}</span>
                                            </div>

                                            <div className="space-y-2">
                                                <div className="flex justify-between text-[9px] text-gray-500 uppercase font-bold tracking-[0.2em]">
                                                    <span>Sync_Level</span>
                                                    <span>{f.xp}%</span>
                                                </div>
                                                <div className="w-full h-1.5 bg-white/5 rounded-full overflow-hidden border border-white/5">
                                                    <motion.div
                                                        initial={{ width: 0 }}
                                                        animate={{ width: `${(f.xp / f.maxXp) * 100}%` }}
                                                        transition={{ duration: 1.5, ease: "easeOut" }}
                                                        className="h-full bg-avax-red shadow-[0_0_10px_rgba(232,65,66,0.5)]"
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </motion.div>
                            ))}

                            {/* Add New Slot */}
                            <Link href="/scan" className="aspect-[4/5] rounded-[2.5rem] border-2 border-dashed border-white/5 hover:border-avax-red/30 hover:bg-avax-red/5 transition-all flex flex-col items-center justify-center gap-6 group cursor-pointer relative overflow-hidden">
                                <div className="w-16 h-16 rounded-full bg-neutral-900 flex items-center justify-center text-3xl group-hover:bg-avax-red group-hover:text-white group-hover:scale-110 transition-all duration-500 border border-white/5 shadow-xl">
                                    +
                                </div>
                                <div className="text-center">
                                    <span className="text-gray-500 group-hover:text-avax-red text-xs font-black uppercase tracking-[0.3em] block mb-1 transition-colors">Neural_Link</span>
                                    <span className="text-gray-700 text-[10px] font-mono block">READY_FOR_SYNC</span>
                                </div>
                                {/* Particle effect placeholder */}
                                <div className="absolute inset-0 bg-gradient-to-t from-avax-red/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                            </Link>
                        </>
                    )}
                </div>
            </main>
        </div>
    )
}
