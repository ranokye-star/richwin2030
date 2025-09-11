import React, { useState } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { LogOut, Target, Heart, Trophy, DollarSign, TrendingUp, Book, Calendar, Church, Camera, GraduationCap } from 'lucide-react';
import DayCounter from './DayCounter';
import VisionGoalsPage from './pages/VisionGoalsPage';
import MemoriesPage from './pages/MemoriesPage';
import AchievementsPage from './pages/AchievementsPage';
import FinancePage from './pages/FinancePage';
import GrowthPage from './pages/GrowthPage';
import FaithPage from './pages/FaithPage';
import ReadingPage from './pages/ReadingPage';
import CheckInsPage from './pages/CheckInsPage';
import LegacyPage from './pages/LegacyPage';
import AcademicsPage from './pages/AcademicsPage';
import coupleImage from "/lovable-uploads/40acfd79-440a-4b3d-b571-00e1938ddc1c.png";

interface DashboardProps {
  user: 'richmond' | 'edwina';
  onLogout: () => void;
}

export default function Dashboard({ user, onLogout }: DashboardProps) {
  const userName = user === 'edwina' ? 'Queen Edwina' : 'King Richmond';
  const [activeSection, setActiveSection] = useState('vision');

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
          {/* Circular Grid Navigation */}
          <div className="grid grid-cols-5 gap-6 mb-8">
            {/* Row 1 */}
            <Card 
              className={`glass-card cursor-pointer transition-all duration-300 hover:scale-105 ${activeSection === 'vision' ? 'ring-2 ring-primary shadow-romantic' : ''}`}
              onClick={() => setActiveSection('vision')}
            >
              <CardContent className="flex flex-col items-center justify-center p-6 aspect-square rounded-full">
                <Target className="h-8 w-8 mb-2 text-primary" />
                <span className="text-sm font-medium text-center">Vision</span>
              </CardContent>
            </Card>

            <Card 
              className={`glass-card cursor-pointer transition-all duration-300 hover:scale-105 ${activeSection === 'memories' ? 'ring-2 ring-primary shadow-romantic' : ''}`}
              onClick={() => setActiveSection('memories')}
            >
              <CardContent className="flex flex-col items-center justify-center p-6 aspect-square rounded-full">
                <Camera className="h-8 w-8 mb-2 text-primary" />
                <span className="text-sm font-medium text-center">Memories</span>
              </CardContent>
            </Card>

            <Card 
              className={`glass-card cursor-pointer transition-all duration-300 hover:scale-105 ${activeSection === 'achievements' ? 'ring-2 ring-primary shadow-romantic' : ''}`}
              onClick={() => setActiveSection('achievements')}
            >
              <CardContent className="flex flex-col items-center justify-center p-6 aspect-square rounded-full">
                <Trophy className="h-8 w-8 mb-2 text-primary" />
                <span className="text-sm font-medium text-center">Wins</span>
              </CardContent>
            </Card>

            <Card 
              className={`glass-card cursor-pointer transition-all duration-300 hover:scale-105 ${activeSection === 'finance' ? 'ring-2 ring-primary shadow-romantic' : ''}`}
              onClick={() => setActiveSection('finance')}
            >
              <CardContent className="flex flex-col items-center justify-center p-6 aspect-square rounded-full">
                <DollarSign className="h-8 w-8 mb-2 text-primary" />
                <span className="text-sm font-medium text-center">Finance</span>
              </CardContent>
            </Card>

            <Card 
              className={`glass-card cursor-pointer transition-all duration-300 hover:scale-105 ${activeSection === 'academics' ? 'ring-2 ring-primary shadow-romantic' : ''}`}
              onClick={() => setActiveSection('academics')}
            >
              <CardContent className="flex flex-col items-center justify-center p-6 aspect-square rounded-full">
                <GraduationCap className="h-8 w-8 mb-2 text-primary" />
                <span className="text-sm font-medium text-center">Academics</span>
              </CardContent>
            </Card>

            {/* Row 2 */}
            <Card 
              className={`glass-card cursor-pointer transition-all duration-300 hover:scale-105 ${activeSection === 'growth' ? 'ring-2 ring-primary shadow-romantic' : ''}`}
              onClick={() => setActiveSection('growth')}
            >
              <CardContent className="flex flex-col items-center justify-center p-6 aspect-square rounded-full">
                <TrendingUp className="h-8 w-8 mb-2 text-primary" />
                <span className="text-sm font-medium text-center">Growth</span>
              </CardContent>
            </Card>

            <Card 
              className={`glass-card cursor-pointer transition-all duration-300 hover:scale-105 ${activeSection === 'faith' ? 'ring-2 ring-primary shadow-romantic' : ''}`}
              onClick={() => setActiveSection('faith')}
            >
              <CardContent className="flex flex-col items-center justify-center p-6 aspect-square rounded-full">
                <Church className="h-8 w-8 mb-2 text-primary" />
                <span className="text-sm font-medium text-center">Faith</span>
              </CardContent>
            </Card>

            <Card 
              className={`glass-card cursor-pointer transition-all duration-300 hover:scale-105 ${activeSection === 'reading' ? 'ring-2 ring-primary shadow-romantic' : ''}`}
              onClick={() => setActiveSection('reading')}
            >
              <CardContent className="flex flex-col items-center justify-center p-6 aspect-square rounded-full">
                <Book className="h-8 w-8 mb-2 text-primary" />
                <span className="text-sm font-medium text-center">Reading</span>
              </CardContent>
            </Card>

            <Card 
              className={`glass-card cursor-pointer transition-all duration-300 hover:scale-105 ${activeSection === 'checkins' ? 'ring-2 ring-primary shadow-romantic' : ''}`}
              onClick={() => setActiveSection('checkins')}
            >
              <CardContent className="flex flex-col items-center justify-center p-6 aspect-square rounded-full">
                <Calendar className="h-8 w-8 mb-2 text-primary" />
                <span className="text-sm font-medium text-center">Check-ins</span>
              </CardContent>
            </Card>

            <Card 
              className={`glass-card cursor-pointer transition-all duration-300 hover:scale-105 ${activeSection === 'legacy' ? 'ring-2 ring-primary shadow-romantic' : ''}`}
              onClick={() => setActiveSection('legacy')}
            >
              <CardContent className="flex flex-col items-center justify-center p-6 aspect-square rounded-full">
                <Heart className="h-8 w-8 mb-2 text-primary" />
                <span className="text-sm font-medium text-center">Legacy</span>
              </CardContent>
            </Card>
          </div>

          {/* Content Area */}
          <div className="space-y-6">
            {activeSection === 'vision' && <VisionGoalsPage />}
            {activeSection === 'memories' && <MemoriesPage />}
            {activeSection === 'achievements' && <AchievementsPage />}
            {activeSection === 'finance' && <FinancePage />}
            {activeSection === 'academics' && <AcademicsPage />}
            {activeSection === 'growth' && <GrowthPage />}
            {activeSection === 'faith' && <FaithPage />}
            {activeSection === 'reading' && <ReadingPage />}
            {activeSection === 'checkins' && <CheckInsPage />}
            {activeSection === 'legacy' && <LegacyPage />}
          </div>
        </div>
      </div>
    </div>
  );
}