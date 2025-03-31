
import { useState } from "react";
import Sidebar from "@/components/Sidebar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { BookOpen, Clock, Calendar, MapPin, User } from "lucide-react";
import TimetableView from "@/components/TimetableView";

// Sample data
const myCourses = [
  {
    id: 1,
    code: "CS101",
    title: "Introduction to Computer Science",
    instructor: "Dr. John Smith",
    credits: 4,
    schedule: "Mon, Wed 10:00 - 11:30",
    location: "Science Building, Room 301",
    status: "enrolled",
  },
  {
    id: 2,
    code: "MATH201",
    title: "Calculus II",
    instructor: "Prof. Maria Garcia",
    credits: 3,
    schedule: "Tue, Thu 13:00 - 14:30",
    location: "Mathematics Department, Room 105",
    status: "enrolled",
  },
  {
    id: 3,
    code: "ENG102",
    title: "English Composition",
    instructor: "Dr. Robert Johnson",
    credits: 3,
    schedule: "Wed, Fri 09:00 - 10:30",
    location: "Arts Building, Room 204",
    status: "enrolled",
  },
  {
    id: 4,
    code: "PHY103",
    title: "Physics for Engineers",
    instructor: "Prof. Alan Wong",
    credits: 4,
    schedule: "Mon, Thu 14:00 - 15:30",
    location: "Science Building, Room 401",
    status: "enrolled",
  },
];

// Sample timetable data
const timetableEvents = [
  {
    id: 1,
    courseCode: "CS101",
    courseName: "Introduction to Computer Science",
    dayOfWeek: 1, // Monday
    startTime: "10:00",
    endTime: "11:30",
    location: "Science Building, Room 301",
    color: "bg-blue-500",
  },
  {
    id: 2,
    courseCode: "PHY103",
    courseName: "Physics for Engineers",
    dayOfWeek: 1, // Monday
    startTime: "14:00",
    endTime: "15:30",
    location: "Science Building, Room 401",
    color: "bg-green-500",
  },
  {
    id: 3,
    courseCode: "MATH201",
    courseName: "Calculus II",
    dayOfWeek: 2, // Tuesday
    startTime: "13:00",
    endTime: "14:30",
    location: "Mathematics Department, Room 105",
    color: "bg-purple-500",
  },
  {
    id: 4,
    courseCode: "ENG102",
    courseName: "English Composition",
    dayOfWeek: 3, // Wednesday
    startTime: "09:00",
    endTime: "10:30",
    location: "Arts Building, Room 204",
    color: "bg-yellow-500",
  },
  {
    id: 5,
    courseCode: "CS101",
    courseName: "Introduction to Computer Science",
    dayOfWeek: 3, // Wednesday
    startTime: "10:00",
    endTime: "11:30",
    location: "Science Building, Room 301",
    color: "bg-blue-500",
  },
  {
    id: 6,
    courseCode: "MATH201",
    courseName: "Calculus II",
    dayOfWeek: 4, // Thursday
    startTime: "13:00",
    endTime: "14:30",
    location: "Mathematics Department, Room 105",
    color: "bg-purple-500",
  },
  {
    id: 7,
    courseCode: "PHY103",
    courseName: "Physics for Engineers",
    dayOfWeek: 4, // Thursday
    startTime: "14:00",
    endTime: "15:30",
    location: "Science Building, Room 401",
    color: "bg-green-500",
  },
  {
    id: 8,
    courseCode: "ENG102",
    courseName: "English Composition",
    dayOfWeek: 5, // Friday
    startTime: "09:00",
    endTime: "10:30",
    location: "Arts Building, Room 204",
    color: "bg-yellow-500",
  },
];

const AllocatedCourses = () => {
  const [activeTab, setActiveTab] = useState("list");
  
  const getStatusColor = (status: string) => {
    switch (status) {
      case "enrolled":
        return "bg-green-500 hover:bg-green-600";
      case "pending":
        return "bg-yellow-500 hover:bg-yellow-600";
      case "waitlisted":
        return "bg-red-500 hover:bg-red-600";
      default:
        return "bg-gray-500 hover:bg-gray-600";
    }
  };
  
  return (
    <div className="min-h-screen flex bg-gray-50 dark:bg-gray-900">
      <Sidebar />
      
      <div className="flex-1 p-6 md:p-8 ml-0 md:ml-64">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <header className="mb-8">
            <h1 className="text-3xl font-bold text-university-800 dark:text-white">My Courses</h1>
            <p className="text-university-600 dark:text-gray-300">View your enrolled courses and schedule</p>
          </header>
          
          {/* Tabs */}
          <Tabs value={activeTab} onValueChange={setActiveTab} className="mb-8">
            <TabsList className="grid w-full grid-cols-2 max-w-md mx-auto dark:bg-gray-800">
              <TabsTrigger value="list" className="dark:data-[state=active]:bg-gray-700 dark:text-white">Course List</TabsTrigger>
              <TabsTrigger value="timetable" className="dark:data-[state=active]:bg-gray-700 dark:text-white">Timetable</TabsTrigger>
            </TabsList>
            
            {/* List View */}
            <TabsContent value="list" className="mt-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
                {myCourses.map((course) => (
                  <Card key={course.id} className="hover:shadow-md transition-shadow dark:bg-gray-800 dark:border-gray-700">
                    <CardHeader className="pb-2">
                      <div className="flex justify-between items-start">
                        <div>
                          <p className="text-sm text-university-600 dark:text-university-400 font-medium">{course.code}</p>
                          <CardTitle className="text-xl text-university-800 dark:text-white">{course.title}</CardTitle>
                        </div>
                        <Badge className={`${getStatusColor(course.status)} dark:text-white`}>
                          {course.status.charAt(0).toUpperCase() + course.status.slice(1)}
                        </Badge>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        <div className="flex items-center text-university-600 dark:text-gray-300">
                          <User className="h-4 w-4 mr-2" />
                          <span className="text-sm">{course.instructor}</span>
                        </div>
                        <div className="flex items-center text-university-600 dark:text-gray-300">
                          <Clock className="h-4 w-4 mr-2" />
                          <span className="text-sm">{course.schedule}</span>
                        </div>
                        <div className="flex items-center text-university-600 dark:text-gray-300">
                          <MapPin className="h-4 w-4 mr-2" />
                          <span className="text-sm">{course.location}</span>
                        </div>
                        <div className="flex items-center text-university-600 dark:text-gray-300">
                          <BookOpen className="h-4 w-4 mr-2" />
                          <span className="text-sm">{course.credits} Credits</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>
            
            {/* Timetable View */}
            <TabsContent value="timetable" className="mt-6">
              <Card className="dark:bg-gray-800 dark:border-gray-700">
                <CardHeader>
                  <CardTitle className="text-university-800 dark:text-white flex items-center">
                    <Calendar className="h-5 w-5 mr-2" />
                    Weekly Schedule
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <TimetableView events={timetableEvents} />
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
          
          {/* Summary */}
          <Card className="mt-6 dark:bg-gray-800 dark:border-gray-700">
            <CardHeader>
              <CardTitle className="text-university-800 dark:text-white">Course Summary</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="bg-university-50 dark:bg-gray-700 p-4 rounded-lg">
                  <p className="text-university-600 dark:text-gray-300 text-sm">Total Courses</p>
                  <p className="text-2xl font-bold text-university-800 dark:text-white">{myCourses.length}</p>
                </div>
                <div className="bg-university-50 dark:bg-gray-700 p-4 rounded-lg">
                  <p className="text-university-600 dark:text-gray-300 text-sm">Total Credits</p>
                  <p className="text-2xl font-bold text-university-800 dark:text-white">
                    {myCourses.reduce((sum, course) => sum + course.credits, 0)}
                  </p>
                </div>
                <div className="bg-university-50 dark:bg-gray-700 p-4 rounded-lg">
                  <p className="text-university-600 dark:text-gray-300 text-sm">Class Hours</p>
                  <p className="text-2xl font-bold text-university-800 dark:text-white">12 hrs/week</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default AllocatedCourses;
