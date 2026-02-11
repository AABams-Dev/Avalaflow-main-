
export const getProvider = () => {
    if (typeof window !== "undefined") {
        // Check if multiple providers exist (prevents the 'getter' error crash)
        // @ts-ignore
        if (window.ethereum?.providers) {
            // @ts-ignore
            return window.ethereum.providers.find((p: any) => p.isMetaMask) || window.ethereum.providers[0];
        }
        // Fallback to standard injection
        return window.ethereum;
    }
    return null;
};

export const connectWallet = async () => {
    const provider: any = getProvider();
    if (!provider) {
        throw new Error("No wallet found. Please install an extension.");
    }

    try {
        const accounts = await provider.request({ method: 'eth_requestAccounts' });
        return accounts[0];
    } catch (error: any) {
        console.error("Connection failed safely:", error.message);
        return null;
    }
};
