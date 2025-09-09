import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Plus, Edit2, Trash2, Target, Calendar, Flag } from "lucide-react";
import { useGoals, Goal } from "@/hooks/useGoals";
import GoalForm from "@/components/forms/GoalForm";

export default function VisionGoalsPage() {
  const { goals, loading, addGoal, updateGoal, deleteGoal } = useGoals();
  const [showForm, setShowForm] = useState(false);
  const [editingGoal, setEditingGoal] = useState<Goal | null>(null);
  const [selectedTimeframe, setSelectedTimeframe] = useState<string>('1 Year');

  const timeframes = [
    { value: '1 Year', label: '1-Year Goals', color: 'bg-green-500' },
    { value: '3 Years', label: '3-Year Goals', color: 'bg-blue-500' },
    { value: '5 Years', label: '5-Year Goals', color: 'bg-purple-500' },
    { value: '10 Years', label: '10-Year Legacy', color: 'bg-gold' }
  ];

  const filteredGoals = goals.filter(goal => goal.timeframe === selectedTimeframe);

  const handleSubmit = async (goalData: Omit<Goal, 'id' | 'created_at' | 'updated_at'>) => {
    if (editingGoal) {
      await updateGoal(editingGoal.id, goalData);
    } else {
      await addGoal(goalData);
    }
    setShowForm(false);
    setEditingGoal(null);
  };

  const handleEdit = (goal: Goal) => {
    setEditingGoal(goal);
    setShowForm(true);
  };

  const handleDelete = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this goal?')) {
      await deleteGoal(id);
    }
  };

  const getCategoryColor = (category: string) => {
    const colors = {
      'Personal': 'bg-blue-100 text-blue-800',
      'Financial': 'bg-green-100 text-green-800',
      'Relationship': 'bg-pink-100 text-pink-800',
      'Family': 'bg-orange-100 text-orange-800',
      'Business': 'bg-purple-100 text-purple-800',
      'Health': 'bg-red-100 text-red-800',
      'Spiritual': 'bg-yellow-100 text-yellow-800'
    };
    return colors[category as keyof typeof colors] || 'bg-gray-100 text-gray-800';
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
      {/* Timeframe Navigation */}
      <div className="flex flex-wrap gap-2">
        {timeframes.map(timeframe => (
          <Button
            key={timeframe.value}
            variant={selectedTimeframe === timeframe.value ? "default" : "outline"}
            onClick={() => setSelectedTimeframe(timeframe.value)}
            className="flex items-center gap-2"
          >
            <div className={`w-3 h-3 rounded-full ${timeframe.color}`}></div>
            {timeframe.label}
          </Button>
        ))}
      </div>

      {/* Add Goal Button */}
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold romantic-heading">
          {timeframes.find(t => t.value === selectedTimeframe)?.label}
        </h2>
        <Button onClick={() => setShowForm(true)} className="flex items-center gap-2">
          <Plus className="h-4 w-4" />
          Add Goal
        </Button>
      </div>

      {/* Goal Form */}
      {showForm && (
        <GoalForm
          goal={editingGoal || undefined}
          onSubmit={handleSubmit}
          onCancel={() => {
            setShowForm(false);
            setEditingGoal(null);
          }}
        />
      )}

      {/* Goals List */}
      <div className="grid gap-6 md:grid-cols-2">
        {filteredGoals.length === 0 ? (
          <Card className="glass-card md:col-span-2">
            <CardContent className="flex flex-col items-center justify-center py-12">
              <Target className="h-12 w-12 text-muted-foreground mb-4" />
              <p className="text-muted-foreground text-center">
                No goals set for this timeframe yet. Add your first goal to get started!
              </p>
            </CardContent>
          </Card>
        ) : (
          filteredGoals.map(goal => (
            <Card key={goal.id} className="glass-card">
              <CardHeader className="pb-3">
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <CardTitle className="text-lg mb-2">{goal.title}</CardTitle>
                    <div className="flex gap-2 mb-2">
                      <Badge className={getCategoryColor(goal.category)}>
                        {goal.category}
                      </Badge>
                      {goal.deadline && (
                        <Badge variant="outline" className="flex items-center gap-1">
                          <Calendar className="h-3 w-3" />
                          {new Date(goal.deadline).toLocaleDateString()}
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
                {goal.description && (
                  <p className="text-sm text-muted-foreground">{goal.description}</p>
                )}
                
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm font-medium">Progress</span>
                    <span className="text-sm text-muted-foreground">{goal.progress}%</span>
                  </div>
                  <Progress value={goal.progress} className="h-2" />
                </div>

                {goal.milestones.length > 0 && (
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <Flag className="h-4 w-4" />
                      <span className="text-sm font-medium">Milestones</span>
                    </div>
                    <div className="space-y-1">
                      {goal.milestones.map((milestone, index) => (
                        <div key={index} className="text-sm text-muted-foreground pl-6">
                          • {milestone}
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
  );
}