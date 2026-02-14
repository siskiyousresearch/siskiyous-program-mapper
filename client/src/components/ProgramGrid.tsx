import { motion } from "framer-motion";
import { BookOpen, GraduationCap, Briefcase, ArrowRight, Activity, Scale, Monitor, Coins, Flame, Wrench, Dumbbell, MessageCircle } from "lucide-react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

interface ProgramGridProps {
  programs: any[];
  onSelectProgram: (slug: string) => void;
}

export function ProgramGrid({ programs, onSelectProgram }: ProgramGridProps) {
  
  const getIcon = (slug: string) => {
    if (slug.includes("cs")) return <Monitor className="h-8 w-8 text-primary" />;
    if (slug.includes("nurs")) return <Activity className="h-8 w-8 text-primary" />;
    if (slug.includes("adju")) return <Scale className="h-8 w-8 text-primary" />;
    if (slug.includes("bus")) return <Coins className="h-8 w-8 text-primary" />;
    if (slug.includes("fire")) return <Flame className="h-8 w-8 text-primary" />;
    if (slug.includes("weld")) return <Wrench className="h-8 w-8 text-primary" />;
    if (slug.includes("kine")) return <Dumbbell className="h-8 w-8 text-primary" />;
    if (slug.includes("coms")) return <MessageCircle className="h-8 w-8 text-primary" />;
    if (slug.includes("lib")) return <BookOpen className="h-8 w-8 text-primary" />;
    return <GraduationCap className="h-8 w-8 text-primary" />;
  };

  const getGradient = (slug: string) => {
    if (slug.includes("cs")) return "from-red-50 to-gray-50 border-t-red-200";
    if (slug.includes("nurs")) return "from-blue-50 to-gray-50 border-t-blue-200";
    if (slug.includes("adju")) return "from-slate-50 to-gray-50 border-t-slate-200";
    if (slug.includes("bus")) return "from-amber-50 to-gray-50 border-t-amber-200";
    if (slug.includes("fire")) return "from-orange-50 to-gray-50 border-t-orange-200";
    if (slug.includes("weld")) return "from-zinc-50 to-gray-50 border-t-zinc-300";
    if (slug.includes("kine")) return "from-green-50 to-gray-50 border-t-green-200";
    if (slug.includes("coms")) return "from-purple-50 to-gray-50 border-t-purple-200";
    if (slug.includes("lib")) return "from-indigo-50 to-gray-50 border-t-indigo-200";
    return "from-gray-50 to-white";
  };

  const getTotalUnits = (program: any) => {
    let total = 0;
    if (program.years) {
      for (const year of program.years as any[]) {
        for (const term of year.terms) {
          total += term.totalUnits || 0;
        }
      }
    }
    return total;
  };

  const getYearCount = (program: any) => {
    return (program.years as any[])?.length || 0;
  };

  return (
    <div className="w-full max-w-[1400px] mx-auto p-4 md:p-8">
      <div className="mb-10 text-center space-y-4">
        <h1 className="text-3xl md:text-5xl font-black tracking-tight text-foreground" data-testid="text-main-title">
          Explore Your Pathway
        </h1>
        <p className="text-muted-foreground max-w-2xl mx-auto text-lg" data-testid="text-main-subtitle">
          Select a program to view your semester-by-semester roadmap, track your progress, and plan your success at College of the Siskiyous.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {programs.map((program, index) => (
          <motion.div
            key={program.slug}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
          >
            <Card 
              className={`h-full flex flex-col hover:shadow-xl transition-all duration-300 border-t-4 cursor-pointer group ${getGradient(program.slug)}`}
              onClick={() => onSelectProgram(program.slug)}
              data-testid={`card-program-${program.slug}`}
            >
              <CardHeader className="pb-3">
                <div className="flex justify-between items-start mb-2">
                  <div className="p-2 bg-white rounded-lg shadow-sm group-hover:scale-110 transition-transform duration-300">
                    {getIcon(program.slug)}
                  </div>
                  <Badge variant="secondary" className="font-semibold" data-testid={`badge-degree-${program.slug}`}>
                    {program.degreeType.split(" ")[0]}
                  </Badge>
                </div>
                <CardTitle className="text-xl md:text-2xl font-bold group-hover:text-primary transition-colors">
                  {program.title}
                </CardTitle>
                <CardDescription className="line-clamp-2">
                   {program.degreeType}
                </CardDescription>
              </CardHeader>
              <CardContent className="flex-grow">
                <p className="text-sm text-muted-foreground line-clamp-3 leading-relaxed">
                  {program.description}
                </p>
                <div className="mt-4 flex flex-wrap gap-2">
                  <Badge variant="outline" className="bg-white/50 text-[10px]">
                    {getYearCount(program)} {getYearCount(program) === 1 ? 'Year' : 'Years'}
                  </Badge>
                  <Badge variant="outline" className="bg-white/50 text-[10px]">
                    {getTotalUnits(program)} Units
                  </Badge>
                  {program.degreeType.includes("Transfer") && (
                    <Badge variant="outline" className="bg-white/50 text-[10px]">
                      Transfer Ready
                    </Badge>
                  )}
                </div>
              </CardContent>
              <CardFooter className="pt-4 border-t border-gray-100/50">
                <Button className="w-full group-hover:bg-primary group-hover:text-white transition-colors gap-2" data-testid={`btn-view-map-${program.slug}`}>
                  View Map <ArrowRight size={16} />
                </Button>
              </CardFooter>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
