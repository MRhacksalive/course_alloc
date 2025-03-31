
import React, { useState } from "react";
import Sidebar from "@/components/Sidebar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/components/ui/use-toast";
import { Plus, Pencil, Trash2, Search } from "lucide-react";

// Mock data
const initialCourses = [
  {
    id: 1,
    name: "Introduction to Computer Science",
    code: "CS101",
    professor: "Dr. Alan Turing",
    credits: 3,
    seats: 50,
    schedule: "Mon, Wed 10:00-12:00",
    department: "Computer Science"
  },
  {
    id: 2,
    name: "Database Systems",
    code: "CS305",
    professor: "Dr. Edgar Codd",
    credits: 4,
    seats: 40,
    schedule: "Tue, Fri 10:00-12:00",
    department: "Computer Science"
  },
  {
    id: 3,
    name: "Artificial Intelligence",
    code: "CS401",
    professor: "Dr. John McCarthy",
    credits: 4,
    seats: 30,
    schedule: "Mon, Thu 15:00-17:00",
    department: "Computer Science"
  },
  {
    id: 4,
    name: "Machine Learning",
    code: "CS504",
    professor: "Dr. Geoffrey Hinton",
    credits: 4,
    seats: 25,
    schedule: "Tue, Thu 14:00-16:00",
    department: "Computer Science"
  },
  {
    id: 5,
    name: "Calculus I",
    code: "MATH101",
    professor: "Dr. Isaac Newton",
    credits: 3,
    seats: 60,
    schedule: "Mon, Wed 13:00-15:00",
    department: "Mathematics"
  }
];

const AdminCourses = () => {
  const [courses, setCourses] = useState(initialCourses);
  const [searchQuery, setSearchQuery] = useState("");
  const [newCourse, setNewCourse] = useState({
    id: 0,
    name: "",
    code: "",
    professor: "",
    credits: 3,
    seats: 30,
    schedule: "",
    department: "Computer Science"
  });
  const [isEditing, setIsEditing] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const { toast } = useToast();

  const filteredCourses = courses.filter(course => 
    course.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    course.code.toLowerCase().includes(searchQuery.toLowerCase()) ||
    course.professor.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewCourse(prev => ({ ...prev, [name]: name === "credits" || name === "seats" ? parseInt(value) || 0 : value }));
  };

  const handleSelectChange = (name: string, value: string) => {
    setNewCourse(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = () => {
    if (!newCourse.name || !newCourse.code || !newCourse.professor || !newCourse.schedule) {
      toast({
        title: "Missing Fields",
        description: "Please fill in all required fields",
        variant: "destructive",
      });
      return;
    }

    if (isEditing) {
      // Update existing course
      setCourses(courses.map(course => 
        course.id === newCourse.id ? newCourse : course
      ));
      toast({
        title: "Course Updated",
        description: `${newCourse.code} has been updated successfully`,
      });
    } else {
      // Add new course with a new ID
      const nextId = Math.max(...courses.map(course => course.id)) + 1;
      setCourses([...courses, { ...newCourse, id: nextId }]);
      toast({
        title: "Course Added",
        description: `${newCourse.code} has been added successfully`,
      });
    }

    // Reset form and close dialog
    setNewCourse({
      id: 0,
      name: "",
      code: "",
      professor: "",
      credits: 3,
      seats: 30,
      schedule: "",
      department: "Computer Science"
    });
    setIsEditing(false);
    setIsDialogOpen(false);
  };

  const handleEdit = (course: typeof initialCourses[0]) => {
    setNewCourse(course);
    setIsEditing(true);
    setIsDialogOpen(true);
  };

  const handleDelete = (id: number) => {
    setCourses(courses.filter(course => course.id !== id));
    toast({
      title: "Course Deleted",
      description: "The course has been removed from the system",
    });
  };

  return (
    <div className="min-h-screen flex bg-gray-50 dark:bg-gray-900">
      <Sidebar isAdmin />
      
      <div className="flex-1 p-6 md:p-8 ml-0 md:ml-64">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <header className="mb-8 flex flex-col md:flex-row md:items-center md:justify-between">
            <div>
              <h1 className="text-3xl font-bold text-university-800 dark:text-university-200">Manage Courses</h1>
              <p className="text-university-600 dark:text-university-400">Add, edit or remove courses from the system</p>
            </div>
            
            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
              <DialogTrigger asChild>
                <Button className="mt-4 md:mt-0 bg-university-600 hover:bg-university-700 dark:bg-university-700 dark:hover:bg-university-600">
                  <Plus className="mr-2 h-4 w-4" /> Add New Course
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[550px] dark:bg-gray-800 dark:text-white">
                <DialogHeader>
                  <DialogTitle>{isEditing ? "Edit Course" : "Add New Course"}</DialogTitle>
                  <DialogDescription className="dark:text-gray-300">
                    {isEditing ? "Update the course details below" : "Fill in the course details below to add it to the system"}
                  </DialogDescription>
                </DialogHeader>
                
                <div className="grid gap-4 py-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">Course Name</Label>
                      <Input 
                        id="name" 
                        name="name"
                        value={newCourse.name}
                        onChange={handleInputChange}
                        placeholder="e.g. Introduction to Computer Science"
                        className="dark:bg-gray-700 dark:border-gray-600"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="code">Course Code</Label>
                      <Input 
                        id="code" 
                        name="code"
                        value={newCourse.code}
                        onChange={handleInputChange}
                        placeholder="e.g. CS101"
                        className="dark:bg-gray-700 dark:border-gray-600"
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="professor">Professor</Label>
                    <Input 
                      id="professor" 
                      name="professor"
                      value={newCourse.professor}
                      onChange={handleInputChange}
                      placeholder="e.g. Dr. John Doe"
                      className="dark:bg-gray-700 dark:border-gray-600"
                    />
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="credits">Credits</Label>
                      <Input 
                        id="credits" 
                        name="credits"
                        type="number"
                        value={newCourse.credits}
                        onChange={handleInputChange}
                        className="dark:bg-gray-700 dark:border-gray-600"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="seats">Available Seats</Label>
                      <Input 
                        id="seats" 
                        name="seats"
                        type="number"
                        value={newCourse.seats}
                        onChange={handleInputChange}
                        className="dark:bg-gray-700 dark:border-gray-600"
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="schedule">Schedule</Label>
                    <Input 
                      id="schedule" 
                      name="schedule"
                      value={newCourse.schedule}
                      onChange={handleInputChange}
                      placeholder="e.g. Mon, Wed 10:00-12:00"
                      className="dark:bg-gray-700 dark:border-gray-600"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="department">Department</Label>
                    <Select 
                      value={newCourse.department} 
                      onValueChange={(value) => handleSelectChange("department", value)}
                    >
                      <SelectTrigger className="dark:bg-gray-700 dark:border-gray-600 dark:text-white">
                        <SelectValue placeholder="Select Department" />
                      </SelectTrigger>
                      <SelectContent className="dark:bg-gray-700">
                        <SelectItem value="Computer Science">Computer Science</SelectItem>
                        <SelectItem value="Mathematics">Mathematics</SelectItem>
                        <SelectItem value="Physics">Physics</SelectItem>
                        <SelectItem value="Chemistry">Chemistry</SelectItem>
                        <SelectItem value="Biology">Biology</SelectItem>
                        <SelectItem value="Engineering">Engineering</SelectItem>
                        <SelectItem value="Business">Business</SelectItem>
                        <SelectItem value="Arts">Arts</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                
                <DialogFooter>
                  <Button variant="outline" onClick={() => setIsDialogOpen(false)} className="dark:bg-gray-700 dark:text-white dark:hover:bg-gray-600">
                    Cancel
                  </Button>
                  <Button onClick={handleSubmit} className="bg-university-600 hover:bg-university-700">
                    {isEditing ? "Update Course" : "Add Course"}
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </header>
          
          {/* Search Bar */}
          <Card className="mb-8 dark:bg-gray-800 dark:border-gray-700">
            <CardContent className="pt-6">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 dark:text-gray-500" />
                <Input 
                  placeholder="Search courses by name, code, or professor..." 
                  className="pl-10 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </CardContent>
          </Card>
          
          {/* Courses Table */}
          <Card className="dark:bg-gray-800 dark:border-gray-700">
            <CardHeader>
              <CardTitle className="text-xl dark:text-white">All Courses</CardTitle>
              <CardDescription className="dark:text-gray-300">
                Showing {filteredCourses.length} courses
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow className="dark:border-gray-600">
                    <TableHead className="dark:text-gray-300">Code</TableHead>
                    <TableHead className="dark:text-gray-300">Course Name</TableHead>
                    <TableHead className="dark:text-gray-300">Professor</TableHead>
                    <TableHead className="dark:text-gray-300">Credits</TableHead>
                    <TableHead className="dark:text-gray-300">Seats</TableHead>
                    <TableHead className="dark:text-gray-300">Schedule</TableHead>
                    <TableHead className="dark:text-gray-300">Department</TableHead>
                    <TableHead className="text-right dark:text-gray-300">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredCourses.length > 0 ? (
                    filteredCourses.map((course) => (
                      <TableRow key={course.id} className="dark:border-gray-600">
                        <TableCell className="font-medium dark:text-white">{course.code}</TableCell>
                        <TableCell className="dark:text-white">{course.name}</TableCell>
                        <TableCell className="dark:text-gray-300">{course.professor}</TableCell>
                        <TableCell className="dark:text-gray-300">{course.credits}</TableCell>
                        <TableCell className="dark:text-gray-300">{course.seats}</TableCell>
                        <TableCell className="dark:text-gray-300">{course.schedule}</TableCell>
                        <TableCell className="dark:text-gray-300">{course.department}</TableCell>
                        <TableCell className="text-right">
                          <div className="flex justify-end gap-2">
                            <Button 
                              variant="outline" 
                              size="sm" 
                              onClick={() => handleEdit(course)}
                              className="dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:hover:bg-gray-600"
                            >
                              <Pencil className="h-4 w-4" />
                            </Button>
                            <Button 
                              variant="outline" 
                              size="sm" 
                              onClick={() => handleDelete(course.id)}
                              className="text-red-500 hover:text-red-700 hover:bg-red-50 dark:text-red-400 dark:hover:text-red-300 dark:bg-gray-700 dark:border-gray-600 dark:hover:bg-red-900/30"
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell colSpan={8} className="text-center py-8 dark:text-gray-300">
                        No courses found matching your search criteria.
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default AdminCourses;
