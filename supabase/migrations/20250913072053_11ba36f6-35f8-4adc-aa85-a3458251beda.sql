-- Create weekly_tasks table for Richmond and Edwina
CREATE TABLE public.weekly_tasks (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_name TEXT NOT NULL CHECK (user_name IN ('Richmond', 'Edwina')),
  task_title TEXT NOT NULL,
  task_description TEXT,
  status TEXT NOT NULL DEFAULT 'not-started' CHECK (status IN ('not-started', 'in-progress', 'completed', 'cancelled')),
  priority TEXT DEFAULT 'medium' CHECK (priority IN ('low', 'medium', 'high')),
  week_of DATE NOT NULL, -- Week starting date (Monday)
  due_date DATE,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.weekly_tasks ENABLE ROW LEVEL SECURITY;

-- Create policies for weekly_tasks
CREATE POLICY "Allow all operations on weekly_tasks" 
ON public.weekly_tasks 
FOR ALL 
USING (true) 
WITH CHECK (true);

-- Create function to update timestamps
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

-- Create trigger for automatic timestamp updates
CREATE TRIGGER update_weekly_tasks_updated_at
BEFORE UPDATE ON public.weekly_tasks
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();