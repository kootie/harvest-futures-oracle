
import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts";
import { Material, TimeFrame } from "@/data/marketData";
import { TrendingUp, TrendingDown, ArrowRight } from "lucide-react";

interface PriceChartProps {
  material: Material;
}

const PriceChart: React.FC<PriceChartProps> = ({ material }) => {
  const [timeframe, setTimeframe] = useState<TimeFrame>("month");
  
  const priceData = material.historicalPrices[timeframe];
  
  const priceUp = material.priceChange >= 0;
  const changeClass = priceUp ? "text-green-600" : "text-red-600";
  const TrendIcon = priceUp ? TrendingUp : TrendingDown;
  
  const formatCurrency = (value: number) => {
    return `$${value.toFixed(2)}`;
  };
  
  return (
    <Card className="animate-chart-fade-in">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-center">
          <div>
            <CardTitle className="text-xl flex items-center gap-2">
              {material.name}
              <span className="text-xs px-2 py-0.5 bg-gray-100 rounded-full">
                {material.category === "agriculture" ? "Agriculture" : "Construction"}
              </span>
            </CardTitle>
            <p className="text-muted-foreground text-sm">{material.unit}</p>
          </div>
          <div className="text-right">
            <div className="text-2xl font-bold">{formatCurrency(material.currentPrice)}</div>
            <div className={`flex items-center gap-1 ${changeClass}`}>
              <TrendIcon className="h-4 w-4" />
              <span>{material.priceChange > 0 ? "+" : ""}{material.priceChange.toFixed(2)}</span>
            </div>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="chart" className="space-y-4">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="chart">Price Chart</TabsTrigger>
            <TabsTrigger value="forecast">Forecast</TabsTrigger>
          </TabsList>
          <TabsContent value="chart" className="space-y-4">
            <div className="grid grid-cols-4 gap-2">
              <button
                onClick={() => setTimeframe("week")}
                className={`px-3 py-1.5 text-xs font-medium rounded-md ${
                  timeframe === "week"
                    ? "bg-primary text-white"
                    : "bg-muted hover:bg-muted/80"
                }`}
              >
                Week
              </button>
              <button
                onClick={() => setTimeframe("month")}
                className={`px-3 py-1.5 text-xs font-medium rounded-md ${
                  timeframe === "month"
                    ? "bg-primary text-white"
                    : "bg-muted hover:bg-muted/80"
                }`}
              >
                Month
              </button>
              <button
                onClick={() => setTimeframe("year")}
                className={`px-3 py-1.5 text-xs font-medium rounded-md ${
                  timeframe === "year"
                    ? "bg-primary text-white"
                    : "bg-muted hover:bg-muted/80"
                }`}
              >
                Year
              </button>
              <button
                onClick={() => setTimeframe("5year")}
                className={`px-3 py-1.5 text-xs font-medium rounded-md ${
                  timeframe === "5year"
                    ? "bg-primary text-white"
                    : "bg-muted hover:bg-muted/80"
                }`}
              >
                5 Year
              </button>
            </div>
            <div className="h-[300px] chart-transition">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={priceData}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} />
                  <XAxis 
                    dataKey="date"
                    tickFormatter={(date) => {
                      if (timeframe === "week") return new Date(date).toLocaleDateString('en-US', { weekday: 'short' });
                      if (timeframe === "month") return new Date(date).toLocaleDateString('en-US', { day: 'numeric', month: 'short' });
                      if (timeframe === "year") return new Date(date).toLocaleDateString('en-US', { month: 'short' });
                      return new Date(date).toLocaleDateString('en-US', { year: '2-digit' });
                    }}
                    tick={{ fontSize: 12 }}
                  />
                  <YAxis 
                    domain={['auto', 'auto']}
                    tickFormatter={(value) => `$${value}`} 
                    tick={{ fontSize: 12 }}
                  />
                  <Tooltip 
                    formatter={(value: number) => [`$${value.toFixed(2)}`, material.name]} 
                    labelFormatter={(label) => new Date(label).toLocaleDateString('en-US', { 
                      year: 'numeric', 
                      month: 'long', 
                      day: 'numeric' 
                    })}
                  />
                  <Legend />
                  <Line
                    type="monotone"
                    dataKey="price"
                    name="Price"
                    stroke={material.category === "agriculture" ? "#689F38" : "#2196F3"}
                    strokeWidth={2}
                    dot={false}
                    activeDot={{ r: 6 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </TabsContent>
          <TabsContent value="forecast">
            <div className="space-y-4 py-2">
              <div className="grid grid-cols-3 gap-4">
                <div className="border rounded-lg p-4 text-center">
                  <div className="text-sm font-medium text-muted-foreground mb-1">Short Term</div>
                  <div className="text-xl font-bold">${material.forecast.short.toFixed(2)}</div>
                  <div className="text-xs mt-1 flex justify-center items-center gap-0.5">
                    <span>1 Month</span>
                    <ArrowRight className="h-3 w-3" />
                  </div>
                </div>
                <div className="border rounded-lg p-4 text-center">
                  <div className="text-sm font-medium text-muted-foreground mb-1">Medium Term</div>
                  <div className="text-xl font-bold">${material.forecast.medium.toFixed(2)}</div>
                  <div className="text-xs mt-1 flex justify-center items-center gap-0.5">
                    <span>3 Months</span>
                    <ArrowRight className="h-3 w-3" />
                  </div>
                </div>
                <div className="border rounded-lg p-4 text-center">
                  <div className="text-sm font-medium text-muted-foreground mb-1">Long Term</div>
                  <div className="text-xl font-bold">${material.forecast.long.toFixed(2)}</div>
                  <div className="text-xs mt-1 flex justify-center items-center gap-0.5">
                    <span>6 Months</span>
                    <ArrowRight className="h-3 w-3" />
                  </div>
                </div>
              </div>
              <div className="text-sm text-muted-foreground pt-2">
                <p>Forecast based on historical data, market trends, and expert predictions.</p>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default PriceChart;
