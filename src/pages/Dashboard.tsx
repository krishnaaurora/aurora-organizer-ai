import { DashboardLayout } from "@/components/DashboardLayout";
import {
  Calendar,
  Clock,
  Users,
  FileCheck,
  UserPlus,
  CheckCircle2,
  Bell,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const stats = [
  { label: "Total Events", value: "24", icon: Calendar, change: "+3 this month" },
  { label: "Pending Approval", value: "5", icon: Clock, change: "2 urgent" },
  { label: "Total Participants", value: "1,847", icon: Users, change: "+127 this week" },
  { label: "Upcoming Events", value: "8", icon: FileCheck, change: "Next: Tomorrow" },
];

const activities = [
  { icon: UserPlus, text: "Arjun Mehta registered for Tech Summit 2025", time: "2 min ago", type: "register" as const },
  { icon: CheckCircle2, text: "Annual Hackathon approved by HOD", time: "1 hour ago", type: "approve" as const },
  { icon: Bell, text: "Reminder sent for Workshop on AI/ML", time: "3 hours ago", type: "notify" as const },
  { icon: UserPlus, text: "Priya Sharma registered for Cultural Fest", time: "5 hours ago", type: "register" as const },
  { icon: CheckCircle2, text: "Guest Lecture Series approved", time: "Yesterday", type: "approve" as const },
];

const chartData = [
  { month: "Aug", participants: 120 },
  { month: "Sep", participants: 310 },
  { month: "Oct", participants: 280 },
  { month: "Nov", participants: 450 },
  { month: "Dec", participants: 390 },
  { month: "Jan", participants: 520 },
];

const upcoming = [
  { title: "Tech Summit 2025", date: "Feb 28", status: "Approved" },
  { title: "Cultural Night", date: "Mar 5", status: "Pending" },
  { title: "AI/ML Workshop", date: "Mar 12", status: "Approved" },
  { title: "Sports Day", date: "Mar 20", status: "Pending" },
];

export default function Dashboard() {
  return (
    <DashboardLayout>
      <div className="space-y-8 animate-fade-in">
        {/* Header */}
        <div>
          <h1 className="page-header">Welcome back, Organizer</h1>
          <p className="text-sm text-muted-foreground mt-1">
            Here's what's happening with your events today.
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-4 gap-4">
          {stats.map((s) => (
            <div key={s.label} className="stat-card">
              <div className="flex items-center justify-between mb-3">
                <span className="section-label">{s.label}</span>
                <s.icon className="h-4 w-4 text-muted-foreground" />
              </div>
              <p className="text-2xl font-semibold tracking-tight">{s.value}</p>
              <p className="text-xs text-muted-foreground mt-1">{s.change}</p>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-3 gap-6">
          {/* Activity Feed */}
          <div className="col-span-1 space-y-4">
            <h2 className="text-sm font-medium">Recent Activity</h2>
            <div className="space-y-1">
              {activities.map((a, i) => (
                <div
                  key={i}
                  className="flex items-start gap-3 p-3 rounded-lg hover:bg-accent/50 transition-colors"
                >
                  <a.icon
                    className={`h-4 w-4 mt-0.5 shrink-0 ${
                      a.type === "approve"
                        ? "text-success"
                        : a.type === "register"
                        ? "text-primary"
                        : "text-warning"
                    }`}
                  />
                  <div className="min-w-0">
                    <p className="text-sm leading-snug">{a.text}</p>
                    <p className="text-xs text-muted-foreground mt-0.5">{a.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Chart */}
          <div className="col-span-1 space-y-4">
            <h2 className="text-sm font-medium">Participation Trend</h2>
            <div className="stat-card h-[260px]">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={chartData}>
                  <defs>
                    <linearGradient id="areaFill" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="hsl(217, 91%, 60%)" stopOpacity={0.2} />
                      <stop offset="100%" stopColor="hsl(217, 91%, 60%)" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(0,0%,14%)" />
                  <XAxis dataKey="month" tick={{ fontSize: 11, fill: "hsl(0,0%,55%)" }} axisLine={false} tickLine={false} />
                  <YAxis tick={{ fontSize: 11, fill: "hsl(0,0%,55%)" }} axisLine={false} tickLine={false} />
                  <Tooltip
                    contentStyle={{
                      background: "hsl(0,0%,7%)",
                      border: "1px solid hsl(0,0%,14%)",
                      borderRadius: 8,
                      fontSize: 12,
                    }}
                  />
                  <Area
                    type="monotone"
                    dataKey="participants"
                    stroke="hsl(217, 91%, 60%)"
                    fill="url(#areaFill)"
                    strokeWidth={2}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Upcoming */}
          <div className="col-span-1 space-y-4">
            <h2 className="text-sm font-medium">Upcoming Events</h2>
            <div className="space-y-2">
              {upcoming.map((e, i) => (
                <div key={i} className="stat-card flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium">{e.title}</p>
                    <p className="text-xs text-muted-foreground">{e.date}</p>
                  </div>
                  <Badge
                    variant={e.status === "Approved" ? "default" : "secondary"}
                    className={
                      e.status === "Approved"
                        ? "bg-success/15 text-success border-success/20 hover:bg-success/20"
                        : "bg-warning/15 text-warning border-warning/20 hover:bg-warning/20"
                    }
                  >
                    {e.status}
                  </Badge>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
