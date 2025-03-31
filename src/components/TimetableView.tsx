
import React, { useMemo } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface CourseSchedule {
  id: number;
  name: string;
  code: string;
  professor: string;
  day: string;
  startTime: string;
  endTime: string;
  location: string;
  color: string;
}

interface TimetableViewProps {
  courses: CourseSchedule[];
}

// Helper function to convert time string to minutes since midnight
const timeToMinutes = (time: string): number => {
  const [hours, minutes] = time.split(":").map(Number);
  return hours * 60 + minutes;
};

// Helper function to format minutes as time
const minutesToTime = (minutes: number): string => {
  const hours = Math.floor(minutes / 60);
  const mins = minutes % 60;
  return `${hours.toString().padStart(2, "0")}:${mins.toString().padStart(2, "0")}`;
};

const TimetableView = ({ courses }: TimetableViewProps) => {
  // Define the time slots (from 8:00 to 18:00 in 30 min increments)
  const startTimeMinutes = 8 * 60; // 8:00 AM
  const endTimeMinutes = 18 * 60; // 6:00 PM
  const timeSlotIncrement = 30; // 30 minutes
  
  const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];
  
  // Generate time slots
  const timeSlots = useMemo(() => {
    const slots = [];
    for (let time = startTimeMinutes; time < endTimeMinutes; time += timeSlotIncrement) {
      slots.push({
        label: minutesToTime(time),
        value: time,
      });
    }
    return slots;
  }, []);
  
  // Organize courses by day and time
  const coursesByDayAndTime = useMemo(() => {
    const courseMap: Record<string, Record<number, CourseSchedule[]>> = {};
    
    // Initialize the structure
    days.forEach(day => {
      courseMap[day] = {};
      timeSlots.forEach(slot => {
        courseMap[day][slot.value] = [];
      });
    });
    
    // Populate with courses
    courses.forEach(course => {
      const startMinutes = timeToMinutes(course.startTime);
      const endMinutes = timeToMinutes(course.endTime);
      
      // Find the closest time slot
      const startSlotIndex = timeSlots.findIndex(slot => slot.value >= startMinutes);
      
      if (startSlotIndex !== -1 && days.includes(course.day)) {
        courseMap[course.day][timeSlots[startSlotIndex].value].push(course);
      }
    });
    
    return courseMap;
  }, [courses, days, timeSlots]);
  
  // Calculate course duration in terms of slots
  const getCourseDuration = (startTime: string, endTime: string): number => {
    const start = timeToMinutes(startTime);
    const end = timeToMinutes(endTime);
    return Math.ceil((end - start) / timeSlotIncrement);
  };
  
  return (
    <div className="overflow-x-auto">
      <div className="min-w-[800px]">
        <div className="grid grid-cols-[100px_repeat(5,1fr)]">
          {/* Header row with days */}
          <div className="h-12 border-b flex items-end justify-center pb-2 font-semibold text-university-700 dark:text-university-300">
            Time
          </div>
          
          {days.map(day => (
            <div 
              key={day} 
              className="h-12 border-b border-l flex items-end justify-center pb-2 font-semibold text-university-700 dark:text-university-300"
            >
              {day}
            </div>
          ))}
          
          {/* Time slots and courses */}
          {timeSlots.map((slot, slotIndex) => (
            <React.Fragment key={slot.value}>
              {/* Time label */}
              <div className="border-b py-2 px-2 text-sm text-center text-university-800 dark:text-university-200">
                {slot.label}
              </div>
              
              {/* Course cells for each day */}
              {days.map(day => {
                const coursesInSlot = coursesByDayAndTime[day][slot.value];
                
                return (
                  <div 
                    key={`${day}-${slot.value}`} 
                    className="border-b border-l relative min-h-[60px] dark:border-gray-700"
                  >
                    {coursesInSlot.map(course => {
                      const duration = getCourseDuration(course.startTime, course.endTime);
                      
                      // Skip rendering for continuing slots (handled by rowSpan)
                      if (slotIndex > 0) {
                        const prevSlot = timeSlots[slotIndex - 1];
                        const prevSlotCourses = coursesByDayAndTime[day][prevSlot.value];
                        const isContinuation = prevSlotCourses.some(
                          prevCourse => prevCourse.id === course.id
                        );
                        
                        if (isContinuation) {
                          return null;
                        }
                      }
                      
                      return (
                        <div
                          key={course.id}
                          className={cn(
                            "absolute inset-0 m-1 rounded-md overflow-hidden shadow-sm",
                            course.color
                          )}
                          style={{
                            height: `calc(${duration * 60}px - 2px)`,
                            zIndex: 10
                          }}
                        >
                          <div className="p-2 h-full flex flex-col">
                            <div className="font-medium text-white text-sm">
                              {course.code}
                            </div>
                            <div className="text-xs text-white/90 font-light">
                              {course.location}
                            </div>
                            <div className="text-xs text-white/80 mt-auto">
                              {course.startTime} - {course.endTime}
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                );
              })}
            </React.Fragment>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TimetableView;
