
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";
import { getMarketInsights } from "@/data/marketData";
import { Calendar, Building2, Sprout, AlertTriangle } from "lucide-react";

interface MarketInsight {
  id: string;
  title: string;
  description: string;
  impact: string;
  date: string;
  category: string;
}

const MarketInsights: React.FC = () => {
  const insights = getMarketInsights();
  
  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-US', { 
      month: 'short',
      day: 'numeric' 
    });
  };
  
  const getImpactBadge = (impact: string) => {
    switch(impact) {
      case 'high':
        return <span className="bg-red-100 text-red-800 text-xs px-2 py-0.5 rounded-full">High Impact</span>;
      case 'medium':
        return <span className="bg-yellow-100 text-yellow-800 text-xs px-2 py-0.5 rounded-full">Medium Impact</span>;
      default:
        return <span className="bg-blue-100 text-blue-800 text-xs px-2 py-0.5 rounded-full">Low Impact</span>;
    }
  };
  
  const getCategoryIcon = (category: string) => {
    if (category === 'agriculture') return <Sprout className="h-4 w-4 text-agriculture" />;
    return <Building2 className="h-4 w-4 text-construction" />;
  };
  
  const renderInsightItem = (insight: MarketInsight) => (
    <div key={insight.id} className="border-b last:border-b-0 py-3">
      <div className="flex justify-between items-start">
        <h3 className="font-medium text-sm">{insight.title}</h3>
        <div className="flex items-center gap-1 text-xs text-muted-foreground whitespace-nowrap">
          <Calendar className="h-3 w-3" />
          {formatDate(insight.date)}
        </div>
      </div>
      <p className="text-sm text-muted-foreground mt-1 mb-2">{insight.description}</p>
      <div className="flex gap-2 items-center">
        {getImpactBadge(insight.impact)}
        <div className="flex items-center gap-1 text-xs">
          {getCategoryIcon(insight.category)}
          <span>{insight.category === 'agriculture' ? 'Agriculture' : 'Construction'}</span>
        </div>
      </div>
    </div>
  );
  
  const agricultureInsights = insights.filter(i => i.category === 'agriculture');
  const constructionInsights = insights.filter(i => i.category === 'construction');
  
  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-xl flex items-center gap-2">
          <AlertTriangle className="h-5 w-5 text-amber-500" />
          Market Insights
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="all" className="space-y-4">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="all">All</TabsTrigger>
            <TabsTrigger value="agriculture">Agriculture</TabsTrigger>
            <TabsTrigger value="construction">Construction</TabsTrigger>
          </TabsList>
          <TabsContent value="all">
            <ScrollArea className="h-80">
              <div className="pr-4 space-y-1">
                {insights.map(renderInsightItem)}
              </div>
            </ScrollArea>
          </TabsContent>
          <TabsContent value="agriculture">
            <ScrollArea className="h-80">
              <div className="pr-4 space-y-1">
                {agricultureInsights.map(renderInsightItem)}
              </div>
            </ScrollArea>
          </TabsContent>
          <TabsContent value="construction">
            <ScrollArea className="h-80">
              <div className="pr-4 space-y-1">
                {constructionInsights.map(renderInsightItem)}
              </div>
            </ScrollArea>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default MarketInsights;
