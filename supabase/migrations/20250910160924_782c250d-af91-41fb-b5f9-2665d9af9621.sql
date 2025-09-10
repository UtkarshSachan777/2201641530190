-- Create comprehensive URL shortener database with all advanced features

-- URLs table with advanced features
CREATE TABLE public.urls (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  original_url TEXT NOT NULL,
  short_code TEXT UNIQUE NOT NULL,
  custom_domain TEXT,
  title TEXT,
  description TEXT,
  favicon_url TEXT,
  
  -- Advanced features
  password_hash TEXT,
  expires_at TIMESTAMPTZ,
  is_active BOOLEAN DEFAULT true,
  max_clicks INTEGER,
  geo_targeting JSONB DEFAULT '{}',
  device_targeting JSONB DEFAULT '{}',
  
  -- UTM and tracking
  utm_source TEXT,
  utm_medium TEXT,
  utm_campaign TEXT,
  utm_term TEXT,
  utm_content TEXT,
  
  -- Retargeting pixels
  facebook_pixel_id TEXT,
  google_pixel_id TEXT,
  twitter_pixel_id TEXT,
  custom_pixels JSONB DEFAULT '[]',
  
  -- A/B testing
  ab_test_id TEXT,
  landing_page_variants JSONB DEFAULT '[]',
  
  -- AI features
  ai_optimized BOOLEAN DEFAULT false,
  ai_suggestions JSONB DEFAULT '{}',
  performance_score DECIMAL(3,2) DEFAULT 0,
  predicted_ctr DECIMAL(5,4) DEFAULT 0,
  
  -- Metadata
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  last_clicked_at TIMESTAMPTZ
);

-- Click analytics table
CREATE TABLE public.clicks (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  url_id UUID REFERENCES public.urls(id) ON DELETE CASCADE NOT NULL,
  
  -- Basic tracking
  ip_address INET,
  user_agent TEXT,
  referer TEXT,
  country TEXT,
  city TEXT,
  region TEXT,
  device_type TEXT,
  browser TEXT,
  os TEXT,
  
  -- Advanced tracking
  utm_source TEXT,
  utm_medium TEXT,
  utm_campaign TEXT,
  utm_term TEXT,
  utm_content TEXT,
  
  -- Conversion tracking
  converted BOOLEAN DEFAULT false,
  conversion_value DECIMAL(10,2),
  conversion_event TEXT,
  
  -- AI insights
  fraud_score DECIMAL(3,2) DEFAULT 0,
  quality_score DECIMAL(3,2) DEFAULT 0,
  engagement_prediction DECIMAL(3,2) DEFAULT 0,
  
  clicked_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- QR Codes table
CREATE TABLE public.qr_codes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  url_id UUID REFERENCES public.urls(id) ON DELETE CASCADE NOT NULL,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  
  qr_code_data TEXT NOT NULL,
  style_settings JSONB DEFAULT '{}',
  logo_url TEXT,
  
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Landing pages table
CREATE TABLE public.landing_pages (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  url_id UUID REFERENCES public.urls(id) ON DELETE CASCADE NOT NULL,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  
  template_name TEXT NOT NULL,
  content JSONB NOT NULL,
  css_styles TEXT,
  
  -- CTA features
  cta_text TEXT,
  cta_url TEXT,
  cta_style JSONB DEFAULT '{}',
  
  -- A/B testing
  variant_name TEXT DEFAULT 'A',
  is_primary BOOLEAN DEFAULT true,
  
  -- AI optimization
  ai_optimized BOOLEAN DEFAULT false,
  conversion_rate DECIMAL(5,4) DEFAULT 0,
  
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Teams and collaboration
CREATE TABLE public.teams (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  owner_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  plan_type TEXT DEFAULT 'free',
  billing_email TEXT,
  
  -- Team settings
  custom_domains TEXT[] DEFAULT '{}',
  branding_settings JSONB DEFAULT '{}',
  
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Team members
CREATE TABLE public.team_members (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  team_id UUID REFERENCES public.teams(id) ON DELETE CASCADE NOT NULL,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  role TEXT NOT NULL DEFAULT 'member',
  permissions JSONB DEFAULT '{}',
  
  joined_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  
  UNIQUE(team_id, user_id)
);

-- Campaigns for organizing links
CREATE TABLE public.campaigns (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  team_id UUID REFERENCES public.teams(id) ON DELETE CASCADE,
  
  name TEXT NOT NULL,
  description TEXT,
  status TEXT DEFAULT 'active',
  
  -- Campaign settings
  default_utm_source TEXT,
  default_utm_medium TEXT,
  default_utm_campaign TEXT,
  
  -- Budget and goals
  budget DECIMAL(10,2),
  target_clicks INTEGER,
  target_conversions INTEGER,
  
  -- AI insights
  performance_prediction JSONB DEFAULT '{}',
  optimization_suggestions JSONB DEFAULT '[]',
  
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Link campaigns association
CREATE TABLE public.url_campaigns (
  url_id UUID REFERENCES public.urls(id) ON DELETE CASCADE,
  campaign_id UUID REFERENCES public.campaigns(id) ON DELETE CASCADE,
  PRIMARY KEY (url_id, campaign_id)
);

-- User profiles for additional data
CREATE TABLE public.profiles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE UNIQUE NOT NULL,
  
  full_name TEXT,
  avatar_url TEXT,
  company TEXT,
  role TEXT,
  
  -- Plan and billing
  plan_type TEXT DEFAULT 'free',
  subscription_status TEXT DEFAULT 'inactive',
  subscription_end TIMESTAMPTZ,
  
  -- Usage limits
  monthly_links_used INTEGER DEFAULT 0,
  monthly_clicks_used INTEGER DEFAULT 0,
  monthly_limit_reset TIMESTAMPTZ DEFAULT date_trunc('month', now()) + interval '1 month',
  
  -- Preferences
  timezone TEXT DEFAULT 'UTC',
  notification_settings JSONB DEFAULT '{}',
  dashboard_preferences JSONB DEFAULT '{}',
  
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Integrations table
CREATE TABLE public.integrations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  team_id UUID REFERENCES public.teams(id) ON DELETE CASCADE,
  
  integration_type TEXT NOT NULL, -- 'zapier', 'slack', 'webhook', 'api'
  name TEXT NOT NULL,
  config JSONB NOT NULL,
  is_active BOOLEAN DEFAULT true,
  
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Enable RLS on all tables
ALTER TABLE public.urls ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.clicks ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.qr_codes ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.landing_pages ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.teams ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.team_members ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.campaigns ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.url_campaigns ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.integrations ENABLE ROW LEVEL SECURITY;

-- RLS Policies for URLs
CREATE POLICY "Users can manage their own URLs" ON public.urls
FOR ALL USING (user_id = auth.uid());

CREATE POLICY "Team members can view team URLs" ON public.urls
FOR SELECT USING (
  user_id = auth.uid() OR 
  EXISTS (
    SELECT 1 FROM public.team_members tm 
    JOIN public.urls u ON u.user_id = tm.user_id 
    WHERE tm.user_id = auth.uid() AND u.id = urls.id
  )
);

-- RLS Policies for Clicks (read-only for url owners)
CREATE POLICY "Users can view clicks for their URLs" ON public.clicks
FOR SELECT USING (
  EXISTS (
    SELECT 1 FROM public.urls 
    WHERE urls.id = clicks.url_id AND urls.user_id = auth.uid()
  )
);

-- RLS Policies for other tables
CREATE POLICY "Users can manage their profiles" ON public.profiles
FOR ALL USING (user_id = auth.uid());

CREATE POLICY "Users can manage their QR codes" ON public.qr_codes
FOR ALL USING (user_id = auth.uid());

CREATE POLICY "Users can manage their landing pages" ON public.landing_pages
FOR ALL USING (user_id = auth.uid());

CREATE POLICY "Team owners can manage teams" ON public.teams
FOR ALL USING (owner_id = auth.uid());

CREATE POLICY "Team members can view their teams" ON public.teams
FOR SELECT USING (
  owner_id = auth.uid() OR 
  EXISTS (SELECT 1 FROM public.team_members WHERE team_id = teams.id AND user_id = auth.uid())
);

CREATE POLICY "Team members can manage memberships" ON public.team_members
FOR ALL USING (
  user_id = auth.uid() OR 
  EXISTS (SELECT 1 FROM public.teams WHERE teams.id = team_members.team_id AND teams.owner_id = auth.uid())
);

CREATE POLICY "Users can manage their campaigns" ON public.campaigns
FOR ALL USING (
  user_id = auth.uid() OR 
  (team_id IS NOT NULL AND EXISTS (
    SELECT 1 FROM public.team_members 
    WHERE team_id = campaigns.team_id AND user_id = auth.uid()
  ))
);

CREATE POLICY "Users can manage campaign associations" ON public.url_campaigns
FOR ALL USING (
  EXISTS (
    SELECT 1 FROM public.urls 
    WHERE urls.id = url_campaigns.url_id AND urls.user_id = auth.uid()
  )
);

CREATE POLICY "Users can manage their integrations" ON public.integrations
FOR ALL USING (
  user_id = auth.uid() OR 
  (team_id IS NOT NULL AND EXISTS (
    SELECT 1 FROM public.team_members 
    WHERE team_id = integrations.team_id AND user_id = auth.uid()
  ))
);

-- Indexes for performance
CREATE INDEX idx_urls_user_id ON public.urls(user_id);
CREATE INDEX idx_urls_short_code ON public.urls(short_code);
CREATE INDEX idx_urls_created_at ON public.urls(created_at DESC);
CREATE INDEX idx_clicks_url_id ON public.clicks(url_id);
CREATE INDEX idx_clicks_clicked_at ON public.clicks(clicked_at DESC);
CREATE INDEX idx_qr_codes_url_id ON public.qr_codes(url_id);
CREATE INDEX idx_landing_pages_url_id ON public.landing_pages(url_id);
CREATE INDEX idx_team_members_user_id ON public.team_members(user_id);
CREATE INDEX idx_team_members_team_id ON public.team_members(team_id);

-- Triggers for updated_at
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = now();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_urls_updated_at BEFORE UPDATE ON public.urls
FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_qr_codes_updated_at BEFORE UPDATE ON public.qr_codes
FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_landing_pages_updated_at BEFORE UPDATE ON public.landing_pages
FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_teams_updated_at BEFORE UPDATE ON public.teams
FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_campaigns_updated_at BEFORE UPDATE ON public.campaigns
FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_profiles_updated_at BEFORE UPDATE ON public.profiles
FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_integrations_updated_at BEFORE UPDATE ON public.integrations
FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();