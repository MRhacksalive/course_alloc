
import { useState } from "react";
import Sidebar from "@/components/Sidebar";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { Search, Filter } from "lucide-react";
import CourseCard from "@/components/CourseCard";

// Mock course data
const coursesData = [
  {
    id: 1,
    name: "Introduction to Computer Science",
    code: "CS101",
    professor: "Dr. Alan Turing",
    credits: 4,
    seats: { total: 40, available: 12 },
    schedule: ["Monday 10:00 - 12:00", "Wednesday 10:00 - 12:00"],
    department: "Computer Science"
  },
  {
    id: 2,
    name: "Calculus I",
    code: "MATH201",
    professor: "Dr. Katherine Johnson",
    credits: 3,
    seats: { total: 50, available: 5 },
    schedule: ["Tuesday 14:00 - 16:00", "Thursday 14:00 - 16:00"],
    department: "Mathematics"
  },
  {
    id: 3,
    name: "Introduction to Psychology",
    code: "PSY101",
    professor: "Dr. Sigmund Freud",
    credits: 3,
    seats: { total: 60, available: 20 },
    schedule: ["Monday 13:00 - 14:30", "Wednesday 13:00 - 14:30"],
    department: "Psychology"
  },
  {
    id: 4,
    name: "Organic Chemistry",
    code: "CHEM302",
    professor: "Dr. Marie Curie",
    credits: 4,
    seats: { total: 30, available: 0 },
    schedule: ["Monday 09:00 - 11:00", "Thursday 09:00 - 11:00"],
    department: "Chemistry"
  },
  {
    id: 5,
    name: "Database Systems",
    code: "CS305",
    professor: "Dr. Edgar Codd",
    credits: 4,
    seats: { total: 35, available: 8 },
    schedule: ["Tuesday 10:00 - 12:00", "Friday 10:00 - 12:00"],
    department: "Computer Science"
  },
  {
    id: 6,
    name: "Thermodynamics",
    code: "PHY303",
    professor: "Dr. Ludwig Boltzmann",
    credits: 3,
    seats: { total: 40, available: 15 },
    schedule: ["Wednesday 13:00 - 16:00"],
    department: "Physics"
  },
  {
    id: 7,
    name: "Artificial Intelligence",
    code: "CS401",
    professor: "Dr. John McCarthy",
    credits: 4,
    seats: { total: 30, available: 2 },
    schedule: ["Monday 15:00 - 17:00", "Thursday 15:00 - 17:00"],
    department: "Computer Science"
  },
  {
    id: 8,
    name: "Principles of Economics",
    code: "ECON201",
    professor: "Dr. Adam Smith",
    credits: 3,
    seats: { total: 55, available: 25 },
    schedule: ["Tuesday 10:00 - 11:30", "Thursday 10:00 - 11:30"],
    department: "Economics"
  }
];

const departments = [
  "All Departments",
  "Computer Science",
  "Mathematics",
  "Physics",
  "Chemistry",
  "Psychology",
  "Economics"
];

const creditOptions = ["All Credits", "3", "4"];

const Courses = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [department, setDepartment] = useState("All Departments");
  const [creditFilter, setCreditFilter] = useState("All Credits");
  const [appliedCourses, setAppliedCourses] = useState<number[]>([]);
  const { toast } = useToast();

  // Filter courses based on search term and filters
  const filteredCourses = coursesData.filter((course) => {
    const matchesSearch = 
      course.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      course.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
      course.professor.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesDepartment = 
      department === "All Departments" || course.department === department;
    
    const matchesCredits = 
      creditFilter === "All Credits" || course.credits.toString() === creditFilter;
    
    return matchesSearch && matchesDepartment && matchesCredits;
  });

  const handleApply = (courseId: number) => {
    if (appliedCourses.includes(courseId)) {
      toast({
        title: "Already Applied",
        description: "You have already applied for this course.",
      });
      return;
    }
    
    setAppliedCourses([...appliedCourses, courseId]);
    toast({
      title: "Application Successful",
      description: "You have successfully applied for this course.",
    });
  };

  return (
    <div className="min-h-screen flex bg-gray-50">
      <Sidebar />
      
      <div className="flex-1 p-6 md:p-8 ml-0 md:ml-64">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <header className="mb-8">
            <h1 className="text-3xl font-bold text-university-800">Available Courses</h1>
            <p className="text-university-600">Browse and apply for courses for the upcoming semester</p>
          </header>
          
          {/* Search and Filters */}
          <div className="bg-white p-4 rounded-lg shadow-sm mb-8">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="md:col-span-2">
                <Label htmlFor="search" className="mb-2 block">Search Courses</Label>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                  <Input 
                    id="search"
                    placeholder="Search by course name, code, or professor..." 
                    className="pl-10"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
              </div>
              
              <div>
                <Label htmlFor="department" className="mb-2 block">Department</Label>
                <Select value={department} onValueChange={setDepartment}>
                  <SelectTrigger id="department">
                    <SelectValue placeholder="Filter by department" />
                  </SelectTrigger>
                  <SelectContent>
                    {departments.map((dept) => (
                      <SelectItem key={dept} value={dept}>{dept}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <div>
                <Label htmlFor="credits" className="mb-2 block">Credits</Label>
                <Select value={creditFilter} onValueChange={setCreditFilter}>
                  <SelectTrigger id="credits">
                    <SelectValue placeholder="Filter by credits" />
                  </SelectTrigger>
                  <SelectContent>
                    {creditOptions.map((credit) => (
                      <SelectItem key={credit} value={credit}>{credit}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
          
          {/* Results Stats */}
          <div className="flex justify-between items-center mb-6">
            <p className="text-university-600">
              Showing <span className="font-medium">{filteredCourses.length}</span> out of {coursesData.length} courses
            </p>
            <div className="flex items-center">
              <Filter size={16} className="mr-2 text-university-600" />
              <span className="text-sm text-university-600">
                Applied to <span className="font-medium">{appliedCourses.length}</span> courses
              </span>
            </div>
          </div>
          
          {/* Course Cards */}
          {filteredCourses.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
              {filteredCourses.map((course) => (
                <CourseCard
                  key={course.id}
                  {...course}
                  onApply={handleApply}
                  isApplied={appliedCourses.includes(course.id)}
                />
              ))}
            </div>
          ) : (
            <div className="text-center p-12 bg-white rounded-lg shadow-sm">
              <h3 className="text-lg font-medium text-university-800 mb-2">No courses found</h3>
              <p className="text-university-600">Try adjusting your search or filters</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Courses;
