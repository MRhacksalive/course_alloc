
import { useState } from "react";
import Sidebar from "@/components/Sidebar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useToast } from "@/components/ui/use-toast";
import { Search, Eye, CheckCircle, XCircle, Filter } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

// Mock student data
const initialStudents = [
  {
    id: 1,
    name: "Alex Johnson",
    email: "alex.j@university.edu",
    college: "School of Engineering",
    cgpa: 8.7,
    selectedCourses: ["CS101", "CS305", "MATH201"],
    pendingCourses: ["CS401"]
  },
  {
    id: 2,
    name: "Jessica Smith",
    email: "jessica.s@university.edu",
    college: "School of Business",
    cgpa: 9.2,
    selectedCourses: ["ECON201", "MATH201"],
    pendingCourses: ["CS305"]
  },
  {
    id: 3,
    name: "Michael Brown",
    email: "michael.b@university.edu",
    college: "School of Arts & Sciences",
    cgpa: 7.5,
    selectedCourses: ["PSY101", "ECON201"],
    pendingCourses: ["CHEM302"]
  },
  {
    id: 4,
    name: "Sarah Wilson",
    email: "sarah.w@university.edu",
    college: "School of Medicine",
    cgpa: 9.8,
    selectedCourses: ["CHEM302", "PSY101"],
    pendingCourses: ["CS101"]
  },
  {
    id: 5,
    name: "David Clark",
    email: "david.c@university.edu",
    college: "School of Engineering",
    cgpa: 8.2,
    selectedCourses: ["CS101", "MATH201", "PHY303"],
    pendingCourses: []
  }
];

// Mock colleges for filter
const colleges = [
  "All Colleges",
  "School of Engineering",
  "School of Business",
  "School of Arts & Sciences",
  "School of Medicine",
  "School of Law"
];

const AdminStudents = () => {
  const [students, setStudents] = useState(initialStudents);
  const [searchTerm, setSearchTerm] = useState("");
  const [collegeFilter, setCollegeFilter] = useState("All Colleges");
  const [viewingStudent, setViewingStudent] = useState<null | typeof students[0]>(null);
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);
  const { toast } = useToast();
  
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };
  
  const filteredStudents = students.filter(student => {
    const matchesSearch = 
      student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.email.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesCollege = 
      collegeFilter === "All Colleges" || student.college === collegeFilter;
    
    return matchesSearch && matchesCollege;
  });
  
  const viewStudentDetails = (student: typeof students[0]) => {
    setViewingStudent(student);
    setIsDetailsOpen(true);
  };
  
  const handleApproveAllocation = (studentId: number, courseCode: string) => {
    setStudents(students.map(student => {
      if (student.id === studentId) {
        return {
          ...student,
          selectedCourses: [...student.selectedCourses, courseCode],
          pendingCourses: student.pendingCourses.filter(code => code !== courseCode)
        };
      }
      return student;
    }));
    
    toast({
      title: "Allocation Approved",
      description: `Course ${courseCode} has been approved for the student.`
    });
  };
  
  const handleRejectAllocation = (studentId: number, courseCode: string) => {
    setStudents(students.map(student => {
      if (student.id === studentId) {
        return {
          ...student,
          pendingCourses: student.pendingCourses.filter(code => code !== courseCode)
        };
      }
      return student;
    }));
    
    toast({
      title: "Allocation Rejected",
      description: `Course ${courseCode} has been rejected for the student.`
    });
  };
  
  return (
    <div className="min-h-screen flex bg-gray-50">
      <Sidebar isAdmin />
      
      <div className="flex-1 p-6 md:p-8 ml-0 md:ml-64">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <header className="mb-8">
            <h1 className="text-3xl font-bold text-university-800">Student Management</h1>
            <p className="text-university-600">View student information and manage course allocations</p>
          </header>
          
          {/* Search and Filters */}
          <Card className="mb-8">
            <CardContent className="p-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="md:col-span-2">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                    <Input 
                      placeholder="Search students by name or email..."
                      className="pl-10"
                      value={searchTerm}
                      onChange={handleSearchChange}
                    />
                  </div>
                </div>
                
                <div>
                  <div className="relative flex items-center">
                    <Filter className="absolute left-3 text-gray-400" size={18} />
                    <Select value={collegeFilter} onValueChange={setCollegeFilter}>
                      <SelectTrigger className="pl-10">
                        <SelectValue placeholder="Filter by college" />
                      </SelectTrigger>
                      <SelectContent>
                        {colleges.map((college) => (
                          <SelectItem key={college} value={college}>{college}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
          
          {/* Students Table */}
          <Card>
            <CardHeader>
              <CardTitle>All Students</CardTitle>
              <CardDescription>
                Showing {filteredStudents.length} out of {students.length} total students
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Name</TableHead>
                      <TableHead>Email</TableHead>
                      <TableHead>College</TableHead>
                      <TableHead className="text-center">CGPA</TableHead>
                      <TableHead className="text-center">Allocated</TableHead>
                      <TableHead className="text-center">Pending</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredStudents.length > 0 ? (
                      filteredStudents.map((student) => (
                        <TableRow key={student.id}>
                          <TableCell className="font-medium">{student.name}</TableCell>
                          <TableCell>{student.email}</TableCell>
                          <TableCell>{student.college}</TableCell>
                          <TableCell className="text-center">
                            <Badge 
                              className={`
                                ${student.cgpa >= 9.0 ? 'bg-green-100 text-green-800' : 
                                student.cgpa >= 7.5 ? 'bg-blue-100 text-blue-800' : 
                                'bg-yellow-100 text-yellow-800'}
                              `}
                            >
                              {student.cgpa}
                            </Badge>
                          </TableCell>
                          <TableCell className="text-center">{student.selectedCourses.length}</TableCell>
                          <TableCell className="text-center">
                            {student.pendingCourses.length > 0 ? (
                              <Badge className="bg-yellow-100 text-yellow-800">{student.pendingCourses.length}</Badge>
                            ) : (
                              <span className="text-gray-500">0</span>
                            )}
                          </TableCell>
                          <TableCell className="text-right">
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => viewStudentDetails(student)}
                              className="flex items-center gap-1"
                            >
                              <Eye className="h-4 w-4" />
                              <span>View</span>
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))
                    ) : (
                      <TableRow>
                        <TableCell colSpan={7} className="text-center py-8 text-university-600">
                          No students found matching your search.
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
      
      {/* Student Details Dialog */}
      <Dialog open={isDetailsOpen} onOpenChange={setIsDetailsOpen}>
        <DialogContent className="sm:max-w-[650px]">
          <DialogHeader>
            <DialogTitle>Student Details</DialogTitle>
            <DialogDescription>
              Student information and course allocations
            </DialogDescription>
          </DialogHeader>
          
          {viewingStudent && (
            <div className="space-y-6">
              {/* Student Info */}
              <div className="grid grid-cols-2 gap-4 py-2 border-b pb-4">
                <div>
                  <p className="text-sm text-university-500">Name</p>
                  <p className="font-medium">{viewingStudent.name}</p>
                </div>
                <div>
                  <p className="text-sm text-university-500">Email</p>
                  <p className="font-medium">{viewingStudent.email}</p>
                </div>
                <div>
                  <p className="text-sm text-university-500">College</p>
                  <p className="font-medium">{viewingStudent.college}</p>
                </div>
                <div>
                  <p className="text-sm text-university-500">CGPA</p>
                  <p className="font-medium">{viewingStudent.cgpa}</p>
                </div>
              </div>
              
              {/* Allocated Courses */}
              <div>
                <h3 className="text-lg font-medium mb-3">Allocated Courses</h3>
                {viewingStudent.selectedCourses.length > 0 ? (
                  <div className="space-y-2">
                    {viewingStudent.selectedCourses.map((courseCode) => (
                      <div key={courseCode} className="flex justify-between items-center border-b pb-2">
                        <Badge className="bg-green-100 text-green-800">{courseCode}</Badge>
                        <span className="text-green-600">Confirmed</span>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-gray-500 italic">No allocated courses</p>
                )}
              </div>
              
              {/* Pending Allocations */}
              <div>
                <h3 className="text-lg font-medium mb-3">Pending Allocations</h3>
                {viewingStudent.pendingCourses.length > 0 ? (
                  <div className="space-y-4">
                    {viewingStudent.pendingCourses.map((courseCode) => (
                      <div key={courseCode} className="flex justify-between items-center border-b pb-3">
                        <Badge className="bg-yellow-100 text-yellow-800">{courseCode}</Badge>
                        <div className="flex gap-2">
                          <Button 
                            size="sm"
                            className="bg-green-600 hover:bg-green-700 flex items-center gap-1"
                            onClick={() => handleApproveAllocation(viewingStudent.id, courseCode)}
                          >
                            <CheckCircle className="h-4 w-4" />
                            <span>Approve</span>
                          </Button>
                          <Button 
                            size="sm"
                            variant="outline"
                            className="text-red-600 hover:text-red-700 border-red-200 hover:border-red-300 flex items-center gap-1"
                            onClick={() => handleRejectAllocation(viewingStudent.id, courseCode)}
                          >
                            <XCircle className="h-4 w-4" />
                            <span>Reject</span>
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-gray-500 italic">No pending allocations</p>
                )}
              </div>
            </div>
          )}
          
          <DialogFooter>
            <Button onClick={() => setIsDetailsOpen(false)}>Close</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AdminStudents;
