import { getDefaultConfig } from '@rainbow-me/rainbowkit';
import { avalanche, avalancheFuji } from 'wagmi/chains';

export const config = getDefaultConfig({
    appName: 'Avalaflow',
    projectId: 'YOUR_WALLETCONNECT_PROJECT_ID', // Get from https://cloud.walletconnect.com
    chains: [avalanche, avalancheFuji],
    ssr: true,
});
