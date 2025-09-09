import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

export interface SavingsGoal {
  id: string;
  goal_name: string;
  target_amount: number;
  current_amount: number;
  deadline?: string;
  created_at?: string;
}

export interface IncomeSource {
  id: string;
  source_name: string;
  monthly_amount: number;
  user_id?: string;
  created_at?: string;
}

export interface BudgetItem {
  id: string;
  item_name: string;
  category: string;
  amount: number;
  item_type: 'income' | 'expense';
  created_at?: string;
}

export interface BusinessVenture {
  id: string;
  name: string;
  investment: number;
  current_value: number;
  status: 'active' | 'planning' | 'completed';
  created_at?: string;
}

export function useFinance() {
  const [savingsGoals, setSavingsGoals] = useState<SavingsGoal[]>([]);
  const [incomeStreams, setIncomeStreams] = useState<IncomeSource[]>([]);
  const [budgetItems, setBudgetItems] = useState<BudgetItem[]>([]);
  const [businessVentures, setBusinessVentures] = useState<BusinessVenture[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  const fetchFinanceData = async () => {
    try {
      const [savingsResult, incomeResult, budgetResult, businessResult] = await Promise.all([
        supabase.from('savings_goals').select('*').order('created_at', { ascending: false }),
        supabase.from('income_sources').select('*').order('created_at', { ascending: false }),
        supabase.from('budget_items').select('*').order('created_at', { ascending: false }),
        supabase.from('business_ventures').select('*').order('created_at', { ascending: false })
      ]);

      if (savingsResult.error) throw savingsResult.error;
      if (incomeResult.error) throw incomeResult.error;
      if (budgetResult.error) throw budgetResult.error;
      if (businessResult.error) throw businessResult.error;

      setSavingsGoals(savingsResult.data || []);
      setIncomeStreams(incomeResult.data || []);
      
      const typedBudgetItems = (budgetResult.data || []).map(item => ({
        ...item,
        item_type: item.item_type as 'income' | 'expense'
      })) as BudgetItem[];
      setBudgetItems(typedBudgetItems);
      
      const typedBusinessVentures = (businessResult.data || []).map(venture => ({
        ...venture,
        status: venture.status as 'active' | 'planning' | 'completed'
      })) as BusinessVenture[];
      setBusinessVentures(typedBusinessVentures);
    } catch (error) {
      console.error('Error fetching finance data:', error);
      toast({
        title: "Error",
        description: "Failed to load finance data",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const addSavingsGoal = async (goal: Omit<SavingsGoal, 'id' | 'created_at'>) => {
    try {
      const { data, error } = await supabase
        .from('savings_goals')
        .insert([goal])
        .select()
        .single();

      if (error) throw error;
      setSavingsGoals(prev => [data, ...prev]);
      toast({ title: "Success", description: "Savings goal added successfully" });
      return data;
    } catch (error) {
      console.error('Error adding savings goal:', error);
      toast({ title: "Error", description: "Failed to add savings goal", variant: "destructive" });
    }
  };

  const updateSavingsGoal = async (id: string, updates: Partial<SavingsGoal>) => {
    try {
      const { data, error } = await supabase
        .from('savings_goals')
        .update(updates)
        .eq('id', id)
        .select()
        .single();

      if (error) throw error;
      setSavingsGoals(prev => prev.map(goal => goal.id === id ? data : goal));
      toast({ title: "Success", description: "Savings goal updated successfully" });
      return data;
    } catch (error) {
      console.error('Error updating savings goal:', error);
      toast({ title: "Error", description: "Failed to update savings goal", variant: "destructive" });
    }
  };

  const deleteSavingsGoal = async (id: string) => {
    try {
      const { error } = await supabase.from('savings_goals').delete().eq('id', id);
      if (error) throw error;
      setSavingsGoals(prev => prev.filter(goal => goal.id !== id));
      toast({ title: "Success", description: "Savings goal deleted successfully" });
    } catch (error) {
      console.error('Error deleting savings goal:', error);
      toast({ title: "Error", description: "Failed to delete savings goal", variant: "destructive" });
    }
  };

  useEffect(() => {
    fetchFinanceData();
  }, []);

  return {
    savingsGoals,
    incomeStreams,
    budgetItems,
    businessVentures,
    loading,
    addSavingsGoal,
    updateSavingsGoal,
    deleteSavingsGoal,
    refetch: fetchFinanceData
  };
}