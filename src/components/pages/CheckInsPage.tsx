import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Plus, Edit, Trash2, Calendar, Heart } from "lucide-react";
import { useCheckIns } from "@/hooks/useCheckIns";
import CheckInForm from "@/components/forms/CheckInForm";
import { Badge } from "@/components/ui/badge";

export default function CheckInsPage() {
  const { checkIns, loading, addCheckIn, updateCheckIn, deleteCheckIn } = useCheckIns();
  const [showForm, setShowForm] = useState(false);
  const [editingCheckIn, setEditingCheckIn] = useState(null);

  const handleSubmit = async (checkInData) => {
    if (editingCheckIn) {
      await updateCheckIn(editingCheckIn.id, checkInData);
      setEditingCheckIn(null);
    } else {
      await addCheckIn(checkInData);
    }
    setShowForm(false);
  };

  const handleEdit = (checkIn) => {
    setEditingCheckIn(checkIn);
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    if (confirm('Are you sure you want to delete this check-in?')) {
      await deleteCheckIn(id);
    }
  };

  const getTypeColor = (type) => {
    switch (type) {
      case 'weekly': return 'bg-blue-500';
      case 'monthly': return 'bg-green-500';
      case 'quarterly': return 'bg-purple-500';
      case 'annual': return 'bg-orange-500';
      default: return 'bg-gray-500';
    }
  };

  if (loading) {
    return (
      <Card className="glass-card">
        <CardContent className="p-6">
          <div className="text-center">Loading check-ins...</div>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Relationship Check-ins</h2>
          <p className="text-muted-foreground">Regular reviews to strengthen your bond</p>
        </div>
        <Button 
          onClick={() => setShowForm(true)}
          className="flex items-center gap-2"
        >
          <Plus className="h-4 w-4" />
          Add Check-in
        </Button>
      </div>

      {showForm && (
        <CheckInForm
          checkIn={editingCheckIn}
          onSubmit={handleSubmit}
          onCancel={() => {
            setShowForm(false);
            setEditingCheckIn(null);
          }}
        />
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {checkIns.map((checkIn) => (
          <Card key={checkIn.id} className="glass-card">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                <Badge variant="secondary" className={getTypeColor(checkIn.checkin_type)}>
                  {checkIn.checkin_type}
                </Badge>
              </div>
              <div className="flex gap-1">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handleEdit(checkIn)}
                >
                  <Edit className="h-4 w-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handleDelete(checkIn.id)}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Date:</span>
                  <span className="text-sm">{new Date(checkIn.date).toLocaleDateString()}</span>
                </div>
                
                {checkIn.relationship_score && (
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Score:</span>
                    <div className="flex items-center gap-1">
                      <Heart className="h-4 w-4 text-red-500" />
                      <span className="text-sm">{checkIn.relationship_score}/10</span>
                    </div>
                  </div>
                )}

                {checkIn.wins && (
                  <div>
                    <span className="text-xs text-muted-foreground">Wins:</span>
                    <p className="text-sm mt-1">{checkIn.wins}</p>
                  </div>
                )}

                {checkIn.challenges && (
                  <div>
                    <span className="text-xs text-muted-foreground">Challenges:</span>
                    <p className="text-sm mt-1">{checkIn.challenges}</p>
                  </div>
                )}

                {checkIn.goals_progress && (
                  <div>
                    <span className="text-xs text-muted-foreground">Goals Progress:</span>
                    <p className="text-sm mt-1">{checkIn.goals_progress}</p>
                  </div>
                )}

                {checkIn.next_steps && (
                  <div>
                    <span className="text-xs text-muted-foreground">Next Steps:</span>
                    <p className="text-sm mt-1">{checkIn.next_steps}</p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {checkIns.length === 0 && (
        <Card className="glass-card">
          <CardContent className="p-6 text-center">
            <Calendar className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
            <h3 className="text-lg font-semibold mb-2">No Check-ins Yet</h3>
            <p className="text-muted-foreground mb-4">Start tracking your relationship progress with regular check-ins</p>
            <Button onClick={() => setShowForm(true)}>
              Add Your First Check-in
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
}