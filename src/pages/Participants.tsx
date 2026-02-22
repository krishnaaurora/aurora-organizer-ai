import { useState } from "react";
import { DashboardLayout } from "@/components/DashboardLayout";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search, Download } from "lucide-react";

const participants = [
  { id: 1, name: "Arjun Mehta", email: "arjun@univ.edu", dept: "CSE", year: "3rd", attended: true },
  { id: 2, name: "Priya Sharma", email: "priya@univ.edu", dept: "ECE", year: "2nd", attended: true },
  { id: 3, name: "Rahul Verma", email: "rahul@univ.edu", dept: "ME", year: "4th", attended: false },
  { id: 4, name: "Sneha Gupta", email: "sneha@univ.edu", dept: "CSE", year: "1st", attended: true },
  { id: 5, name: "Karthik R.", email: "karthik@univ.edu", dept: "IT", year: "3rd", attended: false },
  { id: 6, name: "Ananya Nair", email: "ananya@univ.edu", dept: "CSE", year: "2nd", attended: true },
  { id: 7, name: "Vikram Singh", email: "vikram@univ.edu", dept: "ECE", year: "4th", attended: true },
  { id: 8, name: "Meera Joshi", email: "meera@univ.edu", dept: "ME", year: "1st", attended: false },
];

export default function Participants() {
  const [search, setSearch] = useState("");
  const [deptFilter, setDeptFilter] = useState("all");
  const [attendance, setAttendance] = useState<Record<number, boolean>>(
    Object.fromEntries(participants.map((p) => [p.id, p.attended]))
  );

  const filtered = participants.filter((p) => {
    const matchSearch = p.name.toLowerCase().includes(search.toLowerCase()) || p.email.toLowerCase().includes(search.toLowerCase());
    const matchDept = deptFilter === "all" || p.dept === deptFilter;
    return matchSearch && matchDept;
  });

  return (
    <DashboardLayout>
      <div className="space-y-6 animate-fade-in">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="page-header">Participants</h1>
            <p className="text-sm text-muted-foreground mt-1">{participants.length} registered participants</p>
          </div>
          <Button variant="outline">
            <Download className="h-4 w-4 mr-2" />
            Export CSV
          </Button>
        </div>

        <div className="flex items-center gap-3">
          <div className="relative flex-1 max-w-sm">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input placeholder="Search by name or email..." value={search} onChange={(e) => setSearch(e.target.value)} className="pl-9 bg-card" />
          </div>
          <Select value={deptFilter} onValueChange={setDeptFilter}>
            <SelectTrigger className="w-40 bg-card">
              <SelectValue placeholder="Department" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Departments</SelectItem>
              <SelectItem value="CSE">CSE</SelectItem>
              <SelectItem value="ECE">ECE</SelectItem>
              <SelectItem value="ME">ME</SelectItem>
              <SelectItem value="IT">IT</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="border border-border rounded-lg overflow-hidden">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border bg-muted/30">
                <th className="text-left text-xs font-medium text-muted-foreground px-4 py-3">Name</th>
                <th className="text-left text-xs font-medium text-muted-foreground px-4 py-3">Email</th>
                <th className="text-left text-xs font-medium text-muted-foreground px-4 py-3">Department</th>
                <th className="text-left text-xs font-medium text-muted-foreground px-4 py-3">Year</th>
                <th className="text-center text-xs font-medium text-muted-foreground px-4 py-3">Attendance</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((p) => (
                <tr key={p.id} className="border-b border-border last:border-0 hover:bg-accent/30 transition-colors">
                  <td className="px-4 py-3 text-sm font-medium">{p.name}</td>
                  <td className="px-4 py-3 text-sm text-muted-foreground">{p.email}</td>
                  <td className="px-4 py-3 text-sm text-muted-foreground">{p.dept}</td>
                  <td className="px-4 py-3 text-sm text-muted-foreground">{p.year}</td>
                  <td className="px-4 py-3 text-center">
                    <Switch
                      checked={attendance[p.id]}
                      onCheckedChange={(val) => setAttendance((prev) => ({ ...prev, [p.id]: val }))}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </DashboardLayout>
  );
}
