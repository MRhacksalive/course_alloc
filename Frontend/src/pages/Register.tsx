import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useToast } from "@/components/ui/use-toast";
import { BookOpen } from "lucide-react";
import { useTheme } from "@/hooks/use-theme";

const Register = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [role, setRole] = useState("student");
  const [adminCode, setAdminCode] = useState("");
  const { toast } = useToast();
  const navigate = useNavigate();
  const { theme } = useTheme();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (role === "admin" && adminCode !== "ADMIN123") {
      toast({
        title: "Invalid Admin Code",
        description: "The admin verification code you entered is invalid.",
        variant: "destructive",
      });
      return;
    }

    if (password !== confirmPassword) {
      toast({
        title: "Password Mismatch",
        description: "The passwords you entered do not match.",
        variant: "destructive",
      });
      return;
    }

    try {
      const response = await axios.post("http://localhost:3000/user/register", {
        firstName,
        lastName,
        email,
        password,
      });

      toast({
        title: "Registration Successful",
        description: response.data.message || "Your account has been created successfully.",
      });

      // Redirect based on role
      navigate(role === "admin" ? "/admin" : "/dashboard");

    } catch (error: any) {
      console.error("Registration Error:", error);
      toast({
        title: "Registration Failed",
        description: error.response?.data?.message || "Something went wrong. Please try again.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-university-50 to-university-100 dark:from-gray-900 dark:to-gray-800 flex flex-col items-center justify-center p-6">
      <Button 
        variant="ghost" 
        className="absolute top-4 left-4 text-university-600 hover:text-university-800 dark:text-university-400 dark:hover:text-university-300"
        onClick={() => navigate("/")}
      >
        Back to Login
      </Button>

      <div className="mb-8 text-center">
        <div className="flex items-center justify-center mb-2">
          <BookOpen className="h-10 w-10 text-university-700 dark:text-university-400" />
          <h1 className="text-3xl font-bold text-university-800 dark:text-university-200 ml-2">UniCourse</h1>
        </div>
        <p className="text-university-600 dark:text-university-400 text-lg">Create your account</p>
      </div>

      <Card className="w-full max-w-lg shadow-lg dark:bg-gray-800 dark:border-gray-700">
        <CardHeader>
          <CardTitle className="text-2xl text-center text-university-800 dark:text-white">Register</CardTitle>
          <CardDescription className="text-center dark:text-gray-300">Fill out the form below to create your account</CardDescription>
        </CardHeader>

        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="firstName" className="dark:text-white">First Name</Label>
                <Input 
                  id="firstName" 
                  type="text" 
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  required
                  className="dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="lastName" className="dark:text-white">Last Name</Label>
                <Input 
                  id="lastName" 
                  type="text" 
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  required
                  className="dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                />
              </div>
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
                className="dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="password" className="dark:text-white">Password</Label>
                <Input 
                  id="password" 
                  type="password" 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="confirmPassword" className="dark:text-white">Confirm Password</Label>
                <Input 
                  id="confirmPassword" 
                  type="password" 
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                  className="dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                />
              </div>
            </div>

            <div className="space-y-2 pt-2">
              <Label className="dark:text-white">I am registering as:</Label>
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

            {role === "admin" && (
              <div className="space-y-2">
                <Label htmlFor="adminCode" className="dark:text-white">Admin Verification Code</Label>
                <Input 
                  id="adminCode" 
                  type="password" 
                  value={adminCode}
                  onChange={(e) => setAdminCode(e.target.value)}
                  required
                  className="dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                />
              </div>
            )}
          </CardContent>

          <CardFooter className="flex flex-col space-y-4">
            <Button type="submit" className="w-full bg-university-600 hover:bg-university-700">
              Create Account
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
};

export default Register;
