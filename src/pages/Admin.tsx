
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "@/components/Sidebar";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { BookOpen, Users, AlertTriangle, CheckCircle, LineChart } from "lucide-react";

const Admin = () => {
  const navigate = useNavigate();
  
  // Mock data - in a real app these would come from API calls
  const [stats] = useState({
    totalStudents: 1254,
    totalCourses: 87,
    pendingAllocations: 156,
    completedAllocations: 1098
  });

  return (
    <div className="min-h-screen flex bg-gray-50">
      <Sidebar isAdmin />
      
      <div className="flex-1 p-6 md:p-8 ml-0 md:ml-64">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <header className="mb-8">
            <h1 className="text-3xl font-bold text-university-800">Admin Dashboard</h1>
            <p className="text-university-600">Manage courses, students, and allocations</p>
          </header>
          
          {/* Stats */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <Card className="bg-white shadow-sm hover:shadow transition-shadow">
              <CardContent className="p-6 flex items-start">
                <div className="rounded-full p-3 bg-university-100 text-university-700 mr-4">
                  <Users className="h-6 w-6" />
                </div>
                <div>
                  <p className="text-sm font-medium text-university-600">Total Students</p>
                  <h3 className="text-2xl font-bold text-university-800">{stats.totalStudents}</h3>
                  <Button 
                    variant="link" 
                    className="p-0 h-auto text-university-500 hover:text-university-700"
                    onClick={() => navigate('/admin/students')}
                  >
                    Manage Students
                  </Button>
                </div>
              </CardContent>
            </Card>
            
            <Card className="bg-white shadow-sm hover:shadow transition-shadow">
              <CardContent className="p-6 flex items-start">
                <div className="rounded-full p-3 bg-green-100 text-green-700 mr-4">
                  <BookOpen className="h-6 w-6" />
                </div>
                <div>
                  <p className="text-sm font-medium text-university-600">Total Courses</p>
                  <h3 className="text-2xl font-bold text-university-800">{stats.totalCourses}</h3>
                  <Button 
                    variant="link" 
                    className="p-0 h-auto text-university-500 hover:text-university-700"
                    onClick={() => navigate('/admin/courses')}
                  >
                    Manage Courses
                  </Button>
                </div>
              </CardContent>
            </Card>
            
            <Card className="bg-white shadow-sm hover:shadow transition-shadow">
              <CardContent className="p-6 flex items-start">
                <div className="rounded-full p-3 bg-yellow-100 text-yellow-700 mr-4">
                  <AlertTriangle className="h-6 w-6" />
                </div>
                <div>
                  <p className="text-sm font-medium text-university-600">Pending Allocations</p>
                  <h3 className="text-2xl font-bold text-university-800">{stats.pendingAllocations}</h3>
                  <p className="text-xs text-university-500">Needs approval</p>
                </div>
              </CardContent>
            </Card>
            
            <Card className="bg-white shadow-sm hover:shadow transition-shadow">
              <CardContent className="p-6 flex items-start">
                <div className="rounded-full p-3 bg-purple-100 text-purple-700 mr-4">
                  <CheckCircle className="h-6 w-6" />
                </div>
                <div>
                  <p className="text-sm font-medium text-university-600">Completed Allocations</p>
                  <h3 className="text-2xl font-bold text-university-800">{stats.completedAllocations}</h3>
                  <p className="text-xs text-university-500">Successfully allocated</p>
                </div>
              </CardContent>
            </Card>
          </div>
          
          {/* Main Actions */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <Card className="bg-gradient-to-br from-university-500 to-university-700 text-white shadow-md">
              <CardContent className="p-6">
                <h3 className="text-xl font-bold mb-2">Manage Courses</h3>
                <p className="mb-4">Add, edit, or remove courses from the system. Set capacity, schedule, and instructor assignments.</p>
                <Button 
                  variant="secondary" 
                  className="bg-white text-university-700 hover:bg-gray-100"
                  onClick={() => navigate('/admin/courses')}
                >
                  Go to Course Management
                </Button>
              </CardContent>
            </Card>
            
            <Card className="bg-white shadow-md border-2 border-university-200">
              <CardContent className="p-6">
                <h3 className="text-xl font-bold text-university-800 mb-2">Manage Students</h3>
                <p className="text-university-600 mb-4">Review student information, manage allocations, and process course approvals.</p>
                <Button 
                  className="bg-university-600 hover:bg-university-700"
                  onClick={() => navigate('/admin/students')}
                >
                  Go to Student Management
                </Button>
              </CardContent>
            </Card>
          </div>
          
          {/* Recent Activities */}
          <Card>
            <CardHeader>
              <CardTitle>Recent Activities</CardTitle>
              <CardDescription>Latest actions in the system</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[1, 2, 3, 4, 5].map((i) => (
                  <div key={i} className="flex items-start border-b pb-4 last:border-b-0 last:pb-0">
                    <div className="bg-gray-100 rounded-full p-2 mr-4">
                      {i % 2 === 0 ? 
                        <Users className="h-4 w-4 text-university-600" /> : 
                        <BookOpen className="h-4 w-4 text-university-600" />
                      }
                    </div>
                    <div className="flex-1">
                      <h4 className="text-sm font-medium">
                        {i % 2 === 0 ? 
                          `Student allocation approved for ${['CS101', 'MATH201', 'PHY303'][i % 3]}` : 
                          `New course ${['Data Science', 'Machine Learning', 'Web Development'][i % 3]} added`
                        }
                      </h4>
                      <p className="text-xs text-university-500">{30 - i * 5} minutes ago</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
            <CardFooter>
              <Button variant="outline" className="w-full">View All Activity</Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Admin;
