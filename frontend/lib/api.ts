// Avalanche Data API Client

import type { NFTBalance, Collection, AvalancheAPIResponse } from './types';

const API_BASE_URL = process.env.NEXT_PUBLIC_AVALANCHE_API_URL || 'https://glacier-api.avax.network';
const API_KEY = process.env.NEXT_PUBLIC_AVALANCHE_API_KEY || '';
const CHAIN_ID = process.env.NEXT_PUBLIC_CHAIN_ID || '43113'; // Fuji testnet by default

/**
 * Fetch ERC-721 NFT balances for a given address
 */
export async function getERC721Balances(
    address: string,
    contractAddress?: string
): Promise<NFTBalance[]> {
    try {
        const params = new URLSearchParams({
            pageSize: '100',
        });

        if (contractAddress) {
            params.append('contractAddress', contractAddress);
        }

        const response = await fetch(
            `${API_BASE_URL}/v1/chains/${CHAIN_ID}/addresses/${address}/balances:listErc721?${params}`,
            {
                headers: {
                    'x-glacier-api-key': API_KEY,
                    'Content-Type': 'application/json',
                },
            }
        );

        if (!response.ok) {
            throw new Error(`API Error: ${response.status} ${response.statusText}`);
        }

        const data: AvalancheAPIResponse<{ erc721TokenBalances: NFTBalance[] }> = await response.json();
        return data.data?.erc721TokenBalances || [];
    } catch (error) {
        console.error('Error fetching ERC-721 balances:', error);
        return [];
    }
}

/**
 * Fetch collection metadata for an ERC-721 contract
 */
export async function getCollectionMetadata(contractAddress: string): Promise<Collection | null> {
    try {
        const response = await fetch(
            `${API_BASE_URL}/v1/chains/${CHAIN_ID}/contracts/${contractAddress}`,
            {
                headers: {
                    'x-glacier-api-key': API_KEY,
                    'Content-Type': 'application/json',
                },
            }
        );

        if (!response.ok) {
            throw new Error(`API Error: ${response.status} ${response.statusText}`);
        }

        const data = await response.json();
        return data.data || null;
    } catch (error) {
        console.error('Error fetching collection metadata:', error);
        return null;
    }
}

/**
 * Fetch NFT metadata from token URI
 */
export async function getNFTMetadata(tokenUri: string) {
    try {
        // Handle IPFS URIs
        let url = tokenUri;
        if (tokenUri.startsWith('ipfs://')) {
            url = tokenUri.replace('ipfs://', 'https://ipfs.io/ipfs/');
        }

        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`Failed to fetch metadata: ${response.statusText}`);
        }

        return await response.json();
    } catch (error) {
        console.error('Error fetching NFT metadata:', error);
        return null;
    }
}
