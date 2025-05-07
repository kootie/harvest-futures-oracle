
import React from "react";
import { Link } from "react-router-dom";
import { Sprout, Building2, BarChart3 } from "lucide-react";
import { Button } from "@/components/ui/button";

const Navbar = () => {
  return (
    <nav className="border-b bg-white/90 backdrop-blur-sm sticky top-0 z-50">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-6">
          <Link to="/" className="flex items-center gap-2">
            <div className="bg-gradient-to-r from-agriculture to-construction p-1 rounded-md">
              <BarChart3 className="h-6 w-6 text-white" />
            </div>
            <span className="text-xl font-bold">Harvest Futures Oracle</span>
          </Link>
          
          <div className="hidden md:flex gap-6 ml-6">
            <Link to="/" className="flex items-center gap-1 text-sm font-medium hover:text-primary">
              <Sprout className="h-4 w-4" />
              <span>Agriculture</span>
            </Link>
            <Link to="/" className="flex items-center gap-1 text-sm font-medium hover:text-primary">
              <Building2 className="h-4 w-4" />
              <span>Construction</span>
            </Link>
            <Link to="/" className="text-sm font-medium hover:text-primary">Market Insights</Link>
            <Link to="/" className="text-sm font-medium hover:text-primary">Learn</Link>
          </div>
        </div>
        
        <div className="flex items-center gap-4">
          <Button variant="outline" size="sm">
            Login
          </Button>
          <Button size="sm">
            Sign Up
          </Button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
