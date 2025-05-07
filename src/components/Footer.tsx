
import React from "react";
import { Link } from "react-router-dom";
import { BarChart3, Mail, Phone, MapPin } from "lucide-react";

const Footer: React.FC = () => {
  return (
    <footer className="bg-muted mt-12">
      <div className="container py-12">
        <div className="grid gap-8 md:grid-cols-4">
          <div className="space-y-4">
            <Link to="/" className="flex items-center gap-2">
              <div className="bg-gradient-to-r from-agriculture to-construction p-1 rounded-md">
                <BarChart3 className="h-5 w-5 text-white" />
              </div>
              <span className="text-lg font-bold">Harvest Futures Oracle</span>
            </Link>
            <p className="text-sm text-muted-foreground">
              Helping farmers and builders make informed decisions through market predictions and futures data.
            </p>
          </div>
          
          <div>
            <h3 className="font-medium mb-4">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/" className="hover:text-primary transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/" className="hover:text-primary transition-colors">
                  Agriculture Markets
                </Link>
              </li>
              <li>
                <Link to="/" className="hover:text-primary transition-colors">
                  Construction Materials
                </Link>
              </li>
              <li>
                <Link to="/" className="hover:text-primary transition-colors">
                  Market Insights
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-medium mb-4">Resources</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/" className="hover:text-primary transition-colors">
                  Futures Trading Guide
                </Link>
              </li>
              <li>
                <Link to="/" className="hover:text-primary transition-colors">
                  Price Prediction Models
                </Link>
              </li>
              <li>
                <Link to="/" className="hover:text-primary transition-colors">
                  Market Analysis
                </Link>
              </li>
              <li>
                <Link to="/" className="hover:text-primary transition-colors">
                  Seasonal Forecasts
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-medium mb-4">Contact</h3>
            <ul className="space-y-2 text-sm">
              <li className="flex items-start gap-2">
                <Mail className="h-4 w-4 mt-0.5 text-muted-foreground" />
                <span>contact@harvestfutures.example</span>
              </li>
              <li className="flex items-start gap-2">
                <Phone className="h-4 w-4 mt-0.5 text-muted-foreground" />
                <span>+1 (555) 123-4567</span>
              </li>
              <li className="flex items-start gap-2">
                <MapPin className="h-4 w-4 mt-0.5 text-muted-foreground" />
                <span>123 Market St, Suite 456<br />San Francisco, CA 94103</span>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t mt-8 pt-8 text-center text-sm text-muted-foreground">
          <p>© 2025 Harvest Futures Oracle. All rights reserved.</p>
          <div className="mt-2 flex justify-center gap-4">
            <Link to="/" className="hover:text-primary transition-colors">
              Privacy Policy
            </Link>
            <Link to="/" className="hover:text-primary transition-colors">
              Terms of Service
            </Link>
            <Link to="/" className="hover:text-primary transition-colors">
              Cookie Policy
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
