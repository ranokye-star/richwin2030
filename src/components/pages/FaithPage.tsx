import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Plus, Edit2, Trash2, Church, BookOpen, Heart } from "lucide-react";
import { useFaith } from "@/hooks/useFaith";
import ScriptureForm from "@/components/forms/ScriptureForm";

export default function FaithPage() {
  const { scriptureReflections, prayerRequests, loading, addScriptureReflection, deleteScriptureReflection } = useFaith();
  const [showForm, setShowForm] = useState(false);
  const [editingReflection, setEditingReflection] = useState(null);

  const handleSubmit = async (reflectionData: any) => {
    if (editingReflection) {
      // Update functionality can be added later
    } else {
      await addScriptureReflection(reflectionData);
    }
    setShowForm(false);
    setEditingReflection(null);
  };

  const handleEdit = (reflection: any) => {
    setEditingReflection(reflection);
    setShowForm(true);
  };

  const handleDelete = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this scripture reflection?')) {
      await deleteScriptureReflection(id);
    }
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
        <h2 className="text-2xl font-bold romantic-heading">Faith & Spiritual Growth</h2>
        <Button onClick={() => setShowForm(true)} className="flex items-center gap-2">
          <Plus className="h-4 w-4" />
          Add Scripture Reflection
        </Button>
      </div>

      {showForm && (
        <ScriptureForm
          reflection={editingReflection || undefined}
          onSubmit={handleSubmit}
          onCancel={() => {
            setShowForm(false);
            setEditingReflection(null);
          }}
        />
      )}

      <div className="grid gap-6 md:grid-cols-2">
        {scriptureReflections.length === 0 ? (
          <Card className="glass-card md:col-span-2">
            <CardContent className="flex flex-col items-center justify-center py-12">
              <Church className="h-12 w-12 text-muted-foreground mb-4" />
              <p className="text-muted-foreground text-center">
                No scripture reflections yet. Start your spiritual journey!
              </p>
            </CardContent>
          </Card>
        ) : (
          scriptureReflections.map(reflection => (
            <Card key={reflection.id} className="glass-card">
              <CardHeader className="pb-3">
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <CardTitle className="text-lg mb-2 flex items-center gap-2">
                      <BookOpen className="h-4 w-4" />
                      {reflection.reference}
                    </CardTitle>
                    <Badge variant="outline">
                      {new Date(reflection.date_studied).toLocaleDateString()}
                    </Badge>
                  </div>
                  <div className="flex gap-1">
                    <Button variant="ghost" size="sm" onClick={() => handleEdit(reflection)}>
                      <Edit2 className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="sm" onClick={() => handleDelete(reflection.id)}>
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardHeader>
              
              <CardContent className="space-y-4">
                <div className="bg-muted/50 p-3 rounded-lg">
                  <p className="text-sm italic">"{reflection.verse}"</p>
                </div>
                
                <div>
                  <h4 className="font-medium mb-2 flex items-center gap-2">
                    <Heart className="h-4 w-4" />
                    Reflection
                  </h4>
                  <p className="text-sm text-muted-foreground">{reflection.reflection}</p>
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
  );
}