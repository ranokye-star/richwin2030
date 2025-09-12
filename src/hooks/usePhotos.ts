import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

export interface Photo {
  id: string;
  name: string;
  caption?: string;
  url: string;
  created_at?: string;
}

export function usePhotos() {
  const [photos, setPhotos] = useState<Photo[]>([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const { toast } = useToast();

  const fetchPhotos = async () => {
    try {
      const { data, error } = await supabase.storage
        .from('photos')
        .list('', {
          limit: 100,
          offset: 0,
          sortBy: { column: 'created_at', order: 'desc' }
        });

      if (error) throw error;

      const photosWithUrls = await Promise.all(
        (data || []).map(async (file) => {
          const { data: urlData } = supabase.storage
            .from('photos')
            .getPublicUrl(file.name);

          return {
            id: file.id || file.name,
            name: file.name,
            url: urlData.publicUrl,
            created_at: file.created_at
          } as Photo;
        })
      );

      setPhotos(photosWithUrls);
    } catch (error) {
      console.error('Error fetching photos:', error);
      toast({
        title: "Error",
        description: "Failed to load photos",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const uploadPhoto = async (file: File, caption?: string) => {
    setUploading(true);
    try {
      const fileExt = file.name.split('.').pop();
      const fileName = `${Date.now()}-${Math.random().toString(36).substring(2)}.${fileExt}`;

      const { data, error } = await supabase.storage
        .from('photos')
        .upload(fileName, file, {
          cacheControl: '3600',
          upsert: false
        });

      if (error) throw error;

      const { data: urlData } = supabase.storage
        .from('photos')
        .getPublicUrl(data.path);

      const newPhoto: Photo = {
        id: data.path,
        name: fileName,
        caption,
        url: urlData.publicUrl,
        created_at: new Date().toISOString()
      };

      setPhotos(prev => [newPhoto, ...prev]);
      
      toast({
        title: "Success",
        description: "Photo uploaded successfully"
      });

      return newPhoto;
    } catch (error) {
      console.error('Error uploading photo:', error);
      toast({
        title: "Error",
        description: "Failed to upload photo",
        variant: "destructive"
      });
    } finally {
      setUploading(false);
    }
  };

  const deletePhoto = async (fileName: string) => {
    try {
      const { error } = await supabase.storage
        .from('photos')
        .remove([fileName]);

      if (error) throw error;

      setPhotos(prev => prev.filter(photo => photo.name !== fileName));
      
      toast({
        title: "Success",
        description: "Photo deleted successfully"
      });
    } catch (error) {
      console.error('Error deleting photo:', error);
      toast({
        title: "Error",
        description: "Failed to delete photo",
        variant: "destructive"
      });
    }
  };

  useEffect(() => {
    fetchPhotos();
  }, []);

  return {
    photos,
    loading,
    uploading,
    uploadPhoto,
    deletePhoto,
    refetch: fetchPhotos
  };
}