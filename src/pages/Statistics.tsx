import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { BarChart3, Eye, MapPin, Clock, ExternalLink, TrendingUp } from "lucide-react";

// Mock data for demonstration
const mockStatistics = [
  {
    id: "1",
    shortUrl: "http://localhost:3000/abc123",
    longUrl: "https://www.example.com/very-long-url-with-many-parameters",
    createdAt: new Date("2024-01-08T10:30:00"),
    expiresAt: new Date("2024-01-08T11:00:00"),
    totalClicks: 47,
    isActive: true,
    clicks: [
      { timestamp: new Date("2024-01-08T10:35:00"), source: "Direct", location: "New York, US" },
      { timestamp: new Date("2024-01-08T10:38:00"), source: "Twitter", location: "London, UK" },
      { timestamp: new Date("2024-01-08T10:42:00"), source: "Email", location: "Tokyo, JP" },
      { timestamp: new Date("2024-01-08T10:45:00"), source: "Direct", location: "Berlin, DE" },
      { timestamp: new Date("2024-01-08T10:50:00"), source: "LinkedIn", location: "Sydney, AU" },
    ]
  },
  {
    id: "2",
    shortUrl: "http://localhost:3000/xyz789",
    longUrl: "https://www.medical-tech-solutions.com/products/advanced-monitoring",
    createdAt: new Date("2024-01-08T09:15:00"),
    expiresAt: new Date("2024-01-08T10:15:00"),
    totalClicks: 23,
    isActive: false,
    clicks: [
      { timestamp: new Date("2024-01-08T09:20:00"), source: "Google", location: "Mumbai, IN" },
      { timestamp: new Date("2024-01-08T09:25:00"), source: "Direct", location: "Toronto, CA" },
      { timestamp: new Date("2024-01-08T09:30:00"), source: "Facebook", location: "São Paulo, BR" },
    ]
  },
  {
    id: "3",
    shortUrl: "http://localhost:3000/med456",
    longUrl: "https://docs.affordmed.com/api-documentation/v2/authentication",
    createdAt: new Date("2024-01-08T08:45:00"),
    expiresAt: new Date("2024-01-08T12:45:00"),
    totalClicks: 89,
    isActive: true,
    clicks: [
      { timestamp: new Date("2024-01-08T09:00:00"), source: "Documentation", location: "San Francisco, US" },
      { timestamp: new Date("2024-01-08T09:15:00"), source: "GitHub", location: "Amsterdam, NL" },
      { timestamp: new Date("2024-01-08T09:30:00"), source: "Slack", location: "Singapore, SG" },
      { timestamp: new Date("2024-01-08T09:45:00"), source: "Direct", location: "Paris, FR" },
      { timestamp: new Date("2024-01-08T10:00:00"), source: "Email", location: "Stockholm, SE" },
      { timestamp: new Date("2024-01-08T10:15:00"), source: "Teams", location: "Melbourne, AU" },
    ]
  }
];

const Statistics = () => {
  const totalUrls = mockStatistics.length;
  const activeUrls = mockStatistics.filter(url => url.isActive).length;
  const totalClicks = mockStatistics.reduce((sum, url) => sum + url.totalClicks, 0);
  const avgClicksPerUrl = totalUrls > 0 ? Math.round(totalClicks / totalUrls) : 0;

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center space-y-4">
        <div className="flex justify-center">
          <div className="w-16 h-16 bg-gradient-secondary rounded-2xl flex items-center justify-center shadow-glow">
            <BarChart3 className="w-8 h-8 text-secondary-foreground" />
          </div>
        </div>
        <div>
          <h1 className="text-3xl font-bold text-foreground">URL Statistics Dashboard</h1>
          <p className="text-lg text-muted-foreground">Comprehensive analytics for your shortened URLs</p>
        </div>
      </div>

      {/* Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="shadow-card">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Total URLs</p>
                <p className="text-3xl font-bold text-foreground">{totalUrls}</p>
              </div>
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                <BarChart3 className="w-6 h-6 text-primary" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-card">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Active URLs</p>
                <p className="text-3xl font-bold text-success">{activeUrls}</p>
              </div>
              <div className="w-12 h-12 bg-success/10 rounded-lg flex items-center justify-center">
                <TrendingUp className="w-6 h-6 text-success" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-card">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Total Clicks</p>
                <p className="text-3xl font-bold text-secondary">{totalClicks}</p>
              </div>
              <div className="w-12 h-12 bg-secondary/10 rounded-lg flex items-center justify-center">
                <Eye className="w-6 h-6 text-secondary" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-card">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Avg. Clicks/URL</p>
                <p className="text-3xl font-bold text-accent-foreground">{avgClicksPerUrl}</p>
              </div>
              <div className="w-12 h-12 bg-accent rounded-lg flex items-center justify-center">
                <BarChart3 className="w-6 h-6 text-accent-foreground" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Detailed Statistics */}
      <div className="space-y-6">
        {mockStatistics.map((urlStat) => (
          <Card key={urlStat.id} className="shadow-card">
            <CardHeader className="pb-4">
              <div className="flex items-start justify-between">
                <div className="flex-1 min-w-0">
                  <CardTitle className="text-lg font-mono text-primary truncate">
                    {urlStat.shortUrl}
                  </CardTitle>
                  <CardDescription className="mt-1 truncate">
                    {urlStat.longUrl}
                  </CardDescription>
                </div>
                <div className="flex items-center space-x-2 ml-4">
                  <Badge variant={urlStat.isActive ? "default" : "secondary"}>
                    {urlStat.isActive ? "Active" : "Expired"}
                  </Badge>
                  <Button variant="outline" size="sm">
                    <ExternalLink className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </CardHeader>

            <CardContent className="space-y-6">
              {/* URL Info */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4 bg-accent/30 rounded-lg">
                <div className="flex items-center space-x-2">
                  <Clock className="w-4 h-4 text-muted-foreground" />
                  <div>
                    <p className="text-sm font-medium">Created</p>
                    <p className="text-sm text-muted-foreground">
                      {urlStat.createdAt.toLocaleString()}
                    </p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <Clock className="w-4 h-4 text-muted-foreground" />
                  <div>
                    <p className="text-sm font-medium">Expires</p>
                    <p className="text-sm text-muted-foreground">
                      {urlStat.expiresAt.toLocaleString()}
                    </p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <Eye className="w-4 h-4 text-muted-foreground" />
                  <div>
                    <p className="text-sm font-medium">Total Clicks</p>
                    <p className="text-2xl font-bold text-primary">{urlStat.totalClicks}</p>
                  </div>
                </div>
              </div>

              {/* Click Details */}
              <div>
                <h4 className="text-sm font-medium mb-3 flex items-center space-x-2">
                  <MapPin className="w-4 h-4" />
                  <span>Recent Click Activity</span>
                </h4>
                <div className="space-y-2 max-h-48 overflow-y-auto">
                  {urlStat.clicks.map((click, index) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-card border rounded-lg">
                      <div className="flex items-center space-x-3">
                        <div className="w-2 h-2 bg-primary rounded-full"></div>
                        <div>
                          <p className="text-sm font-medium">{click.timestamp.toLocaleString()}</p>
                          <p className="text-xs text-muted-foreground">{click.location}</p>
                        </div>
                      </div>
                      <Badge variant="outline" className="text-xs">
                        {click.source}
                      </Badge>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Statistics;