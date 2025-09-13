import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

export interface WeeklyTask {
  id: string;
  user_name: 'Richmond' | 'Edwina';
  task_title: string;
  task_description?: string;
  status: 'not-started' | 'in-progress' | 'completed' | 'cancelled';
  priority: 'low' | 'medium' | 'high';
  week_of: string; // Date string
  due_date?: string;
  created_at: string;
  updated_at: string;
}

export function useWeeklyTasks() {
  const [tasks, setTasks] = useState<WeeklyTask[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  const fetchTasks = async (weekOf?: Date) => {
    try {
      setLoading(true);
      let query = supabase
        .from('weekly_tasks')
        .select('*')
        .order('created_at', { ascending: false });

      if (weekOf) {
        // Get Monday of the week
        const monday = new Date(weekOf);
        monday.setDate(monday.getDate() - monday.getDay() + 1);
        const mondayStr = monday.toISOString().split('T')[0];
        
        query = query.eq('week_of', mondayStr);
      }

      const { data, error } = await query;

      if (error) {
        console.error('Error fetching tasks:', error);
        toast({
          title: "Error",
          description: "Failed to fetch tasks",
          variant: "destructive",
        });
        return;
      }

      setTasks((data as WeeklyTask[]) || []);
    } catch (error) {
      console.error('Unexpected error:', error);
      toast({
        title: "Error", 
        description: "An unexpected error occurred",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const addTask = async (task: Omit<WeeklyTask, 'id' | 'created_at' | 'updated_at'>) => {
    try {
      const { data, error } = await supabase
        .from('weekly_tasks')
        .insert([task])
        .select()
        .single();

      if (error) {
        console.error('Error adding task:', error);
        toast({
          title: "Error",
          description: "Failed to add task",
          variant: "destructive",
        });
        return;
      }

      setTasks(prev => [data as WeeklyTask, ...prev]);
      toast({
        title: "Success",
        description: "Task added successfully",
      });
    } catch (error) {
      console.error('Unexpected error:', error);
      toast({
        title: "Error",
        description: "An unexpected error occurred",
        variant: "destructive",
      });
    }
  };

  const updateTask = async (id: string, updates: Partial<WeeklyTask>) => {
    try {
      const { data, error } = await supabase
        .from('weekly_tasks')
        .update(updates)
        .eq('id', id)
        .select()
        .single();

      if (error) {
        console.error('Error updating task:', error);
        toast({
          title: "Error",
          description: "Failed to update task",
          variant: "destructive",
        });
        return;
      }

      setTasks(prev => prev.map(task => task.id === id ? data as WeeklyTask : task));
      toast({
        title: "Success",
        description: "Task updated successfully",
      });
    } catch (error) {
      console.error('Unexpected error:', error);
      toast({
        title: "Error",
        description: "An unexpected error occurred",
        variant: "destructive",
      });
    }
  };

  const deleteTask = async (id: string) => {
    try {
      const { error } = await supabase
        .from('weekly_tasks')
        .delete()
        .eq('id', id);

      if (error) {
        console.error('Error deleting task:', error);
        toast({
          title: "Error",
          description: "Failed to delete task",
          variant: "destructive",
        });
        return;
      }

      setTasks(prev => prev.filter(task => task.id !== id));
      toast({
        title: "Success",
        description: "Task deleted successfully",
      });
    } catch (error) {
      console.error('Unexpected error:', error);
      toast({
        title: "Error",
        description: "An unexpected error occurred",
        variant: "destructive",
      });
    }
  };

  const getCurrentWeekMonday = () => {
    const today = new Date();
    const monday = new Date(today);
    monday.setDate(today.getDate() - today.getDay() + 1);
    return monday;
  };

  useEffect(() => {
    fetchTasks(getCurrentWeekMonday());
  }, []);

  return {
    tasks,
    loading,
    fetchTasks,
    addTask,
    updateTask,
    deleteTask,
    getCurrentWeekMonday,
    refetch: () => fetchTasks(getCurrentWeekMonday())
  };
}