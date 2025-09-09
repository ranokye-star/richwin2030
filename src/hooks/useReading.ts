import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

export interface Book {
  id: string;
  title: string;
  author: string;
  category: string;
  status: 'to-read' | 'reading' | 'completed' | 'paused';
  progress?: number;
  rating?: number;
  date_started?: string;
  date_completed?: string;
  notes?: string;
  created_at?: string;
}

export interface ReadingGoal {
  id: string;
  year: number;
  target_books: number;
  books_completed: number;
  created_at?: string;
}

export function useReading() {
  const [books, setBooks] = useState<Book[]>([]);
  const [readingGoals, setReadingGoals] = useState<ReadingGoal[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  const fetchReadingData = async () => {
    try {
      const [booksResult, goalsResult] = await Promise.all([
        supabase.from('books').select('*').order('created_at', { ascending: false }),
        supabase.from('reading_goals').select('*').order('year', { ascending: false })
      ]);

      if (booksResult.error) throw booksResult.error;
      if (goalsResult.error) throw goalsResult.error;

      const typedBooks = (booksResult.data || []).map(book => ({
        ...book,
        status: book.status as 'to-read' | 'reading' | 'completed' | 'paused'
      })) as Book[];

      setBooks(typedBooks);
      setReadingGoals(goalsResult.data || []);
    } catch (error) {
      console.error('Error fetching reading data:', error);
      toast({
        title: "Error",
        description: "Failed to load reading data",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const addBook = async (book: Omit<Book, 'id' | 'created_at'>) => {
    try {
      const { data, error } = await supabase
        .from('books')
        .insert([book])
        .select()
        .single();

      if (error) throw error;
      const typedData = {
        ...data,
        status: data.status as 'to-read' | 'reading' | 'completed' | 'paused'
      } as Book;
      setBooks(prev => [typedData, ...prev]);
      toast({ title: "Success", description: "Book added successfully" });
      return data;
    } catch (error) {
      console.error('Error adding book:', error);
      toast({ title: "Error", description: "Failed to add book", variant: "destructive" });
    }
  };

  const updateBook = async (id: string, updates: Partial<Book>) => {
    try {
      const { data, error } = await supabase
        .from('books')
        .update(updates)
        .eq('id', id)
        .select()
        .single();

      if (error) throw error;
      const typedData = {
        ...data,
        status: data.status as 'to-read' | 'reading' | 'completed' | 'paused'
      } as Book;
      setBooks(prev => prev.map(book => book.id === id ? typedData : book));
      toast({ title: "Success", description: "Book updated successfully" });
      return data;
    } catch (error) {
      console.error('Error updating book:', error);
      toast({ title: "Error", description: "Failed to update book", variant: "destructive" });
    }
  };

  const deleteBook = async (id: string) => {
    try {
      const { error } = await supabase.from('books').delete().eq('id', id);
      if (error) throw error;
      setBooks(prev => prev.filter(book => book.id !== id));
      toast({ title: "Success", description: "Book deleted successfully" });
    } catch (error) {
      console.error('Error deleting book:', error);
      toast({ title: "Error", description: "Failed to delete book", variant: "destructive" });
    }
  };

  const addReadingGoal = async (goal: Omit<ReadingGoal, 'id' | 'created_at'>) => {
    try {
      const { data, error } = await supabase
        .from('reading_goals')
        .insert([goal])
        .select()
        .single();

      if (error) throw error;
      setReadingGoals(prev => [data, ...prev]);
      toast({ title: "Success", description: "Reading goal added successfully" });
      return data;
    } catch (error) {
      console.error('Error adding reading goal:', error);
      toast({ title: "Error", description: "Failed to add reading goal", variant: "destructive" });
    }
  };

  useEffect(() => {
    fetchReadingData();
  }, []);

  return {
    books,
    readingGoals,
    loading,
    addBook,
    updateBook,
    deleteBook,
    addReadingGoal,
    refetch: fetchReadingData
  };
}