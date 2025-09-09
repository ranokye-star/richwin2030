import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

export interface ScriptureReflection {
  id: string;
  reference: string;
  verse: string;
  reflection: string;
  date_studied: string;
  created_at?: string;
}

export interface PrayerRequest {
  id: string;
  request: string;
  date_requested: string;
  status: 'pending' | 'answered' | 'ongoing';
  date_answered?: string;
  testimony?: string;
  created_at?: string;
}

export interface SpiritualGoal {
  id: string;
  goal: string;
  progress: number;
  deadline?: string;
  milestones?: string[];
  created_at?: string;
}

export interface ChurchActivity {
  id: string;
  activity_name: string;
  date: string;
  reflection?: string;
  created_at?: string;
}

export function useFaith() {
  const [scriptureReflections, setScriptureReflections] = useState<ScriptureReflection[]>([]);
  const [prayerRequests, setPrayerRequests] = useState<PrayerRequest[]>([]);
  const [spiritualGoals, setSpiritualGoals] = useState<SpiritualGoal[]>([]);
  const [churchActivities, setChurchActivities] = useState<ChurchActivity[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  const fetchFaithData = async () => {
    try {
      const [scriptureResult, prayerResult, goalsResult, activitiesResult] = await Promise.all([
        supabase.from('scripture_reflections').select('*').order('date_studied', { ascending: false }),
        supabase.from('prayer_requests').select('*').order('date_requested', { ascending: false }),
        supabase.from('spiritual_goals').select('*').order('created_at', { ascending: false }),
        supabase.from('church_activities').select('*').order('date', { ascending: false })
      ]);

      if (scriptureResult.error) throw scriptureResult.error;
      if (prayerResult.error) throw prayerResult.error;
      if (goalsResult.error) throw goalsResult.error;
      if (activitiesResult.error) throw activitiesResult.error;

      setScriptureReflections(scriptureResult.data || []);
      
      const typedPrayerRequests = (prayerResult.data || []).map(request => ({
        ...request,
        status: request.status as 'pending' | 'answered' | 'ongoing'
      })) as PrayerRequest[];
      setPrayerRequests(typedPrayerRequests);
      
      setSpiritualGoals(goalsResult.data || []);
      setChurchActivities(activitiesResult.data || []);
    } catch (error) {
      console.error('Error fetching faith data:', error);
      toast({
        title: "Error",
        description: "Failed to load faith data",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const addScriptureReflection = async (reflection: Omit<ScriptureReflection, 'id' | 'created_at'>) => {
    try {
      const { data, error } = await supabase
        .from('scripture_reflections')
        .insert([reflection])
        .select()
        .single();

      if (error) throw error;
      setScriptureReflections(prev => [data, ...prev]);
      toast({ title: "Success", description: "Scripture reflection added successfully" });
      return data;
    } catch (error) {
      console.error('Error adding scripture reflection:', error);
      toast({ title: "Error", description: "Failed to add scripture reflection", variant: "destructive" });
    }
  };

  const addPrayerRequest = async (request: Omit<PrayerRequest, 'id' | 'created_at'>) => {
    try {
      const { data, error } = await supabase
        .from('prayer_requests')
        .insert([request])
        .select()
        .single();

      if (error) throw error;
      const typedData = {
        ...data,
        status: data.status as 'pending' | 'answered' | 'ongoing'
      } as PrayerRequest;
      setPrayerRequests(prev => [typedData, ...prev]);
      toast({ title: "Success", description: "Prayer request added successfully" });
      return data;
    } catch (error) {
      console.error('Error adding prayer request:', error);
      toast({ title: "Error", description: "Failed to add prayer request", variant: "destructive" });
    }
  };

  const updatePrayerRequest = async (id: string, updates: Partial<PrayerRequest>) => {
    try {
      const { data, error } = await supabase
        .from('prayer_requests')
        .update(updates)
        .eq('id', id)
        .select()
        .single();

      if (error) throw error;
      const typedData = {
        ...data,
        status: data.status as 'pending' | 'answered' | 'ongoing'
      } as PrayerRequest;
      setPrayerRequests(prev => prev.map(request => request.id === id ? typedData : request));
      toast({ title: "Success", description: "Prayer request updated successfully" });
      return data;
    } catch (error) {
      console.error('Error updating prayer request:', error);
      toast({ title: "Error", description: "Failed to update prayer request", variant: "destructive" });
    }
  };

  const deleteScriptureReflection = async (id: string) => {
    try {
      const { error } = await supabase.from('scripture_reflections').delete().eq('id', id);
      if (error) throw error;
      setScriptureReflections(prev => prev.filter(reflection => reflection.id !== id));
      toast({ title: "Success", description: "Scripture reflection deleted successfully" });
    } catch (error) {
      console.error('Error deleting scripture reflection:', error);
      toast({ title: "Error", description: "Failed to delete scripture reflection", variant: "destructive" });
    }
  };

  useEffect(() => {
    fetchFaithData();
  }, []);

  return {
    scriptureReflections,
    prayerRequests,
    spiritualGoals,
    churchActivities,
    loading,
    addScriptureReflection,
    addPrayerRequest,
    updatePrayerRequest,
    deleteScriptureReflection,
    refetch: fetchFaithData
  };
}