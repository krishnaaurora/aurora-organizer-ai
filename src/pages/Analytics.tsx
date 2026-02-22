import { DashboardLayout } from "@/components/DashboardLayout";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
} from "recharts";

const participationData = [
  { month: "Aug", count: 120 },
  { month: "Sep", count: 310 },
  { month: "Oct", count: 280 },
  { month: "Nov", count: 450 },
  { month: "Dec", count: 390 },
  { month: "Jan", count: 520 },
];

const categoryData = [
  { name: "Technical", value: 45 },
  { name: "Cultural", value: 25 },
  { name: "Sports", value: 15 },
  { name: "Workshop", value: 15 },
];

const COLORS = ["hsl(217,91%,60%)", "hsl(142,71%,45%)", "hsl(38,92%,50%)", "hsl(262,83%,58%)"];

const attendanceData = [
  { event: "Summit", registered: 234, attended: 198 },
  { event: "Workshop", registered: 156, attended: 142 },
  { event: "Lecture", registered: 89, attended: 76 },
  { event: "Hackathon", registered: 312, attended: 289 },
];

const tooltipStyle = {
  background: "hsl(0,0%,7%)",
  border: "1px solid hsl(0,0%,14%)",
  borderRadius: 8,
  fontSize: 12,
};

export default function Analytics() {
  return (
    <DashboardLayout>
      <div className="space-y-8 animate-fade-in">
        <div>
          <h1 className="page-header">Analytics</h1>
          <p className="text-sm text-muted-foreground mt-1">Event performance and engagement metrics.</p>
        </div>

        {/* Summary cards */}
        <div className="grid grid-cols-4 gap-4">
          {[
            { label: "Avg. Attendance Rate", value: "87%" },
            { label: "Most Popular Category", value: "Technical" },
            { label: "Total Registrations", value: "1,847" },
            { label: "Events This Semester", value: "24" },
          ].map((s) => (
            <div key={s.label} className="stat-card">
              <p className="section-label mb-2">{s.label}</p>
              <p className="text-2xl font-semibold">{s.value}</p>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-2 gap-6">
          {/* Participation Growth */}
          <div className="stat-card">
            <p className="text-sm font-medium mb-4">Participation Growth</p>
            <div className="h-[280px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={participationData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(0,0%,14%)" />
                  <XAxis dataKey="month" tick={{ fontSize: 11, fill: "hsl(0,0%,55%)" }} axisLine={false} tickLine={false} />
                  <YAxis tick={{ fontSize: 11, fill: "hsl(0,0%,55%)" }} axisLine={false} tickLine={false} />
                  <Tooltip contentStyle={tooltipStyle} />
                  <Line type="monotone" dataKey="count" stroke="hsl(217,91%,60%)" strokeWidth={2} dot={{ fill: "hsl(217,91%,60%)", r: 4 }} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Category Popularity */}
          <div className="stat-card">
            <p className="text-sm font-medium mb-4">Category Popularity</p>
            <div className="h-[280px] flex items-center">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie data={categoryData} cx="50%" cy="50%" innerRadius={60} outerRadius={100} dataKey="value" stroke="none">
                    {categoryData.map((_, i) => (
                      <Cell key={i} fill={COLORS[i]} />
                    ))}
                  </Pie>
                  <Tooltip contentStyle={tooltipStyle} />
                </PieChart>
              </ResponsiveContainer>
              <div className="space-y-2 pr-4">
                {categoryData.map((c, i) => (
                  <div key={c.name} className="flex items-center gap-2 text-sm whitespace-nowrap">
                    <div className="h-2.5 w-2.5 rounded-full" style={{ background: COLORS[i] }} />
                    <span className="text-muted-foreground">{c.name}</span>
                    <span className="font-medium">{c.value}%</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Attendance Ratio */}
          <div className="stat-card col-span-2">
            <p className="text-sm font-medium mb-4">Attendance vs Registration</p>
            <div className="h-[280px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={attendanceData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(0,0%,14%)" />
                  <XAxis dataKey="event" tick={{ fontSize: 11, fill: "hsl(0,0%,55%)" }} axisLine={false} tickLine={false} />
                  <YAxis tick={{ fontSize: 11, fill: "hsl(0,0%,55%)" }} axisLine={false} tickLine={false} />
                  <Tooltip contentStyle={tooltipStyle} />
                  <Bar dataKey="registered" fill="hsl(217,91%,60%)" radius={[4, 4, 0, 0]} />
                  <Bar dataKey="attended" fill="hsl(142,71%,45%)" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
