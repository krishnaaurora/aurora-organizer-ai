import { AppSidebar } from "@/components/AppSidebar";

export function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen w-full">
      <AppSidebar />
      <main className="flex-1 overflow-auto relative">
        {/* Soft ambient gradient background */}
        <div className="fixed inset-0 -z-10 pointer-events-none">
          <div className="absolute top-0 left-1/4 w-[600px] h-[600px] rounded-full bg-[hsl(221,83%,53%,0.04)] blur-[120px]" />
          <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] rounded-full bg-[hsl(262,83%,58%,0.03)] blur-[100px]" />
          <div className="absolute top-1/2 right-0 w-[400px] h-[400px] rounded-full bg-[hsl(152,60%,42%,0.03)] blur-[100px]" />
        </div>
        <div className="p-8 max-w-[1400px] mx-auto">{children}</div>
      </main>
    </div>
  );
}
