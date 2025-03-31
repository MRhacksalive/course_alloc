
import { useState } from "react";
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
    <div className="min-h-screen flex bg-gray-50 dark:bg-gray-900">
      <Sidebar />
      
      <div className="flex-1 p-6 md:p-8 ml-0 md:ml-64">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <header className="mb-8">
            <h1 className="text-3xl font-bold text-university-800 dark:text-university-200">Welcome, {studentData.name}</h1>
            <p className="text-university-600 dark:text-university-400 mt-1">
              {studentData.college} | CGPA: {studentData.cgpa}
            </p>
          </header>
          
          {/* Quick Stats */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <Card className="bg-white dark:bg-gray-800 shadow-sm hover:shadow transition-shadow">
              <CardContent className="p-6 flex items-start">
                <div className="rounded-full p-3 bg-university-100 dark:bg-university-900 text-university-700 dark:text-university-300 mr-4">
                  <BookOpen className="h-6 w-6" />
                </div>
                <div>
                  <p className="text-sm font-medium text-university-600 dark:text-university-400">Available Courses</p>
                  <h3 className="text-2xl font-bold text-university-800 dark:text-university-200">24</h3>
                  <Button 
                    variant="link" 
                    className="p-0 h-auto text-university-500 hover:text-university-700 dark:text-university-400 dark:hover:text-university-300"
                    onClick={() => navigate('/courses')}
                  >
                    Browse Courses
                  </Button>
                </div>
              </CardContent>
            </Card>
            
            <Card className="bg-white dark:bg-gray-800 shadow-sm hover:shadow transition-shadow">
              <CardContent className="p-6 flex items-start">
                <div className="rounded-full p-3 bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300 mr-4">
                  <GraduationCap className="h-6 w-6" />
                </div>
                <div>
                  <p className="text-sm font-medium text-university-600 dark:text-university-400">Allocated Courses</p>
                  <h3 className="text-2xl font-bold text-university-800 dark:text-university-200">{studentData.courses.allocated}</h3>
                  <Button 
                    variant="link" 
                    className="p-0 h-auto text-university-500 hover:text-university-700 dark:text-university-400 dark:hover:text-university-300"
                    onClick={() => navigate('/allocated')}
                  >
                    View My Courses
                  </Button>
                </div>
              </CardContent>
            </Card>
            
            <Card className="bg-white dark:bg-gray-800 shadow-sm hover:shadow transition-shadow">
              <CardContent className="p-6 flex items-start">
                <div className="rounded-full p-3 bg-yellow-100 dark:bg-yellow-900 text-yellow-700 dark:text-yellow-300 mr-4">
                  <Calendar className="h-6 w-6" />
                </div>
                <div>
                  <p className="text-sm font-medium text-university-600 dark:text-university-400">Pending Allocation</p>
                  <h3 className="text-2xl font-bold text-university-800 dark:text-university-200">{studentData.courses.pending}</h3>
                  <p className="text-xs text-university-500 dark:text-university-400">Last updated today</p>
                </div>
              </CardContent>
            </Card>
            
            <Card className="bg-white dark:bg-gray-800 shadow-sm hover:shadow transition-shadow">
              <CardContent className="p-6 flex items-start">
                <div className="rounded-full p-3 bg-purple-100 dark:bg-purple-900 text-purple-700 dark:text-purple-300 mr-4">
                  <Users className="h-6 w-6" />
                </div>
                <div>
                  <p className="text-sm font-medium text-university-600 dark:text-university-400">Total Credits</p>
                  <h3 className="text-2xl font-bold text-university-800 dark:text-university-200">12</h3>
                  <p className="text-xs text-university-500 dark:text-university-400">Out of 24 maximum</p>
                </div>
              </CardContent>
            </Card>
          </div>
          
          {/* Announcements */}
          <Card className="mb-8 bg-white dark:bg-gray-800 shadow-sm">
            <CardHeader>
              <CardTitle className="dark:text-white">Announcements</CardTitle>
              <CardDescription className="dark:text-gray-300">Latest updates from the university</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {announcements.map((announcement) => (
                  <div key={announcement.id} className="p-4 border dark:border-gray-700 rounded-md">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="text-lg font-semibold flex items-center dark:text-white">
                        {announcement.title}
                        {announcement.important && (
                          <Badge className="ml-2 bg-red-500" variant="secondary">
                            Important
                          </Badge>
                        )}
                      </h3>
                      <span className="text-sm text-gray-500 dark:text-gray-400">{announcement.date}</span>
                    </div>
                    <p className="text-gray-700 dark:text-gray-300">{announcement.description}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
