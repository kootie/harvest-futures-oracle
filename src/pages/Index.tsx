
import React from "react";
import Navbar from "@/components/Navbar";
import Dashboard from "@/components/Dashboard";
import MarketInsights from "@/components/MarketInsights";
import PredictionForm from "@/components/PredictionForm";
import Footer from "@/components/Footer";

const Index: React.FC = () => {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      
      <main className="flex-1">
        <div className="container py-8 space-y-10">
          <Dashboard />
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <MarketInsights />
            <PredictionForm />
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Index;
