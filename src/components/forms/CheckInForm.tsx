import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { CheckIn } from "@/hooks/useCheckIns";

interface CheckInFormProps {
  checkIn?: CheckIn;
  onSubmit: (checkIn: Omit<CheckIn, 'id' | 'created_at'>) => Promise<void>;
  onCancel: () => void;
}

export default function CheckInForm({ checkIn, onSubmit, onCancel }: CheckInFormProps) {
  const [formData, setFormData] = useState({
    date: checkIn?.date || new Date().toISOString().split('T')[0],
    checkin_type: checkIn?.checkin_type || '',
    relationship_score: checkIn?.relationship_score || 5,
    wins: checkIn?.wins || '',
    challenges: checkIn?.challenges || '',
    goals_progress: checkIn?.goals_progress || '',
    next_steps: checkIn?.next_steps || ''
  });

  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      await onSubmit(formData);
      onCancel();
    } catch (error) {
      console.error('Error submitting check-in:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="glass-card">
      <CardHeader>
        <CardTitle>{checkIn ? 'Edit Check-in' : 'Add New Check-in'}</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
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
              <Label htmlFor="checkin_type">Check-in Type</Label>
              <Select value={formData.checkin_type} onValueChange={(value) => setFormData(prev => ({ ...prev, checkin_type: value }))}>
                <SelectTrigger>
                  <SelectValue placeholder="Select type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="weekly">Weekly</SelectItem>
                  <SelectItem value="monthly">Monthly</SelectItem>
                  <SelectItem value="quarterly">Quarterly</SelectItem>
                  <SelectItem value="annual">Annual</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div>
            <Label htmlFor="relationship_score">Relationship Score (1-10)</Label>
            <Input
              id="relationship_score"
              type="number"
              min="1"
              max="10"
              value={formData.relationship_score}
              onChange={(e) => setFormData(prev => ({ ...prev, relationship_score: parseInt(e.target.value) || 5 }))}
            />
          </div>

          <div>
            <Label htmlFor="wins">Wins & Celebrations</Label>
            <Textarea
              id="wins"
              value={formData.wins}
              onChange={(e) => setFormData(prev => ({ ...prev, wins: e.target.value }))}
              placeholder="What went well this period?"
              rows={3}
            />
          </div>

          <div>
            <Label htmlFor="challenges">Challenges & Areas for Growth</Label>
            <Textarea
              id="challenges"
              value={formData.challenges}
              onChange={(e) => setFormData(prev => ({ ...prev, challenges: e.target.value }))}
              placeholder="What challenges did you face?"
              rows={3}
            />
          </div>

          <div>
            <Label htmlFor="goals_progress">Goals Progress</Label>
            <Textarea
              id="goals_progress"
              value={formData.goals_progress}
              onChange={(e) => setFormData(prev => ({ ...prev, goals_progress: e.target.value }))}
              placeholder="How are you progressing on your shared goals?"
              rows={3}
            />
          </div>

          <div>
            <Label htmlFor="next_steps">Next Steps & Action Items</Label>
            <Textarea
              id="next_steps"
              value={formData.next_steps}
              onChange={(e) => setFormData(prev => ({ ...prev, next_steps: e.target.value }))}
              placeholder="What will you focus on next?"
              rows={3}
            />
          </div>

          <div className="flex gap-2 pt-4">
            <Button type="submit" disabled={loading || !formData.checkin_type}>
              {loading ? 'Saving...' : (checkIn ? 'Update Check-in' : 'Add Check-in')}
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