import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Link2, BarChart3 } from "lucide-react";

const Navigation = () => {
  const location = useLocation();

  return (
    <nav className="bg-card border-b border-border shadow-card">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-primary rounded-lg flex items-center justify-center shadow-glow">
              <Link2 className="w-6 h-6 text-primary-foreground" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-foreground">URL Shortener</h1>
              <p className="text-sm text-muted-foreground">Professional Link Management</p>
            </div>
          </div>
          
          <div className="flex space-x-4">
            <Button
              asChild
              variant={location.pathname === "/" ? "default" : "ghost"}
              className="flex items-center space-x-2"
            >
              <Link to="/">
                <Link2 className="w-4 h-4" />
                <span>Shortener</span>
              </Link>
            </Button>
            
            <Button
              asChild
              variant={location.pathname === "/statistics" ? "default" : "ghost"}
              className="flex items-center space-x-2"
            >
              <Link to="/statistics">
                <BarChart3 className="w-4 h-4" />
                <span>Statistics</span>
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;