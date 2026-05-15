-- Create Users Table
CREATE TABLE public.users (
  id uuid REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
  email text UNIQUE NOT NULL,
  name text,
  country text,
  education_level text,
  interest_tags text[],
  tier text DEFAULT 'free',
  notification_pref text,
  whatsapp_number text,
  created_at timestamp with time zone DEFAULT now() NOT NULL,
  last_active timestamp with time zone
);
ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can read own data." ON public.users FOR SELECT USING (auth.uid() = id);
CREATE POLICY "Users can update own data." ON public.users FOR UPDATE USING (auth.uid() = id);

-- Create Opportunities Table
CREATE TABLE public.opportunities (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  type text NOT NULL,
  deadline timestamp with time zone,
  fee numeric,
  fee_currency text,
  fee_naira numeric,
  source_url text,
  region text,
  tags text[],
  is_featured boolean DEFAULT false NOT NULL,
  is_active boolean DEFAULT true NOT NULL,
  requirements text[],
  created_at timestamp with time zone DEFAULT now() NOT NULL,
  updated_at timestamp with time zone DEFAULT now() NOT NULL
);
ALTER TABLE public.opportunities ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Opportunities are viewable by everyone." ON public.opportunities FOR SELECT USING (true);

-- Create Saved Opportunities Table
CREATE TABLE public.saved_opportunities (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES public.users(id) ON DELETE CASCADE NOT NULL,
  opportunity_id uuid REFERENCES public.opportunities(id) ON DELETE CASCADE NOT NULL,
  status text DEFAULT 'saved' NOT NULL,
  created_at timestamp with time zone DEFAULT now() NOT NULL
);
ALTER TABLE public.saved_opportunities ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can read own saved opportunities." ON public.saved_opportunities FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert own saved opportunities." ON public.saved_opportunities FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update own saved opportunities." ON public.saved_opportunities FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Users can delete own saved opportunities." ON public.saved_opportunities FOR DELETE USING (auth.uid() = user_id);

-- Create Tasks Table
CREATE TABLE public.tasks (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  opportunity_id uuid REFERENCES public.opportunities(id) ON DELETE CASCADE NOT NULL,
  user_id uuid REFERENCES public.users(id) ON DELETE CASCADE NOT NULL,
  title text NOT NULL,
  due_date timestamp with time zone,
  is_complete boolean DEFAULT false NOT NULL,
  day_number integer,
  created_at timestamp with time zone DEFAULT now() NOT NULL,
  updated_at timestamp with time zone DEFAULT now() NOT NULL
);
ALTER TABLE public.tasks ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can read own tasks." ON public.tasks FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert own tasks." ON public.tasks FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update own tasks." ON public.tasks FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Users can delete own tasks." ON public.tasks FOR DELETE USING (auth.uid() = user_id);

-- Create Documents Table
CREATE TABLE public.documents (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES public.users(id) ON DELETE CASCADE NOT NULL,
  file_name text NOT NULL,
  file_url text NOT NULL,
  doc_type text NOT NULL,
  uploaded_at timestamp with time zone DEFAULT now() NOT NULL
);
ALTER TABLE public.documents ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can read own documents." ON public.documents FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert own documents." ON public.documents FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update own documents." ON public.documents FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Users can delete own documents." ON public.documents FOR DELETE USING (auth.uid() = user_id);

-- Create Templates Table
CREATE TABLE public.templates (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  type text NOT NULL,
  category text,
  content_outline jsonb,
  credit_cost integer DEFAULT 0 NOT NULL,
  is_premium boolean DEFAULT false NOT NULL,
  created_at timestamp with time zone DEFAULT now() NOT NULL
);
ALTER TABLE public.templates ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Templates are viewable by everyone." ON public.templates FOR SELECT USING (true);

-- Create Credits Table
CREATE TABLE public.credits (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES public.users(id) ON DELETE CASCADE NOT NULL,
  balance integer NOT NULL,
  transaction_type text NOT NULL,
  amount integer NOT NULL,
  created_at timestamp with time zone DEFAULT now() NOT NULL
);
ALTER TABLE public.credits ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can read own credits." ON public.credits FOR SELECT USING (auth.uid() = user_id);

-- Create Companion Messages Table
CREATE TABLE public.companion_messages (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES public.users(id) ON DELETE CASCADE NOT NULL,
  opportunity_id uuid REFERENCES public.opportunities(id) ON DELETE CASCADE,
  role text NOT NULL,
  content text NOT NULL,
  tokens_used integer,
  created_at timestamp with time zone DEFAULT now() NOT NULL
);
ALTER TABLE public.companion_messages ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can read own companion messages." ON public.companion_messages FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert own companion messages." ON public.companion_messages FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Create Reminder Queue Table
CREATE TABLE public.reminder_queue (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES public.users(id) ON DELETE CASCADE NOT NULL,
  opportunity_id uuid REFERENCES public.opportunities(id) ON DELETE CASCADE NOT NULL,
  reminder_type text NOT NULL,
  scheduled_for timestamp with time zone NOT NULL,
  sent_at timestamp with time zone,
  channel text NOT NULL,
  created_at timestamp with time zone DEFAULT now() NOT NULL
);
ALTER TABLE public.reminder_queue ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can read own reminders." ON public.reminder_queue FOR SELECT USING (auth.uid() = user_id);

-- FX Rates Table (refreshed hourly by Edge Function — never call external API per-request)
CREATE TABLE public.fx_rates (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  base_currency text NOT NULL,
  target_currency text NOT NULL DEFAULT 'NGN',
  rate numeric NOT NULL,
  fetched_at timestamp with time zone DEFAULT now() NOT NULL,
  UNIQUE (base_currency, target_currency)
);
ALTER TABLE public.fx_rates ENABLE ROW LEVEL SECURITY;
CREATE POLICY "FX rates are viewable by everyone." ON public.fx_rates FOR SELECT USING (true);

-- Performance Indexes following scaling rules in Section 14
CREATE INDEX IF NOT EXISTS idx_opportunities_deadline ON public.opportunities (deadline);
CREATE INDEX IF NOT EXISTS idx_opportunities_type_region ON public.opportunities (type, region);
CREATE INDEX IF NOT EXISTS idx_opportunities_active_featured ON public.opportunities (is_active, is_featured);
CREATE INDEX IF NOT EXISTS idx_saved_opportunities_user_id ON public.saved_opportunities (user_id);
CREATE INDEX IF NOT EXISTS idx_saved_opportunities_opportunity_id ON public.saved_opportunities (opportunity_id);
CREATE INDEX IF NOT EXISTS idx_saved_opportunities_status ON public.saved_opportunities (status);
CREATE INDEX IF NOT EXISTS idx_tasks_user_opp ON public.tasks (user_id, opportunity_id);
CREATE INDEX IF NOT EXISTS idx_tasks_complete_due ON public.tasks (is_complete, due_date);
CREATE INDEX IF NOT EXISTS idx_reminder_queue_scheduled_sent ON public.reminder_queue (scheduled_for, sent_at);
CREATE INDEX IF NOT EXISTS idx_companion_messages_user_created ON public.companion_messages (user_id, created_at);
CREATE INDEX IF NOT EXISTS idx_credits_user ON public.credits (user_id);

