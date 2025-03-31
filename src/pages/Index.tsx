
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useToast } from "@/components/ui/use-toast";
import { BookOpen, Sun, Moon } from "lucide-react";
import { useTheme } from "@/hooks/use-theme";

const Index = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("student");
  const { toast } = useToast();
  const navigate = useNavigate();
  const { theme, setTheme, resolvedTheme } = useTheme();

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

  const toggleTheme = () => {
    setTheme(resolvedTheme === "dark" ? "light" : "dark");
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-university-50 to-university-100 dark:from-gray-900 dark:to-gray-800 flex flex-col items-center justify-center p-6">
      <Button 
        variant="ghost" 
        size="icon"
        onClick={toggleTheme}
        className="absolute top-4 right-4 text-university-600 hover:text-university-800 dark:text-university-400 dark:hover:text-university-300"
      >
        {resolvedTheme === "dark" ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
      </Button>
      
      <div className="mb-8 text-center">
        <div className="flex items-center justify-center mb-2">
          <BookOpen className="h-10 w-10 text-university-700 dark:text-university-400" />
          <h1 className="text-3xl font-bold text-university-800 dark:text-university-200 ml-2">UniCourse</h1>
        </div>
        <p className="text-university-600 dark:text-university-400 text-lg">Dynamic Course Allocation System</p>
      </div>
      
      <Card className="w-full max-w-md shadow-lg dark:bg-gray-800 dark:border-gray-700">
        <CardHeader>
          <CardTitle className="text-2xl text-center text-university-800 dark:text-white">Welcome Back</CardTitle>
          <CardDescription className="text-center dark:text-gray-300">Sign in to access your course portal</CardDescription>
        </CardHeader>
        
        <form onSubmit={handleLogin}>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email" className="dark:text-white">Email</Label>
              <Input 
                id="email" 
                type="email" 
                placeholder="your.email@university.edu" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:placeholder:text-gray-400"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="password" className="dark:text-white">Password</Label>
              <Input 
                id="password" 
                type="password" 
                placeholder="••••••••" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:placeholder:text-gray-400"
              />
            </div>
            
            <div className="space-y-2 pt-2">
              <Label className="dark:text-white">I am a:</Label>
              <RadioGroup 
                defaultValue="student" 
                className="flex space-x-4"
                value={role}
                onValueChange={setRole}
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="student" id="student-login" />
                  <Label htmlFor="student-login" className="cursor-pointer dark:text-gray-300">Student</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="admin" id="admin-login" />
                  <Label htmlFor="admin-login" className="cursor-pointer dark:text-gray-300">Administrator</Label>
                </div>
              </RadioGroup>
            </div>
          </CardContent>
          
          <CardFooter className="flex flex-col space-y-4">
            <Button type="submit" className="w-full bg-university-600 hover:bg-university-700 dark:bg-university-700 dark:hover:bg-university-600">
              Sign In
            </Button>
            
            <div className="text-center text-sm dark:text-gray-300">
              Don't have an account?{" "}
              <Button 
                variant="link" 
                className="p-0 h-auto text-university-600 hover:text-university-800 dark:text-university-400 dark:hover:text-university-300"
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
