export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "13.0.5"
  }
  public: {
    Tables: {
      campaigns: {
        Row: {
          budget: number | null
          created_at: string
          default_utm_campaign: string | null
          default_utm_medium: string | null
          default_utm_source: string | null
          description: string | null
          id: string
          name: string
          optimization_suggestions: Json | null
          performance_prediction: Json | null
          status: string | null
          target_clicks: number | null
          target_conversions: number | null
          team_id: string | null
          updated_at: string
          user_id: string | null
        }
        Insert: {
          budget?: number | null
          created_at?: string
          default_utm_campaign?: string | null
          default_utm_medium?: string | null
          default_utm_source?: string | null
          description?: string | null
          id?: string
          name: string
          optimization_suggestions?: Json | null
          performance_prediction?: Json | null
          status?: string | null
          target_clicks?: number | null
          target_conversions?: number | null
          team_id?: string | null
          updated_at?: string
          user_id?: string | null
        }
        Update: {
          budget?: number | null
          created_at?: string
          default_utm_campaign?: string | null
          default_utm_medium?: string | null
          default_utm_source?: string | null
          description?: string | null
          id?: string
          name?: string
          optimization_suggestions?: Json | null
          performance_prediction?: Json | null
          status?: string | null
          target_clicks?: number | null
          target_conversions?: number | null
          team_id?: string | null
          updated_at?: string
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "campaigns_team_id_fkey"
            columns: ["team_id"]
            isOneToOne: false
            referencedRelation: "teams"
            referencedColumns: ["id"]
          },
        ]
      }
      clicks: {
        Row: {
          browser: string | null
          city: string | null
          clicked_at: string
          conversion_event: string | null
          conversion_value: number | null
          converted: boolean | null
          country: string | null
          device_type: string | null
          engagement_prediction: number | null
          fraud_score: number | null
          id: string
          ip_address: unknown | null
          os: string | null
          quality_score: number | null
          referer: string | null
          region: string | null
          url_id: string
          user_agent: string | null
          utm_campaign: string | null
          utm_content: string | null
          utm_medium: string | null
          utm_source: string | null
          utm_term: string | null
        }
        Insert: {
          browser?: string | null
          city?: string | null
          clicked_at?: string
          conversion_event?: string | null
          conversion_value?: number | null
          converted?: boolean | null
          country?: string | null
          device_type?: string | null
          engagement_prediction?: number | null
          fraud_score?: number | null
          id?: string
          ip_address?: unknown | null
          os?: string | null
          quality_score?: number | null
          referer?: string | null
          region?: string | null
          url_id: string
          user_agent?: string | null
          utm_campaign?: string | null
          utm_content?: string | null
          utm_medium?: string | null
          utm_source?: string | null
          utm_term?: string | null
        }
        Update: {
          browser?: string | null
          city?: string | null
          clicked_at?: string
          conversion_event?: string | null
          conversion_value?: number | null
          converted?: boolean | null
          country?: string | null
          device_type?: string | null
          engagement_prediction?: number | null
          fraud_score?: number | null
          id?: string
          ip_address?: unknown | null
          os?: string | null
          quality_score?: number | null
          referer?: string | null
          region?: string | null
          url_id?: string
          user_agent?: string | null
          utm_campaign?: string | null
          utm_content?: string | null
          utm_medium?: string | null
          utm_source?: string | null
          utm_term?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "clicks_url_id_fkey"
            columns: ["url_id"]
            isOneToOne: false
            referencedRelation: "urls"
            referencedColumns: ["id"]
          },
        ]
      }
      integrations: {
        Row: {
          config: Json
          created_at: string
          id: string
          integration_type: string
          is_active: boolean | null
          name: string
          team_id: string | null
          updated_at: string
          user_id: string | null
        }
        Insert: {
          config: Json
          created_at?: string
          id?: string
          integration_type: string
          is_active?: boolean | null
          name: string
          team_id?: string | null
          updated_at?: string
          user_id?: string | null
        }
        Update: {
          config?: Json
          created_at?: string
          id?: string
          integration_type?: string
          is_active?: boolean | null
          name?: string
          team_id?: string | null
          updated_at?: string
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "integrations_team_id_fkey"
            columns: ["team_id"]
            isOneToOne: false
            referencedRelation: "teams"
            referencedColumns: ["id"]
          },
        ]
      }
      landing_pages: {
        Row: {
          ai_optimized: boolean | null
          content: Json
          conversion_rate: number | null
          created_at: string
          css_styles: string | null
          cta_style: Json | null
          cta_text: string | null
          cta_url: string | null
          id: string
          is_primary: boolean | null
          template_name: string
          updated_at: string
          url_id: string
          user_id: string | null
          variant_name: string | null
        }
        Insert: {
          ai_optimized?: boolean | null
          content: Json
          conversion_rate?: number | null
          created_at?: string
          css_styles?: string | null
          cta_style?: Json | null
          cta_text?: string | null
          cta_url?: string | null
          id?: string
          is_primary?: boolean | null
          template_name: string
          updated_at?: string
          url_id: string
          user_id?: string | null
          variant_name?: string | null
        }
        Update: {
          ai_optimized?: boolean | null
          content?: Json
          conversion_rate?: number | null
          created_at?: string
          css_styles?: string | null
          cta_style?: Json | null
          cta_text?: string | null
          cta_url?: string | null
          id?: string
          is_primary?: boolean | null
          template_name?: string
          updated_at?: string
          url_id?: string
          user_id?: string | null
          variant_name?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "landing_pages_url_id_fkey"
            columns: ["url_id"]
            isOneToOne: false
            referencedRelation: "urls"
            referencedColumns: ["id"]
          },
        ]
      }
      profiles: {
        Row: {
          avatar_url: string | null
          company: string | null
          created_at: string
          dashboard_preferences: Json | null
          full_name: string | null
          id: string
          monthly_clicks_used: number | null
          monthly_limit_reset: string | null
          monthly_links_used: number | null
          notification_settings: Json | null
          plan_type: string | null
          role: string | null
          subscription_end: string | null
          subscription_status: string | null
          timezone: string | null
          updated_at: string
          user_id: string
        }
        Insert: {
          avatar_url?: string | null
          company?: string | null
          created_at?: string
          dashboard_preferences?: Json | null
          full_name?: string | null
          id?: string
          monthly_clicks_used?: number | null
          monthly_limit_reset?: string | null
          monthly_links_used?: number | null
          notification_settings?: Json | null
          plan_type?: string | null
          role?: string | null
          subscription_end?: string | null
          subscription_status?: string | null
          timezone?: string | null
          updated_at?: string
          user_id: string
        }
        Update: {
          avatar_url?: string | null
          company?: string | null
          created_at?: string
          dashboard_preferences?: Json | null
          full_name?: string | null
          id?: string
          monthly_clicks_used?: number | null
          monthly_limit_reset?: string | null
          monthly_links_used?: number | null
          notification_settings?: Json | null
          plan_type?: string | null
          role?: string | null
          subscription_end?: string | null
          subscription_status?: string | null
          timezone?: string | null
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      qr_codes: {
        Row: {
          created_at: string
          id: string
          logo_url: string | null
          qr_code_data: string
          style_settings: Json | null
          updated_at: string
          url_id: string
          user_id: string | null
        }
        Insert: {
          created_at?: string
          id?: string
          logo_url?: string | null
          qr_code_data: string
          style_settings?: Json | null
          updated_at?: string
          url_id: string
          user_id?: string | null
        }
        Update: {
          created_at?: string
          id?: string
          logo_url?: string | null
          qr_code_data?: string
          style_settings?: Json | null
          updated_at?: string
          url_id?: string
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "qr_codes_url_id_fkey"
            columns: ["url_id"]
            isOneToOne: false
            referencedRelation: "urls"
            referencedColumns: ["id"]
          },
        ]
      }
      team_members: {
        Row: {
          id: string
          joined_at: string
          permissions: Json | null
          role: string
          team_id: string
          user_id: string
        }
        Insert: {
          id?: string
          joined_at?: string
          permissions?: Json | null
          role?: string
          team_id: string
          user_id: string
        }
        Update: {
          id?: string
          joined_at?: string
          permissions?: Json | null
          role?: string
          team_id?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "team_members_team_id_fkey"
            columns: ["team_id"]
            isOneToOne: false
            referencedRelation: "teams"
            referencedColumns: ["id"]
          },
        ]
      }
      teams: {
        Row: {
          billing_email: string | null
          branding_settings: Json | null
          created_at: string
          custom_domains: string[] | null
          id: string
          name: string
          owner_id: string
          plan_type: string | null
          updated_at: string
        }
        Insert: {
          billing_email?: string | null
          branding_settings?: Json | null
          created_at?: string
          custom_domains?: string[] | null
          id?: string
          name: string
          owner_id: string
          plan_type?: string | null
          updated_at?: string
        }
        Update: {
          billing_email?: string | null
          branding_settings?: Json | null
          created_at?: string
          custom_domains?: string[] | null
          id?: string
          name?: string
          owner_id?: string
          plan_type?: string | null
          updated_at?: string
        }
        Relationships: []
      }
      url_campaigns: {
        Row: {
          campaign_id: string
          url_id: string
        }
        Insert: {
          campaign_id: string
          url_id: string
        }
        Update: {
          campaign_id?: string
          url_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "url_campaigns_campaign_id_fkey"
            columns: ["campaign_id"]
            isOneToOne: false
            referencedRelation: "campaigns"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "url_campaigns_url_id_fkey"
            columns: ["url_id"]
            isOneToOne: false
            referencedRelation: "urls"
            referencedColumns: ["id"]
          },
        ]
      }
      urls: {
        Row: {
          ab_test_id: string | null
          ai_optimized: boolean | null
          ai_suggestions: Json | null
          created_at: string
          custom_domain: string | null
          custom_pixels: Json | null
          description: string | null
          device_targeting: Json | null
          expires_at: string | null
          facebook_pixel_id: string | null
          favicon_url: string | null
          geo_targeting: Json | null
          google_pixel_id: string | null
          id: string
          is_active: boolean | null
          landing_page_variants: Json | null
          last_clicked_at: string | null
          max_clicks: number | null
          original_url: string
          password_hash: string | null
          performance_score: number | null
          predicted_ctr: number | null
          short_code: string
          title: string | null
          twitter_pixel_id: string | null
          updated_at: string
          user_id: string | null
          utm_campaign: string | null
          utm_content: string | null
          utm_medium: string | null
          utm_source: string | null
          utm_term: string | null
        }
        Insert: {
          ab_test_id?: string | null
          ai_optimized?: boolean | null
          ai_suggestions?: Json | null
          created_at?: string
          custom_domain?: string | null
          custom_pixels?: Json | null
          description?: string | null
          device_targeting?: Json | null
          expires_at?: string | null
          facebook_pixel_id?: string | null
          favicon_url?: string | null
          geo_targeting?: Json | null
          google_pixel_id?: string | null
          id?: string
          is_active?: boolean | null
          landing_page_variants?: Json | null
          last_clicked_at?: string | null
          max_clicks?: number | null
          original_url: string
          password_hash?: string | null
          performance_score?: number | null
          predicted_ctr?: number | null
          short_code: string
          title?: string | null
          twitter_pixel_id?: string | null
          updated_at?: string
          user_id?: string | null
          utm_campaign?: string | null
          utm_content?: string | null
          utm_medium?: string | null
          utm_source?: string | null
          utm_term?: string | null
        }
        Update: {
          ab_test_id?: string | null
          ai_optimized?: boolean | null
          ai_suggestions?: Json | null
          created_at?: string
          custom_domain?: string | null
          custom_pixels?: Json | null
          description?: string | null
          device_targeting?: Json | null
          expires_at?: string | null
          facebook_pixel_id?: string | null
          favicon_url?: string | null
          geo_targeting?: Json | null
          google_pixel_id?: string | null
          id?: string
          is_active?: boolean | null
          landing_page_variants?: Json | null
          last_clicked_at?: string | null
          max_clicks?: number | null
          original_url?: string
          password_hash?: string | null
          performance_score?: number | null
          predicted_ctr?: number | null
          short_code?: string
          title?: string | null
          twitter_pixel_id?: string | null
          updated_at?: string
          user_id?: string | null
          utm_campaign?: string | null
          utm_content?: string | null
          utm_medium?: string | null
          utm_source?: string | null
          utm_term?: string | null
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const
