
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "@/components/Sidebar";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { BookOpen, Users, AlertTriangle, CheckCircle } from "lucide-react";

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
    <div className="min-h-screen flex bg-gray-50 dark:bg-gray-900">
      <Sidebar isAdmin />
      
      <div className="flex-1 p-6 md:p-8 ml-0 md:ml-64">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <header className="mb-8">
            <h1 className="text-3xl font-bold text-university-800 dark:text-white">Admin Dashboard</h1>
            <p className="text-university-600 dark:text-gray-300">Manage courses, students, and allocations</p>
          </header>
          
          {/* Stats */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <Card className="bg-white dark:bg-gray-800 shadow-sm hover:shadow transition-shadow">
              <CardContent className="p-6 flex items-start">
                <div className="rounded-full p-3 bg-university-100 dark:bg-university-900/50 text-university-700 dark:text-university-400 mr-4">
                  <Users className="h-6 w-6" />
                </div>
                <div>
                  <p className="text-sm font-medium text-university-600 dark:text-gray-300">Total Students</p>
                  <h3 className="text-2xl font-bold text-university-800 dark:text-white">{stats.totalStudents}</h3>
                </div>
              </CardContent>
            </Card>
            
            <Card className="bg-white dark:bg-gray-800 shadow-sm hover:shadow transition-shadow">
              <CardContent className="p-6 flex items-start">
                <div className="rounded-full p-3 bg-green-100 dark:bg-green-900/50 text-green-700 dark:text-green-400 mr-4">
                  <BookOpen className="h-6 w-6" />
                </div>
                <div>
                  <p className="text-sm font-medium text-university-600 dark:text-gray-300">Total Courses</p>
                  <h3 className="text-2xl font-bold text-university-800 dark:text-white">{stats.totalCourses}</h3>
                </div>
              </CardContent>
            </Card>
            
            <Card className="bg-white dark:bg-gray-800 shadow-sm hover:shadow transition-shadow">
              <CardContent className="p-6 flex items-start">
                <div className="rounded-full p-3 bg-yellow-100 dark:bg-yellow-900/50 text-yellow-700 dark:text-yellow-400 mr-4">
                  <AlertTriangle className="h-6 w-6" />
                </div>
                <div>
                  <p className="text-sm font-medium text-university-600 dark:text-gray-300">Pending Allocations</p>
                  <h3 className="text-2xl font-bold text-university-800 dark:text-white">{stats.pendingAllocations}</h3>
                  <p className="text-xs text-university-500 dark:text-gray-400">Needs approval</p>
                </div>
              </CardContent>
            </Card>
            
            <Card className="bg-white dark:bg-gray-800 shadow-sm hover:shadow transition-shadow">
              <CardContent className="p-6 flex items-start">
                <div className="rounded-full p-3 bg-purple-100 dark:bg-purple-900/50 text-purple-700 dark:text-purple-400 mr-4">
                  <CheckCircle className="h-6 w-6" />
                </div>
                <div>
                  <p className="text-sm font-medium text-university-600 dark:text-gray-300">Completed Allocations</p>
                  <h3 className="text-2xl font-bold text-university-800 dark:text-white">{stats.completedAllocations}</h3>
                  <p className="text-xs text-university-500 dark:text-gray-400">Successfully allocated</p>
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
            
            <Card className="bg-white dark:bg-gray-800 shadow-md border-2 border-university-200 dark:border-gray-700">
              <CardContent className="p-6">
                <h3 className="text-xl font-bold text-university-800 dark:text-white mb-2">Manage Students</h3>
                <p className="text-university-600 dark:text-gray-300 mb-4">Review student information, manage allocations, and process course approvals.</p>
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
          <Card className="dark:bg-gray-800 dark:border-gray-700">
            <CardHeader>
              <CardTitle className="dark:text-white">Recent Activities</CardTitle>
              <CardDescription className="dark:text-gray-300">Latest actions in the system</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[1, 2, 3, 4, 5].map((i) => (
                  <div key={i} className="flex items-start border-b dark:border-gray-700 pb-4 last:border-b-0 last:pb-0">
                    <div className="bg-gray-100 dark:bg-gray-700 rounded-full p-2 mr-4">
                      {i % 2 === 0 ? 
                        <Users className="h-4 w-4 text-university-600 dark:text-university-400" /> : 
                        <BookOpen className="h-4 w-4 text-university-600 dark:text-university-400" />
                      }
                    </div>
                    <div className="flex-1">
                      <h4 className="text-sm font-medium dark:text-white">
                        {i % 2 === 0 ? 
                          `Student allocation approved for ${['CS101', 'MATH201', 'PHY303'][i % 3]}` : 
                          `New course ${['Data Science', 'Machine Learning', 'Web Development'][i % 3]} added`
                        }
                      </h4>
                      <p className="text-xs text-university-500 dark:text-gray-400">{30 - i * 5} minutes ago</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
            <CardFooter className="dark:border-t dark:border-gray-700">
              <Button variant="outline" className="w-full dark:border-gray-700 dark:text-gray-200 dark:hover:bg-gray-700">
                View All Activity
              </Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Admin;
