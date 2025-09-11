import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

export interface Memory {
  id: string;
  title: string;
  description?: string;
  date: string;
  location?: string;
  photo_url?: string;
  memory_type: 'photo' | 'milestone' | 'special';
  created_at?: string;
}

export interface LoveLetter {
  id: string;
  title: string;
  content: string;
  from_user_id?: string;
  to_user_id?: string;
  created_at?: string;
}

export interface JournalEntry {
  id: string;
  week_of: string;
  reflections?: string;
  gratitude: string[];
  lessons_learned: string[];
  created_at?: string;
  updated_at?: string;
}

export function useMemories() {
  const [memories, setMemories] = useState<Memory[]>([]);
  const [loveLetters, setLoveLetters] = useState<LoveLetter[]>([]);
  const [journalEntries, setJournalEntries] = useState<JournalEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  const fetchMemories = async () => {
    try {
      const [memoriesResult, lettersResult, journalResult] = await Promise.all([
        supabase.from('memories').select('*').order('date', { ascending: false }),
        supabase.from('love_letters').select('*').order('created_at', { ascending: false }),
        supabase.from('journal_entries').select('*').order('week_of', { ascending: false })
      ]);

      if (memoriesResult.error) throw memoriesResult.error;
      if (lettersResult.error) throw lettersResult.error;
      if (journalResult.error) throw journalResult.error;

      const typedMemories = (memoriesResult.data || []).map(memory => ({
        ...memory,
        memory_type: memory.memory_type as 'photo' | 'milestone' | 'special'
      })) as Memory[];

      setMemories(typedMemories);
      setLoveLetters(lettersResult.data || []);
      setJournalEntries(journalResult.data || []);
    } catch (error) {
      console.error('Error fetching memories:', error);
      toast({
        title: "Error",
        description: "Failed to load memories",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const addMemory = async (memory: Omit<Memory, 'id' | 'created_at'>) => {
    try {
      const { data, error } = await supabase
        .from('memories')
        .insert([memory])
        .select()
        .single();

      if (error) throw error;
      const typedData = {
        ...data,
        memory_type: data.memory_type as 'photo' | 'milestone' | 'special'
      } as Memory;
      setMemories(prev => [typedData, ...prev]);
      toast({
        title: "Success",
        description: "Memory added successfully"
      });
      return data;
    } catch (error) {
      console.error('Error adding memory:', error);
      toast({
        title: "Error",
        description: "Failed to add memory",
        variant: "destructive"
      });
    }
  };

  const addLoveLetter = async (letter: Omit<LoveLetter, 'id' | 'created_at'>) => {
    try {
      const { data, error } = await supabase
        .from('love_letters')
        .insert([letter])
        .select()
        .single();

      if (error) throw error;
      setLoveLetters(prev => [data, ...prev]);
      toast({
        title: "Success",
        description: "Love letter added successfully"
      });
      return data;
    } catch (error) {
      console.error('Error adding love letter:', error);
      toast({
        title: "Error",
        description: "Failed to add love letter",
        variant: "destructive"
      });
    }
  };

  const updateLoveLetter = async (id: string, updates: Partial<LoveLetter>) => {
    try {
      const { data, error } = await supabase
        .from('love_letters')
        .update(updates)
        .eq('id', id)
        .select()
        .single();

      if (error) throw error;
      setLoveLetters(prev => prev.map(letter => letter.id === id ? data : letter));
      toast({
        title: "Success",
        description: "Love letter updated successfully"
      });
      return data;
    } catch (error) {
      console.error('Error updating love letter:', error);
      toast({
        title: "Error",
        description: "Failed to update love letter",
        variant: "destructive"
      });
    }
  };

  const deleteLoveLetter = async (id: string) => {
    try {
      const { error } = await supabase
        .from('love_letters')
        .delete()
        .eq('id', id);

      if (error) throw error;
      setLoveLetters(prev => prev.filter(letter => letter.id !== id));
      toast({
        title: "Success",
        description: "Love letter deleted successfully"
      });
    } catch (error) {
      console.error('Error deleting love letter:', error);
      toast({
        title: "Error",
        description: "Failed to delete love letter",
        variant: "destructive"
      });
    }
  };

  const addJournalEntry = async (entry: Omit<JournalEntry, 'id' | 'created_at' | 'updated_at'>) => {
    try {
      const { data, error } = await supabase
        .from('journal_entries')
        .insert([entry])
        .select()
        .single();

      if (error) throw error;
      setJournalEntries(prev => [data, ...prev]);
      toast({
        title: "Success",
        description: "Journal entry added successfully"
      });
      return data;
    } catch (error) {
      console.error('Error adding journal entry:', error);
      toast({
        title: "Error",
        description: "Failed to add journal entry",
        variant: "destructive"
      });
    }
  };

  const updateJournalEntry = async (id: string, updates: Partial<JournalEntry>) => {
    try {
      const { data, error } = await supabase
        .from('journal_entries')
        .update(updates)
        .eq('id', id)
        .select()
        .single();

      if (error) throw error;
      setJournalEntries(prev => prev.map(entry => entry.id === id ? data : entry));
      toast({
        title: "Success",
        description: "Journal entry updated successfully"
      });
      return data;
    } catch (error) {
      console.error('Error updating journal entry:', error);
      toast({
        title: "Error",
        description: "Failed to update journal entry",
        variant: "destructive"
      });
    }
  };

  const deleteJournalEntry = async (id: string) => {
    try {
      const { error } = await supabase
        .from('journal_entries')
        .delete()
        .eq('id', id);

      if (error) throw error;
      setJournalEntries(prev => prev.filter(entry => entry.id !== id));
      toast({
        title: "Success",
        description: "Journal entry deleted successfully"
      });
    } catch (error) {
      console.error('Error deleting journal entry:', error);
      toast({
        title: "Error",
        description: "Failed to delete journal entry",
        variant: "destructive"
      });
    }
  };

  const updateMemory = async (id: string, updates: Partial<Memory>) => {
    try {
      const { data, error } = await supabase
        .from('memories')
        .update(updates)
        .eq('id', id)
        .select()
        .single();

      if (error) throw error;
      const typedData = {
        ...data,
        memory_type: data.memory_type as 'photo' | 'milestone' | 'special'
      } as Memory;
      setMemories(prev => prev.map(memory => memory.id === id ? typedData : memory));
      toast({
        title: "Success",
        description: "Memory updated successfully"
      });
      return data;
    } catch (error) {
      console.error('Error updating memory:', error);
      toast({
        title: "Error",
        description: "Failed to update memory",
        variant: "destructive"
      });
    }
  };

  const deleteMemory = async (id: string) => {
    try {
      const { error } = await supabase
        .from('memories')
        .delete()
        .eq('id', id);

      if (error) throw error;
      setMemories(prev => prev.filter(memory => memory.id !== id));
      toast({
        title: "Success",
        description: "Memory deleted successfully"
      });
    } catch (error) {
      console.error('Error deleting memory:', error);
      toast({
        title: "Error",
        description: "Failed to delete memory",
        variant: "destructive"
      });
    }
  };

  useEffect(() => {
    fetchMemories();
  }, []);

  return {
    memories,
    loveLetters,
    journalEntries,
    loading,
    addMemory,
    addLoveLetter,
    addJournalEntry,
    updateMemory,
    updateLoveLetter,
    updateJournalEntry,
    deleteMemory,
    deleteLoveLetter,
    deleteJournalEntry,
    refetch: fetchMemories
  };
}