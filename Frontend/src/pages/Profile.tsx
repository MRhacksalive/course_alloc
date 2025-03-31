import { useState } from "react";
import Sidebar from "@/components/Sidebar";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/components/ui/use-toast";
import { User, Mail, Bookmark, Award, School, Edit2 } from "lucide-react";

const Profile = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [studentData, setStudentData] = useState({
    name: "Alex Johnson",
    email: "alex.johnson@university.edu",
    college: "School of Engineering",
    cgpa: "8.7",
    studentId: "S12345678",
    program: "Computer Science",
    year: "3rd Year",
    advisor: "Dr. Richard Feynman"
  });
  
  const [formData, setFormData] = useState({ ...studentData });
  const { toast } = useToast();
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStudentData({ ...formData });
    setIsEditing(false);
    
    toast({
      title: "Profile Updated",
      description: "Your profile has been successfully updated.",
    });
  };
  
  return (
    <div className="min-h-screen flex bg-gray-50">
      <Sidebar />
      
      <div className="flex-1 p-6 md:p-8 ml-0 md:ml-64">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <header className="mb-8">
            <h1 className="text-3xl font-bold text-university-800">My Profile</h1>
            <p className="text-university-600">View and manage your personal information</p>
          </header>
          
          {/* Profile Card */}
          <Card className="mb-8">
            <CardHeader className="flex flex-col sm:flex-row items-center sm:items-start gap-6">
              <Avatar className="h-24 w-24">
                <AvatarImage src="" />
                <AvatarFallback className="text-2xl bg-university-200 text-university-700">
                  {studentData.name.split(' ').map(n => n[0]).join('')}
                </AvatarFallback>
              </Avatar>
              
              <div className="flex flex-col items-center sm:items-start">
                <CardTitle className="text-2xl text-center sm:text-left">
                  {studentData.name}
                </CardTitle>
                <CardDescription className="text-center sm:text-left">
                  {studentData.program}, {studentData.year}
                </CardDescription>
                <div className="flex items-center gap-2 mt-2">
                  <Badge className="bg-university-100 text-university-800 hover:bg-university-200">
                    Student ID: {studentData.studentId}
                  </Badge>
                  <Badge className="bg-green-100 text-green-800 hover:bg-green-200">
                    CGPA: {studentData.cgpa}
                  </Badge>
                </div>
              </div>
              
              <Button 
                variant="outline" 
                size="sm" 
                className="ml-auto"
                onClick={() => setIsEditing(!isEditing)}
              >
                <Edit2 className="h-4 w-4 mr-2" />
                {isEditing ? "Cancel" : "Edit Profile"}
              </Button>
            </CardHeader>
            
            <CardContent>
              {isEditing ? (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">Full Name</Label>
                      <Input 
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <Input 
                        id="email"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        disabled
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="program">Program</Label>
                      <Input 
                        id="program"
                        name="program"
                        value={formData.program}
                        onChange={handleInputChange}
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="year">Year</Label>
                      <Input 
                        id="year"
                        name="year"
                        value={formData.year}
                        onChange={handleInputChange}
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="college">College</Label>
                      <Input 
                        id="college"
                        name="college"
                        value={formData.college}
                        onChange={handleInputChange}
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="advisor">Academic Advisor</Label>
                      <Input 
                        id="advisor"
                        name="advisor"
                        value={formData.advisor}
                        onChange={handleInputChange}
                      />
                    </div>
                  </div>
                  
                  <div className="flex justify-end gap-3 pt-4">
                    <Button 
                      type="button" 
                      variant="outline"
                      onClick={() => {
                        setFormData({ ...studentData });
                        setIsEditing(false);
                      }}
                    >
                      Cancel
                    </Button>
                    <Button type="submit" className="bg-university-600 hover:bg-university-700">
                      Save Changes
                    </Button>
                  </div>
                </form>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-y-6">
                  <div>
                    <div className="flex items-center">
                      <User className="h-5 w-5 text-university-600 mr-3" />
                      <div>
                        <p className="text-sm text-university-500">Full Name</p>
                        <p className="font-medium">{studentData.name}</p>
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <div className="flex items-center">
                      <Mail className="h-5 w-5 text-university-600 mr-3" />
                      <div>
                        <p className="text-sm text-university-500">Email</p>
                        <p className="font-medium">{studentData.email}</p>
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <div className="flex items-center">
                      <Bookmark className="h-5 w-5 text-university-600 mr-3" />
                      <div>
                        <p className="text-sm text-university-500">Program</p>
                        <p className="font-medium">{studentData.program}</p>
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <div className="flex items-center">
                      <Award className="h-5 w-5 text-university-600 mr-3" />
                      <div>
                        <p className="text-sm text-university-500">CGPA</p>
                        <p className="font-medium">{studentData.cgpa}</p>
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <div className="flex items-center">
                      <School className="h-5 w-5 text-university-600 mr-3" />
                      <div>
                        <p className="text-sm text-university-500">College</p>
                        <p className="font-medium">{studentData.college}</p>
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <div className="flex items-center">
                      <User className="h-5 w-5 text-university-600 mr-3" />
                      <div>
                        <p className="text-sm text-university-500">Academic Advisor</p>
                        <p className="font-medium">{studentData.advisor}</p>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
          
          {/* Other cards could go here - e.g. Academic History, etc. */}
        </div>
      </div>
    </div>
  );
};

export default Profile;
