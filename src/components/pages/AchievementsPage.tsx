import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Plus, Edit2, Trash2, Trophy, Star } from "lucide-react";
import { useAchievements, Achievement } from "@/hooks/useAchievements";
import AchievementForm from "@/components/forms/AchievementForm";

export default function AchievementsPage() {
  const { achievements, loading, addAchievement, updateAchievement, deleteAchievement } = useAchievements();
  const [showForm, setShowForm] = useState(false);
  const [editingAchievement, setEditingAchievement] = useState<Achievement | null>(null);

  const handleSubmit = async (achievementData: Omit<Achievement, 'id' | 'created_at'>) => {
    if (editingAchievement) {
      await updateAchievement(editingAchievement.id, achievementData);
    } else {
      await addAchievement(achievementData);
    }
    setShowForm(false);
    setEditingAchievement(null);
  };

  const handleEdit = (achievement: Achievement) => {
    setEditingAchievement(achievement);
    setShowForm(true);
  };

  const handleDelete = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this achievement?')) {
      await deleteAchievement(id);
    }
  };

  const getImpactColor = (level: string) => {
    const colors = {
      'low': 'bg-green-100 text-green-800',
      'medium': 'bg-yellow-100 text-yellow-800',
      'high': 'bg-red-100 text-red-800'
    };
    return colors[level as keyof typeof colors] || 'bg-gray-100 text-gray-800';
  };

  const getCategoryIcon = (category: string) => {
    return <Trophy className="h-4 w-4" />;
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
        <h2 className="text-2xl font-bold romantic-heading">Achievements Tracker</h2>
        <Button onClick={() => setShowForm(true)} className="flex items-center gap-2">
          <Plus className="h-4 w-4" />
          Add Achievement
        </Button>
      </div>

      {showForm && (
        <AchievementForm
          achievement={editingAchievement || undefined}
          onSubmit={handleSubmit}
          onCancel={() => {
            setShowForm(false);
            setEditingAchievement(null);
          }}
        />
      )}

      <div className="grid gap-6 md:grid-cols-2">
        {achievements.length === 0 ? (
          <Card className="glass-card md:col-span-2">
            <CardContent className="flex flex-col items-center justify-center py-12">
              <Trophy className="h-12 w-12 text-muted-foreground mb-4" />
              <p className="text-muted-foreground text-center">
                No achievements recorded yet. Add your first win to get started!
              </p>
            </CardContent>
          </Card>
        ) : (
          achievements.map(achievement => (
            <Card key={achievement.id} className="glass-card">
              <CardHeader className="pb-3">
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <CardTitle className="text-lg mb-2 flex items-center gap-2">
                      {getCategoryIcon(achievement.category)}
                      {achievement.title}
                    </CardTitle>
                    <div className="flex gap-2 mb-2">
                      <Badge variant="secondary">{achievement.category}</Badge>
                      <Badge className={getImpactColor(achievement.impact_level)}>
                        <Star className="h-3 w-3 mr-1" />
                        {achievement.impact_level}
                      </Badge>
                    </div>
                  </div>
                  <div className="flex gap-1">
                    <Button variant="ghost" size="sm" onClick={() => handleEdit(achievement)}>
                      <Edit2 className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="sm" onClick={() => handleDelete(achievement.id)}>
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardHeader>
              
              <CardContent className="space-y-4">
                {achievement.description && (
                  <p className="text-sm text-muted-foreground">{achievement.description}</p>
                )}
                
                <div className="text-sm text-muted-foreground">
                  Achieved on: {new Date(achievement.date_achieved).toLocaleDateString()}
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
  );
}