import { useState } from "react";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import { Link2, Clock, Hash, Check, AlertCircle } from "lucide-react";

interface URLFormData {
  longUrl: string;
  validityPeriod: number;
  customShortcode?: string;
}

interface ShortenedURL {
  id: string;
  longUrl: string;
  shortUrl: string;
  validityPeriod: number;
  customShortcode?: string;
  createdAt: Date;
  expiresAt: Date;
}

const URLShortenerForm = () => {
  const [shortenedUrls, setShortenedUrls] = useState<ShortenedURL[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const { register, handleSubmit, reset, formState: { errors } } = useForm<URLFormData>({
    defaultValues: {
      validityPeriod: 30
    }
  });

  const validateUrl = (url: string) => {
    try {
      new URL(url);
      return true;
    } catch {
      return "Please enter a valid URL";
    }
  };

  const generateShortCode = () => {
    return Math.random().toString(36).substring(2, 8).toLowerCase();
  };

  const onSubmit = async (data: URLFormData) => {
    if (shortenedUrls.length >= 5) {
      toast.error("Maximum 5 URLs can be shortened at once");
      return;
    }

    setIsLoading(true);

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));

      const shortCode = data.customShortcode || generateShortCode();
      const now = new Date();
      const expiresAt = new Date(now.getTime() + data.validityPeriod * 60 * 1000);

      const newShortenedUrl: ShortenedURL = {
        id: Math.random().toString(36).substring(2),
        longUrl: data.longUrl,
        shortUrl: `http://localhost:3000/${shortCode}`,
        validityPeriod: data.validityPeriod,
        customShortcode: data.customShortcode,
        createdAt: now,
        expiresAt
      };

      setShortenedUrls(prev => [...prev, newShortenedUrl]);
      toast.success("URL shortened successfully!");
      reset();
    } catch (error) {
      toast.error("Failed to shorten URL. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const copyToClipboard = (url: string) => {
    navigator.clipboard.writeText(url);
    toast.success("Copied to clipboard!");
  };

  const clearAll = () => {
    setShortenedUrls([]);
    toast.success("All URLs cleared");
  };

  return (
    <div className="space-y-8">
      <Card className="shadow-card">
        <CardHeader className="bg-gradient-primary text-primary-foreground rounded-t-lg">
          <CardTitle className="flex items-center space-x-2">
            <Link2 className="w-5 h-5" />
            <span>URL Shortener</span>
          </CardTitle>
          <CardDescription className="text-primary-foreground/80">
            Shorten up to 5 URLs with custom validity periods and shortcodes
          </CardDescription>
        </CardHeader>
        <CardContent className="p-6">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="longUrl" className="text-sm font-medium">
                Original URL <span className="text-destructive">*</span>
              </Label>
              <Input
                id="longUrl"
                placeholder="https://example.com/very-long-url"
                {...register("longUrl", {
                  required: "URL is required",
                  validate: validateUrl
                })}
                className="h-12"
              />
              {errors.longUrl && (
                <p className="text-sm text-destructive flex items-center space-x-1">
                  <AlertCircle className="w-4 h-4" />
                  <span>{errors.longUrl.message}</span>
                </p>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="validityPeriod" className="text-sm font-medium flex items-center space-x-1">
                  <Clock className="w-4 h-4" />
                  <span>Validity Period (minutes)</span>
                </Label>
                <Input
                  id="validityPeriod"
                  type="number"
                  min="1"
                  max="10080"
                  {...register("validityPeriod", {
                    required: "Validity period is required",
                    min: { value: 1, message: "Minimum 1 minute" },
                    max: { value: 10080, message: "Maximum 7 days (10080 minutes)" }
                  })}
                  className="h-12"
                />
                {errors.validityPeriod && (
                  <p className="text-sm text-destructive">{errors.validityPeriod.message}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="customShortcode" className="text-sm font-medium flex items-center space-x-1">
                  <Hash className="w-4 h-4" />
                  <span>Custom Shortcode (optional)</span>
                </Label>
                <Input
                  id="customShortcode"
                  placeholder="my-link"
                  {...register("customShortcode", {
                    pattern: {
                      value: /^[a-zA-Z0-9-_]+$/,
                      message: "Only letters, numbers, hyphens and underscores allowed"
                    }
                  })}
                  className="h-12"
                />
                {errors.customShortcode && (
                  <p className="text-sm text-destructive">{errors.customShortcode.message}</p>
                )}
              </div>
            </div>

            <div className="flex items-center justify-between pt-4">
              <Badge variant="secondary" className="text-sm">
                {shortenedUrls.length}/5 URLs shortened
              </Badge>
              <Button
                type="submit"
                disabled={isLoading || shortenedUrls.length >= 5}
                className="bg-gradient-primary hover:shadow-glow transition-all duration-300"
              >
                {isLoading ? "Shortening..." : "Shorten URL"}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>

      {shortenedUrls.length > 0 && (
        <Card className="shadow-card">
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle>Shortened URLs</CardTitle>
              <CardDescription>
                Your recently shortened URLs with expiry information
              </CardDescription>
            </div>
            <Button variant="outline" onClick={clearAll} size="sm">
              Clear All
            </Button>
          </CardHeader>
          <CardContent className="p-0">
            <div className="divide-y divide-border">
              {shortenedUrls.map((url) => (
                <div key={url.id} className="p-6 hover:bg-accent/50 transition-colors">
                  <div className="space-y-3">
                    <div className="flex items-start justify-between">
                      <div className="flex-1 min-w-0">
                        <p className="text-sm text-muted-foreground truncate">
                          {url.longUrl}
                        </p>
                        <p className="text-lg font-mono text-primary font-medium">
                          {url.shortUrl}
                        </p>
                      </div>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => copyToClipboard(url.shortUrl)}
                        className="ml-4 flex-shrink-0"
                      >
                        <Check className="w-4 h-4" />
                      </Button>
                    </div>
                    
                    <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                      <span className="flex items-center space-x-1">
                        <Clock className="w-4 h-4" />
                        <span>Expires: {url.expiresAt.toLocaleString()}</span>
                      </span>
                      {url.customShortcode && (
                        <Badge variant="outline" className="text-xs">
                          Custom
                        </Badge>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default URLShortenerForm;