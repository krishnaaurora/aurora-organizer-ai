import { AppSidebar } from "@/components/AppSidebar";

export function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen w-full">
      <AppSidebar />
      <main className="flex-1 overflow-auto relative">
        {/* Soft ambient gradient background */}
        <div className="fixed inset-0 -z-10 pointer-events-none overflow-hidden">
          <div className="absolute -top-32 left-1/4 w-[700px] h-[700px] rounded-full blur-[140px]" style={{ background: "rgba(96,165,250,0.06)" }} />
          <div className="absolute bottom-0 right-1/4 w-[600px] h-[600px] rounded-full blur-[130px]" style={{ background: "rgba(168,85,247,0.045)" }} />
          <div className="absolute top-1/3 -right-20 w-[500px] h-[500px] rounded-full blur-[120px]" style={{ background: "rgba(34,197,94,0.04)" }} />
          <div className="absolute top-2/3 left-0 w-[450px] h-[450px] rounded-full blur-[110px]" style={{ background: "rgba(251,113,133,0.04)" }} />
          <div className="absolute -top-10 right-1/3 w-[400px] h-[400px] rounded-full blur-[100px]" style={{ background: "rgba(245,158,11,0.04)" }} />
          <div className="absolute bottom-1/4 left-1/3 w-[350px] h-[350px] rounded-full blur-[110px]" style={{ background: "rgba(20,184,166,0.04)" }} />
        </div>
        <div className="p-8 max-w-[1400px] mx-auto">{children}</div>
      </main>
    </div>
  );
}
