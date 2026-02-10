'use client'
import { Navbar } from '@/components/Navbar'
import { motion } from 'framer-motion'

export default function PrivacyPage() {
    return (
        <div className="min-h-screen bg-white text-gray-900 font-sans">
            <Navbar />
            <main className="pt-32 pb-20 px-6 max-w-4xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                >
                    <h1 className="text-4xl font-bold mb-8">Privacy Policy</h1>
                    <div className="space-y-6 text-gray-600 leading-relaxed">
                        <section>
                            <h2 className="text-xl font-bold text-gray-900 mb-4">1. Data Collection</h2>
                            <p>
                                Avalaflow is built with privacy-first principles. We do not collect personal names, emails, or physical addresses unless explicitly provided. Our platform primarily interacts with your public wallet address on the Avalanche blockchain.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-xl font-bold text-gray-900 mb-4">2. Blockchain Data</h2>
                            <p>
                                All minting and transaction data is public on the Avalanche blockchain. This includes your wallet address and the metadata associated with the NFTs you own. This data is permanent and cannot be deleted by Avalaflow.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-xl font-bold text-gray-900 mb-4">3. NFC Scanning</h2>
                            <p>
                                When scanning a physical unit, we only process the unique identifier embedded in the NFC tag to verify authenticity. No location data or other information from your mobile device is tracked during this process.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-xl font-bold text-gray-900 mb-4">4. Cookies and Tracking</h2>
                            <p>
                                We use minimal essential cookies to maintain your session and ensure the dashboard functions correctly. We do not use advertising trackers or sell your data to third parties.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-xl font-bold text-gray-900 mb-4">5. Security</h2>
                            <p>
                                We implement industry-standard security measures to protect the information processed through our interface. However, remember that you are the ultimate guardian of your blockchain assets.
                            </p>
                        </section>
                    </div>
                </motion.div>
            </main>
        </div>
    )
}
