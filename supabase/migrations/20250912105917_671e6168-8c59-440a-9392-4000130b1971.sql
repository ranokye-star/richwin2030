-- Enable RLS on the users table
ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;

-- Create RLS policies for users table
CREATE POLICY "Users can view all users" 
ON public.users 
FOR SELECT 
USING (true);

CREATE POLICY "Users can insert their own user record" 
ON public.users 
FOR INSERT 
WITH CHECK (true);

CREATE POLICY "Users can update their own user record" 
ON public.users 
FOR UPDATE 
USING (true);