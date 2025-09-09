import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { LogOut, Target, Heart, Trophy, DollarSign, TrendingUp, Book, Calendar, Church, Camera } from 'lucide-react';
import DayCounter from './DayCounter';
import VisionGoalsPage from './pages/VisionGoalsPage';
import MemoriesPage from './pages/MemoriesPage';
import AchievementsPage from './pages/AchievementsPage';
import FinancePage from './pages/FinancePage';
import GrowthPage from './pages/GrowthPage';
import coupleImage from "/lovable-uploads/40acfd79-440a-4b3d-b571-00e1938ddc1c.png";

interface DashboardProps {
  user: 'richmond' | 'edwina';
  onLogout: () => void;
}

export default function Dashboard({ user, onLogout }: DashboardProps) {
  const userName = user === 'edwina' ? 'Queen Edwina' : 'King Richmond';

  return (
    <div 
      className="min-h-screen relative"
      style={{
        backgroundImage: `url(${coupleImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed'
      }}
    >
      {/* Background overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-background/90 via-background/85 to-background/90" />
      
      <div className="relative z-10">
        {/* Header */}
        <header className="p-6 border-b border-border/30 backdrop-blur-md bg-card/50">
          <div className="max-w-7xl mx-auto flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold romantic-heading">RICHWIN 2030</h1>
              <p className="text-muted-foreground">Welcome back, {userName}</p>
            </div>
            <Button 
              onClick={onLogout}
              variant="outline" 
              className="flex items-center gap-2"
            >
              <LogOut className="h-4 w-4" />
              Logout
            </Button>
          </div>
        </header>

        {/* Day Counter */}
        <div className="max-w-7xl mx-auto pt-6">
          <DayCounter />
        </div>

        {/* Main Content */}
        <div className="max-w-7xl mx-auto p-6">
          <Tabs defaultValue="vision" className="space-y-6">
            <TabsList className="grid w-full grid-cols-5 lg:grid-cols-9 gap-1 h-auto p-1 glass-card">
              <TabsTrigger value="vision" className="flex flex-col items-center gap-1 p-3">
                <Target className="h-4 w-4" />
                <span className="text-xs">Vision</span>
              </TabsTrigger>
              <TabsTrigger value="memories" className="flex flex-col items-center gap-1 p-3">
                <Camera className="h-4 w-4" />
                <span className="text-xs">Memories</span>
              </TabsTrigger>
              <TabsTrigger value="achievements" className="flex flex-col items-center gap-1 p-3">
                <Trophy className="h-4 w-4" />
                <span className="text-xs">Wins</span>
              </TabsTrigger>
              <TabsTrigger value="finance" className="flex flex-col items-center gap-1 p-3">
                <DollarSign className="h-4 w-4" />
                <span className="text-xs">Finance</span>
              </TabsTrigger>
              <TabsTrigger value="growth" className="flex flex-col items-center gap-1 p-3">
                <TrendingUp className="h-4 w-4" />
                <span className="text-xs">Growth</span>
              </TabsTrigger>
              <TabsTrigger value="faith" className="flex flex-col items-center gap-1 p-3">
                <Church className="h-4 w-4" />
                <span className="text-xs">Faith</span>
              </TabsTrigger>
              <TabsTrigger value="reading" className="flex flex-col items-center gap-1 p-3">
                <Book className="h-4 w-4" />
                <span className="text-xs">Reading</span>
              </TabsTrigger>
              <TabsTrigger value="checkins" className="flex flex-col items-center gap-1 p-3">
                <Calendar className="h-4 w-4" />
                <span className="text-xs">Check-ins</span>
              </TabsTrigger>
              <TabsTrigger value="legacy" className="flex flex-col items-center gap-1 p-3">
                <Heart className="h-4 w-4" />
                <span className="text-xs">Legacy</span>
              </TabsTrigger>
            </TabsList>

            <TabsContent value="vision" className="space-y-6">
              <VisionGoalsPage />
            </TabsContent>

            <TabsContent value="memories" className="space-y-6">
              <MemoriesPage />
            </TabsContent>

            {/* Add other tab contents */}
            <TabsContent value="achievements">
              <AchievementsPage />
            </TabsContent>

            <TabsContent value="finance">
              <FinancePage />
            </TabsContent>

            <TabsContent value="growth">
              <GrowthPage />
            </TabsContent>

            <TabsContent value="faith">
              <Card className="glass-card">
                <CardHeader>
                  <CardTitle>Faith & Spiritual Growth</CardTitle>
                  <CardDescription>Grow together spiritually</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">Bible reading, prayers, and spiritual goals</p>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="reading">
              <Card className="glass-card">
                <CardHeader>
                  <CardTitle>Reading & Learning</CardTitle>
                  <CardDescription>Expand your minds together</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">Track books and learning goals</p>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="checkins">
              <Card className="glass-card">
                <CardHeader>
                  <CardTitle>Check-ins & Reviews</CardTitle>
                  <CardDescription>Regular relationship maintenance</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">Weekly, monthly, and annual reviews</p>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="legacy">
              <Card className="glass-card">
                <CardHeader>
                  <CardTitle>Legacy & Future Plans</CardTitle>
                  <CardDescription>Plan for the future</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">Vision boards and future planning</p>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
}