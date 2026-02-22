import { DashboardLayout } from "@/components/DashboardLayout";
import { Badge } from "@/components/ui/badge";
import { Clock, CheckCircle2, XCircle } from "lucide-react";

const requests = [
  {
    title: "Tech Summit 2025",
    submittedAt: "Feb 22, 2025",
    status: "approved" as const,
    approver: "Dr. Patel (HOD)",
    feedback: null,
    timeline: [
      { action: "Submitted", date: "Feb 20", done: true },
      { action: "Reviewed by HOD", date: "Feb 21", done: true },
      { action: "Approved", date: "Feb 22", done: true },
    ],
  },
  {
    title: "Cultural Night",
    submittedAt: "Feb 24, 2025",
    status: "pending" as const,
    approver: null,
    feedback: null,
    timeline: [
      { action: "Submitted", date: "Feb 24", done: true },
      { action: "Under Review", date: "—", done: false },
    ],
  },
  {
    title: "Annual Day Proposal",
    submittedAt: "Jan 28, 2025",
    status: "rejected" as const,
    approver: "Admin Office",
    feedback: "Budget exceeds limit. Please revise the venue and catering costs and resubmit.",
    timeline: [
      { action: "Submitted", date: "Jan 28", done: true },
      { action: "Reviewed by Admin", date: "Feb 1", done: true },
      { action: "Rejected", date: "Feb 1", done: true },
    ],
  },
];

const statusConfig = {
  approved: { color: "bg-success/15 text-success border-success/20", icon: CheckCircle2 },
  pending: { color: "bg-warning/15 text-warning border-warning/20", icon: Clock },
  rejected: { color: "bg-destructive/15 text-destructive border-destructive/20", icon: XCircle },
};

export default function ApprovalStatus() {
  return (
    <DashboardLayout>
      <div className="space-y-6 animate-fade-in">
        <div>
          <h1 className="page-header">Approval Status</h1>
          <p className="text-sm text-muted-foreground mt-1">Track your event approval requests.</p>
        </div>

        <div className="space-y-4">
          {requests.map((r, i) => {
            const config = statusConfig[r.status];
            return (
              <div key={i} className="stat-card space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-sm font-medium">{r.title}</h3>
                    <p className="text-xs text-muted-foreground mt-0.5">Submitted {r.submittedAt}</p>
                  </div>
                  <Badge variant="outline" className={config.color}>
                    <config.icon className="h-3 w-3 mr-1" />
                    {r.status.charAt(0).toUpperCase() + r.status.slice(1)}
                  </Badge>
                </div>

                {r.feedback && (
                  <div className="p-3 rounded-md bg-destructive/5 border border-destructive/10">
                    <p className="text-xs font-medium text-destructive mb-1">Rejection Feedback</p>
                    <p className="text-sm text-muted-foreground">{r.feedback}</p>
                  </div>
                )}

                {/* Timeline */}
                <div className="flex items-center gap-0">
                  {r.timeline.map((t, ti) => (
                    <div key={ti} className="flex items-center">
                      <div className="flex flex-col items-center">
                        <div className={`h-2.5 w-2.5 rounded-full ${t.done ? "bg-primary" : "bg-muted-foreground/30"}`} />
                        <p className="text-xs mt-1.5 text-muted-foreground whitespace-nowrap">{t.action}</p>
                        <p className="text-xs text-muted-foreground/60">{t.date}</p>
                      </div>
                      {ti < r.timeline.length - 1 && (
                        <div className={`h-px w-16 mx-2 ${t.done ? "bg-primary" : "bg-muted-foreground/20"}`} />
                      )}
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </DashboardLayout>
  );
}
