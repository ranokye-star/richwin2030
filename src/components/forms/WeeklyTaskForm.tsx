import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { WeeklyTask } from "@/hooks/useWeeklyTasks";
import { Calendar } from "lucide-react";

interface WeeklyTaskFormProps {
  task?: WeeklyTask;
  onSubmit: (taskData: Omit<WeeklyTask, 'id' | 'created_at' | 'updated_at'>) => Promise<void>;
  onCancel: () => void;
  weekOf: Date;
}

export default function WeeklyTaskForm({ task, onSubmit, onCancel, weekOf }: WeeklyTaskFormProps) {
  const [formData, setFormData] = useState({
    user_name: 'Richmond' as 'Richmond' | 'Edwina',
    task_title: '',
    task_description: '',
    status: 'not-started' as 'not-started' | 'in-progress' | 'completed' | 'cancelled',
    priority: 'medium' as 'low' | 'medium' | 'high',
    week_of: weekOf.toISOString().split('T')[0],
    due_date: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (task) {
      setFormData({
        user_name: task.user_name,
        task_title: task.task_title,
        task_description: task.task_description || '',
        status: task.status,
        priority: task.priority,
        week_of: task.week_of,
        due_date: task.due_date || ''
      });
    }
  }, [task]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.task_title.trim()) return;

    setIsSubmitting(true);
    try {
      const submitData = {
        ...formData,
        task_description: formData.task_description || undefined,
        due_date: formData.due_date || undefined
      };
      await onSubmit(submitData);
    } finally {
      setIsSubmitting(false);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'text-green-600';
      case 'in-progress': return 'text-blue-600';
      case 'cancelled': return 'text-red-600';
      default: return 'text-gray-600';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'text-red-600';
      case 'medium': return 'text-yellow-600';
      case 'low': return 'text-green-600';
      default: return 'text-gray-600';
    }
  };

  return (
    <Card className="glass-card">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Calendar className="h-5 w-5" />
          {task ? 'Edit Task' : 'Add New Task'}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="user_name">Assigned To</Label>
              <Select
                value={formData.user_name}
                onValueChange={(value: 'Richmond' | 'Edwina') => 
                  setFormData(prev => ({ ...prev, user_name: value }))
                }
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Richmond">Richmond</SelectItem>
                  <SelectItem value="Edwina">Edwina</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="priority">Priority</Label>
              <Select
                value={formData.priority}
                onValueChange={(value: 'low' | 'medium' | 'high') => 
                  setFormData(prev => ({ ...prev, priority: value }))
                }
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="low" className={getPriorityColor('low')}>Low</SelectItem>
                  <SelectItem value="medium" className={getPriorityColor('medium')}>Medium</SelectItem>
                  <SelectItem value="high" className={getPriorityColor('high')}>High</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="task_title">Task Title</Label>
            <Input
              id="task_title"
              value={formData.task_title}
              onChange={(e) => setFormData(prev => ({ ...prev, task_title: e.target.value }))}
              placeholder="Enter task title..."
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="task_description">Description (Optional)</Label>
            <Textarea
              id="task_description"
              value={formData.task_description}
              onChange={(e) => setFormData(prev => ({ ...prev, task_description: e.target.value }))}
              placeholder="Add task details..."
              rows={3}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="status">Status</Label>
              <Select
                value={formData.status}
                onValueChange={(value: 'not-started' | 'in-progress' | 'completed' | 'cancelled') => 
                  setFormData(prev => ({ ...prev, status: value }))
                }
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="not-started" className={getStatusColor('not-started')}>Not Started</SelectItem>
                  <SelectItem value="in-progress" className={getStatusColor('in-progress')}>In Progress</SelectItem>
                  <SelectItem value="completed" className={getStatusColor('completed')}>Completed</SelectItem>
                  <SelectItem value="cancelled" className={getStatusColor('cancelled')}>Cancelled</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="due_date">Due Date (Optional)</Label>
              <Input
                id="due_date"
                type="date"
                value={formData.due_date}
                onChange={(e) => setFormData(prev => ({ ...prev, due_date: e.target.value }))}
              />
            </div>
          </div>

          <div className="flex gap-2 pt-4">
            <Button type="submit" disabled={isSubmitting || !formData.task_title.trim()}>
              {isSubmitting ? 'Saving...' : task ? 'Update Task' : 'Add Task'}
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