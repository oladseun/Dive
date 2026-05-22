export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      users: {
        Row: {
          id: string
          email: string
          name: string | null
          country: string | null
          education_level: string | null
          interest_tags: string[] | null
          tier: string
          notification_pref: string | null
          whatsapp_number: string | null
          created_at: string
          last_active: string | null
        }
        Insert: {
          id: string
          email: string
          name?: string | null
          country?: string | null
          education_level?: string | null
          interest_tags?: string[] | null
          tier?: string
          notification_pref?: string | null
          whatsapp_number?: string | null
          created_at?: string
          last_active?: string | null
        }
        Update: {
          id?: string
          email?: string
          name?: string | null
          country?: string | null
          education_level?: string | null
          interest_tags?: string[] | null
          tier?: string
          notification_pref?: string | null
          whatsapp_number?: string | null
          created_at?: string
          last_active?: string | null
        }
      }
      opportunities: {
        Row: {
          id: string
          title: string
          type: string
          deadline: string | null
          fee: number | null
          fee_currency: string | null
          fee_naira: number | null
          source_url: string | null
          region: string | null
          tags: string[] | null
          is_featured: boolean
          is_active: boolean
          requirements: string[] | null
          description: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          title: string
          type: string
          deadline?: string | null
          fee?: number | null
          fee_currency?: string | null
          fee_naira?: number | null
          source_url?: string | null
          region?: string | null
          tags?: string[] | null
          is_featured?: boolean
          is_active?: boolean
          requirements?: string[] | null
          description?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          title?: string
          type?: string
          deadline?: string | null
          fee?: number | null
          fee_currency?: string | null
          fee_naira?: number | null
          source_url?: string | null
          region?: string | null
          tags?: string[] | null
          is_featured?: boolean
          is_active?: boolean
          requirements?: string[] | null
          description?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      saved_opportunities: {
        Row: {
          id: string
          user_id: string
          opportunity_id: string
          status: string
          created_at: string
        }
        Insert: {
          id?: string
          user_id: string
          opportunity_id: string
          status?: string
          created_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          opportunity_id?: string
          status?: string
          created_at?: string
        }
      }
      tasks: {
        Row: {
          id: string
          opportunity_id: string
          user_id: string
          title: string
          due_date: string | null
          is_complete: boolean
          status: string
          notes: string | null
          link_url: string | null
          day_number: number | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          opportunity_id: string
          user_id: string
          title: string
          due_date?: string | null
          is_complete?: boolean
          status?: string
          notes?: string | null
          link_url?: string | null
          day_number?: number | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          opportunity_id?: string
          user_id?: string
          title?: string
          due_date?: string | null
          is_complete?: boolean
          status?: string
          notes?: string | null
          link_url?: string | null
          day_number?: number | null
          created_at?: string
          updated_at?: string
        }
      }

      templates: {
        Row: {
          id: string
          title: string
          type: string
          category: string | null
          content_outline: Json | null
          credit_cost: number
          is_premium: boolean
          created_at: string
        }
        Insert: {
          id?: string
          title: string
          type: string
          category?: string | null
          content_outline?: Json | null
          credit_cost?: number
          is_premium?: boolean
          created_at?: string
        }
        Update: {
          id?: string
          title?: string
          type?: string
          category?: string | null
          content_outline?: Json | null
          credit_cost?: number
          is_premium?: boolean
          created_at?: string
        }
      }
      credits: {
        Row: {
          id: string
          user_id: string
          balance: number
          transaction_type: string
          amount: number
          created_at: string
        }
        Insert: {
          id?: string
          user_id: string
          balance: number
          transaction_type: string
          amount: number
          created_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          balance?: number
          transaction_type?: string
          amount?: number
          created_at?: string
        }
      }
      companion_messages: {
        Row: {
          id: string
          user_id: string
          opportunity_id: string | null
          role: string
          content: string
          tokens_used: number | null
          created_at: string
        }
        Insert: {
          id?: string
          user_id: string
          opportunity_id?: string | null
          role: string
          content: string
          tokens_used?: number | null
          created_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          opportunity_id?: string | null
          role?: string
          content?: string
          tokens_used?: number | null
          created_at?: string
        }
      }
      reminder_queue: {
        Row: {
          id: string
          user_id: string
          opportunity_id: string
          reminder_type: string
          scheduled_for: string
          sent_at: string | null
          channel: string
        }
        Insert: {
          id?: string
          user_id: string
          opportunity_id: string
          reminder_type: string
          scheduled_for: string
          sent_at?: string | null
          channel: string
        }
        Update: {
          id?: string
          user_id?: string
          opportunity_id?: string
          reminder_type?: string
          scheduled_for?: string
          sent_at?: string | null
          channel?: string
        }
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
