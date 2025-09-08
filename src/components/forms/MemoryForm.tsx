import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Memory } from "@/hooks/useMemories";

interface MemoryFormProps {
  memory?: Memory;
  onSubmit: (memory: Omit<Memory, 'id' | 'created_at'>) => Promise<void>;
  onCancel: () => void;
}

export default function MemoryForm({ memory, onSubmit, onCancel }: MemoryFormProps) {
  const [formData, setFormData] = useState({
    title: memory?.title || '',
    description: memory?.description || '',
    date: memory?.date || new Date().toISOString().split('T')[0],
    location: memory?.location || '',
    photo_url: memory?.photo_url || '',
    memory_type: memory?.memory_type || 'photo' as const
  });

  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      await onSubmit(formData);
      onCancel();
    } catch (error) {
      console.error('Error submitting memory:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="glass-card">
      <CardHeader>
        <CardTitle>{memory ? 'Edit Memory' : 'Add New Memory'}</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="title">Memory Title</Label>
            <Input
              id="title"
              value={formData.title}
              onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
              placeholder="Give this memory a title"
              required
            />
          </div>

          <div>
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
              placeholder="Describe this special memory"
              rows={3}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="date">Date</Label>
              <Input
                id="date"
                type="date"
                value={formData.date}
                onChange={(e) => setFormData(prev => ({ ...prev, date: e.target.value }))}
                required
              />
            </div>

            <div>
              <Label htmlFor="memory_type">Type</Label>
              <Select value={formData.memory_type} onValueChange={(value: 'photo' | 'milestone' | 'special') => setFormData(prev => ({ ...prev, memory_type: value }))}>
                <SelectTrigger>
                  <SelectValue placeholder="Select type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="photo">Photo Memory</SelectItem>
                  <SelectItem value="milestone">Milestone</SelectItem>
                  <SelectItem value="special">Special Moment</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div>
            <Label htmlFor="location">Location (Optional)</Label>
            <Input
              id="location"
              value={formData.location}
              onChange={(e) => setFormData(prev => ({ ...prev, location: e.target.value }))}
              placeholder="Where did this happen?"
            />
          </div>

          <div>
            <Label htmlFor="photo_url">Photo URL (Optional)</Label>
            <Input
              id="photo_url"
              value={formData.photo_url}
              onChange={(e) => setFormData(prev => ({ ...prev, photo_url: e.target.value }))}
              placeholder="Link to a photo"
            />
          </div>

          <div className="flex gap-2 pt-4">
            <Button type="submit" disabled={loading || !formData.title}>
              {loading ? 'Saving...' : (memory ? 'Update Memory' : 'Add Memory')}
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