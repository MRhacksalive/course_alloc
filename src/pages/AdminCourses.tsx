
import { useState } from "react";
import Sidebar from "@/components/Sidebar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useToast } from "@/components/ui/use-toast";
import { Search, Plus, Edit, Trash2, Clock, Save } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

// Mock departments
const departments = [
  "Computer Science",
  "Mathematics",
  "Physics",
  "Chemistry",
  "Psychology",
  "Economics"
];

// Mock course data
const initialCourses = [
  {
    id: 1,
    name: "Introduction to Computer Science",
    code: "CS101",
    professor: "Dr. Alan Turing",
    credits: 4,
    seats: 40,
    schedule: "Mon, Wed 10:00 - 12:00",
    department: "Computer Science"
  },
  {
    id: 2,
    name: "Calculus I",
    code: "MATH201",
    professor: "Dr. Katherine Johnson",
    credits: 3,
    seats: 50,
    schedule: "Tue, Thu 14:00 - 16:00",
    department: "Mathematics"
  },
  {
    id: 3,
    name: "Introduction to Psychology",
    code: "PSY101",
    professor: "Dr. Sigmund Freud",
    credits: 3,
    seats: 60,
    schedule: "Mon, Wed 13:00 - 14:30",
    department: "Psychology"
  },
  {
    id: 4,
    name: "Organic Chemistry",
    code: "CHEM302",
    professor: "Dr. Marie Curie",
    credits: 4,
    seats: 30,
    schedule: "Mon, Thu 09:00 - 11:00",
    department: "Chemistry"
  },
  {
    id: 5,
    name: "Database Systems",
    code: "CS305",
    professor: "Dr. Edgar Codd",
    credits: 4,
    seats: 35,
    schedule: "Tue, Fri 10:00 - 12:00",
    department: "Computer Science"
  }
];

const AdminCourses = () => {
  const [courses, setCourses] = useState(initialCourses);
  const [searchTerm, setSearchTerm] = useState("");
  const [newCourse, setNewCourse] = useState({
    name: "",
    code: "",
    professor: "",
    credits: 3,
    seats: 30,
    schedule: "",
    department: ""
  });
  const [editingCourse, setEditingCourse] = useState<null | typeof newCourse>(null);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  
  const { toast } = useToast();
  
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };
  
  const filteredCourses = courses.filter(course => 
    course.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    course.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
    course.professor.toLowerCase().includes(searchTerm.toLowerCase()) ||
    course.department.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  const handleAddCourse = () => {
    // Validate form
    if (!newCourse.name || !newCourse.code || !newCourse.professor || !newCourse.department || !newCourse.schedule) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields.",
        variant: "destructive"
      });
      return;
    }
    
    const newId = Math.max(...courses.map(c => c.id)) + 1;
    setCourses([...courses, { ...newCourse, id: newId }]);
    
    toast({
      title: "Course Added",
      description: `${newCourse.code}: ${newCourse.name} has been added.`
    });
    
    // Reset form and close dialog
    setNewCourse({
      name: "",
      code: "",
      professor: "",
      credits: 3,
      seats: 30,
      schedule: "",
      department: ""
    });
    setIsAddDialogOpen(false);
  };
  
  const handleEditCourse = (course: typeof courses[0]) => {
    setEditingCourse(course);
    setIsEditDialogOpen(true);
  };
  
  const handleSaveEdit = () => {
    if (!editingCourse) return;
    
    setCourses(courses.map(course => 
      course.id === editingCourse.id ? editingCourse : course
    ));
    
    toast({
      title: "Course Updated",
      description: `${editingCourse.code}: ${editingCourse.name} has been updated.`
    });
    
    setIsEditDialogOpen(false);
    setEditingCourse(null);
  };
  
  const handleDeleteCourse = (id: number) => {
    setCourses(courses.filter(course => course.id !== id));
    
    toast({
      title: "Course Deleted",
      description: "The course has been removed from the system."
    });
  };
  
  return (
    <div className="min-h-screen flex bg-gray-50">
      <Sidebar isAdmin />
      
      <div className="flex-1 p-6 md:p-8 ml-0 md:ml-64">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <header className="mb-8 flex flex-col sm:flex-row justify-between items-start sm:items-center">
            <div>
              <h1 className="text-3xl font-bold text-university-800">Course Management</h1>
              <p className="text-university-600">Add, edit or remove courses from the system</p>
            </div>
            
            <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
              <DialogTrigger asChild>
                <Button className="mt-4 sm:mt-0 bg-university-600 hover:bg-university-700">
                  <Plus className="mr-2 h-4 w-4" /> Add New Course
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[550px]">
                <DialogHeader>
                  <DialogTitle>Add New Course</DialogTitle>
                  <DialogDescription>
                    Enter the details for the new course. Click save when you're done.
                  </DialogDescription>
                </DialogHeader>
                
                <div className="grid grid-cols-2 gap-4 py-4">
                  <div className="space-y-2 col-span-2">
                    <Label htmlFor="name">Course Name</Label>
                    <Input 
                      id="name" 
                      value={newCourse.name} 
                      onChange={(e) => setNewCourse({ ...newCourse, name: e.target.value })}
                      placeholder="e.g. Introduction to Computer Science"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="code">Course Code</Label>
                    <Input 
                      id="code" 
                      value={newCourse.code} 
                      onChange={(e) => setNewCourse({ ...newCourse, code: e.target.value })}
                      placeholder="e.g. CS101"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="department">Department</Label>
                    <Select 
                      value={newCourse.department}
                      onValueChange={(value) => setNewCourse({ ...newCourse, department: value })}
                    >
                      <SelectTrigger id="department">
                        <SelectValue placeholder="Select department" />
                      </SelectTrigger>
                      <SelectContent>
                        {departments.map((dept) => (
                          <SelectItem key={dept} value={dept}>
                            {dept}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="professor">Professor</Label>
                    <Input 
                      id="professor" 
                      value={newCourse.professor} 
                      onChange={(e) => setNewCourse({ ...newCourse, professor: e.target.value })}
                      placeholder="e.g. Dr. Alan Turing"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="credits">Credits</Label>
                    <Select 
                      value={String(newCourse.credits)}
                      onValueChange={(value) => setNewCourse({ ...newCourse, credits: parseInt(value) })}
                    >
                      <SelectTrigger id="credits">
                        <SelectValue placeholder="Select credits" />
                      </SelectTrigger>
                      <SelectContent>
                        {[1, 2, 3, 4, 5].map((credit) => (
                          <SelectItem key={credit} value={String(credit)}>
                            {credit}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="seats">Available Seats</Label>
                    <Input 
                      id="seats" 
                      type="number"
                      min={1}
                      value={newCourse.seats} 
                      onChange={(e) => setNewCourse({ ...newCourse, seats: parseInt(e.target.value) })}
                    />
                  </div>
                  
                  <div className="space-y-2 col-span-2">
                    <Label htmlFor="schedule">Schedule</Label>
                    <Input 
                      id="schedule" 
                      value={newCourse.schedule} 
                      onChange={(e) => setNewCourse({ ...newCourse, schedule: e.target.value })}
                      placeholder="e.g. Mon, Wed 10:00 - 12:00"
                    />
                    <p className="text-xs text-university-500">Format: Day, Day HH:MM - HH:MM</p>
                  </div>
                </div>
                
                <DialogFooter>
                  <Button 
                    variant="outline" 
                    onClick={() => setIsAddDialogOpen(false)}
                  >
                    Cancel
                  </Button>
                  <Button onClick={handleAddCourse}>Add Course</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </header>
          
          {/* Search Bar */}
          <Card className="mb-8">
            <CardContent className="p-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                <Input 
                  placeholder="Search courses by name, code, professor or department..."
                  className="pl-10"
                  value={searchTerm}
                  onChange={handleSearchChange}
                />
              </div>
            </CardContent>
          </Card>
          
          {/* Course Table */}
          <Card>
            <CardHeader>
              <CardTitle>All Courses</CardTitle>
              <CardDescription>
                Showing {filteredCourses.length} out of {courses.length} total courses
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-[100px]">Code</TableHead>
                      <TableHead>Course Name</TableHead>
                      <TableHead>Department</TableHead>
                      <TableHead>Professor</TableHead>
                      <TableHead className="text-center">Credits</TableHead>
                      <TableHead className="text-center">Seats</TableHead>
                      <TableHead>Schedule</TableHead>
                      <TableHead className="text-right w-[120px]">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredCourses.length > 0 ? (
                      filteredCourses.map((course) => (
                        <TableRow key={course.id}>
                          <TableCell className="font-medium">{course.code}</TableCell>
                          <TableCell>{course.name}</TableCell>
                          <TableCell>
                            <Badge variant="secondary">{course.department}</Badge>
                          </TableCell>
                          <TableCell>{course.professor}</TableCell>
                          <TableCell className="text-center">{course.credits}</TableCell>
                          <TableCell className="text-center">{course.seats}</TableCell>
                          <TableCell className="flex items-center">
                            <Clock className="mr-2 h-4 w-4 text-university-500" />
                            <span>{course.schedule}</span>
                          </TableCell>
                          <TableCell className="text-right">
                            <div className="flex justify-end">
                              <Button
                                variant="ghost"
                                size="icon"
                                onClick={() => handleEditCourse(course)}
                              >
                                <Edit className="h-4 w-4" />
                              </Button>
                              <Button
                                variant="ghost"
                                size="icon"
                                className="text-red-500 hover:text-red-700 hover:bg-red-50"
                                onClick={() => handleDeleteCourse(course.id)}
                              >
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))
                    ) : (
                      <TableRow>
                        <TableCell colSpan={8} className="text-center py-8 text-university-600">
                          No courses found matching your search.
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
      
      {/* Edit Course Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="sm:max-w-[550px]">
          <DialogHeader>
            <DialogTitle>Edit Course</DialogTitle>
            <DialogDescription>
              Make changes to the course details. Click save when you're done.
            </DialogDescription>
          </DialogHeader>
          
          {editingCourse && (
            <>
              <div className="grid grid-cols-2 gap-4 py-4">
                <div className="space-y-2 col-span-2">
                  <Label htmlFor="edit-name">Course Name</Label>
                  <Input 
                    id="edit-name" 
                    value={editingCourse.name} 
                    onChange={(e) => setEditingCourse({ ...editingCourse, name: e.target.value })}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="edit-code">Course Code</Label>
                  <Input 
                    id="edit-code" 
                    value={editingCourse.code} 
                    onChange={(e) => setEditingCourse({ ...editingCourse, code: e.target.value })}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="edit-department">Department</Label>
                  <Select 
                    value={editingCourse.department}
                    onValueChange={(value) => setEditingCourse({ ...editingCourse, department: value })}
                  >
                    <SelectTrigger id="edit-department">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {departments.map((dept) => (
                        <SelectItem key={dept} value={dept}>
                          {dept}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="edit-professor">Professor</Label>
                  <Input 
                    id="edit-professor" 
                    value={editingCourse.professor} 
                    onChange={(e) => setEditingCourse({ ...editingCourse, professor: e.target.value })}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="edit-credits">Credits</Label>
                  <Select 
                    value={String(editingCourse.credits)}
                    onValueChange={(value) => setEditingCourse({ ...editingCourse, credits: parseInt(value) })}
                  >
                    <SelectTrigger id="edit-credits">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {[1, 2, 3, 4, 5].map((credit) => (
                        <SelectItem key={credit} value={String(credit)}>
                          {credit}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="edit-seats">Available Seats</Label>
                  <Input 
                    id="edit-seats" 
                    type="number"
                    min={1}
                    value={editingCourse.seats} 
                    onChange={(e) => setEditingCourse({ ...editingCourse, seats: parseInt(e.target.value) })}
                  />
                </div>
                
                <div className="space-y-2 col-span-2">
                  <Label htmlFor="edit-schedule">Schedule</Label>
                  <Input 
                    id="edit-schedule" 
                    value={editingCourse.schedule} 
                    onChange={(e) => setEditingCourse({ ...editingCourse, schedule: e.target.value })}
                  />
                  <p className="text-xs text-university-500">Format: Day, Day HH:MM - HH:MM</p>
                </div>
              </div>
              
              <DialogFooter>
                <Button 
                  variant="outline" 
                  onClick={() => {
                    setIsEditDialogOpen(false);
                    setEditingCourse(null);
                  }}
                >
                  Cancel
                </Button>
                <Button onClick={handleSaveEdit} className="bg-university-600 hover:bg-university-700">
                  <Save className="mr-2 h-4 w-4" />
                  Save Changes
                </Button>
              </DialogFooter>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AdminCourses;
