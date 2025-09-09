import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Plus, Edit2, Trash2, Book, Star, Calendar } from "lucide-react";
import { useReading } from "@/hooks/useReading";
import BookForm from "@/components/forms/BookForm";

export default function ReadingPage() {
  const { books, readingGoals, loading, addBook, updateBook, deleteBook, addReadingGoal } = useReading();
  const [showForm, setShowForm] = useState(false);
  const [editingBook, setEditingBook] = useState(null);

  const handleSubmit = async (bookData: any) => {
    if (editingBook) {
      await updateBook(editingBook.id, bookData);
    } else {
      await addBook(bookData);
    }
    setShowForm(false);
    setEditingBook(null);
  };

  const handleEdit = (book: any) => {
    setEditingBook(book);
    setShowForm(true);
  };

  const handleDelete = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this book?')) {
      await deleteBook(id);
    }
  };

  const getStatusColor = (status: string) => {
    const colors = {
      'to-read': 'bg-yellow-100 text-yellow-800',
      'reading': 'bg-blue-100 text-blue-800',
      'completed': 'bg-green-100 text-green-800',
      'paused': 'bg-gray-100 text-gray-800'
    };
    return colors[status as keyof typeof colors] || 'bg-gray-100 text-gray-800';
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
        <h2 className="text-2xl font-bold romantic-heading">Reading & Learning Goals</h2>
        <Button onClick={() => setShowForm(true)} className="flex items-center gap-2">
          <Plus className="h-4 w-4" />
          Add Book
        </Button>
      </div>

      {showForm && (
        <BookForm
          book={editingBook || undefined}
          onSubmit={handleSubmit}
          onCancel={() => {
            setShowForm(false);
            setEditingBook(null);
          }}
        />
      )}

      <div className="grid gap-6 md:grid-cols-2">
        {books.length === 0 ? (
          <Card className="glass-card md:col-span-2">
            <CardContent className="flex flex-col items-center justify-center py-12">
              <Book className="h-12 w-12 text-muted-foreground mb-4" />
              <p className="text-muted-foreground text-center">
                No books added yet. Start your reading journey!
              </p>
            </CardContent>
          </Card>
        ) : (
          books.map(book => (
            <Card key={book.id} className="glass-card">
              <CardHeader className="pb-3">
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <CardTitle className="text-lg mb-2">{book.title}</CardTitle>
                    <p className="text-sm text-muted-foreground mb-2">by {book.author}</p>
                    <div className="flex gap-2 mb-2">
                      <Badge className={getStatusColor(book.status)}>
                        {book.status}
                      </Badge>
                      <Badge variant="secondary">{book.category}</Badge>
                      {book.rating && (
                        <Badge variant="outline" className="flex items-center gap-1">
                          <Star className="h-3 w-3" />
                          {book.rating}/5
                        </Badge>
                      )}
                    </div>
                  </div>
                  <div className="flex gap-1">
                    <Button variant="ghost" size="sm" onClick={() => handleEdit(book)}>
                      <Edit2 className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="sm" onClick={() => handleDelete(book.id)}>
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardHeader>
              
              <CardContent className="space-y-4">
                {book.progress !== undefined && book.progress > 0 && (
                  <div>
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-sm font-medium">Progress</span>
                      <span className="text-sm text-muted-foreground">{book.progress}%</span>
                    </div>
                    <div className="w-full bg-muted rounded-full h-2">
                      <div 
                        className="bg-primary h-2 rounded-full transition-all duration-300"
                        style={{ width: `${book.progress}%` }}
                      />
                    </div>
                  </div>
                )}
                
                {book.date_started && (
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Calendar className="h-4 w-4" />
                    Started: {new Date(book.date_started).toLocaleDateString()}
                  </div>
                )}
                
                {book.notes && (
                  <p className="text-sm text-muted-foreground">{book.notes}</p>
                )}
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
  );
}