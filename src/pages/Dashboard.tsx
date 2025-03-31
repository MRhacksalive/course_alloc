
import { useState, useEffect } from "react";
import Sidebar from "@/components/Sidebar";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { BookOpen, Calendar, GraduationCap, Users } from "lucide-react";
import { Badge } from "@/components/ui/badge";

const Dashboard = () => {
  const navigate = useNavigate();
  
  // Dummy data - in a real app, this would come from an API
  const [studentData] = useState({
    name: "Alex Johnson",
    college: "School of Engineering",
    cgpa: 8.7,
    courses: {
      applied: 4,
      allocated: 3,
      pending: 1
    }
  });

  // Dummy announcements data
  const [announcements] = useState([
    {
      id: 1,
      title: "Course Registration Open",
      description: "Registration for Fall 2023 courses is now open until September 15.",
      date: "August 28, 2023",
      important: true
    },
    {
      id: 2,
      title: "System Maintenance",
      description: "The course allocation system will be down for maintenance on September 5 from 2-4 AM EST.",
      date: "August 30, 2023",
      important: false
    },
    {
      id: 3,
      title: "New Data Science Courses Added",
      description: "Three new data science electives have been added for the upcoming semester.",
      date: "September 1, 2023",
      important: false
    }
  ]);

  return (
    <div className="min-h-screen flex bg-gray-50">
      <Sidebar />
      
      <div className="flex-1 p-6 md:p-8 ml-0 md:ml-64">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <header className="mb-8">
            <h1 className="text-3xl font-bold text-university-800">Welcome, {studentData.name}</h1>
            <p className="text-university-600 mt-1">
              {studentData.college} | CGPA: {studentData.cgpa}
            </p>
          </header>
          
          {/* Quick Stats */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <Card className="bg-white shadow-sm hover:shadow transition-shadow">
              <CardContent className="p-6 flex items-start">
                <div className="rounded-full p-3 bg-university-100 text-university-700 mr-4">
                  <BookOpen className="h-6 w-6" />
                </div>
                <div>
                  <p className="text-sm font-medium text-university-600">Available Courses</p>
                  <h3 className="text-2xl font-bold text-university-800">24</h3>
                  <Button 
                    variant="link" 
                    className="p-0 h-auto text-university-500 hover:text-university-700"
                    onClick={() => navigate('/courses')}
                  >
                    Browse Courses
                  </Button>
                </div>
              </CardContent>
            </Card>
            
            <Card className="bg-white shadow-sm hover:shadow transition-shadow">
              <CardContent className="p-6 flex items-start">
                <div className="rounded-full p-3 bg-green-100 text-green-700 mr-4">
                  <GraduationCap className="h-6 w-6" />
                </div>
                <div>
                  <p className="text-sm font-medium text-university-600">Allocated Courses</p>
                  <h3 className="text-2xl font-bold text-university-800">{studentData.courses.allocated}</h3>
                  <Button 
                    variant="link" 
                    className="p-0 h-auto text-university-500 hover:text-university-700"
                    onClick={() => navigate('/allocated')}
                  >
                    View My Courses
                  </Button>
                </div>
              </CardContent>
            </Card>
            
            <Card className="bg-white shadow-sm hover:shadow transition-shadow">
              <CardContent className="p-6 flex items-start">
                <div className="rounded-full p-3 bg-yellow-100 text-yellow-700 mr-4">
                  <Calendar className="h-6 w-6" />
                </div>
                <div>
                  <p className="text-sm font-medium text-university-600">Pending Allocation</p>
                  <h3 className="text-2xl font-bold text-university-800">{studentData.courses.pending}</h3>
                  <p className="text-xs text-university-500">Last updated today</p>
                </div>
              </CardContent>
            </Card>
            
            <Card className="bg-white shadow-sm hover:shadow transition-shadow">
              <CardContent className="p-6 flex items-start">
                <div className="rounded-full p-3 bg-purple-100 text-purple-700 mr-4">
                  <Users className="h-6 w-6" />
                </div>
                <div>
                  <p className="text-sm font-medium text-university-600">Total Credits</p>
                  <h3 className="text-2xl font-bold text-university-800">12</h3>
                  <p className="text-xs text-university-500">Out of 24 maximum</p>
                </div>
              </CardContent>
            </Card>
          </div>
          
          {/* Announcements */}
          <Card className="mb-8 bg-white shadow-sm">
            <CardHeader>
              <CardTitle>Announcements</CardTitle>
              <CardDescription>Latest updates from the university</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {announcements.map((announcement) => (
                  <div key={announcement.id} className="p-4 border rounded-md">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="text-lg font-semibold flex items-center">
                        {announcement.title}
                        {announcement.important && (
                          <Badge className="ml-2 bg-red-500" variant="secondary">
                            Important
                          </Badge>
                        )}
                      </h3>
                      <span className="text-sm text-gray-500">{announcement.date}</span>
                    </div>
                    <p className="text-gray-700">{announcement.description}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
          
          {/* Action Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="bg-gradient-to-br from-university-500 to-university-700 text-white shadow-md">
              <CardContent className="p-6">
                <h3 className="text-xl font-bold mb-2">Ready to enroll in courses?</h3>
                <p className="mb-4">Browse available courses and apply based on your interests and curriculum requirements.</p>
                <Button 
                  variant="secondary" 
                  className="bg-white text-university-700 hover:bg-gray-100"
                  onClick={() => navigate('/courses')}
                >
                  Browse Available Courses
                </Button>
              </CardContent>
            </Card>
            
            <Card className="bg-white shadow-md border-2 border-university-200">
              <CardContent className="p-6">
                <h3 className="text-xl font-bold text-university-800 mb-2">View Your Schedule</h3>
                <p className="text-university-600 mb-4">Check your current course allocations and class schedule for the semester.</p>
                <Button 
                  className="bg-university-600 hover:bg-university-700"
                  onClick={() => navigate('/allocated')}
                >
                  View Timetable
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
