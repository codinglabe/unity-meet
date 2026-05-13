"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  User,
  Bell,
  Shield,
  Palette,
  Globe,
  Mic,
  Camera,
  Monitor,
  ChevronRight,
  Moon,
  Sun,
  Volume2,
  Check,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

const settingsSections = [
  { id: "profile", label: "Profile", icon: User },
  { id: "notifications", label: "Notifications", icon: Bell },
  { id: "audio-video", label: "Audio & Video", icon: Camera },
  { id: "appearance", label: "Appearance", icon: Palette },
  { id: "privacy", label: "Privacy & Security", icon: Shield },
  { id: "language", label: "Language & Region", icon: Globe },
];

function Toggle({
  enabled,
  onToggle,
}: {
  enabled: boolean;
  onToggle: () => void;
}) {
  return (
    <button
      onClick={onToggle}
      className={cn(
        "w-11 h-6 rounded-full transition-colors relative",
        enabled ? "bg-accent" : "bg-muted"
      )}
    >
      <motion.div
        animate={{ x: enabled ? 20 : 2 }}
        transition={{ type: "spring", stiffness: 500, damping: 30 }}
        className="w-5 h-5 rounded-full bg-card shadow-sm absolute top-0.5"
      />
    </button>
  );
}

function ProfileSettings() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6"
    >
      <div>
        <h2 className="text-lg font-semibold mb-4">Profile Settings</h2>
        <p className="text-sm text-muted-foreground">
          Manage your account information and preferences
        </p>
      </div>

      <div className="bg-card border border-border rounded-2xl p-6">
        <div className="flex items-center gap-6 mb-6">
          <Avatar className="w-20 h-20">
            <AvatarImage src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200" />
            <AvatarFallback className="text-2xl">GS</AvatarFallback>
          </Avatar>
          <div>
            <h3 className="font-medium mb-2">Profile Photo</h3>
            <div className="flex gap-2">
              <Button size="sm" variant="outline">
                Change Photo
              </Button>
              <Button size="sm" variant="ghost" className="text-destructive">
                Remove
              </Button>
            </div>
          </div>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label className="text-sm font-medium mb-2 block">First Name</label>
            <Input defaultValue="George" />
          </div>
          <div>
            <label className="text-sm font-medium mb-2 block">Last Name</label>
            <Input defaultValue="Smith" />
          </div>
          <div className="sm:col-span-2">
            <label className="text-sm font-medium mb-2 block">Email</label>
            <Input defaultValue="george@meetflow.com" type="email" />
          </div>
          <div className="sm:col-span-2">
            <label className="text-sm font-medium mb-2 block">Job Title</label>
            <Input defaultValue="Product Manager" />
          </div>
        </div>

        <div className="mt-6 flex justify-end">
          <Button>Save Changes</Button>
        </div>
      </div>
    </motion.div>
  );
}

function NotificationSettings() {
  const [settings, setSettings] = useState({
    meetingReminders: true,
    newMessages: true,
    joinRequests: true,
    weeklyDigest: false,
    soundEnabled: true,
  });

  const toggleSetting = (key: keyof typeof settings) => {
    setSettings((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const notifications = [
    {
      key: "meetingReminders" as const,
      title: "Meeting Reminders",
      description: "Get notified 5 minutes before meetings start",
    },
    {
      key: "newMessages" as const,
      title: "New Messages",
      description: "Receive notifications for chat messages",
    },
    {
      key: "joinRequests" as const,
      title: "Join Requests",
      description: "Get notified when someone wants to join your meeting",
    },
    {
      key: "weeklyDigest" as const,
      title: "Weekly Digest",
      description: "Receive a weekly summary of your meetings",
    },
    {
      key: "soundEnabled" as const,
      title: "Sound Notifications",
      description: "Play sounds for notifications",
    },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6"
    >
      <div>
        <h2 className="text-lg font-semibold mb-4">Notification Settings</h2>
        <p className="text-sm text-muted-foreground">
          Control how and when you receive notifications
        </p>
      </div>

      <div className="bg-card border border-border rounded-2xl divide-y divide-border">
        {notifications.map((item) => (
          <div key={item.key} className="flex items-center justify-between p-4">
            <div>
              <h3 className="font-medium">{item.title}</h3>
              <p className="text-sm text-muted-foreground">
                {item.description}
              </p>
            </div>
            <Toggle
              enabled={settings[item.key]}
              onToggle={() => toggleSetting(item.key)}
            />
          </div>
        ))}
      </div>
    </motion.div>
  );
}

function AudioVideoSettings() {
  const [selectedMic, setSelectedMic] = useState("default");
  const [selectedCamera, setSelectedCamera] = useState("default");
  const [selectedSpeaker, setSelectedSpeaker] = useState("default");

  const devices = {
    microphones: [
      { id: "default", name: "Default Microphone" },
      { id: "builtin", name: "Built-in Microphone" },
      { id: "headset", name: "Headset Microphone" },
    ],
    cameras: [
      { id: "default", name: "Default Camera" },
      { id: "builtin", name: "Built-in Camera" },
      { id: "external", name: "External Webcam" },
    ],
    speakers: [
      { id: "default", name: "Default Speakers" },
      { id: "builtin", name: "Built-in Speakers" },
      { id: "headphones", name: "Headphones" },
    ],
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6"
    >
      <div>
        <h2 className="text-lg font-semibold mb-4">Audio & Video Settings</h2>
        <p className="text-sm text-muted-foreground">
          Configure your audio and video devices
        </p>
      </div>

      <div className="bg-card border border-border rounded-2xl p-6 space-y-6">
        <div>
          <div className="flex items-center gap-2 mb-3">
            <Mic className="w-5 h-5 text-muted-foreground" />
            <h3 className="font-medium">Microphone</h3>
          </div>
          <div className="space-y-2">
            {devices.microphones.map((mic) => (
              <button
                key={mic.id}
                onClick={() => setSelectedMic(mic.id)}
                className={cn(
                  "w-full flex items-center justify-between p-3 rounded-xl transition-colors",
                  selectedMic === mic.id
                    ? "bg-accent/10 border border-accent"
                    : "bg-muted hover:bg-muted/80"
                )}
              >
                <span className="text-sm">{mic.name}</span>
                {selectedMic === mic.id && (
                  <Check className="w-4 h-4 text-accent" />
                )}
              </button>
            ))}
          </div>
        </div>

        <div>
          <div className="flex items-center gap-2 mb-3">
            <Camera className="w-5 h-5 text-muted-foreground" />
            <h3 className="font-medium">Camera</h3>
          </div>
          <div className="space-y-2">
            {devices.cameras.map((camera) => (
              <button
                key={camera.id}
                onClick={() => setSelectedCamera(camera.id)}
                className={cn(
                  "w-full flex items-center justify-between p-3 rounded-xl transition-colors",
                  selectedCamera === camera.id
                    ? "bg-accent/10 border border-accent"
                    : "bg-muted hover:bg-muted/80"
                )}
              >
                <span className="text-sm">{camera.name}</span>
                {selectedCamera === camera.id && (
                  <Check className="w-4 h-4 text-accent" />
                )}
              </button>
            ))}
          </div>
        </div>

        <div>
          <div className="flex items-center gap-2 mb-3">
            <Volume2 className="w-5 h-5 text-muted-foreground" />
            <h3 className="font-medium">Speaker</h3>
          </div>
          <div className="space-y-2">
            {devices.speakers.map((speaker) => (
              <button
                key={speaker.id}
                onClick={() => setSelectedSpeaker(speaker.id)}
                className={cn(
                  "w-full flex items-center justify-between p-3 rounded-xl transition-colors",
                  selectedSpeaker === speaker.id
                    ? "bg-accent/10 border border-accent"
                    : "bg-muted hover:bg-muted/80"
                )}
              >
                <span className="text-sm">{speaker.name}</span>
                {selectedSpeaker === speaker.id && (
                  <Check className="w-4 h-4 text-accent" />
                )}
              </button>
            ))}
          </div>
        </div>

        <div className="pt-4">
          <Button className="w-full">Test Audio & Video</Button>
        </div>
      </div>
    </motion.div>
  );
}

function AppearanceSettings() {
  const [theme, setTheme] = useState<"light" | "dark" | "system">("light");

  const themes = [
    { id: "light" as const, label: "Light", icon: Sun },
    { id: "dark" as const, label: "Dark", icon: Moon },
    { id: "system" as const, label: "System", icon: Monitor },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6"
    >
      <div>
        <h2 className="text-lg font-semibold mb-4">Appearance</h2>
        <p className="text-sm text-muted-foreground">
          Customize the look and feel of MeetFlow
        </p>
      </div>

      <div className="bg-card border border-border rounded-2xl p-6">
        <h3 className="font-medium mb-4">Theme</h3>
        <div className="grid grid-cols-3 gap-3">
          {themes.map((t) => (
            <button
              key={t.id}
              onClick={() => setTheme(t.id)}
              className={cn(
                "flex flex-col items-center gap-2 p-4 rounded-xl transition-colors",
                theme === t.id
                  ? "bg-accent/10 border border-accent"
                  : "bg-muted hover:bg-muted/80 border border-transparent"
              )}
            >
              <t.icon className="w-6 h-6" />
              <span className="text-sm font-medium">{t.label}</span>
            </button>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

export default function SettingsPage() {
  const [activeSection, setActiveSection] = useState("profile");

  const renderContent = () => {
    switch (activeSection) {
      case "profile":
        return <ProfileSettings />;
      case "notifications":
        return <NotificationSettings />;
      case "audio-video":
        return <AudioVideoSettings />;
      case "appearance":
        return <AppearanceSettings />;
      default:
        return <ProfileSettings />;
    }
  };

  return (
    <>
      <header className="h-16 border-b border-border bg-card/50 backdrop-blur-sm flex items-center px-4 lg:px-6 sticky top-0 z-30">
        <div className="lg:hidden w-10" />
        <h1 className="text-lg font-semibold">Settings</h1>
      </header>

      <main className="flex-1 p-4 lg:p-6 overflow-y-auto">
        <div className="max-w-4xl mx-auto">
          <div className="grid lg:grid-cols-[240px_1fr] gap-6">
            {/* Settings Navigation */}
            <div className="bg-card border border-border rounded-2xl p-2 h-fit">
              {settingsSections.map((section) => (
                <button
                  key={section.id}
                  onClick={() => setActiveSection(section.id)}
                  className={cn(
                    "w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-colors text-left",
                    activeSection === section.id
                      ? "bg-accent/10 text-foreground"
                      : "text-muted-foreground hover:bg-muted hover:text-foreground"
                  )}
                >
                  <section.icon className="w-5 h-5" />
                  <span className="font-medium text-sm">{section.label}</span>
                  {activeSection === section.id && (
                    <ChevronRight className="w-4 h-4 ml-auto" />
                  )}
                </button>
              ))}
            </div>

            {/* Settings Content */}
            <AnimatePresence mode="wait">
              <div key={activeSection}>{renderContent()}</div>
            </AnimatePresence>
          </div>
        </div>
      </main>
    </>
  );
}
