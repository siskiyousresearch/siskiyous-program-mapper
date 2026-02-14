import { Header } from "@/components/Header";
import { PathwayMapper } from "@/components/PathwayMapper";
import { ChatBot } from "@/components/ChatBot";
import { useQuery } from "@tanstack/react-query";
import { useRoute, Link } from "wouter";
import { Button } from "@/components/ui/button";
import { ChevronLeft, Loader2 } from "lucide-react";

export default function ProgramDetail() {
  const [, params] = useRoute("/program/:slug");
  const slug = params?.slug;

  const { data: program, isLoading, error } = useQuery<any>({
    queryKey: ["/api/programs", slug],
    enabled: !!slug,
  });

  return (
    <div className="min-h-screen bg-background font-sans text-foreground selection:bg-primary/20 selection:text-primary flex flex-col">
      <Header />

      <main className="relative flex-grow">
        <div className="absolute inset-0 z-[-1] bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px] opacity-[0.4] [mask-image:radial-gradient(ellipse_50%_50%_at_50%_50%,#000_70%,transparent_100%)]"></div>

        <div className="max-w-[1400px] mx-auto px-4 pt-6 md:px-8">
          <Link href="/">
            <Button
              variant="ghost"
              className="gap-1 pl-0 hover:pl-2 transition-all mb-2 text-muted-foreground hover:text-primary"
              data-testid="btn-back-programs"
            >
              <ChevronLeft size={16} />
              Back to Programs
            </Button>
          </Link>
        </div>

        {isLoading ? (
          <div className="flex items-center justify-center py-20">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
          </div>
        ) : error || !program ? (
          <div className="flex flex-col items-center justify-center py-20 gap-4">
            <p className="text-muted-foreground text-lg">Program not found</p>
            <Link href="/">
              <Button data-testid="btn-go-home">Browse All Programs</Button>
            </Link>
          </div>
        ) : (
          <PathwayMapper program={program} />
        )}
      </main>

      <ChatBot currentProgram={program || null} />
    </div>
  );
}
