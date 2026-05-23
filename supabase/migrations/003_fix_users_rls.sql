-- Add INSERT policy to public.users so users can upsert their profile data
CREATE POLICY "Users can insert own data." ON public.users FOR INSERT WITH CHECK (auth.uid() = id);
