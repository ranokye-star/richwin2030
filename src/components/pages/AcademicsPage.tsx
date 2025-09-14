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

// Evening Study Timetable data
const eveningStudyData = [
  {
    day: 'Sunday (for Monday classes)',
    slot1: 'Tools & Methods for Teaching Nursing',
    slot2: 'Curriculum Development in Nursing Education'
  },
  {
    day: 'Monday (for Tuesday classes)',
    slot1: 'Project Work I (Review / prep materials)',
    slot2: 'Plan questions / notes for Meeting with Project Work Supervisors'
  },
  {
    day: 'Tuesday (for Wednesday classes)',
    slot1: 'Biostatistics',
    slot2: 'Nursing Seminar (prep/reading)'
  },
  {
    day: 'Wednesday (for Thursday classes)',
    slot1: 'Nursing Practical (review procedures / skills)',
    slot2: 'Nursing Practical (practice scenarios / notes)'
  },
  {
    day: 'Thursday (revision day)',
    slot1: 'Revise Tools & Methods & Curriculum Development',
    slot2: 'Revise Biostatistics & Nursing Seminar or catch-up assignments'
  }
];

// School Timetable data
const schoolTimetableData = [
  {
    day: 'Monday',
    courses: [
      { course: 'Tools & Methods for Teaching Nursing', time: '10:00 AM – 12:00 PM', lecturer: 'Mrs. Peasah' },
      { course: 'Curriculum Development in Nursing Education', time: '1:00 PM – 3:00 PM', lecturer: 'Mr. Vincent Akorli' }
    ]
  },
  {
    day: 'Tuesday',
    courses: [
      { course: 'Project Work I', time: '8:00 AM – 10:00 AM', lecturer: 'Mrs. Leonora Ofori-Oteng' },
      { course: 'Meeting with Project Work Supervisors', time: '(No fixed time stated)', lecturer: '(Supervisors)' }
    ]
  },
  {
    day: 'Wednesday',
    courses: [
      { course: 'Biostatistics', time: '11:00 AM – 1:00 PM', lecturer: 'Mr. Adjololo' },
      { course: 'Nursing Seminar', time: '2:00 PM – 4:00 PM', lecturer: 'Dr. Joan Agyeman' }
    ]
  },
  {
    day: 'Thursday',
    courses: [
      { course: 'Nursing Practical', time: '8:00 AM – 11:00 AM', lecturer: 'Mr. Opoku & Madam Araba' }
    ]
  },
  {
    day: 'Friday',
    courses: [
      { course: '(No classes scheduled)', time: '', lecturer: '' }
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

      {/* Two-Column Timetable Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Left Column - Evening Study Timetable */}
        <Card className="romantic-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 gold-accent">
              <Clock className="h-6 w-6" />
              Edwina's Evening Study Timetable
            </CardTitle>
            <CardDescription>Personal Evening Study Schedule (9:00 PM - 11:00 PM)</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="font-semibold text-primary min-w-[140px]">Day</TableHead>
                    <TableHead className="font-semibold text-primary">9:00 pm – 10:00 pm</TableHead>
                    <TableHead className="font-semibold text-primary">10:00 pm – 11:00 pm</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {eveningStudyData.map((dayData, index) => (
                    <TableRow key={index}>
                      <TableCell className="font-medium text-primary text-sm">
                        {dayData.day}
                      </TableCell>
                      <TableCell className="text-sm">
                        <div className="flex items-start gap-2">
                          <BookOpen className="h-4 w-4 text-primary flex-shrink-0 mt-0.5" />
                          <span>{dayData.slot1}</span>
                        </div>
                      </TableCell>
                      <TableCell className="text-sm">
                        <div className="flex items-start gap-2">
                          <BookOpen className="h-4 w-4 text-primary flex-shrink-0 mt-0.5" />
                          <span>{dayData.slot2}</span>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>

        {/* Right Column - School Timetable */}
        <Card className="romantic-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 gold-accent">
              <GraduationCap className="h-6 w-6" />
              Edwina's School Timetable
            </CardTitle>
            <CardDescription>Weekly Class Schedule</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="font-semibold text-primary">Day</TableHead>
                    <TableHead className="font-semibold text-primary">Course</TableHead>
                    <TableHead className="font-semibold text-primary">Time</TableHead>
                    <TableHead className="font-semibold text-primary">Lecturer(s)</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {schoolTimetableData.map((dayData) => {
                    return dayData.courses.map((course, index) => (
                      <TableRow key={`${dayData.day}-${index}`}>
                        <TableCell className={`font-medium text-primary ${index === 0 ? '' : 'border-t-0'}`}>
                          {index === 0 ? dayData.day : ''}
                        </TableCell>
                        <TableCell className="text-sm">
                          {course.course !== '(No classes scheduled)' ? (
                            <div className="flex items-start gap-2">
                              <BookOpen className="h-4 w-4 text-primary flex-shrink-0 mt-0.5" />
                              <span className="font-medium">{course.course}</span>
                            </div>
                          ) : (
                            <span className="text-muted-foreground italic">{course.course}</span>
                          )}
                        </TableCell>
                        <TableCell className="text-sm">
                          {course.time && course.time !== '' && (
                            <div className="flex items-center gap-2">
                              <Clock className="h-4 w-4 text-muted-foreground" />
                              <span>{course.time}</span>
                            </div>
                          )}
                        </TableCell>
                        <TableCell className="text-sm">
                          {course.lecturer && course.lecturer !== '' && (
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
      </div>

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