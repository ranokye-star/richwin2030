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
    PostgrestVersion: "13.0.4"
  }
  public: {
    Tables: {
      achievements: {
        Row: {
          category: string
          created_at: string | null
          date_achieved: string
          description: string | null
          id: string
          impact_level: string | null
          title: string
        }
        Insert: {
          category: string
          created_at?: string | null
          date_achieved: string
          description?: string | null
          id?: string
          impact_level?: string | null
          title: string
        }
        Update: {
          category?: string
          created_at?: string | null
          date_achieved?: string
          description?: string | null
          id?: string
          impact_level?: string | null
          title?: string
        }
        Relationships: []
      }
      books: {
        Row: {
          author: string
          category: string
          created_at: string | null
          date_completed: string | null
          date_started: string | null
          id: string
          notes: string | null
          progress: number | null
          rating: number | null
          status: string | null
          title: string
        }
        Insert: {
          author: string
          category: string
          created_at?: string | null
          date_completed?: string | null
          date_started?: string | null
          id?: string
          notes?: string | null
          progress?: number | null
          rating?: number | null
          status?: string | null
          title: string
        }
        Update: {
          author?: string
          category?: string
          created_at?: string | null
          date_completed?: string | null
          date_started?: string | null
          id?: string
          notes?: string | null
          progress?: number | null
          rating?: number | null
          status?: string | null
          title?: string
        }
        Relationships: []
      }
      budget_items: {
        Row: {
          amount: number
          category: string
          created_at: string | null
          id: string
          item_name: string
          item_type: string
        }
        Insert: {
          amount: number
          category: string
          created_at?: string | null
          id?: string
          item_name: string
          item_type: string
        }
        Update: {
          amount?: number
          category?: string
          created_at?: string | null
          id?: string
          item_name?: string
          item_type?: string
        }
        Relationships: []
      }
      business_ventures: {
        Row: {
          created_at: string | null
          current_value: number | null
          id: string
          investment: number
          name: string
          status: string | null
        }
        Insert: {
          created_at?: string | null
          current_value?: number | null
          id?: string
          investment: number
          name: string
          status?: string | null
        }
        Update: {
          created_at?: string | null
          current_value?: number | null
          id?: string
          investment?: number
          name?: string
          status?: string | null
        }
        Relationships: []
      }
      checkins: {
        Row: {
          challenges: string | null
          checkin_type: string
          created_at: string | null
          date: string
          goals_progress: string | null
          id: string
          next_steps: string | null
          relationship_score: number | null
          wins: string | null
        }
        Insert: {
          challenges?: string | null
          checkin_type: string
          created_at?: string | null
          date: string
          goals_progress?: string | null
          id?: string
          next_steps?: string | null
          relationship_score?: number | null
          wins?: string | null
        }
        Update: {
          challenges?: string | null
          checkin_type?: string
          created_at?: string | null
          date?: string
          goals_progress?: string | null
          id?: string
          next_steps?: string | null
          relationship_score?: number | null
          wins?: string | null
        }
        Relationships: []
      }
      church_activities: {
        Row: {
          activity_name: string
          created_at: string | null
          date: string
          id: string
          reflection: string | null
        }
        Insert: {
          activity_name: string
          created_at?: string | null
          date: string
          id?: string
          reflection?: string | null
        }
        Update: {
          activity_name?: string
          created_at?: string | null
          date?: string
          id?: string
          reflection?: string | null
        }
        Relationships: []
      }
      goals: {
        Row: {
          category: string
          created_at: string | null
          deadline: string | null
          description: string | null
          id: string
          milestones: Json | null
          progress: number | null
          timeframe: string
          title: string
          updated_at: string | null
          user_id: string | null
        }
        Insert: {
          category: string
          created_at?: string | null
          deadline?: string | null
          description?: string | null
          id?: string
          milestones?: Json | null
          progress?: number | null
          timeframe: string
          title: string
          updated_at?: string | null
          user_id?: string | null
        }
        Update: {
          category?: string
          created_at?: string | null
          deadline?: string | null
          description?: string | null
          id?: string
          milestones?: Json | null
          progress?: number | null
          timeframe?: string
          title?: string
          updated_at?: string | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "goals_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      growth_entries: {
        Row: {
          category: string
          created_at: string | null
          entry_date: string
          id: string
          notes: string | null
          score: number
          user_id: string | null
        }
        Insert: {
          category: string
          created_at?: string | null
          entry_date: string
          id?: string
          notes?: string | null
          score: number
          user_id?: string | null
        }
        Update: {
          category?: string
          created_at?: string | null
          entry_date?: string
          id?: string
          notes?: string | null
          score?: number
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "growth_entries_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      growth_goals: {
        Row: {
          category: string
          created_at: string | null
          deadline: string | null
          goal_text: string
          id: string
          milestones: string[] | null
          target_score: number | null
          user_id: string | null
        }
        Insert: {
          category: string
          created_at?: string | null
          deadline?: string | null
          goal_text: string
          id?: string
          milestones?: string[] | null
          target_score?: number | null
          user_id?: string | null
        }
        Update: {
          category?: string
          created_at?: string | null
          deadline?: string | null
          goal_text?: string
          id?: string
          milestones?: string[] | null
          target_score?: number | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "growth_goals_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      income_sources: {
        Row: {
          created_at: string | null
          id: string
          monthly_amount: number
          source_name: string
          user_id: string | null
        }
        Insert: {
          created_at?: string | null
          id?: string
          monthly_amount: number
          source_name: string
          user_id?: string | null
        }
        Update: {
          created_at?: string | null
          id?: string
          monthly_amount?: number
          source_name?: string
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "income_sources_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      journal_entries: {
        Row: {
          created_at: string | null
          gratitude: string[] | null
          id: string
          lessons_learned: string[] | null
          reflections: string | null
          updated_at: string | null
          week_of: string
        }
        Insert: {
          created_at?: string | null
          gratitude?: string[] | null
          id?: string
          lessons_learned?: string[] | null
          reflections?: string | null
          updated_at?: string | null
          week_of: string
        }
        Update: {
          created_at?: string | null
          gratitude?: string[] | null
          id?: string
          lessons_learned?: string[] | null
          reflections?: string | null
          updated_at?: string | null
          week_of?: string
        }
        Relationships: []
      }
      legacy_plans: {
        Row: {
          created_at: string | null
          description: string
          id: string
          plan_type: string
          priority: string | null
          timeline: string | null
          title: string
        }
        Insert: {
          created_at?: string | null
          description: string
          id?: string
          plan_type: string
          priority?: string | null
          timeline?: string | null
          title: string
        }
        Update: {
          created_at?: string | null
          description?: string
          id?: string
          plan_type?: string
          priority?: string | null
          timeline?: string | null
          title?: string
        }
        Relationships: []
      }
      love_letters: {
        Row: {
          content: string
          created_at: string | null
          from_user_id: string | null
          id: string
          title: string
          to_user_id: string | null
        }
        Insert: {
          content: string
          created_at?: string | null
          from_user_id?: string | null
          id?: string
          title: string
          to_user_id?: string | null
        }
        Update: {
          content?: string
          created_at?: string | null
          from_user_id?: string | null
          id?: string
          title?: string
          to_user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "love_letters_from_user_id_fkey"
            columns: ["from_user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "love_letters_to_user_id_fkey"
            columns: ["to_user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      memories: {
        Row: {
          created_at: string | null
          date: string
          description: string | null
          id: string
          location: string | null
          memory_type: string | null
          photo_url: string | null
          title: string
        }
        Insert: {
          created_at?: string | null
          date: string
          description?: string | null
          id?: string
          location?: string | null
          memory_type?: string | null
          photo_url?: string | null
          title: string
        }
        Update: {
          created_at?: string | null
          date?: string
          description?: string | null
          id?: string
          location?: string | null
          memory_type?: string | null
          photo_url?: string | null
          title?: string
        }
        Relationships: []
      }
      prayer_requests: {
        Row: {
          created_at: string | null
          date_answered: string | null
          date_requested: string
          id: string
          request: string
          status: string | null
          testimony: string | null
        }
        Insert: {
          created_at?: string | null
          date_answered?: string | null
          date_requested: string
          id?: string
          request: string
          status?: string | null
          testimony?: string | null
        }
        Update: {
          created_at?: string | null
          date_answered?: string | null
          date_requested?: string
          id?: string
          request?: string
          status?: string | null
          testimony?: string | null
        }
        Relationships: []
      }
      reading_goals: {
        Row: {
          books_completed: number | null
          created_at: string | null
          id: string
          target_books: number
          year: number
        }
        Insert: {
          books_completed?: number | null
          created_at?: string | null
          id?: string
          target_books: number
          year: number
        }
        Update: {
          books_completed?: number | null
          created_at?: string | null
          id?: string
          target_books?: number
          year?: number
        }
        Relationships: []
      }
      savings_goals: {
        Row: {
          created_at: string | null
          current_amount: number | null
          deadline: string | null
          goal_name: string
          id: string
          target_amount: number
        }
        Insert: {
          created_at?: string | null
          current_amount?: number | null
          deadline?: string | null
          goal_name: string
          id?: string
          target_amount: number
        }
        Update: {
          created_at?: string | null
          current_amount?: number | null
          deadline?: string | null
          goal_name?: string
          id?: string
          target_amount?: number
        }
        Relationships: []
      }
      scripture_reflections: {
        Row: {
          created_at: string | null
          date_studied: string
          id: string
          reference: string
          reflection: string
          verse: string
        }
        Insert: {
          created_at?: string | null
          date_studied: string
          id?: string
          reference: string
          reflection: string
          verse: string
        }
        Update: {
          created_at?: string | null
          date_studied?: string
          id?: string
          reference?: string
          reflection?: string
          verse?: string
        }
        Relationships: []
      }
      spiritual_goals: {
        Row: {
          created_at: string | null
          deadline: string | null
          goal: string
          id: string
          milestones: string[] | null
          progress: number | null
        }
        Insert: {
          created_at?: string | null
          deadline?: string | null
          goal: string
          id?: string
          milestones?: string[] | null
          progress?: number | null
        }
        Update: {
          created_at?: string | null
          deadline?: string | null
          goal?: string
          id?: string
          milestones?: string[] | null
          progress?: number | null
        }
        Relationships: []
      }
      timeline_events: {
        Row: {
          category: string | null
          created_at: string | null
          date: string
          description: string | null
          id: string
          title: string
        }
        Insert: {
          category?: string | null
          created_at?: string | null
          date: string
          description?: string | null
          id?: string
          title: string
        }
        Update: {
          category?: string | null
          created_at?: string | null
          date?: string
          description?: string | null
          id?: string
          title?: string
        }
        Relationships: []
      }
      users: {
        Row: {
          created_at: string | null
          email: string | null
          id: string
          name: string
        }
        Insert: {
          created_at?: string | null
          email?: string | null
          id?: string
          name: string
        }
        Update: {
          created_at?: string | null
          email?: string | null
          id?: string
          name?: string
        }
        Relationships: []
      }
      weekly_tasks: {
        Row: {
          created_at: string
          due_date: string | null
          id: string
          priority: string | null
          status: string
          task_description: string | null
          task_title: string
          updated_at: string
          user_name: string
          week_of: string
        }
        Insert: {
          created_at?: string
          due_date?: string | null
          id?: string
          priority?: string | null
          status?: string
          task_description?: string | null
          task_title: string
          updated_at?: string
          user_name: string
          week_of: string
        }
        Update: {
          created_at?: string
          due_date?: string | null
          id?: string
          priority?: string | null
          status?: string
          task_description?: string | null
          task_title?: string
          updated_at?: string
          user_name?: string
          week_of?: string
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
