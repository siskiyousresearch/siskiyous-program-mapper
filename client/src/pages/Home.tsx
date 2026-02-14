import { Header } from "@/components/Header";
import { PathwayMapper } from "@/components/PathwayMapper";
import { ProgramGrid } from "@/components/ProgramGrid";
import { ChatBot } from "@/components/ChatBot";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { ChevronLeft, Loader2 } from "lucide-react";

export default function Home() {
  const [selectedProgramSlug, setSelectedProgramSlug] = useState<string | null>(null);

  const { data: allPrograms = [], isLoading } = useQuery<any[]>({
    queryKey: ["/api/programs"],
  });

  const { data: selectedProgram } = useQuery<any>({
    queryKey: ["/api/programs", selectedProgramSlug],
    enabled: !!selectedProgramSlug,
  });

  return (
    <div className="min-h-screen bg-background font-sans text-foreground selection:bg-primary/20 selection:text-primary flex flex-col">
      <Header />
      
      <main className="relative flex-grow">
        <div className="absolute inset-0 z-[-1] bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px] opacity-[0.4] [mask-image:radial-gradient(ellipse_50%_50%_at_50%_50%,#000_70%,transparent_100%)]"></div>
        
        <AnimatePresence mode="wait">
          {!selectedProgramSlug ? (
            <motion.div
              key="grid"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
              className="py-10"
            >
              {isLoading ? (
                <div className="flex items-center justify-center py-20">
                  <Loader2 className="h-8 w-8 animate-spin text-primary" />
                </div>
              ) : (
                <ProgramGrid 
                  programs={allPrograms} 
                  onSelectProgram={setSelectedProgramSlug} 
                />
              )}
            </motion.div>
          ) : (
            <motion.div
              key="mapper"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ duration: 0.3 }}
              className="pb-20"
            >
              <div className="max-w-[1400px] mx-auto px-4 pt-6 md:px-8">
                <Button 
                  variant="ghost" 
                  onClick={() => setSelectedProgramSlug(null)}
                  className="gap-1 pl-0 hover:pl-2 transition-all mb-2 text-muted-foreground hover:text-primary"
                  data-testid="btn-back-programs"
                >
                  <ChevronLeft size={16} />
                  Back to Programs
                </Button>
              </div>
              {selectedProgram ? (
                <PathwayMapper program={selectedProgram} />
              ) : (
                <div className="flex items-center justify-center py-20">
                  <Loader2 className="h-8 w-8 animate-spin text-primary" />
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      <ChatBot currentProgram={selectedProgram || null} />
    </div>
  );
}
