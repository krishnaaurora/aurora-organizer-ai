import { useState } from "react";
import { DashboardLayout } from "@/components/DashboardLayout";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import {
  Sparkles,
  FileText,
  
  ChevronDown,
  ChevronUp,
  Eye,
  FileCheck,
  AlertTriangle,
  CheckCircle2,
  Mail,
  MessageSquare,
  Download,
  Share2,
  Clock,
  RotateCcw,
  Send,
} from "lucide-react";

// ── Types ──
type DocumentVersion = { id: number; content: string; timestamp: string; label: string };
type PreviewMode = "poster" | "letter";

const aiExamples = [
  "Write a formal invitation email for the event",
  "Generate an official notice for the department",
  "Create a compelling event description",
  "Draft a sponsorship request letter",
];

const validationRules = [
  { key: "title", label: "Event title is required" },
  { key: "category", label: "Category must be selected" },
  { key: "venue", label: "Venue is required" },
  { key: "startDate", label: "Start date is required" },
  { key: "endDate", label: "End date is required" },
  { key: "eventTime", label: "Event time is required" },
  { key: "editorContent", label: "Event description/document content is required" },
];

export default function CreateEvent() {
  // ── Event Info ──
  const [title, setTitle] = useState("");
  const [club, setClub] = useState("");
  const [venue, setVenue] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [category, setCategory] = useState("");
  const [eventMode, setEventMode] = useState("");
  const [teamNumber, setTeamNumber] = useState("");
  const [eventTime, setEventTime] = useState("");
  const [guestList, setGuestList] = useState("");
  const [isPublicEvent, setIsPublicEvent] = useState(true);

  // ── Editor ──
  const [editorContent, setEditorContent] = useState("");
  const [approvalLetterContent, setApprovalLetterContent] = useState("");
  const [autoSave, setAutoSave] = useState(true);

  // ── AI ──
  const [aiPrompt, setAiPrompt] = useState("");
  const [aiLoading, setAiLoading] = useState(false);
  const [aiOpen, setAiOpen] = useState(true);

  // ── Preview ──
  const [previewMode, setPreviewMode] = useState<PreviewMode>("poster");

  // ── Documents ──
  const [versions, setVersions] = useState<DocumentVersion[]>([]);
  const [showVersions, setShowVersions] = useState(false);

  // ── Validation ──
  const [showValidation, setShowValidation] = useState(false);

  // ── Submit ──
  const [showSubmitOptions, setShowSubmitOptions] = useState(false);

  const formValues: Record<string, string> = {
    title, category, venue, startDate, endDate, eventTime, editorContent,
  };

  const validationResults = validationRules.map((r) => ({
    ...r,
    pass: !!formValues[r.key]?.trim(),
  }));

  const allValid = validationResults.every((v) => v.pass);

  // ── Handlers ──
  const saveVersion = (label: string) => {
    setVersions((prev) => [
      { id: Date.now(), content: editorContent, timestamp: new Date().toLocaleString(), label },
      ...prev,
    ]);
  };

  const restoreVersion = (v: DocumentVersion) => {
    setEditorContent(v.content);
  };

  const handleGenerate = () => {
    setAiLoading(true);
    setTimeout(() => {
      const generated = `Dear Students and Faculty,\n\nWe are pleased to announce "${title || "Untitled Event"}" organized by ${club || "the organizing committee"}.\n\nThis event will be held at ${venue || "the campus venue"} from ${startDate || "TBD"} to ${endDate || "TBD"}.\n\nWe cordially invite all interested participants to register and join us for what promises to be an enriching experience.\n\nPlease find the detailed schedule and registration information below.\n\nWarm regards,\nThe Organizing Committee`;
      setEditorContent((prev) => (prev ? prev + "\n\n" + generated : generated));
      setAiLoading(false);
    }, 1500);
  };

  const handleGenerateApprovalLetter = () => {
    setAiLoading(true);
    setTimeout(() => {
      const letter = `To,\nThe Dean / Head of Department\n${club ? club + "\n" : ""}University Campus\n\nSubject: Request for Approval — ${title || "Untitled Event"}\n\nRespected Sir/Madam,\n\nI am writing to formally request approval to organize "${title || "Untitled Event"}"${category ? ` under the ${category} category` : ""}.\n\nEvent Details:\n• Venue: ${venue || "TBD"}\n• Date: ${startDate || "TBD"} to ${endDate || "TBD"}\n• Mode: ${eventMode || "TBD"}\n• Time: ${eventTime || "TBD"}\n• Expected Participants: ${teamNumber || "Open"}\n• Scope: ${isPublicEvent ? "Public (All Departments)" : "Department Only"}\n\nWe assure you that all necessary arrangements will be made and the event will be conducted in adherence to university guidelines.\n\nKindly grant your approval at the earliest.\n\nThank you.\n\nYours sincerely,\nEvent Organizer`;
      setApprovalLetterContent(letter);
      setAiLoading(false);
    }, 1500);
  };

  const handleSubmit = () => {
    if (!allValid) {
      setShowValidation(true);
      return;
    }
    saveVersion("Submitted");
    setShowSubmitOptions(true);
  };

  return (
    <DashboardLayout>
      <div className="space-y-5 animate-fade-in">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="page-header">Create Event</h1>
            <p className="text-sm text-muted-foreground mt-1">
              AI-powered workspace to create and format your event.
            </p>
          </div>
          <Badge
            variant="outline"
            className="bg-warning/10 text-warning border-warning/20"
          >
            <Clock className="h-3 w-3 mr-1" />
            Approval: Pending
          </Badge>
        </div>

        {/* ── Top Info Bar ── */}
        <div className="grid grid-cols-4 gap-3">
          <Input placeholder="Event Title *" value={title} onChange={(e) => setTitle(e.target.value)} className="bg-card" />
          <Input placeholder="Club Name (optional)" value={club} onChange={(e) => setClub(e.target.value)} className="bg-card" />
          <Select value={category} onValueChange={setCategory}>
            <SelectTrigger className="bg-card"><SelectValue placeholder="Category *" /></SelectTrigger>
            <SelectContent>
              <SelectItem value="technical">Technical</SelectItem>
              <SelectItem value="cultural">Cultural</SelectItem>
              <SelectItem value="sports">Sports</SelectItem>
              <SelectItem value="workshop">Workshop</SelectItem>
              <SelectItem value="seminar">Seminar</SelectItem>
            </SelectContent>
          </Select>
          <Input placeholder="Venue *" value={venue} onChange={(e) => setVenue(e.target.value)} className="bg-card" />
        </div>
        <div className="grid grid-cols-6 gap-3">
          <Input type="date" placeholder="Start Date" value={startDate} onChange={(e) => setStartDate(e.target.value)} className="bg-card" />
          <Input type="date" placeholder="End Date" value={endDate} onChange={(e) => setEndDate(e.target.value)} className="bg-card" />
          <Select value={eventMode} onValueChange={setEventMode}>
            <SelectTrigger className="bg-card"><SelectValue placeholder="Event Mode" /></SelectTrigger>
            <SelectContent>
              <SelectItem value="online">Online</SelectItem>
              <SelectItem value="offline">Offline</SelectItem>
              <SelectItem value="hybrid">Hybrid</SelectItem>
            </SelectContent>
          </Select>
          <Input type="number" placeholder="Team Size (optional)" value={teamNumber} onChange={(e) => setTeamNumber(e.target.value)} className="bg-card" />
          <Input type="time" placeholder="Event Time *" value={eventTime} onChange={(e) => setEventTime(e.target.value)} className="bg-card" />
          <div className="flex items-center gap-2 bg-card border border-border rounded-md px-3">
            <Switch checked={isPublicEvent} onCheckedChange={setIsPublicEvent} id="public-toggle" />
            <Label htmlFor="public-toggle" className="text-xs cursor-pointer">
              {isPublicEvent ? "Public" : "Dept Only"}
            </Label>
          </div>
        </div>
        <Input placeholder="Guest List — comma separated (optional)" value={guestList} onChange={(e) => setGuestList(e.target.value)} className="bg-card" />

        {/* ── Three Column Layout ── */}
        <div className="grid grid-cols-12 gap-4 min-h-[560px]">

          {/* LEFT – Dual Preview */}
          <div className="col-span-3 border border-border rounded-lg p-5 bg-card overflow-auto flex flex-col">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <Eye className="h-4 w-4 text-muted-foreground" />
                <span className="section-label">Preview</span>
              </div>
              <div className="flex gap-1">
                <button
                  onClick={() => setPreviewMode("poster")}
                  className={`text-[10px] px-2 py-1 rounded ${previewMode === "poster" ? "bg-primary text-primary-foreground" : "bg-accent text-muted-foreground"}`}
                >
                  Poster
                </button>
                <button
                  onClick={() => setPreviewMode("letter")}
                  className={`text-[10px] px-2 py-1 rounded ${previewMode === "letter" ? "bg-primary text-primary-foreground" : "bg-accent text-muted-foreground"}`}
                >
                  Letter
                </button>
              </div>
            </div>
            <Separator className="mb-4" />

            {previewMode === "poster" ? (
              <div className="space-y-3 flex-1">
                <h2 className="text-lg font-semibold">{title || "Event Title"}</h2>
                {club && <p className="text-xs text-muted-foreground">By {club}</p>}
                {category && (
                  <Badge variant="outline" className="text-[10px]">{category}</Badge>
                )}
                <div className="flex flex-wrap gap-3 text-xs text-muted-foreground">
                  {venue && <span>📍 {venue}</span>}
                  {startDate && <span>📅 {startDate}</span>}
                  {eventMode && <span>🔗 {eventMode}</span>}
                </div>
                <Separator />
                <div className="text-sm leading-relaxed whitespace-pre-wrap">
                  {editorContent || (
                    <span className="text-muted-foreground italic">
                      Start writing to see preview...
                    </span>
                  )}
                </div>
              </div>
            ) : (
              <div className="space-y-3 flex-1">
                <h2 className="text-sm font-semibold">Official Approval Letter</h2>
                <Separator />
                <div className="text-sm leading-relaxed whitespace-pre-wrap font-mono">
                  {approvalLetterContent || (
                    <span className="text-muted-foreground italic">
                      Generate an approval letter from the AI panel →
                    </span>
                  )}
                </div>
              </div>
            )}
          </div>

          {/* CENTER – Editor + Documents */}
          <div className="col-span-5 flex flex-col gap-4">
            {/* Editor */}
            <div className="border border-border rounded-lg bg-card flex flex-col flex-1">
              <div className="flex items-center justify-between px-5 py-3 border-b border-border">
                <span className="section-label">Document Editor</span>
                <div className="flex items-center gap-2">
                  <Label htmlFor="autosave-toggle" className="text-xs text-muted-foreground cursor-pointer">Auto Save</Label>
                  <Switch checked={autoSave} onCheckedChange={setAutoSave} id="autosave-toggle" />
                </div>
              </div>
              <Textarea
                value={editorContent}
                onChange={(e) => setEditorContent(e.target.value)}
                placeholder="Start writing your event description, notice, or invitation here..."
                className="flex-1 border-0 rounded-none bg-transparent resize-none p-5 text-sm leading-relaxed focus-visible:ring-0"
              />
            </div>

            {/* Documents Repository */}
            <Collapsible open={showVersions} onOpenChange={setShowVersions}>
              <div className="border border-border rounded-lg bg-card">
                <CollapsibleTrigger className="flex items-center justify-between w-full px-5 py-3 text-left">
                  <span className="section-label">Documents Repository</span>
                  {showVersions ? <ChevronUp className="h-4 w-4 text-muted-foreground" /> : <ChevronDown className="h-4 w-4 text-muted-foreground" />}
                </CollapsibleTrigger>
                <CollapsibleContent>
                  <Separator />
                  <div className="p-4 space-y-2 max-h-[200px] overflow-auto">
                    {versions.length === 0 ? (
                      <p className="text-xs text-muted-foreground italic">No saved versions yet. Click "Save Draft" to create one.</p>
                    ) : (
                      versions.map((v) => (
                        <div key={v.id} className="flex items-center justify-between p-2 rounded-md border border-border hover:bg-accent/30 transition-colors">
                          <div>
                            <p className="text-sm font-medium">{v.label}</p>
                            <p className="text-[10px] text-muted-foreground">{v.timestamp}</p>
                          </div>
                          <Button variant="ghost" size="sm" onClick={() => restoreVersion(v)}>
                            <RotateCcw className="h-3 w-3 mr-1" />
                            Restore
                          </Button>
                        </div>
                      ))
                    )}
                  </div>
                </CollapsibleContent>
              </div>
            </Collapsible>
          </div>

          {/* RIGHT – AI Panel */}
          <div className="col-span-4 border border-border rounded-lg bg-card flex flex-col">
            <Collapsible open={aiOpen} onOpenChange={setAiOpen} className="flex flex-col flex-1">
              <CollapsibleTrigger className="flex items-center justify-between px-5 py-3 border-b border-border">
                <div className="flex items-center gap-2">
                  <Sparkles className="h-4 w-4 text-primary" />
                  <span className="section-label">AI Assistant</span>
                </div>
                {aiOpen ? <ChevronUp className="h-4 w-4 text-muted-foreground" /> : <ChevronDown className="h-4 w-4 text-muted-foreground" />}
              </CollapsibleTrigger>
              <CollapsibleContent className="flex-1 flex flex-col">
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
                      className="bg-accent/30 min-h-[70px] text-sm"
                    />
                    <div className="flex gap-2">
                      <Button
                        onClick={handleGenerate}
                        disabled={aiLoading || !aiPrompt}
                        className="flex-1"
                      >
                        {aiLoading ? (
                          <span className="flex items-center gap-2">
                            <span className="h-3 w-3 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" />
                            Generating...
                          </span>
                        ) : (
                          <span className="flex items-center gap-2">
                            <Sparkles className="h-4 w-4" />
                            Generate
                          </span>
                        )}
                      </Button>


                    </div>
                  </div>
                </div>
              </CollapsibleContent>
            </Collapsible>

            {/* Smart Validation Panel */}
            {showValidation && (
              <div className="border-t border-border p-4 space-y-2">
                <div className="flex items-center gap-2 mb-2">
                  <AlertTriangle className="h-4 w-4 text-warning" />
                  <span className="section-label">Validation</span>
                </div>
                {validationResults.map((v) => (
                  <div key={v.key} className="flex items-center gap-2 text-xs">
                    {v.pass ? (
                      <CheckCircle2 className="h-3 w-3 text-success" />
                    ) : (
                      <AlertTriangle className="h-3 w-3 text-destructive" />
                    )}
                    <span className={v.pass ? "text-muted-foreground" : "text-destructive"}>{v.label}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* ── Footer ── */}
        <div className="flex items-center justify-between pt-2">
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" onClick={() => setShowValidation(!showValidation)}>
              <FileCheck className="h-4 w-4 mr-2" />
              Validate
            </Button>
          </div>
          <div className="flex items-center gap-3">
            <Button variant="outline" onClick={() => saveVersion("Draft")}>Save as Draft</Button>
            <Button onClick={handleSubmit}>
              <Send className="h-4 w-4 mr-1" />
              Submit Event
            </Button>
          </div>
        </div>

        {/* ── Submit Options Modal ── */}
        {showSubmitOptions && (
          <div className="border border-border rounded-lg bg-card p-6 space-y-4 animate-fade-in">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-semibold">Event Submitted — Share & Notify</h3>
              <Badge className="bg-success/15 text-success border-success/20">Pending Approval</Badge>
            </div>
            <Separator />
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-3">
                <p className="section-label">Notify</p>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm">
                    <Mail className="h-4 w-4 mr-2" />
                    Send via Email
                  </Button>
                  <Button variant="outline" size="sm">
                    <MessageSquare className="h-4 w-4 mr-2" />
                    Send via WhatsApp
                  </Button>
                </div>
              </div>
              <div className="space-y-3">
                <p className="section-label">Share Document</p>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm">
                    <Share2 className="h-4 w-4 mr-2" />
                    Email
                  </Button>
                  <Button variant="outline" size="sm">
                    <MessageSquare className="h-4 w-4 mr-2" />
                    WhatsApp
                  </Button>
                  <Button variant="outline" size="sm">
                    <Download className="h-4 w-4 mr-2" />
                    PDF
                  </Button>
                </div>
              </div>
            </div>
            <Button variant="ghost" size="sm" onClick={() => setShowSubmitOptions(false)} className="text-muted-foreground">
              Dismiss
            </Button>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}
