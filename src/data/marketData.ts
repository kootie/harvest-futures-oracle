
export type TimeFrame = 'week' | 'month' | 'year' | '5year';

export interface MarketPrice {
  date: string;
  price: number;
  volume?: number;
  prediction?: number;
}

export interface Material {
  id: string;
  name: string;
  category: 'agriculture' | 'construction';
  description: string;
  unit: string;
  currentPrice: number;
  priceChange: number;
  historicalPrices: {
    week: MarketPrice[];
    month: MarketPrice[];
    year: MarketPrice[];
    '5year': MarketPrice[];
  };
  forecast: {
    short: number;
    medium: number;
    long: number;
  };
}

export const materials: Material[] = [
  {
    id: 'wheat',
    name: 'Wheat',
    category: 'agriculture',
    description: 'Common cereal grain cultivated worldwide',
    unit: 'bushel',
    currentPrice: 7.24,
    priceChange: 0.32,
    historicalPrices: {
      week: generatePrices(7, 7.24, 0.2, -0.1),
      month: generatePrices(30, 7.24, 0.5, -0.2),
      year: generatePrices(12, 7.24, 1.2, 0.4, true),
      '5year': generatePrices(15, 7.24, 2.5, 1.5, true),
    },
    forecast: {
      short: 7.45,
      medium: 7.65,
      long: 7.80,
    },
  },
  {
    id: 'corn',
    name: 'Corn',
    category: 'agriculture',
    description: 'Cereal grain native to the Americas',
    unit: 'bushel',
    currentPrice: 4.58,
    priceChange: -0.18,
    historicalPrices: {
      week: generatePrices(7, 4.58, 0.15, -0.05),
      month: generatePrices(30, 4.58, 0.35, -0.2),
      year: generatePrices(12, 4.58, 0.9, 0.2, true),
      '5year': generatePrices(15, 4.58, 1.8, 0.8, true),
    },
    forecast: {
      short: 4.50,
      medium: 4.65,
      long: 4.85,
    },
  },
  {
    id: 'soybeans',
    name: 'Soybeans',
    category: 'agriculture',
    description: 'Legume species native to East Asia',
    unit: 'bushel',
    currentPrice: 13.24,
    priceChange: 0.45,
    historicalPrices: {
      week: generatePrices(7, 13.24, 0.3, -0.15),
      month: generatePrices(30, 13.24, 0.7, -0.4),
      year: generatePrices(12, 13.24, 1.8, 0.6, true),
      '5year': generatePrices(15, 13.24, 3.5, 2.0, true),
    },
    forecast: {
      short: 13.45,
      medium: 13.75,
      long: 14.10,
    },
  },
  {
    id: 'steel',
    name: 'Steel Rebar',
    category: 'construction',
    description: 'Steel reinforcing bar for concrete',
    unit: 'ton',
    currentPrice: 642.50,
    priceChange: 12.75,
    historicalPrices: {
      week: generatePrices(7, 642.50, 15, -10),
      month: generatePrices(30, 642.50, 35, -25),
      year: generatePrices(12, 642.50, 85, 35, true),
      '5year': generatePrices(15, 642.50, 150, 80, true),
    },
    forecast: {
      short: 655.25,
      medium: 675.00,
      long: 710.50,
    },
  },
  {
    id: 'lumber',
    name: 'Lumber',
    category: 'construction',
    description: 'Processed wood for construction',
    unit: '1000 board feet',
    currentPrice: 495.30,
    priceChange: -15.40,
    historicalPrices: {
      week: generatePrices(7, 495.30, 20, -12),
      month: generatePrices(30, 495.30, 45, -30),
      year: generatePrices(12, 495.30, 100, 40, true),
      '5year': generatePrices(15, 495.30, 200, 120, true),
    },
    forecast: {
      short: 488.75,
      medium: 510.20,
      long: 535.50,
    },
  },
  {
    id: 'copper',
    name: 'Copper',
    category: 'construction',
    description: 'Metal used in electrical wiring and plumbing',
    unit: 'pound',
    currentPrice: 3.85,
    priceChange: 0.07,
    historicalPrices: {
      week: generatePrices(7, 3.85, 0.1, -0.05),
      month: generatePrices(30, 3.85, 0.25, -0.15),
      year: generatePrices(12, 3.85, 0.6, 0.3, true),
      '5year': generatePrices(15, 3.85, 1.2, 0.8, true),
    },
    forecast: {
      short: 3.92,
      medium: 4.05,
      long: 4.25,
    },
  }
];

export const getMarketInsights = () => [
  {
    id: 'wheat-insight',
    title: 'Wheat Prices Rising Due to Drought',
    description: 'Persistent drought in major wheat-producing regions is causing prices to trend upward as supply concerns grow.',
    impact: 'high',
    date: '2025-05-05',
    category: 'agriculture'
  },
  {
    id: 'lumber-insight',
    title: 'Lumber Futures Drop on Housing Slowdown',
    description: 'Construction material futures fell as new housing starts declined by 3.2% in April.',
    impact: 'medium',
    date: '2025-05-04',
    category: 'construction'
  },
  {
    id: 'steel-insight',
    title: 'Infrastructure Bill Boosting Steel Demand',
    description: 'New infrastructure spending package expected to increase domestic steel consumption by 8% over the next 18 months.',
    impact: 'high',
    date: '2025-05-03',
    category: 'construction'
  },
  {
    id: 'corn-insight',
    title: 'Corn Harvest Projections Exceed Expectations',
    description: 'Early projections for this year\'s corn harvest suggest yields may be 5-7% above initial estimates.',
    impact: 'medium',
    date: '2025-05-02',
    category: 'agriculture'
  },
];

// Helper function to generate price data
function generatePrices(
  count: number, 
  currentPrice: number, 
  maxVariation: number, 
  trend: number, 
  isMonthly = false
): MarketPrice[] {
  const prices: MarketPrice[] = [];
  let lastPrice = currentPrice;
  
  const today = new Date();
  
  for (let i = count; i >= 0; i--) {
    const date = new Date();
    if (isMonthly) {
      date.setMonth(today.getMonth() - i);
    } else {
      date.setDate(today.getDate() - i);
    }
    
    // Add some randomness but with a general trend
    const randomVariation = (Math.random() * maxVariation * 2) - maxVariation;
    const trendEffect = trend * (1 - (i / count)); // Stronger effect of trend as we get closer to current
    
    // Don't let the last price be the actual current price to avoid jumps
    if (i > 0) {
      lastPrice = lastPrice - randomVariation - trendEffect;
    } else {
      lastPrice = currentPrice;
    }
    
    prices.push({
      date: date.toISOString().split('T')[0],
      price: parseFloat(lastPrice.toFixed(2)),
      volume: Math.floor(Math.random() * 10000) + 5000
    });
  }
  
  return prices;
}
