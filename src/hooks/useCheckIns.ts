import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

export interface CheckIn {
  id: string;
  date: string;
  checkin_type: string;
  relationship_score?: number;
  wins?: string;
  challenges?: string;
  goals_progress?: string;
  next_steps?: string;
  created_at?: string;
}

export function useCheckIns() {
  const [checkIns, setCheckIns] = useState<CheckIn[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  const fetchCheckIns = async () => {
    try {
      const { data, error } = await supabase
        .from('checkins')
        .select('*')
        .order('date', { ascending: false });

      if (error) throw error;
      setCheckIns(data || []);
    } catch (error) {
      console.error('Error fetching check-ins:', error);
      toast({
        title: "Error",
        description: "Failed to load check-ins",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const addCheckIn = async (checkIn: Omit<CheckIn, 'id' | 'created_at'>) => {
    try {
      const { data, error } = await supabase
        .from('checkins')
        .insert([checkIn])
        .select()
        .single();

      if (error) throw error;
      setCheckIns(prev => [data, ...prev]);
      toast({ title: "Success", description: "Check-in added successfully" });
      return data;
    } catch (error) {
      console.error('Error adding check-in:', error);
      toast({ title: "Error", description: "Failed to add check-in", variant: "destructive" });
    }
  };

  const updateCheckIn = async (id: string, updates: Partial<CheckIn>) => {
    try {
      const { data, error } = await supabase
        .from('checkins')
        .update(updates)
        .eq('id', id)
        .select()
        .single();

      if (error) throw error;
      setCheckIns(prev => prev.map(checkIn => checkIn.id === id ? data : checkIn));
      toast({ title: "Success", description: "Check-in updated successfully" });
      return data;
    } catch (error) {
      console.error('Error updating check-in:', error);
      toast({ title: "Error", description: "Failed to update check-in", variant: "destructive" });
    }
  };

  const deleteCheckIn = async (id: string) => {
    try {
      const { error } = await supabase.from('checkins').delete().eq('id', id);
      if (error) throw error;
      setCheckIns(prev => prev.filter(checkIn => checkIn.id !== id));
      toast({ title: "Success", description: "Check-in deleted successfully" });
    } catch (error) {
      console.error('Error deleting check-in:', error);
      toast({ title: "Error", description: "Failed to delete check-in", variant: "destructive" });
    }
  };

  useEffect(() => {
    fetchCheckIns();
  }, []);

  return {
    checkIns,
    loading,
    addCheckIn,
    updateCheckIn,
    deleteCheckIn,
    refetch: fetchCheckIns
  };
}