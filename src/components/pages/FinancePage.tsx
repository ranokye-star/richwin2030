import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Plus, Edit2, Trash2, DollarSign, Target, TrendingUp } from "lucide-react";
import { useFinance } from "@/hooks/useFinance";
import SavingsGoalForm from "@/components/forms/SavingsGoalForm";

export default function FinancePage() {
  const { savingsGoals, loading, addSavingsGoal, updateSavingsGoal, deleteSavingsGoal } = useFinance();
  const [showForm, setShowForm] = useState(false);
  const [editingGoal, setEditingGoal] = useState(null);

  const handleSubmit = async (goalData: any) => {
    if (editingGoal) {
      await updateSavingsGoal(editingGoal.id, goalData);
    } else {
      await addSavingsGoal(goalData);
    }
    setShowForm(false);
    setEditingGoal(null);
  };

  const handleEdit = (goal: any) => {
    setEditingGoal(goal);
    setShowForm(true);
  };

  const handleDelete = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this savings goal?')) {
      await deleteSavingsGoal(id);
    }
  };

  const getProgressPercentage = (current: number, target: number) => {
    return Math.min((current / target) * 100, 100);
  };

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="animate-pulse space-y-4">
          {[1, 2, 3].map(i => (
            <Card key={i} className="glass-card">
              <CardContent className="p-6">
                <div className="h-4 bg-muted rounded w-3/4 mb-2"></div>
                <div className="h-4 bg-muted rounded w-1/2"></div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold romantic-heading">Finance & Wealth Vision</h2>
        <Button onClick={() => setShowForm(true)} className="flex items-center gap-2">
          <Plus className="h-4 w-4" />
          Add Savings Goal
        </Button>
      </div>

      {showForm && (
        <SavingsGoalForm
          goal={editingGoal || undefined}
          onSubmit={handleSubmit}
          onCancel={() => {
            setShowForm(false);
            setEditingGoal(null);
          }}
        />
      )}

      <div className="grid gap-6 md:grid-cols-2">
        {savingsGoals.length === 0 ? (
          <Card className="glass-card md:col-span-2">
            <CardContent className="flex flex-col items-center justify-center py-12">
              <DollarSign className="h-12 w-12 text-muted-foreground mb-4" />
              <p className="text-muted-foreground text-center">
                No savings goals set yet. Add your first financial goal to get started!
              </p>
            </CardContent>
          </Card>
        ) : (
          savingsGoals.map(goal => (
            <Card key={goal.id} className="glass-card">
              <CardHeader className="pb-3">
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <CardTitle className="text-lg mb-2 flex items-center gap-2">
                      <Target className="h-4 w-4" />
                      {goal.goal_name}
                    </CardTitle>
                    <div className="flex gap-2 mb-2">
                      <Badge variant="secondary" className="flex items-center gap-1">
                        <DollarSign className="h-3 w-3" />
                        ${goal.target_amount.toLocaleString()}
                      </Badge>
                      {goal.deadline && (
                        <Badge variant="outline">
                          Due: {new Date(goal.deadline).toLocaleDateString()}
                        </Badge>
                      )}
                    </div>
                  </div>
                  <div className="flex gap-1">
                    <Button variant="ghost" size="sm" onClick={() => handleEdit(goal)}>
                      <Edit2 className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="sm" onClick={() => handleDelete(goal.id)}>
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardHeader>
              
              <CardContent className="space-y-4">
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm font-medium">Progress</span>
                    <span className="text-sm text-muted-foreground">
                      ${goal.current_amount.toLocaleString()} / ${goal.target_amount.toLocaleString()}
                    </span>
                  </div>
                  <Progress value={getProgressPercentage(goal.current_amount, goal.target_amount)} className="h-2" />
                  <div className="text-center mt-2">
                    <span className="text-lg font-bold text-primary">
                      {getProgressPercentage(goal.current_amount, goal.target_amount).toFixed(1)}%
                    </span>
                  </div>
                </div>
                
                <div className="flex justify-between text-sm text-muted-foreground">
                  <span>Remaining: ${(goal.target_amount - goal.current_amount).toLocaleString()}</span>
                  <TrendingUp className="h-4 w-4" />
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
  );
}