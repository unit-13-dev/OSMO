# Unichain Sepolia Token Mapping Guide

This document explains how to map Unichain Sepolia testnet tokens to their Ethereum mainnet counterparts for CoinGecko metadata lookup.

## Overview

The system maps Unichain Sepolia token addresses to Ethereum mainnet addresses to fetch real token metadata (names, logos, prices) from CoinGecko's API.

## Configuration

### Token Mapping File
The mapping is defined in `lib/unichain-mapping.ts`:

```typescript
export const UNICHAIN_ETHEREUM_MAPPING: TokenMapping[] = [
  {
    unichainSepoliaAddress: '0x825DE2180C8F953c6A0F117CCBAD26700D302E02',
    ethereumMainnetAddress: '0xdAC17F958D2ee523a2206206994597C13D831ec7', // USDT on Ethereum
    symbol: 'USDT',
    name: 'Tether USD',
    coingeckoId: 'tether'
  },
  // ... more mappings
];
```

## How to Add New Token Mappings

### 1. Find the Ethereum Mainnet Address
- Look up the token on CoinGecko
- Find the contract address on Ethereum mainnet
- Verify it exists on CoinGecko's API

### 2. Add to Mapping
```typescript
{
  unichainSepoliaAddress: '0x...', // Your Unichain Sepolia address
  ethereumMainnetAddress: '0x...', // Ethereum mainnet address
  symbol: 'TOKEN',
  name: 'Token Name',
  coingeckoId: 'coin-id' // Optional: CoinGecko ID for direct lookup
}
```

### 3. Test the Mapping
- Deploy the changes
- Test with your portfolio to ensure metadata loads correctly

## Current Mappings

| Unichain Sepolia | Ethereum Mainnet | Symbol | Name | CoinGecko ID |
|------------------|------------------|---------|------|--------------|
| `0x0000000000000000000000000000000000000000` | `0x0000000000000000000000000000000000000000` | ETH | Ethereum | ethereum |
| `0x825DE2180C8F953c6A0F117CCBAD26700D302E02` | `0xdAC17F958D2ee523a2206206994597C13D831ec7` | USDT | Tether USD | tether |
| `0x31d0220469e10c4E71834a79b1f276d740d3768F` | `0xA0b86a33E6441b8c4C8C0e4b8b2e8B8e8B8e8B8e` | USDC | USD Coin | usd-coin |
| `0xaE3D01B14727dB642d1B7A40460faE24d7182d10` | - | SG | SG Coin | - |

## Important Notes

### USDC Address
⚠️ **IMPORTANT**: The current USDC mapping uses a placeholder address. You need to update it with the real Ethereum mainnet USDC address:

```typescript
// Current (placeholder)
ethereumMainnetAddress: '0xA0b86a33E6441b8c4C8C0e4b8b2e8B8e8B8e8B8e'

// Should be (real USDC address)
ethereumMainnetAddress: '0xA0b86a33E6441b8c4C8C0e4b8b2e8B8e8B8e8B8e' // Update this!
```

### Custom Tokens
For custom tokens that don't exist on Ethereum mainnet:
- Set `ethereumMainnetAddress` to the Unichain address
- Set `coingeckoId` to `undefined`
- The system will show basic info without price data

### Fallback Behavior
- If no mapping exists: Shows "Unknown Token"
- If CoinGecko lookup fails: Shows mapping info with "on Unichain Sepolia"
- If token not on CoinGecko: Shows basic info without price data

## API Usage

The mapping is used by the batch metadata API (`/api/tokens/batch-metadata`):

1. Receives Unichain Sepolia addresses
2. Maps to Ethereum mainnet addresses
3. Fetches metadata from CoinGecko
4. Returns metadata with original Unichain addresses

## Testing

To test your mappings:

1. Add a token to your DTF
2. Check the portfolio page
3. Verify the token shows correct name, logo, and price
4. Check browser console for any errors

## Troubleshooting

### Token shows "Unknown Token"
- Check if mapping exists in `UNICHAIN_ETHEREUM_MAPPING`
- Verify Ethereum mainnet address is correct
- Test the address on CoinGecko

### No price data
- Verify token exists on CoinGecko
- Check if `coingeckoId` is correct
- Test the Ethereum address on CoinGecko API

### Logo not loading
- Check if CoinGecko has logo data for the token
- Verify the image URL is accessible
- Check browser console for 404 errors
