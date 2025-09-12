-- Create storage bucket for photo gallery
INSERT INTO storage.buckets (id, name, public) VALUES ('photos', 'photos', true);

-- Create RLS policies for photo uploads
CREATE POLICY "Users can view all photos" 
ON storage.objects 
FOR SELECT 
USING (bucket_id = 'photos');

CREATE POLICY "Users can upload photos" 
ON storage.objects 
FOR INSERT 
WITH CHECK (bucket_id = 'photos');

CREATE POLICY "Users can update their own photos" 
ON storage.objects 
FOR UPDATE 
USING (bucket_id = 'photos');

CREATE POLICY "Users can delete photos" 
ON storage.objects 
FOR DELETE 
USING (bucket_id = 'photos');