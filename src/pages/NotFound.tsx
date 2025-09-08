import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <div className="flex min-h-[60vh] items-center justify-center">
      <div className="text-center space-y-6">
        <div className="space-y-2">
          <h1 className="text-8xl font-bold text-primary/20">404</h1>
          <h2 className="text-3xl font-bold text-foreground">Page Not Found</h2>
          <p className="text-lg text-muted-foreground max-w-md mx-auto">
            The page you're looking for doesn't exist or has been moved.
          </p>
        </div>
        <Button asChild className="bg-gradient-primary hover:shadow-glow">
          <Link to="/">
            Return to URL Shortener
          </Link>
        </Button>
      </div>
    </div>
  );
};

export default NotFound;
