import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Achievement } from "@/hooks/useAchievements";

interface AchievementFormProps {
  achievement?: Achievement;
  onSubmit: (achievement: Omit<Achievement, 'id' | 'created_at'>) => Promise<void>;
  onCancel: () => void;
}

export default function AchievementForm({ achievement, onSubmit, onCancel }: AchievementFormProps) {
  const [formData, setFormData] = useState({
    title: achievement?.title || '',
    description: achievement?.description || '',
    category: achievement?.category || '',
    date_achieved: achievement?.date_achieved || '',
    impact_level: achievement?.impact_level || 'medium' as 'low' | 'medium' | 'high'
  });

  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      await onSubmit(formData);
      onCancel();
    } catch (error) {
      console.error('Error submitting achievement:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="glass-card">
      <CardHeader>
        <CardTitle>{achievement ? 'Edit Achievement' : 'Add New Achievement'}</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="title">Achievement Title</Label>
            <Input
              id="title"
              value={formData.title}
              onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
              placeholder="Enter achievement title"
              required
            />
          </div>

          <div>
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
              placeholder="Describe the achievement in detail"
              rows={3}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="category">Category</Label>
              <Select value={formData.category} onValueChange={(value) => setFormData(prev => ({ ...prev, category: value }))}>
                <SelectTrigger>
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Relationship">Relationship</SelectItem>
                  <SelectItem value="Personal">Personal</SelectItem>
                  <SelectItem value="Career">Career</SelectItem>
                  <SelectItem value="Financial">Financial</SelectItem>
                  <SelectItem value="Health">Health</SelectItem>
                  <SelectItem value="Spiritual">Spiritual</SelectItem>
                  <SelectItem value="Family">Family</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="impact_level">Impact Level</Label>
              <Select value={formData.impact_level} onValueChange={(value) => setFormData(prev => ({ ...prev, impact_level: value as 'low' | 'medium' | 'high' }))}>
                <SelectTrigger>
                  <SelectValue placeholder="Select impact" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="low">Low Impact</SelectItem>
                  <SelectItem value="medium">Medium Impact</SelectItem>
                  <SelectItem value="high">High Impact</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div>
            <Label htmlFor="date_achieved">Date Achieved</Label>
            <Input
              id="date_achieved"
              type="date"
              value={formData.date_achieved}
              onChange={(e) => setFormData(prev => ({ ...prev, date_achieved: e.target.value }))}
              required
            />
          </div>

          <div className="flex gap-2 pt-4">
            <Button type="submit" disabled={loading || !formData.title || !formData.category || !formData.date_achieved}>
              {loading ? 'Saving...' : (achievement ? 'Update Achievement' : 'Add Achievement')}
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