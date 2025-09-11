import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Save, X, Plus, Trash2 } from 'lucide-react';

interface JournalEntry {
  id?: string;
  week_of: string;
  gratitude: string[];
  lessons_learned: string[];
  reflections: string;
}

interface JournalEntryFormProps {
  entry?: JournalEntry | null;
  onSubmit: (data: Omit<JournalEntry, 'id'>) => Promise<void>;
  onCancel: () => void;
}

export default function JournalEntryForm({ entry, onSubmit, onCancel }: JournalEntryFormProps) {
  const [formData, setFormData] = useState({
    week_of: '',
    gratitude: [''],
    lessons_learned: [''],
    reflections: ''
  });

  useEffect(() => {
    if (entry) {
      setFormData({
        week_of: entry.week_of || '',
        gratitude: entry.gratitude?.length > 0 ? entry.gratitude : [''],
        lessons_learned: entry.lessons_learned?.length > 0 ? entry.lessons_learned : [''],
        reflections: entry.reflections || ''
      });
    } else {
      // Set default week to current week
      const today = new Date();
      const startOfWeek = new Date(today);
      startOfWeek.setDate(today.getDate() - today.getDay());
      setFormData(prev => ({
        ...prev,
        week_of: startOfWeek.toISOString().split('T')[0]
      }));
    }
  }, [entry]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const cleanedData = {
      ...formData,
      gratitude: formData.gratitude.filter(item => item.trim() !== ''),
      lessons_learned: formData.lessons_learned.filter(item => item.trim() !== '')
    };
    await onSubmit(cleanedData);
    setFormData({
      week_of: '',
      gratitude: [''],
      lessons_learned: [''],
      reflections: ''
    });
  };

  const addGratitudeItem = () => {
    setFormData({
      ...formData,
      gratitude: [...formData.gratitude, '']
    });
  };

  const removeGratitudeItem = (index: number) => {
    setFormData({
      ...formData,
      gratitude: formData.gratitude.filter((_, i) => i !== index)
    });
  };

  const updateGratitudeItem = (index: number, value: string) => {
    const updated = [...formData.gratitude];
    updated[index] = value;
    setFormData({
      ...formData,
      gratitude: updated
    });
  };

  const addLessonItem = () => {
    setFormData({
      ...formData,
      lessons_learned: [...formData.lessons_learned, '']
    });
  };

  const removeLessonItem = (index: number) => {
    setFormData({
      ...formData,
      lessons_learned: formData.lessons_learned.filter((_, i) => i !== index)
    });
  };

  const updateLessonItem = (index: number, value: string) => {
    const updated = [...formData.lessons_learned];
    updated[index] = value;
    setFormData({
      ...formData,
      lessons_learned: updated
    });
  };

  return (
    <Card className="romantic-card">
      <CardHeader>
        <CardTitle>{entry ? 'Edit Journal Entry' : 'New Weekly Journal Entry'}</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="week_of">Week Of</Label>
            <Input
              id="week_of"
              type="date"
              value={formData.week_of}
              onChange={(e) => setFormData({...formData, week_of: e.target.value})}
              required
            />
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <Label>Things We're Grateful For</Label>
              <Button type="button" variant="outline" size="sm" onClick={addGratitudeItem}>
                <Plus className="h-4 w-4" />
              </Button>
            </div>
            <div className="space-y-2">
              {formData.gratitude.map((item, index) => (
                <div key={index} className="flex gap-2">
                  <Input
                    value={item}
                    onChange={(e) => updateGratitudeItem(index, e.target.value)}
                    placeholder={`Gratitude item ${index + 1}`}
                  />
                  {formData.gratitude.length > 1 && (
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() => removeGratitudeItem(index)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  )}
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <Label>Lessons We Learned</Label>
              <Button type="button" variant="outline" size="sm" onClick={addLessonItem}>
                <Plus className="h-4 w-4" />
              </Button>
            </div>
            <div className="space-y-2">
              {formData.lessons_learned.map((item, index) => (
                <div key={index} className="flex gap-2">
                  <Input
                    value={item}
                    onChange={(e) => updateLessonItem(index, e.target.value)}
                    placeholder={`Lesson ${index + 1}`}
                  />
                  {formData.lessons_learned.length > 1 && (
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() => removeLessonItem(index)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  )}
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="reflections">Weekly Reflections</Label>
            <Textarea
              id="reflections"
              value={formData.reflections}
              onChange={(e) => setFormData({...formData, reflections: e.target.value})}
              placeholder="Share your thoughts about this week together..."
              rows={6}
            />
          </div>

          <div className="flex gap-2">
            <Button type="submit" className="flex items-center gap-2">
              <Save className="h-4 w-4" />
              {entry ? 'Update Entry' : 'Save Entry'}
            </Button>
            <Button type="button" variant="outline" onClick={onCancel}>
              <X className="h-4 w-4" />
              Cancel
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}