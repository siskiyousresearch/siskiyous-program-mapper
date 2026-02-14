import { Button } from "@/components/ui/button";
import { Search, Menu, Bell, UserCircle } from "lucide-react";

export function Header() {
  return (
    <header className="sticky top-0 z-30 w-full border-b border-border bg-background/80 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-[1400px] items-center justify-between px-4 md:px-8">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" className="md:hidden">
            <Menu size={20} />
          </Button>
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded bg-primary text-white font-bold text-xl tracking-tighter shadow-sm">
              S
            </div>
            <div className="hidden md:flex flex-col">
              <span className="text-sm font-bold uppercase tracking-wide text-primary leading-none">College of the</span>
              <span className="text-lg font-black tracking-tight leading-none">Siskiyous</span>
            </div>
          </div>
        </div>

        <div className="hidden md:flex flex-1 max-w-md mx-8">
          <div className="relative w-full">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <input 
              type="text" 
              placeholder="Search catalog, programs, or courses..." 
              className="w-full h-9 rounded-md border border-input bg-muted/50 pl-9 pr-4 text-sm focus:outline-none focus:ring-1 focus:ring-primary transition-all hover:bg-muted"
            />
          </div>
        </div>

        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-primary">
            <Bell size={20} />
          </Button>
          <div className="h-8 w-[1px] bg-border mx-1 hidden md:block"></div>
          <Button variant="ghost" className="gap-2 pl-2 pr-3 hidden md:flex">
            <UserCircle size={20} className="text-muted-foreground" />
            <span className="text-sm font-medium">Student View</span>
          </Button>
          <Button variant="ghost" size="icon" className="md:hidden">
            <UserCircle size={20} />
          </Button>
        </div>
      </div>
    </header>
  );
}
