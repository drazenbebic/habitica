export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export type Database = {
  public: {
    Tables: {
      _prisma_migrations: {
        Row: {
          applied_steps_count: number;
          checksum: string;
          finished_at: string | null;
          id: string;
          logs: string | null;
          migration_name: string;
          rolled_back_at: string | null;
          started_at: string;
        };
        Insert: {
          applied_steps_count?: number;
          checksum: string;
          finished_at?: string | null;
          id: string;
          logs?: string | null;
          migration_name: string;
          rolled_back_at?: string | null;
          started_at?: string;
        };
        Update: {
          applied_steps_count?: number;
          checksum?: string;
          finished_at?: string | null;
          id?: string;
          logs?: string | null;
          migration_name?: string;
          rolled_back_at?: string | null;
          started_at?: string;
        };
        Relationships: [];
      };
      hbtc_github_installations: {
        Row: {
          code: string | null;
          installation_id: number;
          suspended: boolean | null;
          uuid: string;
        };
        Insert: {
          code?: string | null;
          installation_id: number;
          suspended?: boolean | null;
          uuid: string;
        };
        Update: {
          code?: string | null;
          installation_id?: number;
          suspended?: boolean | null;
          uuid?: string;
        };
        Relationships: [];
      };
      hbtc_github_users: {
        Row: {
          access_token: string | null;
          avatar_url: string | null;
          blog: string | null;
          company: string | null;
          email: string | null;
          expires_in: number | null;
          gravatar_id: string | null;
          html_url: string | null;
          id: number;
          installation_uuid: string;
          location: string | null;
          login: string;
          name: string | null;
          node_id: string;
          refresh_token: string | null;
          refresh_token_expires_in: number | null;
          scope: string | null;
          token_type: string | null;
          type: string;
          uuid: string;
        };
        Insert: {
          access_token?: string | null;
          avatar_url?: string | null;
          blog?: string | null;
          company?: string | null;
          email?: string | null;
          expires_in?: number | null;
          gravatar_id?: string | null;
          html_url?: string | null;
          id: number;
          installation_uuid: string;
          location?: string | null;
          login: string;
          name?: string | null;
          node_id: string;
          refresh_token?: string | null;
          refresh_token_expires_in?: number | null;
          scope?: string | null;
          token_type?: string | null;
          type: string;
          uuid: string;
        };
        Update: {
          access_token?: string | null;
          avatar_url?: string | null;
          blog?: string | null;
          company?: string | null;
          email?: string | null;
          expires_in?: number | null;
          gravatar_id?: string | null;
          html_url?: string | null;
          id?: number;
          installation_uuid?: string;
          location?: string | null;
          login?: string;
          name?: string | null;
          node_id?: string;
          refresh_token?: string | null;
          refresh_token_expires_in?: number | null;
          scope?: string | null;
          token_type?: string | null;
          type?: string;
          uuid?: string;
        };
        Relationships: [
          {
            foreignKeyName: 'hbtc_github_users_installation_uuid_fkey';
            columns: ['installation_uuid'];
            isOneToOne: false;
            referencedRelation: 'hbtc_github_installations';
            referencedColumns: ['uuid'];
          },
        ];
      };
      hbtc_habitica_users: {
        Row: {
          api_token: string;
          github_user_uuid: string;
          user_id: string;
          uuid: string;
        };
        Insert: {
          api_token: string;
          github_user_uuid: string;
          user_id: string;
          uuid: string;
        };
        Update: {
          api_token?: string;
          github_user_uuid?: string;
          user_id?: string;
          uuid?: string;
        };
        Relationships: [
          {
            foreignKeyName: 'hbtc_habitica_users_github_user_uuid_fkey';
            columns: ['github_user_uuid'];
            isOneToOne: false;
            referencedRelation: 'hbtc_github_users';
            referencedColumns: ['uuid'];
          },
        ];
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      [_ in never]: never;
    };
    Enums: {
      [_ in never]: never;
    };
    CompositeTypes: {
      [_ in never]: never;
    };
  };
};

type PublicSchema = Database[Extract<keyof Database, 'public'>];

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (PublicSchema['Tables'] & PublicSchema['Views'])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions['schema']]['Tables'] &
        Database[PublicTableNameOrOptions['schema']]['Views'])
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions['schema']]['Tables'] &
      Database[PublicTableNameOrOptions['schema']]['Views'])[TableName] extends {
      Row: infer R;
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (PublicSchema['Tables'] &
        PublicSchema['Views'])
    ? (PublicSchema['Tables'] &
        PublicSchema['Views'])[PublicTableNameOrOptions] extends {
        Row: infer R;
      }
      ? R
      : never
    : never;

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof PublicSchema['Tables']
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions['schema']]['Tables']
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions['schema']]['Tables'][TableName] extends {
      Insert: infer I;
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema['Tables']
    ? PublicSchema['Tables'][PublicTableNameOrOptions] extends {
        Insert: infer I;
      }
      ? I
      : never
    : never;

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof PublicSchema['Tables']
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions['schema']]['Tables']
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions['schema']]['Tables'][TableName] extends {
      Update: infer U;
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema['Tables']
    ? PublicSchema['Tables'][PublicTableNameOrOptions] extends {
        Update: infer U;
      }
      ? U
      : never
    : never;

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof PublicSchema['Enums']
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions['schema']]['Enums']
    : never = never,
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions['schema']]['Enums'][EnumName]
  : PublicEnumNameOrOptions extends keyof PublicSchema['Enums']
    ? PublicSchema['Enums'][PublicEnumNameOrOptions]
    : never;
