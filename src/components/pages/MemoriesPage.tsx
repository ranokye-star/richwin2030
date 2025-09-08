import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Plus, Edit2, Trash2, Camera, Heart, Calendar, MapPin } from "lucide-react";
import { useMemories } from "@/hooks/useMemories";
import MemoryForm from "@/components/forms/MemoryForm";

export default function MemoriesPage() {
  const { memories, loveLetters, journalEntries, loading, addMemory, updateMemory, deleteMemory } = useMemories();
  const [showMemoryForm, setShowMemoryForm] = useState(false);
  const [editingMemory, setEditingMemory] = useState(null);

  const handleSubmitMemory = async (memoryData: any) => {
    if (editingMemory) {
      await updateMemory(editingMemory.id, memoryData);
    } else {
      await addMemory(memoryData);
    }
    setShowMemoryForm(false);
    setEditingMemory(null);
  };

  const handleDeleteMemory = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this memory?')) {
      await deleteMemory(id);
    }
  };

  const getMemoryTypeIcon = (type: string) => {
    switch (type) {
      case 'photo': return <Camera className="h-4 w-4" />;
      case 'milestone': return <Calendar className="h-4 w-4" />;
      case 'special': return <Heart className="h-4 w-4" />;
      default: return <Camera className="h-4 w-4" />;
    }
  };

  const getMemoryTypeColor = (type: string) => {
    switch (type) {
      case 'photo': return 'bg-blue-100 text-blue-800';
      case 'milestone': return 'bg-green-100 text-green-800';
      case 'special': return 'bg-pink-100 text-pink-800';
      default: return 'bg-gray-100 text-gray-800';
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
        <h2 className="text-2xl font-bold romantic-heading">Memories & Journal</h2>
      </div>

      <Tabs defaultValue="timeline" className="space-y-6">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="timeline">Our Story Timeline</TabsTrigger>
          <TabsTrigger value="letters">Love Letters</TabsTrigger>
          <TabsTrigger value="journal">Joint Journal</TabsTrigger>
        </TabsList>

        <TabsContent value="timeline" className="space-y-6">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-semibold">Timeline of Memories</h3>
            <Button onClick={() => setShowMemoryForm(true)} className="flex items-center gap-2">
              <Plus className="h-4 w-4" />
              Add Memory
            </Button>
          </div>

          {showMemoryForm && (
            <MemoryForm
              memory={editingMemory}
              onSubmit={handleSubmitMemory}
              onCancel={() => {
                setShowMemoryForm(false);
                setEditingMemory(null);
              }}
            />
          )}

          <div className="space-y-4">
            {memories.length === 0 ? (
              <Card className="glass-card">
                <CardContent className="flex flex-col items-center justify-center py-12">
                  <Camera className="h-12 w-12 text-muted-foreground mb-4" />
                  <p className="text-muted-foreground text-center">
                    No memories added yet. Start building your timeline!
                  </p>
                </CardContent>
              </Card>
            ) : (
              memories.map(memory => (
                <Card key={memory.id} className="glass-card">
                  <CardHeader className="pb-3">
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <CardTitle className="text-lg">{memory.title}</CardTitle>
                          <Badge className={getMemoryTypeColor(memory.memory_type)}>
                            {getMemoryTypeIcon(memory.memory_type)}
                            {memory.memory_type}
                          </Badge>
                        </div>
                        <div className="flex items-center gap-4 text-sm text-muted-foreground">
                          <div className="flex items-center gap-1">
                            <Calendar className="h-4 w-4" />
                            {new Date(memory.date).toLocaleDateString()}
                          </div>
                          {memory.location && (
                            <div className="flex items-center gap-1">
                              <MapPin className="h-4 w-4" />
                              {memory.location}
                            </div>
                          )}
                        </div>
                      </div>
                      <div className="flex gap-1">
                        <Button variant="ghost" size="sm" onClick={() => {
                          setEditingMemory(memory);
                          setShowMemoryForm(true);
                        }}>
                          <Edit2 className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="sm" onClick={() => handleDeleteMemory(memory.id)}>
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </CardHeader>
                  
                  <CardContent>
                    {memory.photo_url && (
                      <div className="mb-4">
                        <img 
                          src={memory.photo_url} 
                          alt={memory.title}
                          className="w-full h-48 object-cover rounded-lg"
                        />
                      </div>
                    )}
                    {memory.description && (
                      <p className="text-sm text-muted-foreground">{memory.description}</p>
                    )}
                  </CardContent>
                </Card>
              ))
            )}
          </div>
        </TabsContent>

        <TabsContent value="letters" className="space-y-6">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-semibold">Love Letters</h3>
            <Button className="flex items-center gap-2">
              <Plus className="h-4 w-4" />
              Write Letter
            </Button>
          </div>

          <Card className="glass-card">
            <CardContent className="flex flex-col items-center justify-center py-12">
              <Heart className="h-12 w-12 text-muted-foreground mb-4" />
              <p className="text-muted-foreground text-center">
                No love letters yet. Write your first romantic message!
              </p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="journal" className="space-y-6">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-semibold">Weekly Journal Entries</h3>
            <Button className="flex items-center gap-2">
              <Plus className="h-4 w-4" />
              New Entry
            </Button>
          </div>

          <Card className="glass-card">
            <CardContent className="flex flex-col items-center justify-center py-12">
              <Calendar className="h-12 w-12 text-muted-foreground mb-4" />
              <p className="text-muted-foreground text-center">
                No journal entries yet. Start reflecting on your week together!
              </p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}