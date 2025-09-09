import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

export interface Achievement {
  id: string;
  title: string;
  description?: string;
  category: string;
  date_achieved: string;
  impact_level: 'low' | 'medium' | 'high';
  created_at?: string;
}

export function useAchievements() {
  const [achievements, setAchievements] = useState<Achievement[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  const fetchAchievements = async () => {
    try {
      const { data, error } = await supabase
        .from('achievements')
        .select('*')
        .order('date_achieved', { ascending: false });

      if (error) throw error;
      const typedData = (data || []).map(achievement => ({
        ...achievement,
        impact_level: achievement.impact_level as 'low' | 'medium' | 'high'
      })) as Achievement[];
      setAchievements(typedData);
    } catch (error) {
      console.error('Error fetching achievements:', error);
      toast({
        title: "Error",
        description: "Failed to load achievements",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const addAchievement = async (achievement: Omit<Achievement, 'id' | 'created_at'>) => {
    try {
      const { data, error } = await supabase
        .from('achievements')
        .insert([achievement])
        .select()
        .single();

      if (error) throw error;
      const typedData = {
        ...data,
        impact_level: data.impact_level as 'low' | 'medium' | 'high'
      } as Achievement;
      setAchievements(prev => [typedData, ...prev]);
      toast({
        title: "Success",
        description: "Achievement added successfully"
      });
      return data;
    } catch (error) {
      console.error('Error adding achievement:', error);
      toast({
        title: "Error",
        description: "Failed to add achievement",
        variant: "destructive"
      });
    }
  };

  const updateAchievement = async (id: string, updates: Partial<Achievement>) => {
    try {
      const { data, error } = await supabase
        .from('achievements')
        .update(updates)
        .eq('id', id)
        .select()
        .single();

      if (error) throw error;
      const typedData = {
        ...data,
        impact_level: data.impact_level as 'low' | 'medium' | 'high'
      } as Achievement;
      setAchievements(prev => prev.map(achievement => achievement.id === id ? typedData : achievement));
      toast({
        title: "Success",
        description: "Achievement updated successfully"
      });
      return data;
    } catch (error) {
      console.error('Error updating achievement:', error);
      toast({
        title: "Error",
        description: "Failed to update achievement",
        variant: "destructive"
      });
    }
  };

  const deleteAchievement = async (id: string) => {
    try {
      const { error } = await supabase
        .from('achievements')
        .delete()
        .eq('id', id);

      if (error) throw error;
      setAchievements(prev => prev.filter(achievement => achievement.id !== id));
      toast({
        title: "Success",
        description: "Achievement deleted successfully"
      });
    } catch (error) {
      console.error('Error deleting achievement:', error);
      toast({
        title: "Error",
        description: "Failed to delete achievement",
        variant: "destructive"
      });
    }
  };

  useEffect(() => {
    fetchAchievements();
  }, []);

  return {
    achievements,
    loading,
    addAchievement,
    updateAchievement,
    deleteAchievement,
    refetch: fetchAchievements
  };
}