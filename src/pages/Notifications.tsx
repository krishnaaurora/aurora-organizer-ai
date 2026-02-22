import { DashboardLayout } from "@/components/DashboardLayout";
import { UserPlus, CheckCircle2, Bell, AlertCircle } from "lucide-react";

const notifications = [
  { icon: UserPlus, text: "Arjun Mehta registered for Tech Summit 2025", time: "2 minutes ago", type: "register" as const },
  { icon: CheckCircle2, text: "Annual Hackathon has been approved by Dr. Patel (HOD)", time: "1 hour ago", type: "approval" as const },
  { icon: Bell, text: "Reminder: Workshop on AI/ML starts in 24 hours", time: "3 hours ago", type: "reminder" as const },
  { icon: UserPlus, text: "Priya Sharma registered for Cultural Fest", time: "5 hours ago", type: "register" as const },
  { icon: AlertCircle, text: "Annual Day Proposal was rejected — see feedback", time: "Yesterday", type: "rejection" as const },
  { icon: CheckCircle2, text: "Guest Lecture Series approved by Admin", time: "Yesterday", type: "approval" as const },
  { icon: UserPlus, text: "Vikram Singh registered for Hackathon 2025", time: "2 days ago", type: "register" as const },
  { icon: Bell, text: "Reminder: Submit final report for Cultural Night", time: "2 days ago", type: "reminder" as const },
  { icon: UserPlus, text: "15 new registrations for Sports Day", time: "3 days ago", type: "register" as const },
];

const typeColors = {
  register: "text-primary",
  approval: "text-success",
  reminder: "text-warning",
  rejection: "text-destructive",
};

export default function Notifications() {
  return (
    <DashboardLayout>
      <div className="space-y-6 animate-fade-in">
        <div>
          <h1 className="page-header">Notifications</h1>
          <p className="text-sm text-muted-foreground mt-1">Stay updated on event activity.</p>
        </div>

        <div className="space-y-1">
          {notifications.map((n, i) => (
            <div key={i} className="flex items-start gap-4 p-4 rounded-lg hover:bg-accent/30 transition-colors border-b border-border last:border-0">
              <div className={`mt-0.5 ${typeColors[n.type]}`}>
                <n.icon className="h-4 w-4" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm">{n.text}</p>
                <p className="text-xs text-muted-foreground mt-1">{n.time}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
}
