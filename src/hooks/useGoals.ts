import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

export interface Goal {
  id: string;
  title: string;
  description?: string;
  category: string;
  timeframe: string;
  deadline?: string;
  progress: number;
  milestones: string[];
  user_id?: string;
  created_at?: string;
  updated_at?: string;
}

export function useGoals() {
  const [goals, setGoals] = useState<Goal[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  const fetchGoals = async () => {
    try {
      const { data, error } = await supabase
        .from('goals')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      const typedData = (data || []).map(goal => ({
        ...goal,
        milestones: Array.isArray(goal.milestones) ? goal.milestones : []
      })) as Goal[];
      setGoals(typedData);
    } catch (error) {
      console.error('Error fetching goals:', error);
      toast({
        title: "Error",
        description: "Failed to load goals",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const addGoal = async (goal: Omit<Goal, 'id' | 'created_at' | 'updated_at'>) => {
    try {
      const { data, error } = await supabase
        .from('goals')
        .insert([goal])
        .select()
        .single();

      if (error) throw error;
      const typedData = {
        ...data,
        milestones: Array.isArray(data.milestones) ? data.milestones : []
      } as Goal;
      setGoals(prev => [typedData, ...prev]);
      toast({
        title: "Success",
        description: "Goal added successfully"
      });
      return data;
    } catch (error) {
      console.error('Error adding goal:', error);
      toast({
        title: "Error",
        description: "Failed to add goal",
        variant: "destructive"
      });
    }
  };

  const updateGoal = async (id: string, updates: Partial<Goal>) => {
    try {
      const { data, error } = await supabase
        .from('goals')
        .update(updates)
        .eq('id', id)
        .select()
        .single();

      if (error) throw error;
      const typedData = {
        ...data,
        milestones: Array.isArray(data.milestones) ? data.milestones : []
      } as Goal;
      setGoals(prev => prev.map(goal => goal.id === id ? typedData : goal));
      toast({
        title: "Success",
        description: "Goal updated successfully"
      });
      return data;
    } catch (error) {
      console.error('Error updating goal:', error);
      toast({
        title: "Error",
        description: "Failed to update goal",
        variant: "destructive"
      });
    }
  };

  const deleteGoal = async (id: string) => {
    try {
      const { error } = await supabase
        .from('goals')
        .delete()
        .eq('id', id);

      if (error) throw error;
      setGoals(prev => prev.filter(goal => goal.id !== id));
      toast({
        title: "Success",
        description: "Goal deleted successfully"
      });
    } catch (error) {
      console.error('Error deleting goal:', error);
      toast({
        title: "Error",
        description: "Failed to delete goal",
        variant: "destructive"
      });
    }
  };

  useEffect(() => {
    fetchGoals();
  }, []);

  return {
    goals,
    loading,
    addGoal,
    updateGoal,
    deleteGoal,
    refetch: fetchGoals
  };
}