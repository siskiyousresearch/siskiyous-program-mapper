import { motion } from "framer-motion";
import { Check, BookOpen, Info } from "lucide-react";
import { cn } from "@/lib/utils";
import { Course } from "@/lib/types";
import { useState } from "react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface CourseCardProps {
  course: Course;
}

export function CourseCard({ course }: CourseCardProps) {
  const [isCompleted, setIsCompleted] = useState(course.isCompleted);

  // Color coding based on course type
  const typeColors = {
    major: "border-l-primary bg-red-50/50 hover:bg-red-50",
    ge: "border-l-[#005596] bg-blue-50/50 hover:bg-blue-50",
    elective: "border-l-[#FDB913] bg-yellow-50/50 hover:bg-yellow-50",
    support: "border-l-gray-500 bg-gray-50/50 hover:bg-gray-50",
  };

  const typeLabels = {
    major: "Major Requirement",
    ge: "General Education",
    elective: "Elective",
    support: "Support Course",
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className={cn(
        "group relative flex flex-col gap-2 rounded-md border border-border bg-card p-3 shadow-sm transition-all hover:shadow-md",
        "border-l-4",
        typeColors[course.type]
      )}
      data-testid={`card-course-${course.id}`}
    >
      <div className="flex items-start justify-between gap-2">
        <div className="flex flex-col">
          <span className="text-xs font-bold text-muted-foreground">
            {course.code}
          </span>
          <h4 className="text-sm font-semibold leading-tight text-foreground line-clamp-2">
            {course.title}
          </h4>
        </div>
        <div className="shrink-0">
          <button
            onClick={() => setIsCompleted(!isCompleted)}
            className={cn(
              "flex h-6 w-6 items-center justify-center rounded-full border transition-colors",
              isCompleted
                ? "border-green-600 bg-green-600 text-white"
                : "border-muted-foreground/30 text-transparent hover:border-muted-foreground"
            )}
            data-testid={`btn-complete-${course.id}`}
            aria-label={isCompleted ? "Mark as incomplete" : "Mark as complete"}
          >
            <Check size={14} strokeWidth={3} />
          </button>
        </div>
      </div>

      <div className="mt-auto flex items-center justify-between pt-2">
        <div className="flex items-center gap-2">
          <span className="inline-flex items-center rounded-sm bg-background px-1.5 py-0.5 text-[10px] font-medium text-muted-foreground border border-border shadow-xs">
            {course.units} Units
          </span>
          <span className="text-[10px] text-muted-foreground capitalize opacity-70">
            {typeLabels[course.type]}
          </span>
        </div>
        
        {course.description && (
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <button className="text-muted-foreground hover:text-primary transition-colors">
                  <Info size={14} />
                </button>
              </TooltipTrigger>
              <TooltipContent side="top" className="max-w-xs text-xs p-3">
                <p className="font-semibold mb-1">{course.title}</p>
                <p>{course.description}</p>
                {course.prerequisites && (
                  <p className="mt-2 text-primary/80 italic">
                    Prereqs: {course.prerequisites.join(", ")}
                  </p>
                )}
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        )}
      </div>
    </motion.div>
  );
}
