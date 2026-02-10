'use client'
import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'

interface FigureCardProps {
    name: string
    collection: string
    imageUrl: string
    tokenId: string
    status?: 'active' | 'minted' | 'scanning'
}

export function FigureCard({ name, collection, imageUrl, tokenId, status = 'active' }: FigureCardProps) {
    return (
        <motion.div
            whileHover={{ y: -5 }}
            className="group relative bg-white rounded-3xl p-4 shadow-soft hover:shadow-xl transition-all duration-300 border border-transparent hover:border-avax-red/20"
        >
            <div className="relative aspect-square w-full bg-gray-50 rounded-2xl overflow-hidden mb-4">
                {/* Fallback image if no URL provided */}
                <div className="absolute inset-0 flex items-center justify-center text-gray-300 bg-gray-100">
                    {imageUrl ? (
                        <Image
                            src={imageUrl}
                            alt={name}
                            fill
                            className="object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                    ) : (
                        <span className="text-4xl">🧸</span>
                    )}
                </div>

                <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-bold text-avax-red shadow-sm">
                    #{tokenId}
                </div>
            </div>

            <div className="px-1">
                <p className="text-xs text-avax-red font-medium uppercase tracking-wider mb-1">{collection}</p>
                <h3 className="text-lg font-bold text-gray-900 group-hover:text-avax-red transition-colors">{name}</h3>

                <div className="mt-4 flex items-center justify-between">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${status === 'active' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                        }`}>
                        {status === 'active' ? 'Active' : 'Unlinked'}
                    </span>

                    <Link href={`/figure/${tokenId}`} className="text-sm font-medium text-gray-400 group-hover:text-avax-red transition-colors">
                        View Details →
                    </Link>
                </div>
            </div>
        </motion.div>
    )
}
