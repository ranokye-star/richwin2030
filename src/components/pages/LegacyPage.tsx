import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Plus, Edit, Trash2, Heart, Clock, Star } from "lucide-react";
import { useLegacy } from "@/hooks/useLegacy";
import LegacyForm from "@/components/forms/LegacyForm";
import { Badge } from "@/components/ui/badge";

export default function LegacyPage() {
  const { legacyPlans, loading, addLegacyPlan, updateLegacyPlan, deleteLegacyPlan } = useLegacy();
  const [showForm, setShowForm] = useState(false);
  const [editingPlan, setEditingPlan] = useState(null);

  const handleSubmit = async (planData) => {
    if (editingPlan) {
      await updateLegacyPlan(editingPlan.id, planData);
      setEditingPlan(null);
    } else {
      await addLegacyPlan(planData);
    }
    setShowForm(false);
  };

  const handleEdit = (plan) => {
    setEditingPlan(plan);
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    if (confirm('Are you sure you want to delete this legacy plan?')) {
      await deleteLegacyPlan(id);
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high': return 'bg-red-500';
      case 'medium': return 'bg-yellow-500';
      case 'low': return 'bg-green-500';
      default: return 'bg-gray-500';
    }
  };

  const getTypeIcon = (type) => {
    switch (type) {
      case 'family': return <Heart className="h-4 w-4" />;
      case 'financial': return <Star className="h-4 w-4" />;
      case 'property': return <Clock className="h-4 w-4" />;
      default: return <Heart className="h-4 w-4" />;
    }
  };

  if (loading) {
    return (
      <Card className="glass-card">
        <CardContent className="p-6">
          <div className="text-center">Loading legacy plans...</div>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Legacy & Future Plans</h2>
          <p className="text-muted-foreground">Building a lasting legacy together</p>
        </div>
        <Button 
          onClick={() => setShowForm(true)}
          className="flex items-center gap-2"
        >
          <Plus className="h-4 w-4" />
          Add Legacy Plan
        </Button>
      </div>

      {showForm && (
        <LegacyForm
          plan={editingPlan}
          onSubmit={handleSubmit}
          onCancel={() => {
            setShowForm(false);
            setEditingPlan(null);
          }}
        />
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {legacyPlans.map((plan) => (
          <Card key={plan.id} className="glass-card">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <div className="flex items-center gap-2">
                {getTypeIcon(plan.plan_type)}
                <Badge variant="secondary" className={getPriorityColor(plan.priority)}>
                  {plan.priority} priority
                </Badge>
              </div>
              <div className="flex gap-1">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handleEdit(plan)}
                >
                  <Edit className="h-4 w-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handleDelete(plan.id)}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div>
                  <h3 className="font-semibold text-lg">{plan.title}</h3>
                  <Badge variant="outline" className="mt-1">
                    {plan.plan_type}
                  </Badge>
                </div>
                
                <p className="text-sm text-muted-foreground">
                  {plan.description}
                </p>

                {plan.timeline && (
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm">{plan.timeline}</span>
                  </div>
                )}

                <div className="text-xs text-muted-foreground">
                  Created: {new Date(plan.created_at).toLocaleDateString()}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {legacyPlans.length === 0 && (
        <Card className="glass-card">
          <CardContent className="p-6 text-center">
            <Heart className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
            <h3 className="text-lg font-semibold mb-2">No Legacy Plans Yet</h3>
            <p className="text-muted-foreground mb-4">Start planning your future and the legacy you want to build together</p>
            <Button onClick={() => setShowForm(true)}>
              Create Your First Legacy Plan
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
}