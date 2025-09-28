# API Setup Guide for Dynamic Token Data

## 🔑 Required API Keys

### 1. CoinGecko API (Recommended - Free)
- **Sign up**: https://www.coingecko.com/en/api
- **Free tier**: 10-50 calls/minute
- **Features**: Token metadata, prices, market data
- **Setup**: Add to `.env.local`:
```bash
NEXT_PUBLIC_COINGECKO_API_KEY=your_api_key_here
```

### 2. Moralis API (Optional - Free)
- **Sign up**: https://moralis.io/
- **Free tier**: 100,000 requests/month
- **Features**: Token metadata, balances, multi-chain support
- **Setup**: Add to `.env.local`:
```bash
NEXT_PUBLIC_MORALIS_API_KEY=your_api_key_here
```

### 3. CoinMarketCap API (Optional - Free)
- **Sign up**: https://pro.coinmarketcap.com/
- **Free tier**: 10,000 calls/month
- **Features**: Market data, rankings
- **Setup**: Add to `.env.local`:
```bash
NEXT_PUBLIC_CMC_API_KEY=your_api_key_here
```

## 🚀 Quick Setup

1. **Create `.env.local` file** in your project root
2. **Add your API keys** (at least CoinGecko)
3. **Restart your development server**

## 📊 Features Enabled

With API keys, you get:
- ✅ **Real-time token search** from 13,000+ tokens
- ✅ **Live price data** for all tokens
- ✅ **Token metadata** (name, symbol, decimals, logo)
- ✅ **Market cap data** for popular tokens
- ✅ **Multi-chain support** (Ethereum, BSC, Polygon, etc.)
- ✅ **Automatic caching** to reduce API calls
- ✅ **Fallback mechanisms** if APIs are down

## 🔧 Configuration

### Chain ID Mapping
The system automatically maps chain IDs to API platforms:
- `1` → Ethereum
- `56` → BSC
- `137` → Polygon
- `42161` → Arbitrum
- `10` → Optimism
- `8453` → Base
- `1301` → Unichain Sepolia

### Rate Limiting
- **CoinGecko**: 50 calls/minute (free tier)
- **Moralis**: 100,000 requests/month
- **Automatic caching**: 5-minute cache duration

## 🛠️ Usage Examples

```typescript
// Search for tokens
const tokens = await tokenManagement.searchTokens('USDC');

// Get popular tokens
const popular = await tokenManagement.getPopularTokens('1301', 20);

// Get token with price
const token = await tokenManagement.getTokenWithPrice('0x...');

// Validate token address
const isValid = tokenAPIUtils.isValidAddress('0x...');
```

## 🔄 Fallback Strategy

1. **Primary**: CoinGecko API
2. **Secondary**: Moralis API
3. **Tertiary**: Direct contract reading
4. **Final**: Local hardcoded tokens

This ensures your app always works, even if APIs are down!
