import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const address = searchParams.get('address');
    
    if (!address) {
      return NextResponse.json(
        { error: 'Address parameter is required' },
        { status: 400 }
      );
    }

    const response = await fetch(
      `https://api.coingecko.com/api/v3/simple/token_price/ethereum?contract_addresses=${address}&vs_currencies=usd`,
      {
        headers: {
          'Accept': 'application/json',
          'User-Agent': 'OSMO-DTF-Platform/1.0'
        }
      }
    );
    
    if (!response.ok) {
      return NextResponse.json(
        { price: null },
        { status: 200 }
      );
    }
    
    const data = await response.json();
    const price = data[address.toLowerCase()]?.usd || null;

    return NextResponse.json({ price });
  } catch (error) {
    console.error('Error fetching token price:', error);
    return NextResponse.json(
      { price: null },
      { status: 200 }
    );
  }
}
