import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

export interface GrowthEntry {
  id: string;
  entry_date: string;
  category: string;
  score: number;
  notes?: string;
  user_id?: string;
  created_at?: string;
}

export interface GrowthGoal {
  id: string;
  goal_text: string;
  category: string;
  target_score?: number;
  deadline?: string;
  milestones?: string[];
  user_id?: string;
  created_at?: string;
}

export function useGrowth() {
  const [growthEntries, setGrowthEntries] = useState<GrowthEntry[]>([]);
  const [growthGoals, setGrowthGoals] = useState<GrowthGoal[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  const fetchGrowthData = async () => {
    try {
      const [entriesResult, goalsResult] = await Promise.all([
        supabase.from('growth_entries').select('*').order('entry_date', { ascending: false }),
        supabase.from('growth_goals').select('*').order('created_at', { ascending: false })
      ]);

      if (entriesResult.error) throw entriesResult.error;
      if (goalsResult.error) throw goalsResult.error;

      setGrowthEntries(entriesResult.data || []);
      setGrowthGoals(goalsResult.data || []);
    } catch (error) {
      console.error('Error fetching growth data:', error);
      toast({
        title: "Error",
        description: "Failed to load growth data",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const addGrowthEntry = async (entry: Omit<GrowthEntry, 'id' | 'created_at'>) => {
    try {
      const { data, error } = await supabase
        .from('growth_entries')
        .insert([entry])
        .select()
        .single();

      if (error) throw error;
      setGrowthEntries(prev => [data, ...prev]);
      toast({ title: "Success", description: "Growth entry added successfully" });
      return data;
    } catch (error) {
      console.error('Error adding growth entry:', error);
      toast({ title: "Error", description: "Failed to add growth entry", variant: "destructive" });
    }
  };

  const addGrowthGoal = async (goal: Omit<GrowthGoal, 'id' | 'created_at'>) => {
    try {
      const { data, error } = await supabase
        .from('growth_goals')
        .insert([goal])
        .select()
        .single();

      if (error) throw error;
      setGrowthGoals(prev => [data, ...prev]);
      toast({ title: "Success", description: "Growth goal added successfully" });
      return data;
    } catch (error) {
      console.error('Error adding growth goal:', error);
      toast({ title: "Error", description: "Failed to add growth goal", variant: "destructive" });
    }
  };

  const updateGrowthEntry = async (id: string, updates: Partial<GrowthEntry>) => {
    try {
      const { data, error } = await supabase
        .from('growth_entries')
        .update(updates)
        .eq('id', id)
        .select()
        .single();

      if (error) throw error;
      setGrowthEntries(prev => prev.map(entry => entry.id === id ? data : entry));
      toast({ title: "Success", description: "Growth entry updated successfully" });
      return data;
    } catch (error) {
      console.error('Error updating growth entry:', error);
      toast({ title: "Error", description: "Failed to update growth entry", variant: "destructive" });
    }
  };

  const deleteGrowthEntry = async (id: string) => {
    try {
      const { error } = await supabase.from('growth_entries').delete().eq('id', id);
      if (error) throw error;
      setGrowthEntries(prev => prev.filter(entry => entry.id !== id));
      toast({ title: "Success", description: "Growth entry deleted successfully" });
    } catch (error) {
      console.error('Error deleting growth entry:', error);
      toast({ title: "Error", description: "Failed to delete growth entry", variant: "destructive" });
    }
  };

  useEffect(() => {
    fetchGrowthData();
  }, []);

  return {
    growthEntries,
    growthGoals,
    loading,
    addGrowthEntry,
    addGrowthGoal,
    updateGrowthEntry,
    deleteGrowthEntry,
    refetch: fetchGrowthData
  };
}