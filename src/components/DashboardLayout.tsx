import { AppSidebar } from "@/components/AppSidebar";

export function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen w-full">
      <AppSidebar />
      <main className="flex-1 overflow-auto relative">
        {/* Soft ambient gradient background */}
        <div className="fixed inset-0 -z-10 pointer-events-none overflow-hidden">
          <div className="absolute -top-32 left-1/4 w-[700px] h-[700px] rounded-full bg-[hsl(221,83%,60%,0.06)] blur-[140px]" />
          <div className="absolute bottom-0 right-1/4 w-[600px] h-[600px] rounded-full bg-[hsl(280,70%,62%,0.045)] blur-[130px]" />
          <div className="absolute top-1/3 -right-20 w-[500px] h-[500px] rounded-full bg-[hsl(152,60%,50%,0.04)] blur-[120px]" />
          <div className="absolute top-2/3 left-0 w-[450px] h-[450px] rounded-full bg-[hsl(340,75%,58%,0.035)] blur-[110px]" />
          <div className="absolute -top-10 right-1/3 w-[400px] h-[400px] rounded-full bg-[hsl(38,92%,55%,0.035)] blur-[100px]" />
          <div className="absolute bottom-1/4 left-1/3 w-[350px] h-[350px] rounded-full bg-[hsl(190,70%,50%,0.04)] blur-[110px]" />
        </div>
        <div className="p-8 max-w-[1400px] mx-auto">{children}</div>
      </main>
    </div>
  );
}
