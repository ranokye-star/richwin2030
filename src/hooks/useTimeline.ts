import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

export interface TimelineEvent {
  id: string;
  title: string;
  description?: string;
  date: string;
  category: 'milestone' | 'memory' | 'achievement';
  created_at?: string;
}

export function useTimeline() {
  const [timelineEvents, setTimelineEvents] = useState<TimelineEvent[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  const fetchTimelineEvents = async () => {
    try {
      const { data, error } = await supabase
        .from('timeline_events')
        .select('*')
        .order('date', { ascending: false });

      if (error) throw error;
      
      const typedEvents = (data || []).map(event => ({
        ...event,
        category: event.category as 'milestone' | 'memory' | 'achievement'
      })) as TimelineEvent[];

      setTimelineEvents(typedEvents);
    } catch (error) {
      console.error('Error fetching timeline events:', error);
      toast({
        title: "Error",
        description: "Failed to load timeline events",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
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
        category: data.category as 'milestone' | 'memory' | 'achievement'
      } as TimelineEvent;
      
      setTimelineEvents(prev => [typedData, ...prev]);
      toast({
        title: "Success",
        description: "Timeline event added successfully"
      });
      return data;
    } catch (error) {
      console.error('Error adding timeline event:', error);
      toast({
        title: "Error",
        description: "Failed to add timeline event",
        variant: "destructive"
      });
    }
  };

  const updateTimelineEvent = async (id: string, updates: Partial<TimelineEvent>) => {
    try {
      const { data, error } = await supabase
        .from('timeline_events')
        .update(updates)
        .eq('id', id)
        .select()
        .single();

      if (error) throw error;
      
      const typedData = {
        ...data,
        category: data.category as 'milestone' | 'memory' | 'achievement'
      } as TimelineEvent;
      
      setTimelineEvents(prev => prev.map(event => event.id === id ? typedData : event));
      toast({
        title: "Success",
        description: "Timeline event updated successfully"
      });
      return data;
    } catch (error) {
      console.error('Error updating timeline event:', error);
      toast({
        title: "Error",
        description: "Failed to update timeline event",
        variant: "destructive"
      });
    }
  };

  const deleteTimelineEvent = async (id: string) => {
    try {
      const { error } = await supabase
        .from('timeline_events')
        .delete()
        .eq('id', id);

      if (error) throw error;
      
      setTimelineEvents(prev => prev.filter(event => event.id !== id));
      toast({
        title: "Success",
        description: "Timeline event deleted successfully"
      });
    } catch (error) {
      console.error('Error deleting timeline event:', error);
      toast({
        title: "Error",
        description: "Failed to delete timeline event",
        variant: "destructive"
      });
    }
  };

  useEffect(() => {
    fetchTimelineEvents();
  }, []);

  return {
    timelineEvents,
    loading,
    addTimelineEvent,
    updateTimelineEvent,
    deleteTimelineEvent,
    refetch: fetchTimelineEvents
  };
}