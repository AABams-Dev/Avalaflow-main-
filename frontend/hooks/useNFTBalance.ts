// Custom hook for fetching NFT balances using React Query

import { useQuery } from '@tanstack/react-query';
import { getERC721Balances } from '@/lib/api';
import type { NFTBalance } from '@/lib/types';

export function useNFTBalance(address: string | undefined, contractAddress?: string) {
    return useQuery<NFTBalance[]>({
        queryKey: ['nft-balance', address, contractAddress],
        queryFn: () => {
            if (!address) return Promise.resolve([]);
            return getERC721Balances(address, contractAddress);
        },
        enabled: !!address,
        staleTime: 30000, // 30 seconds
        refetchOnWindowFocus: false,
    });
}
