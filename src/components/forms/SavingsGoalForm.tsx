import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { SavingsGoal } from "@/hooks/useFinance";

interface SavingsGoalFormProps {
  goal?: SavingsGoal;
  onSubmit: (goal: Omit<SavingsGoal, 'id' | 'created_at'>) => Promise<void>;
  onCancel: () => void;
}

export default function SavingsGoalForm({ goal, onSubmit, onCancel }: SavingsGoalFormProps) {
  const [formData, setFormData] = useState({
    goal_name: goal?.goal_name || '',
    target_amount: goal?.target_amount || 0,
    current_amount: goal?.current_amount || 0,
    deadline: goal?.deadline || ''
  });

  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      await onSubmit(formData);
      onCancel();
    } catch (error) {
      console.error('Error submitting savings goal:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="glass-card">
      <CardHeader>
        <CardTitle>{goal ? 'Edit Savings Goal' : 'Add New Savings Goal'}</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="goal_name">Goal Name</Label>
            <Input
              id="goal_name"
              value={formData.goal_name}
              onChange={(e) => setFormData(prev => ({ ...prev, goal_name: e.target.value }))}
              placeholder="Enter savings goal name"
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="target_amount">Target Amount ($)</Label>
              <Input
                id="target_amount"
                type="number"
                min="0"
                step="0.01"
                value={formData.target_amount}
                onChange={(e) => setFormData(prev => ({ ...prev, target_amount: parseFloat(e.target.value) || 0 }))}
                required
              />
            </div>

            <div>
              <Label htmlFor="current_amount">Current Amount ($)</Label>
              <Input
                id="current_amount"
                type="number"
                min="0"
                step="0.01"
                value={formData.current_amount}
                onChange={(e) => setFormData(prev => ({ ...prev, current_amount: parseFloat(e.target.value) || 0 }))}
              />
            </div>
          </div>

          <div>
            <Label htmlFor="deadline">Target Date (Optional)</Label>
            <Input
              id="deadline"
              type="date"
              value={formData.deadline}
              onChange={(e) => setFormData(prev => ({ ...prev, deadline: e.target.value }))}
            />
          </div>

          <div className="flex gap-2 pt-4">
            <Button type="submit" disabled={loading || !formData.goal_name || formData.target_amount <= 0}>
              {loading ? 'Saving...' : (goal ? 'Update Goal' : 'Add Goal')}
            </Button>
            <Button type="button" variant="outline" onClick={onCancel}>
              Cancel
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}