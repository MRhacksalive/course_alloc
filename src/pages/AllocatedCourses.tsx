
import { useState } from "react";
import Sidebar from "@/components/Sidebar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import TimetableView from "@/components/TimetableView";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/components/ui/use-toast";
import { Calendar, ListChecks, Download, X } from "lucide-react";

// Mock data - this would come from an API in a real application
const mockAllocatedCourses = [
  {
    id: 1,
    name: "Introduction to Computer Science",
    code: "CS101",
    professor: "Dr. Alan Turing",
    day: "Monday",
    startTime: "10:00",
    endTime: "12:00",
    location: "Room 101",
    status: "confirmed",
    color: "bg-blue-500"
  },
  {
    id: 2,
    name: "Introduction to Computer Science",
    code: "CS101",
    professor: "Dr. Alan Turing",
    day: "Wednesday",
    startTime: "10:00",
    endTime: "12:00",
    location: "Room 101",
    status: "confirmed",
    color: "bg-blue-500"
  },
  {
    id: 3,
    name: "Database Systems",
    code: "CS305",
    professor: "Dr. Edgar Codd",
    day: "Tuesday",
    startTime: "10:00",
    endTime: "12:00",
    location: "Lab 3",
    status: "confirmed",
    color: "bg-green-500"
  },
  {
    id: 4,
    name: "Database Systems",
    code: "CS305",
    professor: "Dr. Edgar Codd",
    day: "Friday",
    startTime: "10:00",
    endTime: "12:00",
    location: "Lab 3",
    status: "confirmed",
    color: "bg-green-500"
  },
  {
    id: 5,
    name: "Artificial Intelligence",
    code: "CS401",
    professor: "Dr. John McCarthy",
    day: "Monday",
    startTime: "15:00",
    endTime: "17:00",
    location: "Room 204",
    status: "pending",
    color: "bg-purple-500"
  },
  {
    id: 6,
    name: "Artificial Intelligence",
    code: "CS401",
    professor: "Dr. John McCarthy",
    day: "Thursday",
    startTime: "15:00",
    endTime: "17:00",
    location: "Room 204",
    status: "pending",
    color: "bg-purple-500"
  },
  {
    id: 7,
    name: "Machine Learning",
    code: "CS504",
    professor: "Dr. Geoffrey Hinton",
    day: "Tuesday",
    startTime: "14:00",
    endTime: "16:00",
    location: "Room 305",
    status: "confirmed",
    color: "bg-orange-500"
  },
  {
    id: 8,
    name: "Machine Learning",
    code: "CS504",
    professor: "Dr. Geoffrey Hinton",
    day: "Thursday",
    startTime: "10:00",
    endTime: "12:00",
    location: "Room 305",
    status: "confirmed",
    color: "bg-orange-500"
  },
  {
    id: 9,
    name: "Web Development",
    code: "CS202",
    professor: "Dr. Tim Berners-Lee",
    day: "Wednesday",
    startTime: "13:00",
    endTime: "15:00",
    location: "Lab 2",
    status: "confirmed",
    color: "bg-pink-500"
  },
  {
    id: 10,
    name: "Web Development",
    code: "CS202",
    professor: "Dr. Tim Berners-Lee",
    day: "Friday",
    startTime: "13:00",
    endTime: "15:00",
    location: "Lab 2",
    status: "confirmed",
    color: "bg-pink-500"
  }
];

// Group courses by their code
const groupCoursesByCode = (courses: typeof mockAllocatedCourses) => {
  const groupedCourses: { [key: string]: typeof mockAllocatedCourses } = {};
  
  courses.forEach(course => {
    if (!groupedCourses[course.code]) {
      groupedCourses[course.code] = [];
    }
    groupedCourses[course.code].push(course);
  });
  
  return Object.values(groupedCourses).map(courseGroup => ({
    code: courseGroup[0].code,
    name: courseGroup[0].name,
    professor: courseGroup[0].professor,
    status: courseGroup[0].status,
    sessions: courseGroup.map(session => ({
      id: session.id,
      day: session.day,
      startTime: session.startTime,
      endTime: session.endTime,
      location: session.location
    }))
  }));
};

const AllocatedCourses = () => {
  const [courses, setCourses] = useState(mockAllocatedCourses);
  const { toast } = useToast();
  
  const groupedCourses = groupCoursesByCode(courses);
  
  const confirmedCourses = courses.filter(course => course.status === "confirmed");
  const pendingCourses = courses.filter(course => course.status === "pending");
  
  const handleDropCourse = (courseCode: string) => {
    // In a real app, this would call an API to drop the course
    const updatedCourses = courses.filter(course => course.code !== courseCode);
    setCourses(updatedCourses);
    
    toast({
      title: "Course Dropped",
      description: `You have successfully dropped ${courseCode}.`,
    });
  };

  return (
    <div className="min-h-screen flex bg-gray-50 dark:bg-gray-900">
      <Sidebar />
      
      <div className="flex-1 p-6 md:p-8 ml-0 md:ml-64">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <header className="mb-8">
            <h1 className="text-3xl font-bold text-university-800 dark:text-university-200">My Courses</h1>
            <p className="text-university-600 dark:text-university-400">View your allocated courses and timetable</p>
          </header>
          
          {/* Tabs */}
          <Tabs defaultValue="timetable" className="mb-8">
            <TabsList className="grid grid-cols-2 w-[400px]">
              <TabsTrigger value="timetable" className="flex items-center">
                <Calendar className="h-4 w-4 mr-2" />
                Timetable View
              </TabsTrigger>
              <TabsTrigger value="list" className="flex items-center">
                <ListChecks className="h-4 w-4 mr-2" />
                List View
              </TabsTrigger>
            </TabsList>
            
            {/* Timetable Tab */}
            <TabsContent value="timetable">
              <Card>
                <CardHeader>
                  <div className="flex justify-between items-center">
                    <div>
                      <CardTitle className="dark:text-white">Weekly Schedule</CardTitle>
                      <CardDescription className="dark:text-gray-300">Your allocated course schedule for this semester</CardDescription>
                    </div>
                    <Button variant="outline" className="flex items-center gap-2 dark:text-gray-300 dark:border-gray-600">
                      <Download className="h-4 w-4" /> Export
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <TimetableView courses={courses} />
                </CardContent>
              </Card>
            </TabsContent>
            
            {/* List View Tab */}
            <TabsContent value="list">
              <Card>
                <CardHeader>
                  <CardTitle className="dark:text-white">Course List</CardTitle>
                  <CardDescription className="dark:text-gray-300">
                    You have {confirmedCourses.length} confirmed and {pendingCourses.length} pending courses
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    {groupedCourses.length > 0 ? (
                      groupedCourses.map((course) => (
                        <div key={course.code} className="border dark:border-gray-700 rounded-lg overflow-hidden">
                          <div className="flex justify-between items-center p-4 bg-gray-50 dark:bg-gray-800 border-b dark:border-gray-700">
                            <div>
                              <h3 className="font-medium text-university-800 dark:text-university-200">{course.name} ({course.code})</h3>
                              <p className="text-sm text-university-600 dark:text-university-400">Prof. {course.professor}</p>
                            </div>
                            <div className="flex items-center gap-4">
                              <Badge
                                className={
                                  course.status === "confirmed"
                                    ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200 hover:bg-green-200 dark:hover:bg-green-800"
                                    : "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200 hover:bg-yellow-200 dark:hover:bg-yellow-800"
                                }
                              >
                                {course.status === "confirmed" ? "Confirmed" : "Pending"}
                              </Badge>
                              <Button 
                                variant="ghost" 
                                size="sm" 
                                className="text-red-500 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-900 dark:hover:text-red-300"
                                onClick={() => handleDropCourse(course.code)}
                              >
                                <X className="h-4 w-4" />
                              </Button>
                            </div>
                          </div>
                          
                          <div className="p-4 dark:bg-gray-800">
                            <h4 className="text-sm font-medium text-university-700 dark:text-university-300 mb-2">Schedule:</h4>
                            <div className="space-y-2">
                              {course.sessions.map((session) => (
                                <div key={session.id} className="flex items-center text-sm">
                                  <div className="w-24 font-medium dark:text-gray-200">{session.day}:</div>
                                  <div className="dark:text-gray-300">{session.startTime} - {session.endTime}</div>
                                  <div className="ml-4 text-gray-500 dark:text-gray-400">({session.location})</div>
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>
                      ))
                    ) : (
                      <div className="text-center py-12">
                        <h3 className="text-lg font-medium text-university-800 dark:text-university-200 mb-2">No courses allocated yet</h3>
                        <p className="text-university-600 dark:text-university-400">Check the available courses page to apply for courses</p>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default AllocatedCourses;
