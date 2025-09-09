import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { ScriptureReflection } from "@/hooks/useFaith";

interface ScriptureFormProps {
  reflection?: ScriptureReflection;
  onSubmit: (reflection: Omit<ScriptureReflection, 'id' | 'created_at'>) => Promise<void>;
  onCancel: () => void;
}

export default function ScriptureForm({ reflection, onSubmit, onCancel }: ScriptureFormProps) {
  const [formData, setFormData] = useState({
    reference: reflection?.reference || '',
    verse: reflection?.verse || '',
    reflection: reflection?.reflection || '',
    date_studied: reflection?.date_studied || new Date().toISOString().split('T')[0]
  });

  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      await onSubmit(formData);
      onCancel();
    } catch (error) {
      console.error('Error submitting scripture reflection:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="glass-card">
      <CardHeader>
        <CardTitle>{reflection ? 'Edit Scripture Reflection' : 'Add New Scripture Reflection'}</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="reference">Scripture Reference</Label>
              <Input
                id="reference"
                value={formData.reference}
                onChange={(e) => setFormData(prev => ({ ...prev, reference: e.target.value }))}
                placeholder="e.g., John 3:16"
                required
              />
            </div>

            <div>
              <Label htmlFor="date_studied">Date Studied</Label>
              <Input
                id="date_studied"
                type="date"
                value={formData.date_studied}
                onChange={(e) => setFormData(prev => ({ ...prev, date_studied: e.target.value }))}
                required
              />
            </div>
          </div>

          <div>
            <Label htmlFor="verse">Scripture Verse</Label>
            <Textarea
              id="verse"
              value={formData.verse}
              onChange={(e) => setFormData(prev => ({ ...prev, verse: e.target.value }))}
              placeholder="Enter the scripture verse"
              rows={3}
              required
            />
          </div>

          <div>
            <Label htmlFor="reflection">Your Reflection</Label>
            <Textarea
              id="reflection"
              value={formData.reflection}
              onChange={(e) => setFormData(prev => ({ ...prev, reflection: e.target.value }))}
              placeholder="What does this verse mean to you? How can you apply it?"
              rows={4}
              required
            />
          </div>

          <div className="flex gap-2 pt-4">
            <Button type="submit" disabled={loading || !formData.reference || !formData.verse || !formData.reflection}>
              {loading ? 'Saving...' : (reflection ? 'Update Reflection' : 'Add Reflection')}
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