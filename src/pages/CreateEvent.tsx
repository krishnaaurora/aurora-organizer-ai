import { useState } from "react";
import { DashboardLayout } from "@/components/DashboardLayout";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Sparkles, FileText, Upload } from "lucide-react";

const aiExamples = [
  "Write a formal invitation email for the event",
  "Generate an official notice for the department",
  "Create a compelling event description",
  "Draft a sponsorship request letter",
];

export default function CreateEvent() {
  const [title, setTitle] = useState("");
  const [club, setClub] = useState("");
  const [venue, setVenue] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [category, setCategory] = useState("");
  const [editorContent, setEditorContent] = useState("");
  const [aiPrompt, setAiPrompt] = useState("");
  const [aiLoading, setAiLoading] = useState(false);

  const handleGenerate = () => {
    setAiLoading(true);
    setTimeout(() => {
      const generated = `Dear Students and Faculty,\n\nWe are pleased to announce "${title || "Untitled Event"}" organized by ${club || "the organizing committee"}.\n\nThis event will be held at ${venue || "the campus venue"} from ${startDate || "TBD"} to ${endDate || "TBD"}.\n\nWe cordially invite all interested participants to register and join us for what promises to be an enriching experience.\n\nPlease find the detailed schedule and registration information below.\n\nWarm regards,\nThe Organizing Committee`;
      setEditorContent((prev) => (prev ? prev + "\n\n" + generated : generated));
      setAiLoading(false);
    }, 1500);
  };

  return (
    <DashboardLayout>
      <div className="space-y-6 animate-fade-in">
        <div>
          <h1 className="page-header">Create Event</h1>
          <p className="text-sm text-muted-foreground mt-1">
            AI-powered workspace to create and format your event.
          </p>
        </div>

        {/* Top Info Bar */}
        <div className="grid grid-cols-6 gap-3">
          <Input placeholder="Event Title" value={title} onChange={(e) => setTitle(e.target.value)} className="bg-card" />
          <Input placeholder="Club Name (optional)" value={club} onChange={(e) => setClub(e.target.value)} className="bg-card" />
          <Select value={category} onValueChange={setCategory}>
            <SelectTrigger className="bg-card">
              <SelectValue placeholder="Category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="technical">Technical</SelectItem>
              <SelectItem value="cultural">Cultural</SelectItem>
              <SelectItem value="sports">Sports</SelectItem>
              <SelectItem value="workshop">Workshop</SelectItem>
              <SelectItem value="seminar">Seminar</SelectItem>
            </SelectContent>
          </Select>
          <Input placeholder="Venue" value={venue} onChange={(e) => setVenue(e.target.value)} className="bg-card" />
          <Input type="date" placeholder="Start Date" value={startDate} onChange={(e) => setStartDate(e.target.value)} className="bg-card" />
          <Input type="date" placeholder="End Date" value={endDate} onChange={(e) => setEndDate(e.target.value)} className="bg-card" />
        </div>

        {/* Three Column Layout */}
        <div className="grid grid-cols-12 gap-4 min-h-[600px]">
          {/* Left – Preview */}
          <div className="col-span-3 border border-border rounded-lg p-5 bg-card overflow-auto">
            <div className="flex items-center gap-2 mb-4">
              <FileText className="h-4 w-4 text-muted-foreground" />
              <span className="section-label">Live Preview</span>
            </div>
            <Separator className="mb-4" />
            <div className="space-y-3">
              <h2 className="text-lg font-semibold">{title || "Event Title"}</h2>
              {club && <p className="text-xs text-muted-foreground">By {club}</p>}
              <div className="flex gap-4 text-xs text-muted-foreground">
                {venue && <span>📍 {venue}</span>}
                {startDate && <span>📅 {startDate}</span>}
              </div>
              <Separator />
              <div className="text-sm leading-relaxed whitespace-pre-wrap">
                {editorContent || (
                  <span className="text-muted-foreground italic">
                    Start writing in the editor to see a live preview...
                  </span>
                )}
              </div>
            </div>
          </div>

          {/* Center – Editor */}
          <div className="col-span-5 border border-border rounded-lg bg-card flex flex-col">
            <div className="flex items-center gap-2 px-5 py-3 border-b border-border">
              <span className="section-label">Document Editor</span>
            </div>
            <Textarea
              value={editorContent}
              onChange={(e) => setEditorContent(e.target.value)}
              placeholder="Start writing your event description, notice, or invitation here...&#10;&#10;Supports formatting when you type:&#10;• Use # for headings&#10;• Use - or * for lists&#10;• Write freely in paragraph form"
              className="flex-1 border-0 rounded-none bg-transparent resize-none p-5 text-sm leading-relaxed focus-visible:ring-0"
            />
          </div>

          {/* Right – AI Panel */}
          <div className="col-span-4 border border-border rounded-lg bg-card flex flex-col">
            <div className="flex items-center gap-2 px-5 py-3 border-b border-border">
              <Sparkles className="h-4 w-4 text-primary" />
              <span className="section-label">AI Assistant</span>
            </div>
            <div className="flex-1 p-5 flex flex-col">
              <div className="flex-1 space-y-3">
                <p className="text-sm text-muted-foreground">Quick prompts:</p>
                <div className="space-y-2">
                  {aiExamples.map((ex) => (
                    <button
                      key={ex}
                      onClick={() => setAiPrompt(ex)}
                      className="w-full text-left text-sm p-2.5 rounded-md border border-border hover:bg-accent/50 transition-colors"
                    >
                      {ex}
                    </button>
                  ))}
                </div>
              </div>
              <div className="space-y-3 pt-4 border-t border-border mt-4">
                <Textarea
                  value={aiPrompt}
                  onChange={(e) => setAiPrompt(e.target.value)}
                  placeholder="Describe what you want the AI to generate..."
                  className="bg-accent/30 min-h-[80px] text-sm"
                />
                <Button
                  onClick={handleGenerate}
                  disabled={aiLoading || !aiPrompt}
                  className="w-full"
                >
                  {aiLoading ? (
                    <span className="flex items-center gap-2">
                      <span className="h-3 w-3 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" />
                      Generating...
                    </span>
                  ) : (
                    <span className="flex items-center gap-2">
                      <Sparkles className="h-4 w-4" />
                      Generate with AI
                    </span>
                  )}
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between pt-2">
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm">
              <Upload className="h-4 w-4 mr-2" />
              Upload Poster
            </Button>
          </div>
          <div className="flex items-center gap-3">
            <Button variant="outline">Save as Draft</Button>
            <Button>Submit Event</Button>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
