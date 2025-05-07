
import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { materials } from "@/data/marketData";
import { useToast } from "@/components/ui/use-toast";
import { Lightbulb } from "lucide-react";

const PredictionForm: React.FC = () => {
  const [selectedMaterial, setSelectedMaterial] = useState("");
  const [predictionPrice, setPredictionPrice] = useState("");
  const [timeline, setTimeline] = useState("");
  const { toast } = useToast();
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!selectedMaterial || !predictionPrice || !timeline) {
      toast({
        title: "Missing Information",
        description: "Please fill out all fields to submit your prediction.",
        variant: "destructive",
      });
      return;
    }
    
    // In a real application, this would send data to an API
    toast({
      title: "Prediction Submitted",
      description: "Your market prediction has been recorded. Thank you for contributing!",
    });
    
    // Reset form
    setSelectedMaterial("");
    setPredictionPrice("");
    setTimeline("");
  };
  
  const findMaterial = (id: string) => {
    return materials.find(m => m.id === id);
  };
  
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-xl flex items-center gap-2">
          <Lightbulb className="h-5 w-5 text-yellow-500" />
          Submit Your Price Prediction
        </CardTitle>
        <CardDescription>
          Help improve market forecasts by sharing your predictions based on your expertise.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <label className="text-sm font-medium">Material</label>
            <Select value={selectedMaterial} onValueChange={setSelectedMaterial}>
              <SelectTrigger>
                <SelectValue placeholder="Select material" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="">Select material</SelectItem>
                {materials.map((material) => (
                  <SelectItem key={material.id} value={material.id}>
                    {material.name} ({material.category})
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          
          {selectedMaterial && (
            <div className="text-sm">
              <span className="font-medium">Current Price:</span>{" "}
              ${findMaterial(selectedMaterial)?.currentPrice.toFixed(2)} per{" "}
              {findMaterial(selectedMaterial)?.unit}
            </div>
          )}
          
          <div className="space-y-2">
            <label className="text-sm font-medium">Your Price Prediction</label>
            <div className="flex">
              <div className="flex h-10 w-10 items-center justify-center rounded-l-md border border-r-0 bg-muted text-muted-foreground">
                $
              </div>
              <Input 
                type="number" 
                placeholder="0.00" 
                className="rounded-l-none" 
                value={predictionPrice} 
                onChange={(e) => setPredictionPrice(e.target.value)}
                step="0.01"
                min="0"
              />
            </div>
          </div>
          
          <div className="space-y-2">
            <label className="text-sm font-medium">Prediction Timeline</label>
            <Select value={timeline} onValueChange={setTimeline}>
              <SelectTrigger>
                <SelectValue placeholder="Select timeline" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="">Select timeline</SelectItem>
                <SelectItem value="1month">1 Month</SelectItem>
                <SelectItem value="3month">3 Months</SelectItem>
                <SelectItem value="6month">6 Months</SelectItem>
                <SelectItem value="12month">12 Months</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <Button type="submit" className="w-full">Submit Prediction</Button>
          
          <p className="text-xs text-muted-foreground mt-2">
            Your predictions help improve our forecasting models and provide valuable insights
            to the community. All submissions are reviewed for quality.
          </p>
        </form>
      </CardContent>
    </Card>
  );
};

export default PredictionForm;
