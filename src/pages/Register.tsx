
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useToast } from "@/components/ui/use-toast";
import { BookOpen, ArrowLeft } from "lucide-react";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [cgpa, setCgpa] = useState("");
  const [college, setCollege] = useState("");
  const [role, setRole] = useState("student");
  const [adminKey, setAdminKey] = useState("");
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
    
    // For admin role, verify admin key
    if (role === "admin" && adminKey !== "admin123") { // In a real app, this would be verified on the server
      toast({
        title: "Invalid Admin Key",
        description: "The provided admin key is incorrect",
        variant: "destructive",
      });
      return;
    }
    
    // Only validate CGPA for student role
    if (role === "student") {
      const cgpaNum = parseFloat(cgpa);
      if (isNaN(cgpaNum) || cgpaNum < 0 || cgpaNum > 10) {
        toast({
          title: "Invalid CGPA",
          description: "CGPA must be between 0 and 10",
          variant: "destructive",
        });
        return;
      }
    }
    
    // This would typically be an API call
    toast({
      title: "Registration Successful",
      description: "Your account has been created. You can now log in.",
    });
    
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-university-50 to-university-100 dark:from-gray-900 dark:to-gray-800 flex flex-col items-center justify-center p-6">
      <div className="mb-6 text-center">
        <div className="flex items-center justify-center mb-2">
          <BookOpen className="h-10 w-10 text-university-700 dark:text-university-400" />
          <h1 className="text-3xl font-bold text-university-800 dark:text-university-200 ml-2">UniCourse</h1>
        </div>
        <p className="text-university-600 dark:text-university-400 text-lg">Create your account</p>
      </div>
      
      <Card className="w-full max-w-md shadow-lg dark:bg-gray-800 dark:border-gray-700">
        <CardHeader>
          <CardTitle className="text-2xl text-center text-university-800 dark:text-white">Sign Up</CardTitle>
          <CardDescription className="text-center dark:text-gray-300">Register for the course allocation system</CardDescription>
        </CardHeader>
        
        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="role" className="dark:text-white">I am registering as:</Label>
              <RadioGroup 
                value={role}
                onValueChange={setRole}
                className="flex space-x-4"
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="student" id="student" />
                  <Label htmlFor="student" className="cursor-pointer dark:text-gray-300">Student</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="admin" id="admin" />
                  <Label htmlFor="admin" className="cursor-pointer dark:text-gray-300">Administrator</Label>
                </div>
              </RadioGroup>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="name" className="dark:text-white">Full Name</Label>
              <Input 
                id="name" 
                placeholder="John Doe" 
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className="dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:placeholder:text-gray-400"
              />
            </div>
            
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
            
            <div className="grid grid-cols-2 gap-4">
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
              
              <div className="space-y-2">
                <Label htmlFor="confirmPassword" className="dark:text-white">Confirm Password</Label>
                <Input 
                  id="confirmPassword" 
                  type="password" 
                  placeholder="••••••••" 
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                  className="dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:placeholder:text-gray-400"
                />
              </div>
            </div>
            
            {role === "student" && (
              <>
                <div className="space-y-2">
                  <Label htmlFor="cgpa" className="dark:text-white">CGPA</Label>
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
                    className="dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:placeholder:text-gray-400"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="college" className="dark:text-white">College</Label>
                  <Select value={college} onValueChange={setCollege} required>
                    <SelectTrigger className="w-full dark:bg-gray-700 dark:border-gray-600 dark:text-white">
                      <SelectValue placeholder="Select your college" />
                    </SelectTrigger>
                    <SelectContent className="dark:bg-gray-700">
                      <SelectGroup>
                        {colleges.map((col) => (
                          <SelectItem key={col} value={col} className="dark:text-white dark:focus:bg-gray-600 dark:focus:text-white">
                            {col}
                          </SelectItem>
                        ))}
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </div>
              </>
            )}

            {role === "admin" && (
              <div className="space-y-2">
                <Label htmlFor="adminKey" className="dark:text-white">Admin Key</Label>
                <Input 
                  id="adminKey" 
                  type="password" 
                  placeholder="Enter administrator key" 
                  value={adminKey}
                  onChange={(e) => setAdminKey(e.target.value)}
                  required
                  className="dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:placeholder:text-gray-400"
                />
                <p className="text-xs text-gray-500 dark:text-gray-400">Contact your system administrator for the key</p>
              </div>
            )}
          </CardContent>
          
          <CardFooter className="flex flex-col space-y-4">
            <Button type="submit" className="w-full bg-university-600 hover:bg-university-700 dark:bg-university-700 dark:hover:bg-university-600">
              Register
            </Button>
            
            <div className="text-center text-sm dark:text-gray-300">
              Already have an account?{" "}
              <Button 
                variant="link" 
                className="p-0 h-auto text-university-600 hover:text-university-800 dark:text-university-400 dark:hover:text-university-300"
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
        className="mt-6 text-university-600 hover:text-university-800 dark:text-university-400 dark:hover:text-university-300"
        onClick={() => navigate("/")}
      >
        <ArrowLeft className="mr-2 h-4 w-4" /> Back to Login
      </Button>
    </div>
  );
};

export default Register;
