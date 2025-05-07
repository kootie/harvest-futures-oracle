
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import PriceChart from "./PriceChart";
import { materials } from "@/data/marketData";
import { Sprout, Building2, Search } from "lucide-react";
import { Input } from "@/components/ui/input";

const Dashboard: React.FC = () => {
  const [category, setCategory] = useState<"all" | "agriculture" | "construction">("all");
  const [searchTerm, setSearchTerm] = useState("");
  
  const filteredMaterials = materials.filter(material => {
    const matchesCategory = category === "all" || material.category === category;
    const matchesSearch = material.name.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const agricultureMaterials = materials.filter(m => m.category === "agriculture");
  const constructionMaterials = materials.filter(m => m.category === "construction");
  
  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
        <h2 className="text-3xl font-bold">Material Price Dashboard</h2>
        
        <div className="flex gap-2 w-full md:w-auto">
          <div className="relative w-full md:w-64">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="text"
              placeholder="Search materials..."
              className="pl-8"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          
          <Button
            variant={category === "agriculture" ? "default" : "outline"}
            size="icon"
            onClick={() => setCategory(prev => prev === "agriculture" ? "all" : "agriculture")}
            className={
              category === "agriculture" 
                ? "bg-agriculture hover:bg-agriculture/90"
                : ""
            }
          >
            <Sprout className="h-4 w-4" />
          </Button>
          
          <Button
            variant={category === "construction" ? "default" : "outline"}
            size="icon"
            onClick={() => setCategory(prev => prev === "construction" ? "all" : "construction")}
            className={
              category === "construction" 
                ? "bg-construction hover:bg-construction/90" 
                : ""
            }
          >
            <Building2 className="h-4 w-4" />
          </Button>
        </div>
      </div>
      
      <Tabs defaultValue="all" className="space-y-4">
        <TabsList>
          <TabsTrigger value="all" onClick={() => setCategory("all")}>
            All Materials
          </TabsTrigger>
          <TabsTrigger value="agriculture" onClick={() => setCategory("agriculture")}>
            Agriculture <span className="ml-1 text-xs">({agricultureMaterials.length})</span>
          </TabsTrigger>
          <TabsTrigger value="construction" onClick={() => setCategory("construction")}>
            Construction <span className="ml-1 text-xs">({constructionMaterials.length})</span>
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="all" className="space-y-4">
          <div className="grid gap-6 md:grid-cols-2">
            {filteredMaterials.map(material => (
              <PriceChart key={material.id} material={material} />
            ))}
          </div>
          
          {filteredMaterials.length === 0 && (
            <div className="text-center py-12">
              <h3 className="text-lg font-medium">No materials found</h3>
              <p className="text-muted-foreground">Try adjusting your search or filters</p>
            </div>
          )}
        </TabsContent>
        
        <TabsContent value="agriculture" className="space-y-4">
          <div className="grid gap-6 md:grid-cols-2">
            {filteredMaterials
              .filter(material => material.category === "agriculture")
              .map(material => (
                <PriceChart key={material.id} material={material} />
              ))
            }
          </div>
        </TabsContent>
        
        <TabsContent value="construction" className="space-y-4">
          <div className="grid gap-6 md:grid-cols-2">
            {filteredMaterials
              .filter(material => material.category === "construction")
              .map(material => (
                <PriceChart key={material.id} material={material} />
              ))
            }
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Dashboard;
