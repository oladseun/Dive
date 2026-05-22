-- Add new columns for the CRM Tracker approach
ALTER TABLE public.tasks 
ADD COLUMN status text DEFAULT 'todo' NOT NULL,
ADD COLUMN notes text,
ADD COLUMN link_url text;

-- Add a comment explaining the status column
COMMENT ON COLUMN public.tasks.status IS 'Can be todo, in_progress, or completed';
