import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Plus, Edit2, Trash2, Camera, Heart, Calendar, MapPin, BookOpen, User } from "lucide-react";
import { useMemories } from "@/hooks/useMemories";
import { useTimeline } from "@/hooks/useTimeline";
import MemoryForm from "@/components/forms/MemoryForm";
import LoveLetterForm from "@/components/forms/LoveLetterForm";
import JournalEntryForm from "@/components/forms/JournalEntryForm";
import TimelineForm from "@/components/forms/TimelineForm";

export default function MemoriesPage() {
  const { 
    memories, 
    loveLetters, 
    journalEntries, 
    loading: memoriesLoading, 
    addMemory, 
    addLoveLetter, 
    addJournalEntry,
    updateMemory, 
    updateLoveLetter,
    updateJournalEntry,
    deleteMemory,
    deleteLoveLetter,
    deleteJournalEntry
  } = useMemories();

  const {
    timelineEvents,
    loading: timelineLoading,
    addTimelineEvent,
    updateTimelineEvent,
    deleteTimelineEvent
  } = useTimeline();
  
  const [showMemoryForm, setShowMemoryForm] = useState(false);
  const [showLetterForm, setShowLetterForm] = useState(false);
  const [showJournalForm, setShowJournalForm] = useState(false);
  const [showTimelineForm, setShowTimelineForm] = useState(false);
  const [editingMemory, setEditingMemory] = useState(null);
  const [editingLetter, setEditingLetter] = useState(null);
  const [editingJournal, setEditingJournal] = useState(null);
  const [editingTimeline, setEditingTimeline] = useState(null);

  const loading = memoriesLoading || timelineLoading;

  const handleSubmitMemory = async (memoryData: any) => {
    if (editingMemory) {
      await updateMemory(editingMemory.id, memoryData);
    } else {
      await addMemory(memoryData);
    }
    setShowMemoryForm(false);
    setEditingMemory(null);
  };

  const handleSubmitLetter = async (letterData: any) => {
    if (editingLetter) {
      await updateLoveLetter(editingLetter.id, letterData);
    } else {
      await addLoveLetter(letterData);
    }
    setShowLetterForm(false);
    setEditingLetter(null);
  };

  const handleSubmitJournal = async (journalData: any) => {
    if (editingJournal) {
      await updateJournalEntry(editingJournal.id, journalData);
    } else {
      await addJournalEntry(journalData);
    }
    setShowJournalForm(false);
    setEditingJournal(null);
  };

  const handleDeleteMemory = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this memory?')) {
      await deleteMemory(id);
    }
  };

  const handleDeleteLetter = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this love letter?')) {
      await deleteLoveLetter(id);
    }
  };

  const handleDeleteJournal = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this journal entry?')) {
      await deleteJournalEntry(id);
    }
  };

  const handleSubmitTimeline = async (timelineData: any) => {
    if (editingTimeline) {
      await updateTimelineEvent(editingTimeline.id, timelineData);
    } else {
      await addTimelineEvent(timelineData);
    }
    setShowTimelineForm(false);
    setEditingTimeline(null);
  };

  const handleDeleteTimeline = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this timeline event?')) {
      await deleteTimelineEvent(id);
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

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'milestone': return 'bg-green-50 text-green-700 border-green-200';
      case 'memory': return 'bg-blue-50 text-blue-700 border-blue-200';
      case 'achievement': return 'bg-purple-50 text-purple-700 border-purple-200';
      default: return 'bg-gray-50 text-gray-700 border-gray-200';
    }
  };

  const getUserInitials = (eventTitle: string) => {
    // Simple logic for demo - in real app this would be based on actual user data
    if (eventTitle.toLowerCase().includes('richmond')) return 'R';
    if (eventTitle.toLowerCase().includes('both') || eventTitle.toLowerCase().includes('we')) return 'RE';
    return 'E'; // Default to Edwina
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
            <h3 className="text-lg font-semibold text-primary">Our Story Timeline</h3>
            <Button 
              onClick={() => setShowTimelineForm(true)} 
              className="flex items-center gap-2 bg-primary hover:bg-primary/90 text-white rounded-full px-6"
            >
              <Plus className="h-4 w-4" />
              Add Timeline
            </Button>
          </div>

          {showTimelineForm && (
            <TimelineForm
              event={editingTimeline}
              onSubmit={handleSubmitTimeline}
              onCancel={() => {
                setShowTimelineForm(false);
                setEditingTimeline(null);
              }}
            />
          )}

          <div className="relative">
            {timelineEvents.length === 0 ? (
              <Card className="glass-card">
                <CardContent className="flex flex-col items-center justify-center py-12">
                  <Calendar className="h-12 w-12 text-muted-foreground mb-4" />
                  <p className="text-muted-foreground text-center">
                    No timeline events yet. Start building your story!
                  </p>
                </CardContent>
              </Card>
            ) : (
              <div className="space-y-6">
                {timelineEvents.map((event, index) => (
                  <div key={event.id} className="relative">
                    {/* Timeline line */}
                    {index !== timelineEvents.length - 1 && (
                      <div className="absolute left-4 top-8 bottom-0 w-0.5 bg-border"></div>
                    )}
                    
                    <div className="flex gap-4">
                      {/* Timeline dot */}
                      <div className="relative z-10">
                        <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
                          <div className="w-3 h-3 bg-white rounded-full"></div>
                        </div>
                      </div>
                      
                      {/* Event card */}
                      <div className="flex-1">
                        <Card className="glass-card border-l-4 border-l-primary">
                          <CardContent className="p-6">
                            <div className="flex justify-between items-start mb-4">
                              <div className="flex-1">
                                <div className="flex items-center gap-3 mb-2">
                                  <h4 className="text-lg font-semibold text-primary">{event.title}</h4>
                                  <Badge variant="outline" className={getCategoryColor(event.category)}>
                                    {event.category}
                                  </Badge>
                                </div>
                                
                                {event.description && (
                                  <p className="text-muted-foreground mb-3">{event.description}</p>
                                )}
                                
                                <div className="flex items-center gap-1 text-sm text-muted-foreground">
                                  <MapPin className="h-4 w-4" />
                                  <span>Sunset Restaurant</span>
                                </div>
                              </div>
                              
                              <div className="flex items-center gap-3">
                                <div className="text-right">
                                  <div className="text-sm font-medium text-muted-foreground">
                                    {new Date(event.date).toLocaleDateString()}
                                  </div>
                                  <div className="flex items-center gap-1 justify-end mt-1">
                                    <div className="w-6 h-6 bg-primary text-white rounded-full flex items-center justify-center text-xs font-medium">
                                      {getUserInitials(event.title)}
                                    </div>
                                    <span className="text-xs text-muted-foreground">
                                      {getUserInitials(event.title) === 'RE' ? 'Both' : 
                                       getUserInitials(event.title) === 'R' ? 'Richmond' : 'Edwina'}
                                    </span>
                                  </div>
                                </div>
                                
                                <div className="flex gap-1 ml-4">
                                  <Button 
                                    variant="ghost" 
                                    size="sm" 
                                    onClick={() => {
                                      setEditingTimeline(event);
                                      setShowTimelineForm(true);
                                    }}
                                    className="h-8 w-8 p-0 hover:bg-muted"
                                  >
                                    <Edit2 className="h-4 w-4" />
                                  </Button>
                                  <Button 
                                    variant="ghost" 
                                    size="sm" 
                                    onClick={() => handleDeleteTimeline(event.id)}
                                    className="h-8 w-8 p-0 hover:bg-muted"
                                  >
                                    <Trash2 className="h-4 w-4" />
                                  </Button>
                                </div>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </TabsContent>

        <TabsContent value="letters" className="space-y-6">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-semibold">Love Letters</h3>
            <Button 
              className="flex items-center gap-2"
              onClick={() => setShowLetterForm(true)}
            >
              <Plus className="h-4 w-4" />
              Write Letter
            </Button>
          </div>

          {showLetterForm && (
            <LoveLetterForm
              letter={editingLetter}
              onSubmit={handleSubmitLetter}
              onCancel={() => {
                setShowLetterForm(false);
                setEditingLetter(null);
              }}
            />
          )}

          <div className="space-y-4">
            {loveLetters.length === 0 ? (
              <Card className="glass-card">
                <CardContent className="flex flex-col items-center justify-center py-12">
                  <Heart className="h-12 w-12 text-muted-foreground mb-4" />
                  <p className="text-muted-foreground text-center">
                    No love letters yet. Write your first romantic message!
                  </p>
                </CardContent>
              </Card>
            ) : (
              loveLetters.map(letter => (
                <Card key={letter.id} className="glass-card">
                  <CardHeader className="pb-3">
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <CardTitle className="text-lg mb-2">{letter.title}</CardTitle>
                        <div className="flex items-center gap-4 text-sm text-muted-foreground">
                          <div className="flex items-center gap-1">
                            <User className="h-4 w-4" />
                            From: {letter.from_user_id === 'richmond' ? 'Richmond' : 'Edwina'}
                          </div>
                          <div className="flex items-center gap-1">
                            <Heart className="h-4 w-4" />
                            To: {letter.to_user_id === 'richmond' ? 'Richmond' : 'Edwina'}
                          </div>
                          <div className="flex items-center gap-1">
                            <Calendar className="h-4 w-4" />
                            {new Date(letter.created_at || '').toLocaleDateString()}
                          </div>
                        </div>
                      </div>
                      <div className="flex gap-1">
                        <Button variant="ghost" size="sm" onClick={() => {
                          setEditingLetter(letter);
                          setShowLetterForm(true);
                        }}>
                          <Edit2 className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="sm" onClick={() => handleDeleteLetter(letter.id)}>
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </CardHeader>
                  
                  <CardContent>
                    <p className="text-sm whitespace-pre-wrap">{letter.content}</p>
                  </CardContent>
                </Card>
              ))
            )}
          </div>
        </TabsContent>

        <TabsContent value="journal" className="space-y-6">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-semibold">Weekly Journal Entries</h3>
            <Button 
              className="flex items-center gap-2"
              onClick={() => setShowJournalForm(true)}
            >
              <Plus className="h-4 w-4" />
              New Entry
            </Button>
          </div>

          {showJournalForm && (
            <JournalEntryForm
              entry={editingJournal}
              onSubmit={handleSubmitJournal}
              onCancel={() => {
                setShowJournalForm(false);
                setEditingJournal(null);
              }}
            />
          )}

          <div className="space-y-4">
            {journalEntries.length === 0 ? (
              <Card className="glass-card">
                <CardContent className="flex flex-col items-center justify-center py-12">
                  <BookOpen className="h-12 w-12 text-muted-foreground mb-4" />
                  <p className="text-muted-foreground text-center">
                    No journal entries yet. Start reflecting on your week together!
                  </p>
                </CardContent>
              </Card>
            ) : (
              journalEntries.map(entry => (
                <Card key={entry.id} className="glass-card">
                  <CardHeader className="pb-3">
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <CardTitle className="text-lg mb-2">Week of {new Date(entry.week_of).toLocaleDateString()}</CardTitle>
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <Calendar className="h-4 w-4" />
                          {new Date(entry.created_at || '').toLocaleDateString()}
                        </div>
                      </div>
                      <div className="flex gap-1">
                        <Button variant="ghost" size="sm" onClick={() => {
                          setEditingJournal(entry);
                          setShowJournalForm(true);
                        }}>
                          <Edit2 className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="sm" onClick={() => handleDeleteJournal(entry.id)}>
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </CardHeader>
                  
                  <CardContent className="space-y-4">
                    {entry.gratitude && entry.gratitude.length > 0 && (
                      <div>
                        <h5 className="font-medium text-sm mb-2">Things We're Grateful For:</h5>
                        <ul className="space-y-1">
                          {entry.gratitude.map((item, index) => (
                            <li key={index} className="text-sm text-muted-foreground flex items-start gap-2">
                              <span className="w-1.5 h-1.5 rounded-full bg-primary mt-2 flex-shrink-0" />
                              {item}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {entry.lessons_learned && entry.lessons_learned.length > 0 && (
                      <div>
                        <h5 className="font-medium text-sm mb-2">Lessons We Learned:</h5>
                        <ul className="space-y-1">
                          {entry.lessons_learned.map((item, index) => (
                            <li key={index} className="text-sm text-muted-foreground flex items-start gap-2">
                              <span className="w-1.5 h-1.5 rounded-full bg-secondary mt-2 flex-shrink-0" />
                              {item}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {entry.reflections && (
                      <div>
                        <h5 className="font-medium text-sm mb-2">Weekly Reflections:</h5>
                        <p className="text-sm text-muted-foreground whitespace-pre-wrap">{entry.reflections}</p>
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