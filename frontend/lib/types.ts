// TypeScript types for Avalanche Data API responses

export interface NFTBalance {
    address: string;
    tokenId: string;
    tokenUri?: string;
    metadata?: NFTMetadata;
    ownerAddress: string;
    balance: string;
}

export interface NFTMetadata {
    name: string;
    description?: string;
    image?: string;
    imageUri?: string;
    animationUri?: string;
    externalUri?: string;
    attributes?: NFTAttribute[];
}

export interface NFTAttribute {
    traitType: string;
    value: string | number;
    displayType?: string;
}

export interface Collection {
    address: string;
    name: string;
    symbol: string;
    ercType: 'ERC-721' | 'ERC-1155';
    totalSupply?: string;
}

export interface NFTTransfer {
    from: string;
    to: string;
    tokenId: string;
    blockNumber: number;
    blockTimestamp: number;
    transactionHash: string;
}

export interface AvalancheAPIResponse<T> {
    data: T;
    nextPageToken?: string;
}
