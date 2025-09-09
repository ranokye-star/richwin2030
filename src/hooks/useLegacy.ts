import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

export interface LegacyPlan {
  id: string;
  title: string;
  description: string;
  plan_type: string;
  timeline?: string;
  priority: 'low' | 'medium' | 'high';
  created_at?: string;
}

export interface TimelineEvent {
  id: string;
  title: string;
  description?: string;
  date: string;
  category: 'milestone' | 'achievement' | 'memory' | 'goal';
  created_at?: string;
}

export function useLegacy() {
  const [legacyPlans, setLegacyPlans] = useState<LegacyPlan[]>([]);
  const [timelineEvents, setTimelineEvents] = useState<TimelineEvent[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  const fetchLegacyData = async () => {
    try {
      const [plansResult, eventsResult] = await Promise.all([
        supabase.from('legacy_plans').select('*').order('created_at', { ascending: false }),
        supabase.from('timeline_events').select('*').order('date', { ascending: false })
      ]);

      if (plansResult.error) throw plansResult.error;
      if (eventsResult.error) throw eventsResult.error;

      const typedPlans = (plansResult.data || []).map(plan => ({
        ...plan,
        priority: plan.priority as 'low' | 'medium' | 'high'
      })) as LegacyPlan[];

      const typedEvents = (eventsResult.data || []).map(event => ({
        ...event,
        category: event.category as 'milestone' | 'achievement' | 'memory' | 'goal'
      })) as TimelineEvent[];

      setLegacyPlans(typedPlans);
      setTimelineEvents(typedEvents);
    } catch (error) {
      console.error('Error fetching legacy data:', error);
      toast({
        title: "Error",
        description: "Failed to load legacy data",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const addLegacyPlan = async (plan: Omit<LegacyPlan, 'id' | 'created_at'>) => {
    try {
      const { data, error } = await supabase
        .from('legacy_plans')
        .insert([plan])
        .select()
        .single();

      if (error) throw error;
      const typedData = {
        ...data,
        priority: data.priority as 'low' | 'medium' | 'high'
      } as LegacyPlan;
      setLegacyPlans(prev => [typedData, ...prev]);
      toast({ title: "Success", description: "Legacy plan added successfully" });
      return data;
    } catch (error) {
      console.error('Error adding legacy plan:', error);
      toast({ title: "Error", description: "Failed to add legacy plan", variant: "destructive" });
    }
  };

  const addTimelineEvent = async (event: Omit<TimelineEvent, 'id' | 'created_at'>) => {
    try {
      const { data, error } = await supabase
        .from('timeline_events')
        .insert([event])
        .select()
        .single();

      if (error) throw error;
      const typedData = {
        ...data,
        category: data.category as 'milestone' | 'achievement' | 'memory' | 'goal'
      } as TimelineEvent;
      setTimelineEvents(prev => [typedData, ...prev]);
      toast({ title: "Success", description: "Timeline event added successfully" });
      return data;
    } catch (error) {
      console.error('Error adding timeline event:', error);
      toast({ title: "Error", description: "Failed to add timeline event", variant: "destructive" });
    }
  };

  const updateLegacyPlan = async (id: string, updates: Partial<LegacyPlan>) => {
    try {
      const { data, error } = await supabase
        .from('legacy_plans')
        .update(updates)
        .eq('id', id)
        .select()
        .single();

      if (error) throw error;
      const typedData = {
        ...data,
        priority: data.priority as 'low' | 'medium' | 'high'
      } as LegacyPlan;
      setLegacyPlans(prev => prev.map(plan => plan.id === id ? typedData : plan));
      toast({ title: "Success", description: "Legacy plan updated successfully" });
      return data;
    } catch (error) {
      console.error('Error updating legacy plan:', error);
      toast({ title: "Error", description: "Failed to update legacy plan", variant: "destructive" });
    }
  };

  const deleteLegacyPlan = async (id: string) => {
    try {
      const { error } = await supabase.from('legacy_plans').delete().eq('id', id);
      if (error) throw error;
      setLegacyPlans(prev => prev.filter(plan => plan.id !== id));
      toast({ title: "Success", description: "Legacy plan deleted successfully" });
    } catch (error) {
      console.error('Error deleting legacy plan:', error);
      toast({ title: "Error", description: "Failed to delete legacy plan", variant: "destructive" });
    }
  };

  useEffect(() => {
    fetchLegacyData();
  }, []);

  return {
    legacyPlans,
    timelineEvents,
    loading,
    addLegacyPlan,
    addTimelineEvent,
    updateLegacyPlan,
    deleteLegacyPlan,
    refetch: fetchLegacyData
  };
}