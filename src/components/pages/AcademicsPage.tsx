import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Plus, BookOpen, Clock, Users, GraduationCap, Save, X } from 'lucide-react';
import { useToast } from "@/hooks/use-toast";

interface AcademicGoal {
  id: string;
  title: string;
  category: string;
  description: string;
  deadline: string;
  progress: number;
  milestones: string[];
}

// Edwina's personal evening study timetable data
const timetableData = [
  {
    day: 'SUNDAY',
    courses: [
      { course: 'Tools & Methods for Teaching Nursing', time: '8:00PM-10:00PM', lecturer: 'for Monday classes' },
      { course: 'Curriculum Development in Nursing Education', time: '10:00PM-11:00PM', lecturer: 'for Monday classes' }
    ]
  },
  {
    day: 'MONDAY',
    courses: [
      { course: 'Project Work I (review & prep)', time: '8:00PM-10:00PM', lecturer: 'for Tuesday classes' },
      { course: 'Plan/Notes for Meeting with Project Supervisors', time: '10:00PM-11:00PM', lecturer: 'for Tuesday classes' }
    ]
  },
  {
    day: 'TUESDAY',
    courses: [
      { course: 'Biostatistics (review next topic)', time: '8:00PM-10:00PM', lecturer: 'for Wednesday classes' },
      { course: 'Nursing Seminar (prepare presentation/notes)', time: '10:00PM-11:00PM', lecturer: 'for Wednesday classes' }
    ]
  },
  {
    day: 'WEDNESDAY',
    courses: [
      { course: 'Nursing Practical (review skills / procedures)', time: '8:00PM-10:00PM', lecturer: 'for Thursday classes' },
      { course: 'Nursing Practical (simulation / checklist practice)', time: '10:00PM-11:00PM', lecturer: 'for Thursday classes' }
    ]
  },
  {
    day: 'THURSDAY',
    courses: [
      { course: 'Revise difficult topics from the week', time: '8:00PM-10:00PM', lecturer: 'catch up / prep for next week' },
      { course: 'Work on Project Work / Assignments', time: '10:00PM-11:00PM', lecturer: 'catch up / prep for next week' }
    ]
  }
];

export default function AcademicsPage() {
  const [academicGoals, setAcademicGoals] = useState<AcademicGoal[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [editingGoal, setEditingGoal] = useState<AcademicGoal | null>(null);
  const { toast } = useToast();

  const [formData, setFormData] = useState({
    title: '',
    category: '',
    description: '',
    deadline: '',
    progress: 0,
    milestones: ['']
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (editingGoal) {
      setAcademicGoals(goals => 
        goals.map(goal => 
          goal.id === editingGoal.id ? { ...goal, ...formData } : goal
        )
      );
      toast({
        title: "Academic goal updated",
        description: "Your academic goal has been updated successfully.",
      });
    } else {
      const newGoal: AcademicGoal = {
        id: Date.now().toString(),
        ...formData,
        milestones: formData.milestones.filter(m => m.trim() !== '')
      };
      setAcademicGoals(goals => [...goals, newGoal]);
      toast({
        title: "Academic goal added",
        description: "Your new academic goal has been added successfully.",
      });
    }
    setShowForm(false);
    setEditingGoal(null);
    setFormData({
      title: '',
      category: '',
      description: '',
      deadline: '',
      progress: 0,
      milestones: ['']
    });
  };

  const handleEdit = (goal: AcademicGoal) => {
    setEditingGoal(goal);
    setFormData({
      title: goal.title,
      category: goal.category,
      description: goal.description,
      deadline: goal.deadline,
      progress: goal.progress,
      milestones: goal.milestones.length > 0 ? goal.milestones : ['']
    });
    setShowForm(true);
  };

  const handleDelete = (id: string) => {
    setAcademicGoals(goals => goals.filter(goal => goal.id !== id));
    toast({
      title: "Academic goal deleted",
      description: "Your academic goal has been deleted successfully.",
    });
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold romantic-heading">Academic Excellence</h1>
        <p className="text-lg text-muted-foreground">Track your educational journey and study schedule</p>
      </div>

      {/* Edwina's Study Timetable */}
      <Card className="romantic-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 gold-accent">
            <GraduationCap className="h-6 w-6" />
            Edwina's School Timetable
          </CardTitle>
          <CardDescription>Personal Evening Study Schedule</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="font-semibold text-primary">DAY</TableHead>
                  <TableHead className="font-semibold text-primary">COURSE</TableHead>
                  <TableHead className="font-semibold text-primary">TIME</TableHead>
                  <TableHead className="font-semibold text-primary">LECTURER</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {timetableData.map((dayData) => {
                  if (dayData.courses.length === 0) {
                    return (
                      <TableRow key={dayData.day}>
                        <TableCell className="font-medium text-primary">{dayData.day}</TableCell>
                        <TableCell className="text-muted-foreground italic">No classes scheduled</TableCell>
                        <TableCell>-</TableCell>
                        <TableCell>-</TableCell>
                      </TableRow>
                    );
                  }
                  
                  return dayData.courses.map((course, index) => (
                    <TableRow key={`${dayData.day}-${index}`}>
                      <TableCell className={`font-medium text-primary ${index === 0 ? '' : 'border-t-0'}`}>
                        {index === 0 ? dayData.day : ''}
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <BookOpen className="h-4 w-4 text-primary flex-shrink-0" />
                          <span className="font-medium">{course.course}</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        {course.time && (
                          <div className="flex items-center gap-2">
                            <Clock className="h-4 w-4 text-muted-foreground" />
                            <span>{course.time}</span>
                          </div>
                        )}
                      </TableCell>
                      <TableCell>
                        {course.lecturer && (
                          <div className="flex items-center gap-2">
                            <Users className="h-4 w-4 text-muted-foreground" />
                            <span className="font-medium">{course.lecturer}</span>
                          </div>
                        )}
                      </TableCell>
                    </TableRow>
                  ));
                })}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {/* Academic Goals Section */}
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-semibold">Academic Goals</h2>
          <Button 
            onClick={() => setShowForm(true)}
            className="flex items-center gap-2"
          >
            <Plus className="h-4 w-4" />
            Add Academic Goal
          </Button>
        </div>

        {showForm && (
          <Card className="romantic-card">
            <CardHeader>
              <CardTitle>{editingGoal ? 'Edit Academic Goal' : 'Add New Academic Goal'}</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="title">Goal Title</Label>
                  <Input
                    id="title"
                    value={formData.title}
                    onChange={(e) => setFormData({...formData, title: e.target.value})}
                    placeholder="Enter your academic goal"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="category">Category</Label>
                  <Select
                    value={formData.category}
                    onValueChange={(value) => setFormData({...formData, category: value})}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select a category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Course Work">Course Work</SelectItem>
                      <SelectItem value="Research">Research</SelectItem>
                      <SelectItem value="Thesis/Dissertation">Thesis/Dissertation</SelectItem>
                      <SelectItem value="Certification">Certification</SelectItem>
                      <SelectItem value="Skill Development">Skill Development</SelectItem>
                      <SelectItem value="Academic Achievement">Academic Achievement</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    value={formData.description}
                    onChange={(e) => setFormData({...formData, description: e.target.value})}
                    placeholder="Describe your academic goal"
                    rows={3}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="deadline">Target Deadline</Label>
                  <Input
                    id="deadline"
                    type="date"
                    value={formData.deadline}
                    onChange={(e) => setFormData({...formData, deadline: e.target.value})}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="progress">Progress (%)</Label>
                  <Input
                    id="progress"
                    type="number"
                    min="0"
                    max="100"
                    value={formData.progress}
                    onChange={(e) => setFormData({...formData, progress: parseInt(e.target.value) || 0})}
                  />
                </div>

                <div className="space-y-2">
                  <Label>Milestones</Label>
                  {formData.milestones.map((milestone, index) => (
                    <div key={index} className="flex gap-2">
                      <Input
                        value={milestone}
                        onChange={(e) => {
                          const newMilestones = [...formData.milestones];
                          newMilestones[index] = e.target.value;
                          setFormData({...formData, milestones: newMilestones});
                        }}
                        placeholder={`Milestone ${index + 1}`}
                      />
                      {formData.milestones.length > 1 && (
                        <Button
                          type="button"
                          variant="outline"
                          size="sm"
                          onClick={() => {
                            const newMilestones = formData.milestones.filter((_, i) => i !== index);
                            setFormData({...formData, milestones: newMilestones});
                          }}
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      )}
                    </div>
                  ))}
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => setFormData({...formData, milestones: [...formData.milestones, '']})}
                  >
                    <Plus className="h-4 w-4 mr-2" />
                    Add Milestone
                  </Button>
                </div>

                <div className="flex gap-2">
                  <Button type="submit" className="flex items-center gap-2">
                    <Save className="h-4 w-4" />
                    {editingGoal ? 'Update Goal' : 'Save Goal'}
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => {
                      setShowForm(false);
                      setEditingGoal(null);
                      setFormData({
                        title: '',
                        category: '',
                        description: '',
                        deadline: '',
                        progress: 0,
                        milestones: ['']
                      });
                    }}
                  >
                    Cancel
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        )}

        {academicGoals.length > 0 ? (
          <div className="grid gap-6 md:grid-cols-2">
            {academicGoals.map((goal) => (
              <Card key={goal.id} className="romantic-card hover:shadow-romantic transition-all duration-300">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="space-y-2">
                      <CardTitle className="text-xl">{goal.title}</CardTitle>
                      <Badge variant="secondary">{goal.category}</Badge>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-muted-foreground">{goal.description}</p>
                  
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Progress</span>
                      <span>{goal.progress}%</span>
                    </div>
                    <div className="h-2 bg-secondary rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-gradient-romantic transition-all duration-300"
                        style={{ width: `${goal.progress}%` }}
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <p className="text-sm font-medium">Deadline:</p>
                    <p className="text-sm text-muted-foreground">{goal.deadline}</p>
                  </div>

                  {goal.milestones.length > 0 && (
                    <div className="space-y-2">
                      <p className="text-sm font-medium">Milestones:</p>
                      <ul className="text-sm text-muted-foreground space-y-1">
                        {goal.milestones.map((milestone, index) => (
                          <li key={index} className="flex items-start gap-2">
                            <span className="w-1.5 h-1.5 rounded-full bg-primary mt-2 flex-shrink-0" />
                            {milestone}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  <div className="flex gap-2 pt-4">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleEdit(goal)}
                    >
                      Edit
                    </Button>
                    <Button
                      variant="destructive"
                      size="sm"
                      onClick={() => handleDelete(goal.id)}
                    >
                      Delete
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <Card className="romantic-card">
            <CardContent className="text-center py-12">
              <GraduationCap className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
              <p className="text-muted-foreground">No academic goals yet. Add your first goal to start tracking your educational journey!</p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}