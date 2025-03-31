
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useToast } from "@/components/ui/use-toast";
import { BookOpen } from "lucide-react";

const Index = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("student");
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    
    // This would typically be an API call
    if (email && password) {
      toast({
        title: "Login Successful",
        description: "Welcome back to the Course Allocation System",
      });
      
      // Redirect based on role
      if (role === "admin") {
        navigate("/admin");
      } else {
        navigate("/dashboard");
      }
    } else {
      toast({
        title: "Login Failed",
        description: "Please enter both email and password",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-university-50 to-university-100 flex flex-col items-center justify-center p-6">
      <div className="mb-8 text-center">
        <div className="flex items-center justify-center mb-2">
          <BookOpen className="h-10 w-10 text-university-700" />
          <h1 className="text-3xl font-bold text-university-800 ml-2">UniCourse</h1>
        </div>
        <p className="text-university-600 text-lg">Dynamic Course Allocation System</p>
      </div>
      
      <Card className="w-full max-w-md shadow-lg">
        <CardHeader>
          <CardTitle className="text-2xl text-center text-university-800">Welcome Back</CardTitle>
          <CardDescription className="text-center">Sign in to access your course portal</CardDescription>
        </CardHeader>
        
        <form onSubmit={handleLogin}>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input 
                id="email" 
                type="email" 
                placeholder="your.email@university.edu" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input 
                id="password" 
                type="password" 
                placeholder="••••••••" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            
            <div className="space-y-2 pt-2">
              <Label>I am a:</Label>
              <RadioGroup 
                defaultValue="student" 
                className="flex space-x-4"
                value={role}
                onValueChange={setRole}
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="student" id="student" />
                  <Label htmlFor="student" className="cursor-pointer">Student</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="admin" id="admin" />
                  <Label htmlFor="admin" className="cursor-pointer">Administrator</Label>
                </div>
              </RadioGroup>
            </div>
          </CardContent>
          
          <CardFooter className="flex flex-col space-y-4">
            <Button type="submit" className="w-full bg-university-600 hover:bg-university-700">
              Sign In
            </Button>
            
            <div className="text-center text-sm">
              Don't have an account?{" "}
              <Button 
                variant="link" 
                className="p-0 h-auto text-university-600 hover:text-university-800"
                onClick={() => navigate("/register")}
              >
                Register now
              </Button>
            </div>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
};

export default Index;
