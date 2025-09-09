import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Plus, Edit2, Trash2, TrendingUp, Target } from "lucide-react";
import { useGrowth } from "@/hooks/useGrowth";
import GrowthEntryForm from "@/components/forms/GrowthEntryForm";

export default function GrowthPage() {
  const { growthEntries, loading, addGrowthEntry, updateGrowthEntry, deleteGrowthEntry } = useGrowth();
  const [showForm, setShowForm] = useState(false);
  const [editingEntry, setEditingEntry] = useState(null);

  const handleSubmit = async (entryData: any) => {
    if (editingEntry) {
      await updateGrowthEntry(editingEntry.id, entryData);
    } else {
      await addGrowthEntry(entryData);
    }
    setShowForm(false);
    setEditingEntry(null);
  };

  const handleEdit = (entry: any) => {
    setEditingEntry(entry);
    setShowForm(true);
  };

  const handleDelete = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this growth entry?')) {
      await deleteGrowthEntry(id);
    }
  };

  const getCategoryColor = (category: string) => {
    const colors = {
      'Love': 'bg-pink-100 text-pink-800',
      'Career': 'bg-blue-100 text-blue-800',
      'Finance': 'bg-green-100 text-green-800',
      'Health': 'bg-red-100 text-red-800',
      'Spiritual': 'bg-purple-100 text-purple-800',
      'Personal': 'bg-yellow-100 text-yellow-800'
    };
    return colors[category as keyof typeof colors] || 'bg-gray-100 text-gray-800';
  };

  const getScoreColor = (score: number) => {
    if (score >= 8) return 'text-green-600';
    if (score >= 6) return 'text-yellow-600';
    return 'text-red-600';
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
        <h2 className="text-2xl font-bold romantic-heading">Personal Growth Tracker</h2>
        <Button onClick={() => setShowForm(true)} className="flex items-center gap-2">
          <Plus className="h-4 w-4" />
          Add Growth Entry
        </Button>
      </div>

      {showForm && (
        <GrowthEntryForm
          entry={editingEntry || undefined}
          onSubmit={handleSubmit}
          onCancel={() => {
            setShowForm(false);
            setEditingEntry(null);
          }}
        />
      )}

      <div className="grid gap-6 md:grid-cols-2">
        {growthEntries.length === 0 ? (
          <Card className="glass-card md:col-span-2">
            <CardContent className="flex flex-col items-center justify-center py-12">
              <TrendingUp className="h-12 w-12 text-muted-foreground mb-4" />
              <p className="text-muted-foreground text-center">
                No growth entries yet. Start tracking your personal development!
              </p>
            </CardContent>
          </Card>
        ) : (
          growthEntries.map(entry => (
            <Card key={entry.id} className="glass-card">
              <CardHeader className="pb-3">
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <CardTitle className="text-lg mb-2 flex items-center gap-2">
                      <TrendingUp className="h-4 w-4" />
                      {entry.category} Growth
                    </CardTitle>
                    <div className="flex gap-2 mb-2">
                      <Badge className={getCategoryColor(entry.category)}>
                        {entry.category}
                      </Badge>
                      <Badge variant="outline">
                        {new Date(entry.entry_date).toLocaleDateString()}
                      </Badge>
                    </div>
                  </div>
                  <div className="flex gap-1">
                    <Button variant="ghost" size="sm" onClick={() => handleEdit(entry)}>
                      <Edit2 className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="sm" onClick={() => handleDelete(entry.id)}>
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardHeader>
              
              <CardContent className="space-y-4">
                <div className="text-center">
                  <div className={`text-4xl font-bold ${getScoreColor(entry.score)}`}>
                    {entry.score}/10
                  </div>
                  <div className="text-sm text-muted-foreground">Growth Score</div>
                </div>
                
                <Progress value={entry.score * 10} className="h-2" />
                
                {entry.notes && (
                  <p className="text-sm text-muted-foreground">{entry.notes}</p>
                )}
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
  );
}