
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { BookOpen, Clock, User, Award } from "lucide-react";

interface CourseCardProps {
  id: number;
  name: string;
  code: string;
  professor: string;
  credits: number;
  seats: {
    total: number;
    available: number;
  };
  schedule: string[];
  department: string;
  onApply: (id: number) => void;
  isApplied?: boolean;
}

const CourseCard = ({
  id,
  name,
  code,
  professor,
  credits,
  seats,
  schedule,
  department,
  onApply,
  isApplied = false
}: CourseCardProps) => {
  const seatStatus = seats.available <= 5 ? "low" : seats.available <= 15 ? "medium" : "high";
  
  const seatStatusColor = {
    low: "bg-red-100 text-red-800",
    medium: "bg-yellow-100 text-yellow-800",
    high: "bg-green-100 text-green-800"
  };

  return (
    <Card className="h-full flex flex-col hover:shadow-md transition-shadow">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <div>
            <CardTitle className="text-lg text-university-800">{name}</CardTitle>
            <CardDescription className="flex items-center text-university-600">
              {code}
              <Badge className="ml-2 bg-university-100 text-university-800 hover:bg-university-200">{department}</Badge>
            </CardDescription>
          </div>
          <Badge className={`${seatStatusColor[seatStatus]}`}>
            {seats.available} seats left
          </Badge>
        </div>
      </CardHeader>
      
      <CardContent className="flex-1">
        <div className="space-y-2 text-sm">
          <div className="flex items-center">
            <User className="h-4 w-4 mr-2 text-university-500" />
            <span>{professor}</span>
          </div>
          
          <div className="flex items-center">
            <Award className="h-4 w-4 mr-2 text-university-500" />
            <span>{credits} credits</span>
          </div>
          
          <div className="flex items-start">
            <Clock className="h-4 w-4 mr-2 mt-0.5 text-university-500" />
            <div>
              {schedule.map((time, index) => (
                <div key={index} className="text-gray-600">{time}</div>
              ))}
            </div>
          </div>
        </div>
      </CardContent>
      
      <CardFooter>
        <Button 
          className={isApplied ? "bg-gray-200 text-gray-800 hover:bg-gray-300 w-full" : "bg-university-600 hover:bg-university-700 w-full"}
          onClick={() => onApply(id)}
          disabled={isApplied || seats.available === 0}
        >
          {isApplied ? "Applied" : seats.available === 0 ? "No Seats Available" : "Apply"}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default CourseCard;
