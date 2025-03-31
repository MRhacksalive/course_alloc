
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/components/ui/use-toast";
import { BookOpen, ArrowLeft } from "lucide-react";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [cgpa, setCgpa] = useState("");
  const [college, setCollege] = useState("");
  const { toast } = useToast();
  const navigate = useNavigate();

  const colleges = [
    "School of Engineering",
    "School of Business",
    "School of Arts & Sciences",
    "School of Medicine",
    "School of Law",
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (password !== confirmPassword) {
      toast({
        title: "Password Error",
        description: "Passwords don't match",
        variant: "destructive",
      });
      return;
    }
    
    // Validate CGPA
    const cgpaNum = parseFloat(cgpa);
    if (isNaN(cgpaNum) || cgpaNum < 0 || cgpaNum > 10) {
      toast({
        title: "Invalid CGPA",
        description: "CGPA must be between 0 and 10",
        variant: "destructive",
      });
      return;
    }
    
    // This would typically be an API call
    toast({
      title: "Registration Successful",
      description: "Your account has been created. You can now log in.",
    });
    
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-university-50 to-university-100 flex flex-col items-center justify-center p-6">
      <div className="mb-6 text-center">
        <div className="flex items-center justify-center mb-2">
          <BookOpen className="h-10 w-10 text-university-700" />
          <h1 className="text-3xl font-bold text-university-800 ml-2">UniCourse</h1>
        </div>
        <p className="text-university-600 text-lg">Create your student account</p>
      </div>
      
      <Card className="w-full max-w-md shadow-lg">
        <CardHeader>
          <CardTitle className="text-2xl text-center text-university-800">Sign Up</CardTitle>
          <CardDescription className="text-center">Register for the course allocation system</CardDescription>
        </CardHeader>
        
        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Full Name</Label>
              <Input 
                id="name" 
                placeholder="John Doe" 
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>
            
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
            
            <div className="grid grid-cols-2 gap-4">
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
              
              <div className="space-y-2">
                <Label htmlFor="confirmPassword">Confirm Password</Label>
                <Input 
                  id="confirmPassword" 
                  type="password" 
                  placeholder="••••••••" 
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                />
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="cgpa">CGPA</Label>
              <Input 
                id="cgpa" 
                type="number" 
                min="0"
                max="10"
                step="0.01"
                placeholder="e.g., 8.5" 
                value={cgpa}
                onChange={(e) => setCgpa(e.target.value)}
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="college">College</Label>
              <Select value={college} onValueChange={setCollege} required>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select your college" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    {colleges.map((col) => (
                      <SelectItem key={col} value={col}>
                        {col}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
          
          <CardFooter className="flex flex-col space-y-4">
            <Button type="submit" className="w-full bg-university-600 hover:bg-university-700">
              Register
            </Button>
            
            <div className="text-center text-sm">
              Already have an account?{" "}
              <Button 
                variant="link" 
                className="p-0 h-auto text-university-600 hover:text-university-800"
                onClick={() => navigate("/")}
              >
                Sign in
              </Button>
            </div>
          </CardFooter>
        </form>
      </Card>
      
      <Button
        variant="ghost"
        size="sm"
        className="mt-6 text-university-600 hover:text-university-800"
        onClick={() => navigate("/")}
      >
        <ArrowLeft className="mr-2 h-4 w-4" /> Back to Login
      </Button>
    </div>
  );
};

export default Register;
