import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Progress } from "@/components/ui/progress";
import { QRCodeComponent } from "@/components/ui/qr-code";
import { ProgressRing } from "@/components/ui/progress-ring";
import { AnimatedCounter } from "@/components/ui/animated-counter";
import { LoadingSpinner } from "@/components/ui/loading-spinner";
import { useToast } from "@/hooks/use-toast";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Link, 
  Sparkles, 
  Target, 
  Globe, 
  Smartphone, 
  Monitor, 
  Users, 
  TrendingUp,
  Zap,
  Shield,
  Clock,
  Eye,
  Copy,
  Share2,
  BarChart3,
  Wand2,
  Lock,
  Calendar,
  Hash,
  ExternalLink,
  Palette,
  Settings,
  Brain,
  Rocket,
  Star,
  Trash2,
  QrCode
} from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

interface URLData {
  id: string;
  original_url: string;
  short_code: string;
  title?: string;
  description?: string;
  clicks: number;
  created_at: string;
  qr_code?: string;
  ai_suggestions?: any;
  performance_score?: number;
  predicted_ctr?: number;
}

export const URLShortenerForm = () => {
  const [url, setUrl] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [customCode, setCustomCode] = useState("");
  const [password, setPassword] = useState("");
  const [expirationDate, setExpirationDate] = useState("");
  const [maxClicks, setMaxClicks] = useState("");
  
  // Advanced features
  const [enablePassword, setEnablePassword] = useState(false);
  const [enableExpiration, setEnableExpiration] = useState(false);
  const [enableClickLimit, setEnableClickLimit] = useState(false);
  const [enableGeoTargeting, setEnableGeoTargeting] = useState(false);
  const [enableDeviceTargeting, setEnableDeviceTargeting] = useState(false);
  const [enableRetargeting, setEnableRetargeting] = useState(false);
  const [enableAIOptimization, setEnableAIOptimization] = useState(true);

  // UTM Parameters
  const [utmSource, setUtmSource] = useState("");
  const [utmMedium, setUtmMedium] = useState("");
  const [utmCampaign, setUtmCampaign] = useState("");
  const [utmTerm, setUtmTerm] = useState("");
  const [utmContent, setUtmContent] = useState("");

  // Retargeting pixels
  const [facebookPixel, setFacebookPixel] = useState("");
  const [googlePixel, setGooglePixel] = useState("");
  const [twitterPixel, setTwitterPixel] = useState("");

  // Geo targeting
  const [targetCountries, setTargetCountries] = useState<string[]>([]);
  const [targetDevices, setTargetDevices] = useState<string[]>([]);

  const [isLoading, setIsLoading] = useState(false);
  const [shortenedData, setShortenedData] = useState<URLData | null>(null);
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [aiSuggestions, setAiSuggestions] = useState<string[]>([]);
  const [performanceScore, setPerformanceScore] = useState(0);
  const [usageProgress, setUsageProgress] = useState(65);
  
  const { toast } = useToast();

  // AI suggestions for URL optimization
  const generateAISuggestions = (originalUrl: string) => {
    const suggestions = [
      "Add UTM parameters to track campaign performance",
      "Enable retargeting pixels for better conversion",
      "Set geo-targeting for location-specific content",
      "Consider adding a custom landing page",
      "Enable A/B testing for different audiences"
    ];
    setAiSuggestions(suggestions);
    setPerformanceScore(Math.floor(Math.random() * 30) + 70);
  };

  const shortenURL = async () => {
    if (!url) {
      toast({
        title: "URL Required",
        description: "Please enter a URL to shorten",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);

    try {
      // Mock implementation - would integrate with Supabase edge functions
      const shortCode = customCode || generateShortCode();
      const newUrlData: URLData = {
        id: crypto.randomUUID(),
        original_url: url,
        short_code: shortCode,
        title: title || extractTitleFromUrl(url),
        description,
        clicks: 0,
        created_at: new Date().toISOString(),
        ai_suggestions: enableAIOptimization ? aiSuggestions : null,
        performance_score: enableAIOptimization ? performanceScore : null,
        predicted_ctr: enableAIOptimization ? Math.random() * 0.05 + 0.02 : null,
      };

      setShortenedData(newUrlData);
      generateAISuggestions(url);

      toast({
        title: "🎉 Link Shortened Successfully!",
        description: "Your smart link is ready with AI-powered insights",
      });

      // Reset form
      setUrl("");
      setTitle("");
      setDescription("");
      setCustomCode("");
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to shorten URL. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const generateShortCode = () => {
    return Math.random().toString(36).substring(2, 8);
  };

  const extractTitleFromUrl = (url: string) => {
    try {
      const domain = new URL(url).hostname.replace('www.', '');
      return domain.charAt(0).toUpperCase() + domain.slice(1);
    } catch {
      return "Shortened Link";
    }
  };

  const copyToClipboard = async (text: string) => {
    await navigator.clipboard.writeText(text);
    toast({
      title: "Copied!",
      description: "Link copied to clipboard",
    });
  };

  const shareLink = async (text: string) => {
    if (navigator.share) {
      await navigator.share({
        title: shortenedData?.title,
        text: shortenedData?.description,
        url: text,
      });
    }
  };

  return (
    <div className="space-y-8">
      {/* Main URL Shortening Form */}
      <Card className="glass-panel border-primary/20 overflow-hidden">
        <CardHeader className="bg-gradient-primary/10 border-b border-primary/20">
          <CardTitle className="flex items-center gap-3 text-2xl">
            <div className="p-2 bg-primary/20 rounded-xl">
              <Rocket className="h-6 w-6 text-primary" />
            </div>
            AI-Powered URL Shortener
            <Badge variant="secondary" className="bg-accent/20 text-accent-foreground">
              <Brain className="h-3 w-3 mr-1" />
              Smart
            </Badge>
          </CardTitle>
        </CardHeader>
        <CardContent className="p-8 space-y-6">
          {/* URL Input */}
          <div className="space-y-3">
            <Label htmlFor="url" className="text-base font-medium flex items-center gap-2">
              <Link className="h-4 w-4" />
              Enter your long URL
            </Label>
            <div className="relative">
              <Input
                id="url"
                placeholder="https://example.com/very-long-url-that-needs-shortening"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                className="pr-12 h-12 text-lg bg-background/50 backdrop-blur-sm border-primary/30 focus:border-primary transition-all duration-300"
              />
              <Button
                size="sm"
                variant="ghost"
                className="absolute right-2 top-1/2 -translate-y-1/2 h-8 w-8 p-0"
                onClick={() => setUrl("")}
              >
                ×
              </Button>
            </div>
          </div>

          {/* Action Button */}
          <Button
            onClick={shortenURL}
            disabled={isLoading || !url}
            className="w-full h-14 text-lg font-semibold bg-gradient-primary hover:scale-105 transition-all duration-300 group"
          >
            {isLoading ? (
              <>
                <LoadingSpinner className="mr-3" />
                Creating Smart Link...
              </>
            ) : (
              <>
                <Zap className="mr-3 h-5 w-5 group-hover:animate-pulse" />
                Create Smart Link
                <Sparkles className="ml-3 h-5 w-5 group-hover:animate-pulse" />
              </>
            )}
          </Button>
        </CardContent>
      </Card>

      {/* Results Card */}
      <AnimatePresence>
        {shortenedData && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="space-y-6"
          >
            <Card className="glass-panel border-primary/20 overflow-hidden">
              <CardHeader className="bg-gradient-to-r from-green-500/10 to-primary/10 border-b border-primary/20">
                <CardTitle className="flex items-center gap-3">
                  <div className="p-2 bg-green-500/20 rounded-xl">
                    <Star className="h-5 w-5 text-green-600" />
                  </div>
                  Your Smart Link is Ready!
                  <Badge variant="secondary" className="bg-green-500/20 text-green-700">
                    AI Enhanced
                  </Badge>
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6 space-y-6">
                {/* Shortened URL Display */}
                <div className="space-y-3">
                  <Label>Shortened URL</Label>
                  <div className="flex items-center gap-3 p-4 bg-muted/50 rounded-xl border">
                    <div className="flex-1">
                      <div className="font-mono text-lg text-primary">
                        https://short.ly/{shortenedData.short_code}
                      </div>
                      <div className="text-sm text-muted-foreground mt-1">
                        {shortenedData.title}
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => copyToClipboard(`https://short.ly/${shortenedData.short_code}`)}
                        className="h-9"
                      >
                        <Copy className="h-4 w-4" />
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => shareLink(`https://short.ly/${shortenedData.short_code}`)}
                        className="h-9"
                      >
                        <Share2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>

                {/* QR Code */}
                <div className="flex justify-center">
                  <QRCodeComponent
                    value={`https://short.ly/${shortenedData.short_code}`}
                    size={200}
                  />
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};