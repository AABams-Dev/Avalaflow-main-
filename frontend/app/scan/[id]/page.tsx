'use client'
import { useParams } from 'next/navigation'
import { Navbar } from '@/components/Navbar'
import { useWriteContract, useWaitForTransactionReceipt, useAccount, useReadContract } from 'wagmi'
import { AVALAFLOW_NFT_ADDRESS, AVALAFLOW_NFT_ABI } from '@/lib/contracts'

export default function ScanPage() {
    const params = useParams()
    const id = params.id as string
    const { address, isConnected } = useAccount()

    const { writeContract, data: hash, isPending: isMintPending, error: mintError } = useWriteContract()
    const { isLoading: isConfirming, isSuccess: isConfirmed } = useWaitForTransactionReceipt({ hash })

    // Check if tag is already used
    const { data: isTagUsed, isLoading: isCheckingTag } = useReadContract({
        address: AVALAFLOW_NFT_ADDRESS as `0x${string}`,
        abi: AVALAFLOW_NFT_ABI,
        functionName: 'nfcTagUsed',
        args: [id],
    })

    // Mock Data
    const figureData = {
        name: `Avalaflow Unit #${id ? id.slice(0, 4) : 'UNKNOWN'}`,
        image: "https://imagedelivery.net/some-hash/public",
        attributes: { Power: 90, Speed: 80, Sync: '0%' }
    }

    const handleMint = () => {
        if (!isConnected) return;
        writeContract({
            address: AVALAFLOW_NFT_ADDRESS as `0x${string}`,
            abi: AVALAFLOW_NFT_ABI,
            functionName: 'mint',
            args: [address!, id]
        })
    }

    return (
        <div className="min-h-screen bg-gray-50 text-gray-900 font-sans">
            <Navbar />
            <main className="pt-32 pb-20 px-6 max-w-5xl mx-auto flex flex-col md:flex-row gap-12 items-center">

                {/* 3D Model / Image Container */}
                <div className="flex-1 w-full relative group">
                    <div className="aspect-square relative w-full bg-white border border-gray-200 rounded-3xl flex items-center justify-center overflow-hidden shadow-soft hover:shadow-xl transition-all duration-500">
                        <div className="text-[8rem] filter drop-shadow-xl animate-bounce">👾</div>

                        {/* Status Tag */}
                        <div className="absolute top-4 right-4 bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider border border-green-200">
                            NFC Verified
                        </div>
                    </div>
                </div>

                {/* Info & Actions */}
                <div className="flex-1 space-y-8">
                    <div>
                        <div className="inline-flex items-center gap-2 mb-2 text-avax-red font-medium text-sm uppercase tracking-wide">
                            <span className="w-2 h-2 bg-avax-red rounded-full animate-pulse"></span>
                            Live Connection
                        </div>
                        <h1 className="text-5xl font-black tracking-tight mb-4 text-gray-900">{figureData.name}</h1>
                        <p className="text-gray-500 text-lg leading-relaxed">
                            Authentic collectible detected. Initialize the minting sequence to create your digital twin on Avalanche.
                        </p>
                    </div>

                    {/* Stats */}
                    <div className="grid grid-cols-3 gap-4">
                        {Object.entries(figureData.attributes).map(([key, val]) => (
                            <div key={key} className="p-4 bg-white border border-gray-100 rounded-2xl shadow-sm hover:shadow-md transition-shadow">
                                <div className="text-gray-400 text-xs uppercase font-bold tracking-wider mb-2">{key}</div>
                                <div className="text-2xl font-bold text-gray-900">{val}</div>
                            </div>
                        ))}
                    </div>

                    {/* Action Button */}
                    <div className="pt-4">
                        {isConnected ? (
                            isTagUsed ? (
                                <div className="w-full py-4 bg-gray-100 text-center rounded-2xl text-gray-400 font-bold text-lg border-2 border-dashed border-gray-200 uppercase tracking-widest">
                                    Already Linked to Unit
                                </div>
                            ) : (
                                <button
                                    disabled={isMintPending || isConfirming || isConfirmed || isCheckingTag}
                                    onClick={handleMint}
                                    className="w-full py-4 bg-avax-red hover:bg-avax-red-dark disabled:bg-gray-200 disabled:text-gray-400 text-white font-bold text-lg rounded-2xl transition-all shadow-glow hover:shadow-lg transform active:scale-[0.98]"
                                >
                                    {isCheckingTag ? 'Checking Database...' : isMintPending ? 'Requesting...' : isConfirming ? 'Synchronizing...' : isConfirmed ? 'Linked Successfully' : 'Mint Digital Twin'}
                                </button>
                            )
                        ) : (
                            <div className="w-full py-4 bg-gray-100 text-center rounded-2xl text-gray-500 font-medium">
                                Connect Wallet to Continue
                            </div>
                        )}
                    </div>

                    {mintError && (
                        <div className="p-4 bg-red-50 border border-red-100 text-red-600 text-sm rounded-xl break-all">
                            Error: {(mintError as { shortMessage?: string }).shortMessage || mintError.message}
                        </div>
                    )}

                    {isConfirmed && (
                        <div className="p-4 bg-green-50 border border-green-100 text-green-700 text-sm font-medium rounded-xl flex items-center gap-2">
                            <span className="text-xl">✅</span> Unit secured on-chain. Check your collection.
                        </div>
                    )}
                </div>
            </main>
        </div>
    )
}
