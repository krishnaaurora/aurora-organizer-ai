import { useState } from "react";
import { DashboardLayout } from "@/components/DashboardLayout";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { MoreHorizontal, Search, Copy, Pencil, Trash2, Eye, Upload, ImageIcon } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";

type EventStatus = "draft" | "pending" | "approved" | "rejected" | "completed";

interface Event {
  id: number;
  title: string;
  club: string;
  participants: number;
  status: EventStatus;
  date: string;
}

const events: Event[] = [
  { id: 1, title: "Tech Summit 2025", club: "IEEE Club", participants: 234, status: "approved", date: "Feb 28" },
  { id: 2, title: "Cultural Night", club: "Arts Society", participants: 0, status: "pending", date: "Mar 5" },
  { id: 3, title: "AI/ML Workshop", club: "Google DSC", participants: 156, status: "approved", date: "Mar 12" },
  { id: 4, title: "Sports Day", club: "Sports Committee", participants: 0, status: "pending", date: "Mar 20" },
  { id: 5, title: "Hackathon Draft", club: "CSE Dept", participants: 0, status: "draft", date: "—" },
  { id: 6, title: "Guest Lecture: Blockchain", club: "Blockchain Club", participants: 89, status: "completed", date: "Jan 15" },
  { id: 7, title: "Annual Day Proposal", club: "Student Council", participants: 0, status: "rejected", date: "Feb 1" },
];

const statusColors: Record<EventStatus, string> = {
  draft: "bg-muted text-muted-foreground",
  pending: "bg-warning/15 text-warning border-warning/20",
  approved: "bg-success/15 text-success border-success/20",
  rejected: "bg-destructive/15 text-destructive border-destructive/20",
  completed: "bg-primary/15 text-primary border-primary/20",
};

export default function MyEvents() {
  const [search, setSearch] = useState("");
  const [tab, setTab] = useState("all");
  const [publishDialog, setPublishDialog] = useState<number | null>(null);
  const [posterFile, setPosterFile] = useState<string>("");

  const filtered = events.filter((e) => {
    const matchesSearch = e.title.toLowerCase().includes(search.toLowerCase());
    const matchesTab = tab === "all" || e.status === tab;
    return matchesSearch && matchesTab;
  });

  return (
    <DashboardLayout>
      <div className="space-y-6 animate-fade-in">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="page-header">My Events</h1>
            <p className="text-sm text-muted-foreground mt-1">{events.length} total events</p>
          </div>
          <Button>Create Event</Button>
        </div>

        <Tabs value={tab} onValueChange={setTab}>
          <div className="flex items-center justify-between">
            <TabsList className="bg-muted">
              <TabsTrigger value="all">All</TabsTrigger>
              <TabsTrigger value="draft">Draft</TabsTrigger>
              <TabsTrigger value="pending">Pending</TabsTrigger>
              <TabsTrigger value="approved">Approved</TabsTrigger>
              <TabsTrigger value="rejected">Rejected</TabsTrigger>
              <TabsTrigger value="completed">Completed</TabsTrigger>
            </TabsList>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search events..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-9 w-64 bg-card"
              />
            </div>
          </div>

          <TabsContent value={tab} className="mt-4">
            <div className="border border-border rounded-lg overflow-hidden">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-border bg-muted/30">
                    <th className="text-left text-xs font-medium text-muted-foreground px-4 py-3">Event</th>
                    <th className="text-left text-xs font-medium text-muted-foreground px-4 py-3">Club</th>
                    <th className="text-left text-xs font-medium text-muted-foreground px-4 py-3">Date</th>
                    <th className="text-left text-xs font-medium text-muted-foreground px-4 py-3">Participants</th>
                    <th className="text-left text-xs font-medium text-muted-foreground px-4 py-3">Status</th>
                    <th className="text-right text-xs font-medium text-muted-foreground px-4 py-3">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filtered.map((event) => (
                    <tr key={event.id} className="border-b border-border last:border-0 hover:bg-accent/30 transition-colors">
                      <td className="px-4 py-3 text-sm font-medium">{event.title}</td>
                      <td className="px-4 py-3 text-sm text-muted-foreground">{event.club}</td>
                      <td className="px-4 py-3 text-sm text-muted-foreground">{event.date}</td>
                      <td className="px-4 py-3 text-sm text-muted-foreground">{event.participants}</td>
                      <td className="px-4 py-3">
                        <Badge variant="outline" className={statusColors[event.status]}>
                          {event.status.charAt(0).toUpperCase() + event.status.slice(1)}
                        </Badge>
                      </td>
                      <td className="px-4 py-3 text-right">
                        <div className="flex items-center justify-end gap-1">
                          <Button variant="outline" size="sm" className="h-8 px-3 text-xs">
                            <Eye className="h-3.5 w-3.5 mr-1.5" />
                            View
                          </Button>
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                                <MoreHorizontal className="h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuItem><Pencil className="h-4 w-4 mr-2" /> Edit</DropdownMenuItem>
                              <DropdownMenuItem><Copy className="h-4 w-4 mr-2" /> Duplicate</DropdownMenuItem>
                              {event.status === "approved" && (
                                <DropdownMenuItem onClick={() => setPublishDialog(event.id)}>
                                  <ImageIcon className="h-4 w-4 mr-2" /> Publish with Poster
                                </DropdownMenuItem>
                              )}
                              <DropdownMenuItem className="text-destructive"><Trash2 className="h-4 w-4 mr-2" /> Delete</DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </div>
                      </td>
                    </tr>
                  ))}
                  {filtered.length === 0 && (
                    <tr>
                      <td colSpan={6} className="px-4 py-12 text-center text-sm text-muted-foreground">
                        No events found.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </TabsContent>
        </Tabs>
      </div>

      {/* Publish with Poster Dialog */}
      <Dialog open={publishDialog !== null} onOpenChange={() => setPublishDialog(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Publish Event with Poster</DialogTitle>
            <DialogDescription>
              Upload a poster image to publish this approved event to the student dashboard.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 pt-2">
            <div className="border-2 border-dashed border-border rounded-lg p-8 text-center space-y-3">
              <Upload className="h-8 w-8 mx-auto text-muted-foreground" />
              <p className="text-sm text-muted-foreground">Drag & drop poster or click to browse</p>
              <Input
                type="file"
                accept="image/*"
                className="max-w-[240px] mx-auto"
                onChange={(e) => setPosterFile(e.target.files?.[0]?.name || "")}
              />
              {posterFile && (
                <p className="text-xs text-success">Selected: {posterFile}</p>
              )}
            </div>
            <div className="flex justify-end gap-2">
              <Button variant="outline" onClick={() => setPublishDialog(null)}>Cancel</Button>
              <Button disabled={!posterFile} onClick={() => { setPublishDialog(null); setPosterFile(""); }}>
                <ImageIcon className="h-4 w-4 mr-1" />
                Publish Event
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </DashboardLayout>
  );
}
