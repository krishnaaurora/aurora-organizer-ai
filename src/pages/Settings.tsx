import { DashboardLayout } from "@/components/DashboardLayout";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";

export default function SettingsPage() {
  return (
    <DashboardLayout>
      <div className="space-y-8 animate-fade-in max-w-2xl">
        <div>
          <h1 className="page-header">Settings</h1>
          <p className="text-sm text-muted-foreground mt-1">Manage your account and preferences.</p>
        </div>

        {/* Profile */}
        <section className="space-y-4">
          <h2 className="text-sm font-medium">Organizer Profile</h2>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label className="text-xs text-muted-foreground">Full Name</Label>
              <Input defaultValue="Dr. Kavitha Ramesh" className="bg-card" />
            </div>
            <div className="space-y-2">
              <Label className="text-xs text-muted-foreground">Email</Label>
              <Input defaultValue="kavitha@univ.edu" className="bg-card" />
            </div>
            <div className="space-y-2">
              <Label className="text-xs text-muted-foreground">Department</Label>
              <Input defaultValue="Computer Science & Engineering" className="bg-card" />
            </div>
            <div className="space-y-2">
              <Label className="text-xs text-muted-foreground">Designation</Label>
              <Input defaultValue="Associate Professor" className="bg-card" />
            </div>
          </div>
        </section>

        <Separator />

        {/* Password */}
        <section className="space-y-4">
          <h2 className="text-sm font-medium">Change Password</h2>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label className="text-xs text-muted-foreground">Current Password</Label>
              <Input type="password" className="bg-card" />
            </div>
            <div className="space-y-2">
              <Label className="text-xs text-muted-foreground">New Password</Label>
              <Input type="password" className="bg-card" />
            </div>
          </div>
        </section>

        <Separator />

        {/* Notification Preferences */}
        <section className="space-y-4">
          <h2 className="text-sm font-medium">Notification Preferences</h2>
          <div className="space-y-4">
            {[
              { label: "Email notifications for new registrations", defaultChecked: true },
              { label: "Email notifications for approval updates", defaultChecked: true },
              { label: "Push notifications for event reminders", defaultChecked: false },
              { label: "Weekly analytics summary", defaultChecked: true },
            ].map((pref) => (
              <div key={pref.label} className="flex items-center justify-between">
                <span className="text-sm">{pref.label}</span>
                <Switch defaultChecked={pref.defaultChecked} />
              </div>
            ))}
          </div>
        </section>

        <div className="pt-4">
          <Button>Save Changes</Button>
        </div>
      </div>
    </DashboardLayout>
  );
}
