'use client'
import { Navbar } from '@/components/Navbar'
import { motion } from 'framer-motion'

export default function TermsPage() {
    return (
        <div className="min-h-screen bg-white text-gray-900 font-sans">
            <Navbar />
            <main className="pt-32 pb-20 px-6 max-w-4xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                >
                    <h1 className="text-4xl font-bold mb-8">Terms of Service</h1>
                    <div className="space-y-6 text-gray-600 leading-relaxed">
                        <section>
                            <h2 className="text-xl font-bold text-gray-900 mb-4">1. Acceptance of Terms</h2>
                            <p>
                                By accessing and using Avaflow, you agree to be bound by these Terms of Service. Avaflow is a platform that bridges physical collectibles with digital ownership on the Avalanche blockchain.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-xl font-bold text-gray-900 mb-4">2. Digital Ownership</h2>
                            <p>
                                When you scan an authentic Avaflow unit and mint an NFT, you gain true digital ownership of that specific unit&apos;s twin. This ownership is recorded on the Avalanche blockchain and is subject to the rules of the smart contracts deployed by Avaflow.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-xl font-bold text-gray-900 mb-4">3. User Responsibilities</h2>
                            <p>
                                You are responsible for maintaining the security of your wallet and any private keys. Avaflow cannot recover lost access to your digital assets. You agree to use the platform only for lawful purposes compatible with the Avalanche ecosystem standards.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-xl font-bold text-gray-900 mb-4">4. Intellectual Property</h2>
                            <p>
                                The physical designs, trademarks, and software associated with Avaflow are the property of Avaflow. Your ownership of an NFT grants you personal use rights for the digital representation of your unit.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-xl font-bold text-gray-900 mb-4">5. Limitation of Liability</h2>
                            <p>
                                Avaflow provides its services &quot;as is.&quot; We are not liable for any losses resulting from blockchain network congestion, smart contract vulnerabilities, or user error.
                            </p>
                        </section>
                    </div>
                </motion.div>
            </main>
        </div>
    )
}
