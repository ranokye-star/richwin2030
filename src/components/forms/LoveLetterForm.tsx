import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Save, X } from 'lucide-react';

interface LoveLetter {
  id?: string;
  title: string;
  content: string;
  from_user_id: string;
  to_user_id: string;
}

interface LoveLetterFormProps {
  letter?: LoveLetter | null;
  onSubmit: (data: Omit<LoveLetter, 'id'>) => Promise<void>;
  onCancel: () => void;
}

export default function LoveLetterForm({ letter, onSubmit, onCancel }: LoveLetterFormProps) {
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    from_user_id: 'richmond',
    to_user_id: 'edwina'
  });

  useEffect(() => {
    if (letter) {
      setFormData({
        title: letter.title || '',
        content: letter.content || '',
        from_user_id: letter.from_user_id || 'richmond',
        to_user_id: letter.to_user_id || 'edwina'
      });
    }
  }, [letter]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await onSubmit(formData);
    setFormData({
      title: '',
      content: '',
      from_user_id: 'richmond',
      to_user_id: 'edwina'
    });
  };

  return (
    <Card className="romantic-card">
      <CardHeader>
        <CardTitle>{letter ? 'Edit Love Letter' : 'Write a Love Letter'}</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="from">From</Label>
              <Select
                value={formData.from_user_id}
                onValueChange={(value) => setFormData({...formData, from_user_id: value})}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="richmond">Richmond</SelectItem>
                  <SelectItem value="edwina">Edwina</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="to">To</Label>
              <Select
                value={formData.to_user_id}
                onValueChange={(value) => setFormData({...formData, to_user_id: value})}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="richmond">Richmond</SelectItem>
                  <SelectItem value="edwina">Edwina</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="title">Letter Title</Label>
            <Input
              id="title"
              value={formData.title}
              onChange={(e) => setFormData({...formData, title: e.target.value})}
              placeholder="Give your letter a title..."
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="content">Letter Content</Label>
            <Textarea
              id="content"
              value={formData.content}
              onChange={(e) => setFormData({...formData, content: e.target.value})}
              placeholder="Write your heartfelt message..."
              rows={8}
              required
            />
          </div>

          <div className="flex gap-2">
            <Button type="submit" className="flex items-center gap-2">
              <Save className="h-4 w-4" />
              {letter ? 'Update Letter' : 'Save Letter'}
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