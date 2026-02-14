import { CourseCard } from "./CourseCard";
import { motion } from "framer-motion";
import { Download, Share2, Printer } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { Year, Term, Course } from "@/lib/types";

interface PathwayMapperProps {
  program: {
    title: string;
    degreeType: string;
    description: string;
    years: Year[];
  };
}

export function PathwayMapper({ program }: PathwayMapperProps) {
  return (
    <div className="flex flex-col gap-8 w-full max-w-[1400px] mx-auto p-4 md:p-8">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b pb-6">
        <div>
          <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary mb-2" data-testid="badge-degree-type">
            {program.degreeType}
          </div>
          <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-foreground" data-testid="text-program-title">
            {program.title}
          </h1>
          <p className="mt-2 text-muted-foreground max-w-2xl text-sm md:text-base" data-testid="text-program-description">
            {program.description}
          </p>
        </div>
        <div className="flex items-center gap-2 shrink-0">
          <Button variant="outline" size="sm" className="gap-2 h-9 text-xs" data-testid="btn-share">
            <Share2 size={14} />
            Share
          </Button>
          <Button variant="outline" size="sm" className="gap-2 h-9 text-xs" data-testid="btn-print">
            <Printer size={14} />
            Print
          </Button>
          <Button size="sm" className="gap-2 h-9 text-xs shadow-md" data-testid="btn-download">
            <Download size={14} />
            Download Plan
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
        {(program.years as Year[]).map((year: Year, yearIndex: number) => (
          <motion.div
            key={year.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: yearIndex * 0.1 }}
            className="flex flex-col gap-6"
          >
            <div className="flex items-center gap-4">
              <h2 className="text-xl font-bold text-foreground bg-secondary/50 px-4 py-2 rounded-lg w-full border border-border/50">
                {year.name}
              </h2>
            </div>

            <div className="grid gap-6">
              {year.terms.map((term: Term) => (
                <div 
                  key={term.id} 
                  className="flex flex-col gap-4 rounded-xl border border-border bg-card/50 p-5 shadow-sm hover:shadow-md transition-shadow"
                >
                  <div className="flex items-center justify-between border-b border-border/50 pb-3">
                    <h3 className="font-bold text-foreground">{term.name}</h3>
                    <span className="text-xs font-medium text-muted-foreground bg-secondary px-2 py-1 rounded">
                      {term.totalUnits} Units
                    </span>
                  </div>
                  
                  <div className="grid gap-3">
                    {term.courses.map((course: Course) => (
                      <CourseCard key={course.id} course={course} />
                    ))}
                  </div>
                  
                  {term.courses.length === 0 && (
                    <div className="flex h-24 items-center justify-center rounded-md border border-dashed border-muted-foreground/25 bg-muted/20">
                      <span className="text-xs text-muted-foreground">No courses planned</span>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
