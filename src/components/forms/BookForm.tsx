import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Book } from "@/hooks/useReading";

interface BookFormProps {
  book?: Book;
  onSubmit: (book: Omit<Book, 'id' | 'created_at'>) => Promise<void>;
  onCancel: () => void;
}

export default function BookForm({ book, onSubmit, onCancel }: BookFormProps) {
  const [formData, setFormData] = useState({
    title: book?.title || '',
    author: book?.author || '',
    category: book?.category || '',
    status: book?.status || 'to-read' as 'to-read' | 'reading' | 'completed' | 'paused',
    progress: book?.progress || 0,
    rating: book?.rating || 0,
    date_started: book?.date_started || '',
    date_completed: book?.date_completed || '',
    notes: book?.notes || ''
  });

  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      await onSubmit(formData);
      onCancel();
    } catch (error) {
      console.error('Error submitting book:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="glass-card">
      <CardHeader>
        <CardTitle>{book ? 'Edit Book' : 'Add New Book'}</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="title">Book Title</Label>
              <Input
                id="title"
                value={formData.title}
                onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                placeholder="Enter book title"
                required
              />
            </div>

            <div>
              <Label htmlFor="author">Author</Label>
              <Input
                id="author"
                value={formData.author}
                onChange={(e) => setFormData(prev => ({ ...prev, author: e.target.value }))}
                placeholder="Enter author name"
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="category">Category</Label>
              <Select value={formData.category} onValueChange={(value) => setFormData(prev => ({ ...prev, category: value }))}>
                <SelectTrigger>
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Fiction">Fiction</SelectItem>
                  <SelectItem value="Non-Fiction">Non-Fiction</SelectItem>
                  <SelectItem value="Business">Business</SelectItem>
                  <SelectItem value="Self-Help">Self-Help</SelectItem>
                  <SelectItem value="Romance">Romance</SelectItem>
                  <SelectItem value="Biography">Biography</SelectItem>
                  <SelectItem value="Educational">Educational</SelectItem>
                  <SelectItem value="Spiritual">Spiritual</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="status">Status</Label>
              <Select value={formData.status} onValueChange={(value) => setFormData(prev => ({ ...prev, status: value as 'to-read' | 'reading' | 'completed' | 'paused' }))}>
                <SelectTrigger>
                  <SelectValue placeholder="Select status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="to-read">To Read</SelectItem>
                  <SelectItem value="reading">Currently Reading</SelectItem>
                  <SelectItem value="completed">Completed</SelectItem>
                  <SelectItem value="paused">Paused</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="progress">Progress: {formData.progress}%</Label>
              <div className="px-3 py-2">
                <Slider
                  value={[formData.progress]}
                  onValueChange={(value) => setFormData(prev => ({ ...prev, progress: value[0] }))}
                  max={100}
                  min={0}
                  step={5}
                  className="w-full"
                />
              </div>
            </div>

            <div>
              <Label htmlFor="rating">Rating: {formData.rating}/5</Label>
              <div className="px-3 py-2">
                <Slider
                  value={[formData.rating]}
                  onValueChange={(value) => setFormData(prev => ({ ...prev, rating: value[0] }))}
                  max={5}
                  min={0}
                  step={1}
                  className="w-full"
                />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="date_started">Date Started</Label>
              <Input
                id="date_started"
                type="date"
                value={formData.date_started}
                onChange={(e) => setFormData(prev => ({ ...prev, date_started: e.target.value }))}
              />
            </div>

            <div>
              <Label htmlFor="date_completed">Date Completed</Label>
              <Input
                id="date_completed"
                type="date"
                value={formData.date_completed}
                onChange={(e) => setFormData(prev => ({ ...prev, date_completed: e.target.value }))}
              />
            </div>
          </div>

          <div>
            <Label htmlFor="notes">Notes</Label>
            <Textarea
              id="notes"
              value={formData.notes}
              onChange={(e) => setFormData(prev => ({ ...prev, notes: e.target.value }))}
              placeholder="Your thoughts, quotes, or key takeaways"
              rows={3}
            />
          </div>

          <div className="flex gap-2 pt-4">
            <Button type="submit" disabled={loading || !formData.title || !formData.author || !formData.category}>
              {loading ? 'Saving...' : (book ? 'Update Book' : 'Add Book')}
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