import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Heart, Crown } from "lucide-react";
import coupleImage from "/lovable-uploads/40acfd79-440a-4b3d-b571-00e1938ddc1c.png";

interface LoginPageProps {
  onLogin: (user: 'richmond' | 'edwina') => void;
}

export default function LoginPage({ onLogin }: LoginPageProps) {
  const [selectedUser, setSelectedUser] = useState<string>("");
  const [anniversaryCode, setAnniversaryCode] = useState("");
  const [error, setError] = useState("");
  const [currentMessageIndex, setCurrentMessageIndex] = useState(0);

  const sweetMessages = [
    "My heart beats only for you ❤️",
    "You are my sunshine and my moon 🌙",
    "Forever grateful to call you mine 💕",
    "You make every day feel like magic ✨",
    "My love for you grows stronger each day 🌹",
    "You are my greatest blessing 🙏",
    "Together we can conquer anything 💪",
    "You complete me in every way 💖"
  ];

  React.useEffect(() => {
    const interval = setInterval(() => {
      setCurrentMessageIndex((prev) => (prev + 1) % sweetMessages.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [sweetMessages.length]);

  const handleLogin = () => {
    if (!selectedUser) {
      setError("Please select who you are");
      return;
    }

    if (anniversaryCode !== "0808") {
      setError("Invalid anniversary code");
      return;
    }

    setError("");
    const user = selectedUser === "Mrs Offei Anokye" ? "edwina" : "richmond";
    onLogin(user);
  };

  const getWelcomeMessage = () => {
    if (selectedUser === "Mrs Offei Anokye") {
      return (
        <div className="text-center space-y-2">
          <h2 className="text-2xl font-bold romantic-heading flex items-center justify-center gap-2">
            Welcome my Queen <Heart className="h-6 w-6 text-red-500" />
          </h2>
          <p className="text-muted-foreground italic transition-all duration-1000">
            {sweetMessages[currentMessageIndex]}
          </p>
        </div>
      );
    } else if (selectedUser === "Mr Offei Anokye") {
      return (
        <div className="text-center space-y-2">
          <h2 className="text-2xl font-bold romantic-heading flex items-center justify-center gap-2">
            Welcome my King <Crown className="h-6 w-6 text-yellow-500" />
          </h2>
        </div>
      );
    }
    return null;
  };

  return (
    <div 
      className="min-h-screen flex items-center justify-center relative"
      style={{
        backgroundImage: `url(${coupleImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed'
      }}
    >
      {/* Elegant overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-background/80 via-background/60 to-background/80 backdrop-blur-[2px]" />
      
      <Card className="relative z-10 w-full max-w-md mx-4 romantic-card">
        <CardHeader className="text-center space-y-4">
          <div className="mx-auto w-20 h-20 rounded-full overflow-hidden border-4 border-primary/30 shadow-lg">
            <img 
              src={coupleImage} 
              alt="Richmond & Edwina" 
              className="w-full h-full object-cover"
            />
          </div>
          <CardTitle className="text-3xl romantic-heading">
            RICHWIN 2030
          </CardTitle>
          <CardDescription className="text-lg">
            Our Journey Together
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-6">
          {anniversaryCode === "0808" && selectedUser ? (
            <div className="space-y-6">
              {getWelcomeMessage()}
              <Button 
                onClick={() => handleLogin()}
                className="w-full bg-primary hover:bg-primary/90 text-primary-foreground py-6 text-lg font-semibold"
                style={{ background: 'var(--gradient-romantic)' }}
              >
                Enter Our World
              </Button>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="user-select" className="text-base font-medium">
                  Who are you?
                </Label>
                <Select value={selectedUser} onValueChange={setSelectedUser}>
                  <SelectTrigger className="h-12">
                    <SelectValue placeholder="Select your identity" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Mrs Offei Anokye">Mrs Offei Anokye</SelectItem>
                    <SelectItem value="Mr Offei Anokye">Mr Offei Anokye</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {selectedUser && (
                <div className="space-y-2">
                  <Label htmlFor="anniversary-code" className="text-base font-medium">
                    Anniversary Code
                  </Label>
                  <Input
                    id="anniversary-code"
                    type="password"
                    placeholder="Enter your special code"
                    value={anniversaryCode}
                    onChange={(e) => setAnniversaryCode(e.target.value)}
                    className="h-12 text-center text-lg tracking-widest"
                    maxLength={4}
                  />
                </div>
              )}

              {error && (
                <p className="text-destructive text-center font-medium">
                  {error}
                </p>
              )}

              <Button 
                onClick={handleLogin}
                disabled={!selectedUser || !anniversaryCode}
                className="w-full bg-primary hover:bg-primary/90 text-primary-foreground py-6 text-lg font-semibold disabled:opacity-50"
                style={{ background: selectedUser && anniversaryCode ? 'var(--gradient-romantic)' : undefined }}
              >
                Verify Access
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}