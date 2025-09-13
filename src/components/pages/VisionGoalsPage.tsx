import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Plus, Edit2, Trash2, Target, Calendar, Flag, CheckSquare, Clock, User } from "lucide-react";
import { useGoals, Goal } from "@/hooks/useGoals";
import { useWeeklyTasks, WeeklyTask } from "@/hooks/useWeeklyTasks";
import GoalForm from "@/components/forms/GoalForm";
import WeeklyTaskForm from "@/components/forms/WeeklyTaskForm";

export default function VisionGoalsPage() {
  const { goals, loading, addGoal, updateGoal, deleteGoal } = useGoals();
  const { tasks, loading: tasksLoading, addTask, updateTask, deleteTask, getCurrentWeekMonday } = useWeeklyTasks();
  const [showForm, setShowForm] = useState(false);
  const [showTaskForm, setShowTaskForm] = useState(false);
  const [editingGoal, setEditingGoal] = useState<Goal | null>(null);
  const [editingTask, setEditingTask] = useState<WeeklyTask | null>(null);
  const [selectedTimeframe, setSelectedTimeframe] = useState<string>('1-Year');

  const timeframes = [
    { value: '1-Year', label: '1-Year Goals', color: 'bg-green-500' },
    { value: '3-Year', label: '3-Year Goals', color: 'bg-blue-500' },
    { value: '5-Year', label: '5-Year Goals', color: 'bg-purple-500' },
    { value: '10-Year', label: '10-Year Legacy', color: 'bg-gold' }
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

  const handleSubmitTask = async (taskData: Omit<WeeklyTask, 'id' | 'created_at' | 'updated_at'>) => {
    if (editingTask) {
      await updateTask(editingTask.id, taskData);
    } else {
      await addTask(taskData);
    }
    setShowTaskForm(false);
    setEditingTask(null);
  };

  const handleEditTask = (task: WeeklyTask) => {
    setEditingTask(task);
    setShowTaskForm(true);
  };

  const handleDeleteTask = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this task?')) {
      await deleteTask(id);
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

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'bg-green-100 text-green-800';
      case 'in-progress': return 'bg-blue-100 text-blue-800';
      case 'cancelled': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-red-100 text-red-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'low': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getWeekRange = () => {
    const monday = getCurrentWeekMonday();
    const sunday = new Date(monday);
    sunday.setDate(monday.getDate() + 6);
    
    return `${monday.toLocaleDateString()} - ${sunday.toLocaleDateString()}`;
  };

  if (loading || tasksLoading) {
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
        <h2 className="text-2xl font-bold romantic-heading">Vision & Goals</h2>
      </div>

      <Tabs defaultValue="weekly-tasks" className="space-y-6">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="weekly-tasks">Weekly To-Do List</TabsTrigger>
          <TabsTrigger value="goals">Future Goals</TabsTrigger>
        </TabsList>

        <TabsContent value="weekly-tasks" className="space-y-6">
          <div className="flex justify-between items-center">
            <div>
              <h3 className="text-lg font-semibold text-primary">Weekly Tasks</h3>
              <p className="text-sm text-muted-foreground">Week of {getWeekRange()}</p>
            </div>
            <Button onClick={() => setShowTaskForm(true)} className="flex items-center gap-2">
              <Plus className="h-4 w-4" />
              Add Task
            </Button>
          </div>

          {showTaskForm && (
            <WeeklyTaskForm
              task={editingTask || undefined}
              onSubmit={handleSubmitTask}
              onCancel={() => {
                setShowTaskForm(false);
                setEditingTask(null);
              }}
              weekOf={getCurrentWeekMonday()}
            />
          )}

          <div className="grid gap-4">
            {tasks.length === 0 ? (
              <Card className="glass-card">
                <CardContent className="flex flex-col items-center justify-center py-12">
                  <CheckSquare className="h-12 w-12 text-muted-foreground mb-4" />
                  <p className="text-muted-foreground text-center">
                    No tasks for this week yet. Add your first task to get started!
                  </p>
                </CardContent>
              </Card>
            ) : (
              <div className="space-y-4">
                {['Richmond', 'Edwina'].map(userName => (
                  <div key={userName} className="space-y-3">
                    <div className="flex items-center gap-2">
                      <User className="h-5 w-5 text-primary" />
                      <h4 className="text-lg font-semibold text-primary">{userName}'s Tasks</h4>
                    </div>
                    <div className="grid gap-3">
                      {tasks
                        .filter(task => task.user_name === userName)
                        .map(task => (
                          <Card key={task.id} className="glass-card">
                            <CardContent className="p-4">
                              <div className="flex justify-between items-start">
                                <div className="flex-1">
                                  <div className="flex items-center gap-2 mb-2">
                                    <h5 className="font-medium">{task.task_title}</h5>
                                    <Badge className={getStatusColor(task.status)}>
                                      {task.status.replace('-', ' ')}
                                    </Badge>
                                    <Badge variant="outline" className={getPriorityColor(task.priority)}>
                                      {task.priority}
                                    </Badge>
                                  </div>
                                  {task.task_description && (
                                    <p className="text-sm text-muted-foreground mb-2">{task.task_description}</p>
                                  )}
                                  <div className="flex items-center gap-4 text-xs text-muted-foreground">
                                    {task.due_date && (
                                      <div className="flex items-center gap-1">
                                        <Calendar className="h-3 w-3" />
                                        Due: {new Date(task.due_date).toLocaleDateString()}
                                      </div>
                                    )}
                                    <div className="flex items-center gap-1">
                                      <Clock className="h-3 w-3" />
                                      Updated: {new Date(task.updated_at).toLocaleDateString()}
                                    </div>
                                  </div>
                                </div>
                                <div className="flex gap-1">
                                  <Button variant="ghost" size="sm" onClick={() => handleEditTask(task)}>
                                    <Edit2 className="h-4 w-4" />
                                  </Button>
                                  <Button variant="ghost" size="sm" onClick={() => handleDeleteTask(task.id)}>
                                    <Trash2 className="h-4 w-4" />
                                  </Button>
                                </div>
                              </div>
                            </CardContent>
                          </Card>
                        ))}
                      {tasks.filter(task => task.user_name === userName).length === 0 && (
                        <Card className="glass-card border-dashed">
                          <CardContent className="p-4 text-center text-muted-foreground">
                            No tasks assigned to {userName} this week
                          </CardContent>
                        </Card>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </TabsContent>

        <TabsContent value="goals" className="space-y-6">
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
            <h3 className="text-lg font-semibold text-primary">
              {timeframes.find(t => t.value === selectedTimeframe)?.label}
            </h3>
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
        </TabsContent>
      </Tabs>
    </div>
  );
}