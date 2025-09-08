import { useState, useCallback } from "react";
import { useForm } from "react-hook-form";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { QRCodeComponent } from "@/components/ui/qr-code";
import { LoadingSpinner } from "@/components/ui/loading-spinner";
import { ProgressRing } from "@/components/ui/progress-ring";
import { toast } from "sonner";
import { 
  Link2, Clock, Hash, Check, AlertCircle, Globe, 
  QrCode, Copy, ExternalLink, Trash2, Shield,
  Zap, TrendingUp, Eye
} from "lucide-react";

interface URLFormData {
  longUrl: string;
  validityPeriod: number;
  customShortcode?: string;
  password?: string;
  description?: string;
}

interface ShortenedURL {
  id: string;
  longUrl: string;
  shortUrl: string;
  validityPeriod: number;
  customShortcode?: string;
  password?: string;
  description?: string;
  createdAt: Date;
  expiresAt: Date;
  clicks: number;
  isActive: boolean;
  qrCode?: string;
}

const URLShortenerForm = () => {
  const [shortenedUrls, setShortenedUrls] = useState<ShortenedURL[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedUrl, setSelectedUrl] = useState<ShortenedURL | null>(null);
  const [showQRCode, setShowQRCode] = useState<string | null>(null);

  const { register, handleSubmit, reset, watch, formState: { errors } } = useForm<URLFormData>({
    defaultValues: {
      validityPeriod: 60
    }
  });

  const watchedUrl = watch("longUrl");

  const validateUrl = (url: string) => {
    try {
      new URL(url);
      const domain = new URL(url).hostname;
      if (domain.includes('localhost') || domain.includes('127.0.0.1')) {
        return "Local URLs are not allowed for security reasons";
      }
      return true;
    } catch {
      return "Please enter a valid URL (e.g., https://example.com)";
    }
  };

  const generateShortCode = () => {
    const chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let result = '';
    for (let i = 0; i < 7; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return result;
  };

  const calculateTimeRemaining = (expiresAt: Date) => {
    const now = new Date();
    const remaining = expiresAt.getTime() - now.getTime();
    
    if (remaining <= 0) return "Expired";
    
    const hours = Math.floor(remaining / (1000 * 60 * 60));
    const minutes = Math.floor((remaining % (1000 * 60 * 60)) / (1000 * 60));
    
    if (hours > 0) return `${hours}h ${minutes}m`;
    return `${minutes}m`;
  };

  const onSubmit = async (data: URLFormData) => {
    if (shortenedUrls.length >= 10) {
      toast.error("Maximum 10 URLs can be shortened at once", {
        description: "Clear some URLs to continue"
      });
      return;
    }

    setIsLoading(true);

    try {
      // Simulate advanced API processing
      await new Promise(resolve => setTimeout(resolve, 2000));

      const shortCode = data.customShortcode || generateShortCode();
      const now = new Date();
      const expiresAt = new Date(now.getTime() + data.validityPeriod * 60 * 1000);

      // Check for duplicate custom shortcode
      if (data.customShortcode && shortenedUrls.some(url => url.customShortcode === data.customShortcode)) {
        toast.error("Custom shortcode already exists", {
          description: "Please choose a different shortcode"
        });
        setIsLoading(false);
        return;
      }

      const newShortenedUrl: ShortenedURL = {
        id: Math.random().toString(36).substring(2),
        longUrl: data.longUrl,
        shortUrl: `https://short.ly/${shortCode}`,
        validityPeriod: data.validityPeriod,
        customShortcode: data.customShortcode,
        password: data.password,
        description: data.description,
        createdAt: now,
        expiresAt,
        clicks: Math.floor(Math.random() * 100),
        isActive: true
      };

      setShortenedUrls(prev => [newShortenedUrl, ...prev]);
      toast.success("URL shortened successfully!", {
        description: "Your professional short link is ready to use"
      });
      reset();
    } catch (error) {
      toast.error("Failed to shorten URL", {
        description: "Please check your connection and try again"
      });
    } finally {
      setIsLoading(false);
    }
  };

  const copyToClipboard = useCallback(async (text: string, type: string = "URL") => {
    try {
      await navigator.clipboard.writeText(text);
      toast.success(`${type} copied to clipboard!`, {
        icon: <Copy className="w-4 h-4" />
      });
    } catch (error) {
      toast.error("Failed to copy to clipboard");
    }
  }, []);

  const deleteUrl = (id: string) => {
    setShortenedUrls(prev => prev.filter(url => url.id !== id));
    toast.success("URL deleted successfully");
  };

  const clearAll = () => {
    setShortenedUrls([]);
    toast.success("All URLs cleared");
  };

  const urlProgress = (shortenedUrls.length / 10) * 100;

  return (
    <div className="space-y-8">
      {/* Main Form Card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Card className="shadow-elegant hover-lift glass-card border-2">
          <CardHeader className="bg-gradient-hero text-white rounded-t-lg relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-secondary/20 backdrop-blur-sm"></div>
            <div className="relative z-10">
              <CardTitle className="flex items-center space-x-3 text-2xl">
                <div className="p-2 bg-white/10 rounded-xl">
                  <Link2 className="w-6 h-6" />
                </div>
                <span>Professional URL Shortener</span>
              </CardTitle>
              <CardDescription className="text-white/80 text-lg">
                Create secure, trackable short links with advanced features
              </CardDescription>
            </div>
          </CardHeader>
          
          <CardContent className="p-8">
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
              {/* URL Input */}
              <div className="space-y-3">
                <Label htmlFor="longUrl" className="text-base font-semibold flex items-center space-x-2">
                  <Globe className="w-4 h-4 text-primary" />
                  <span>Original URL</span>
                  <span className="text-destructive">*</span>
                </Label>
                <div className="relative">
                  <Input
                    id="longUrl"
                    placeholder="https://example.com/your-very-long-url-goes-here"
                    {...register("longUrl", {
                      required: "URL is required",
                      validate: validateUrl
                    })}
                    className="h-14 text-lg pl-12 pr-4 bg-gradient-card border-2 transition-all duration-300 focus:shadow-glow focus:border-primary"
                  />
                  <Globe className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                </div>
                <AnimatePresence>
                  {errors.longUrl && (
                    <motion.p 
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      className="text-sm text-destructive flex items-center space-x-2"
                    >
                      <AlertCircle className="w-4 h-4" />
                      <span>{errors.longUrl.message}</span>
                    </motion.p>
                  )}
                </AnimatePresence>
                
                {/* URL Preview */}
                {watchedUrl && !errors.longUrl && (
                  <motion.div 
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="p-4 bg-success/10 border border-success/20 rounded-lg"
                  >
                    <p className="text-sm text-success-foreground flex items-center space-x-2">
                      <Check className="w-4 h-4" />
                      <span>Valid URL detected</span>
                    </p>
                  </motion.div>
                )}
              </div>

              {/* Advanced Options Grid */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Validity Period */}
                <div className="space-y-3">
                  <Label htmlFor="validityPeriod" className="text-sm font-semibold flex items-center space-x-2">
                    <Clock className="w-4 h-4 text-warning" />
                    <span>Validity (minutes)</span>
                  </Label>
                  <Input
                    id="validityPeriod"
                    type="number"
                    min="5"
                    max="525600"
                    {...register("validityPeriod", {
                      required: "Validity period is required",
                      min: { value: 5, message: "Minimum 5 minutes" },
                      max: { value: 525600, message: "Maximum 1 year" }
                    })}
                    className="h-12 bg-gradient-card border-2 transition-all duration-300 focus:border-warning"
                  />
                  {errors.validityPeriod && (
                    <p className="text-sm text-destructive">{errors.validityPeriod.message}</p>
                  )}
                </div>

                {/* Custom Shortcode */}
                <div className="space-y-3">
                  <Label htmlFor="customShortcode" className="text-sm font-semibold flex items-center space-x-2">
                    <Hash className="w-4 h-4 text-secondary" />
                    <span>Custom Code</span>
                    <Badge variant="secondary" className="text-xs">Optional</Badge>
                  </Label>
                  <Input
                    id="customShortcode"
                    placeholder="my-awesome-link"
                    {...register("customShortcode", {
                      pattern: {
                        value: /^[a-zA-Z0-9-_]+$/,
                        message: "Only letters, numbers, hyphens and underscores"
                      },
                      minLength: { value: 3, message: "Minimum 3 characters" },
                      maxLength: { value: 20, message: "Maximum 20 characters" }
                    })}
                    className="h-12 bg-gradient-card border-2 transition-all duration-300 focus:border-secondary"
                  />
                  {errors.customShortcode && (
                    <p className="text-sm text-destructive">{errors.customShortcode.message}</p>
                  )}
                </div>

                {/* Password Protection */}
                <div className="space-y-3">
                  <Label htmlFor="password" className="text-sm font-semibold flex items-center space-x-2">
                    <Shield className="w-4 h-4 text-info" />
                    <span>Password</span>
                    <Badge variant="outline" className="text-xs">Pro</Badge>
                  </Label>
                  <Input
                    id="password"
                    type="password"
                    placeholder="Optional password"
                    {...register("password", {
                      minLength: { value: 4, message: "Minimum 4 characters" }
                    })}
                    className="h-12 bg-gradient-card border-2 transition-all duration-300 focus:border-info"
                  />
                  {errors.password && (
                    <p className="text-sm text-destructive">{errors.password.message}</p>
                  )}
                </div>
              </div>

              {/* Description */}
              <div className="space-y-3">
                <Label htmlFor="description" className="text-sm font-semibold">
                  Description (Optional)
                </Label>
                <Input
                  id="description"
                  placeholder="Brief description of your link..."
                  {...register("description", {
                    maxLength: { value: 100, message: "Maximum 100 characters" }
                  })}
                  className="h-12 bg-gradient-card border-2"
                />
              </div>

              {/* Submit Section */}
              <div className="flex items-center justify-between pt-6 border-t border-border">
                <div className="flex items-center space-x-4">
                  <ProgressRing progress={urlProgress} size={50} />
                  <div>
                    <p className="text-sm font-medium text-foreground">
                      {shortenedUrls.length}/10 URLs shortened
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {10 - shortenedUrls.length} remaining
                    </p>
                  </div>
                </div>
                
                <Button
                  type="submit"
                  disabled={isLoading || shortenedUrls.length >= 10}
                  className="btn-hero h-14 px-8 text-lg font-semibold min-w-[200px]"
                >
                  {isLoading ? (
                    <div className="flex items-center space-x-2">
                      <LoadingSpinner size="sm" />
                      <span>Processing...</span>
                    </div>
                  ) : (
                    <div className="flex items-center space-x-2">
                      <Zap className="w-5 h-5" />
                      <span>Shorten URL</span>
                    </div>
                  )}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </motion.div>

      {/* Results Section */}
      <AnimatePresence>
        {shortenedUrls.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <Card className="shadow-elegant glass-card">
              <CardHeader className="flex flex-row items-center justify-between pb-4">
                <div>
                  <CardTitle className="text-2xl flex items-center space-x-2">
                    <TrendingUp className="w-6 h-6 text-primary" />
                    <span>Your Shortened URLs</span>
                  </CardTitle>
                  <CardDescription className="text-lg">
                    Professional short links with advanced analytics
                  </CardDescription>
                </div>
                <Button 
                  variant="outline" 
                  onClick={clearAll} 
                  className="hover:bg-destructive hover:text-destructive-foreground transition-colors"
                >
                  <Trash2 className="w-4 h-4 mr-2" />
                  Clear All
                </Button>
              </CardHeader>
              
              <CardContent className="p-0">
                <div className="space-y-1">
                  {shortenedUrls.map((url, index) => (
                    <motion.div
                      key={url.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.3, delay: index * 0.1 }}
                      className="p-6 hover:bg-accent/50 border-b border-border/50 last:border-0 group transition-all duration-300"
                    >
                      <div className="space-y-4">
                        {/* URL Info Header */}
                        <div className="flex items-start justify-between">
                          <div className="flex-1 min-w-0 space-y-2">
                            <div className="flex items-center space-x-2">
                              <p className="text-sm text-muted-foreground truncate max-w-md">
                                {url.longUrl}
                              </p>
                              {url.password && (
                                <Badge variant="outline" className="text-xs">
                                  <Shield className="w-3 h-3 mr-1" />
                                  Protected
                                </Badge>
                              )}
                            </div>
                            
                            <div className="flex items-center space-x-3">
                              <p className="text-xl font-mono text-primary font-bold hover:text-primary-glow transition-colors">
                                {url.shortUrl}
                              </p>
                              <div className="flex items-center space-x-1">
                                <Eye className="w-4 h-4 text-muted-foreground" />
                                <span className="text-sm font-medium">{url.clicks}</span>
                              </div>
                            </div>
                          </div>
                          
                          {/* Action Buttons */}
                          <div className="flex items-center space-x-2 opacity-0 group-hover:opacity-100 transition-opacity">
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => copyToClipboard(url.shortUrl)}
                              className="h-8"
                            >
                              <Copy className="w-3 h-3" />
                            </Button>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => setShowQRCode(showQRCode === url.id ? null : url.id)}
                              className="h-8"
                            >
                              <QrCode className="w-3 h-3" />
                            </Button>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => window.open(url.longUrl, '_blank')}
                              className="h-8"
                            >
                              <ExternalLink className="w-3 h-3" />
                            </Button>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => deleteUrl(url.id)}
                              className="h-8 hover:bg-destructive hover:text-destructive-foreground"
                            >
                              <Trash2 className="w-3 h-3" />
                            </Button>
                          </div>
                        </div>
                        
                        {/* URL Metadata */}
                        <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                          <span className="flex items-center space-x-1">
                            <Clock className="w-4 h-4" />
                            <span>Expires: {calculateTimeRemaining(url.expiresAt)}</span>
                          </span>
                          <span>Created: {url.createdAt.toLocaleDateString()}</span>
                          {url.customShortcode && (
                            <Badge variant="secondary" className="text-xs">
                              Custom
                            </Badge>
                          )}
                          {url.description && (
                            <span className="italic">"{url.description}"</span>
                          )}
                        </div>

                        {/* QR Code Expandable */}
                        <AnimatePresence>
                          {showQRCode === url.id && (
                            <motion.div
                              initial={{ opacity: 0, height: 0 }}
                              animate={{ opacity: 1, height: "auto" }}
                              exit={{ opacity: 0, height: 0 }}
                              transition={{ duration: 0.3 }}
                              className="border-t border-border/50 pt-4"
                            >
                              <div className="flex justify-center">
                                <QRCodeComponent 
                                  value={url.shortUrl} 
                                  size={150}
                                  showActions={true}
                                />
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default URLShortenerForm;