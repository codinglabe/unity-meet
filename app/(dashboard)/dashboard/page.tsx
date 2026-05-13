"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import {
  Video,
  Plus,
  Calendar,
  Clock,
  Users,
  Bell,
  Search,
  ChevronRight,
  Play,
  MoreHorizontal,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

const upcomingMeetings = [
  {
    id: 1,
    title: "Weekly Team Standup",
    time: "10:00 AM",
    duration: "30 min",
    participants: 8,
    date: "Today",
    avatars: [
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=50",
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=50",
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=50",
    ],
  },
  {
    id: 2,
    title: "Product Review",
    time: "2:00 PM",
    duration: "1 hour",
    participants: 5,
    date: "Today",
    avatars: [
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=50",
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=50",
    ],
  },
  {
    id: 3,
    title: "Client Presentation",
    time: "11:00 AM",
    duration: "45 min",
    participants: 12,
    date: "Tomorrow",
    avatars: [
      "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=50",
      "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=50",
      "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=50",
    ],
  },
];

const recentMeetings = [
  {
    id: 1,
    title: "Project Reporting - Week 1",
    date: "Yesterday",
    duration: "45 min",
    recording: true,
  },
  {
    id: 2,
    title: "Design Review Session",
    date: "2 days ago",
    duration: "1 hour",
    recording: true,
  },
  {
    id: 3,
    title: "Sprint Planning",
    date: "3 days ago",
    duration: "1.5 hours",
    recording: false,
  },
];

function QuickActions() {
  const [meetingCode, setMeetingCode] = useState("");

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="grid grid-cols-1 sm:grid-cols-2 gap-4"
    >
      <Link href="/meeting" className="h-full">
        <div className="h-full p-6 gradient-primary text-white rounded-2xl hover:opacity-95 transition-all duration-300 cursor-pointer group flex flex-col shadow-lg shadow-primary/20 hover:shadow-primary/30 hover:scale-[1.02]">
          <div className="w-12 h-12 rounded-xl bg-white/20 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
            <Video className="w-6 h-6" />
          </div>
          <h3 className="text-lg font-semibold mb-1">New Meeting</h3>
          <p className="text-sm text-white/80 mb-3">
            Start an instant meeting
          </p>
          <div className="mt-auto pt-3">
            <span className="inline-flex items-center gap-1 text-sm font-medium text-white/90 group-hover:text-white transition-colors">
              Start now
              <ChevronRight className="w-4 h-4" />
            </span>
          </div>
        </div>
      </Link>

      <div className="h-full p-6 bg-card border border-border rounded-2xl flex flex-col hover:border-primary/30 transition-all duration-300 hover:shadow-lg hover:shadow-primary/5">
        <div className="w-12 h-12 rounded-xl gradient-primary flex items-center justify-center mb-4 shadow-md shadow-primary/20">
          <Plus className="w-6 h-6 text-white" />
        </div>
        <h3 className="text-lg font-semibold mb-1">Join Meeting</h3>
        <p className="text-sm text-muted-foreground mb-3">
          Enter a code to join
        </p>
        <div className="flex gap-2 mt-auto">
          <Input
            placeholder="Enter meeting code"
            value={meetingCode}
            onChange={(e) => setMeetingCode(e.target.value)}
            className="flex-1"
          />
          <Button size="icon" className="gradient-primary text-white border-0 hover:opacity-90">
            <ChevronRight className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </motion.div>
  );
}

function UpcomingMeetings() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.1 }}
      className="bg-card border border-border rounded-2xl p-6"
    >
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg font-semibold">Upcoming Meetings</h2>
        <Link href="/schedule">
          <Button variant="ghost" size="sm" className="gap-1">
            View All
            <ChevronRight className="w-4 h-4" />
          </Button>
        </Link>
      </div>

      <div className="space-y-4">
        {upcomingMeetings.map((meeting, index) => (
          <motion.div
            key={meeting.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
            className="flex items-center gap-4 p-4 rounded-xl bg-muted/50 hover:bg-muted transition-colors group"
          >
            <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center shrink-0">
              <Calendar className="w-5 h-5 text-accent" />
            </div>

            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-1">
                <h3 className="font-medium truncate">{meeting.title}</h3>
                <span className="text-xs px-2 py-0.5 rounded-full bg-accent/10 text-accent shrink-0">
                  {meeting.date}
                </span>
              </div>
              <div className="flex items-center gap-3 text-sm text-muted-foreground">
                <span className="flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5" />
                  {meeting.time}
                </span>
                <span>{meeting.duration}</span>
              </div>
            </div>

            <div className="flex items-center gap-3 shrink-0">
              <div className="flex -space-x-2">
                {meeting.avatars.slice(0, 3).map((avatar, i) => (
                  <Avatar key={i} className="w-8 h-8 border-2 border-card">
                    <AvatarImage src={avatar} />
                    <AvatarFallback>U</AvatarFallback>
                  </Avatar>
                ))}
                {meeting.participants > 3 && (
                  <div className="w-8 h-8 rounded-full bg-muted border-2 border-card flex items-center justify-center text-xs font-medium">
                    +{meeting.participants - 3}
                  </div>
                )}
              </div>

              <Link href="/meeting">
                <Button
                  size="sm"
                  className="opacity-0 group-hover:opacity-100 transition-opacity gap-1"
                >
                  <Play className="w-3 h-3" />
                  Join
                </Button>
              </Link>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}

function RecentMeetings() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
      className="bg-card border border-border rounded-2xl p-6"
    >
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg font-semibold">Recent Meetings</h2>
        <Link href="/recordings">
          <Button variant="ghost" size="sm" className="gap-1">
            View All
            <ChevronRight className="w-4 h-4" />
          </Button>
        </Link>
      </div>

      <div className="space-y-3">
        {recentMeetings.map((meeting, index) => (
          <motion.div
            key={meeting.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 + index * 0.1 }}
            className="flex items-center gap-4 p-3 rounded-xl hover:bg-muted/50 transition-colors"
          >
            <div
              className={cn(
                "w-10 h-10 rounded-lg flex items-center justify-center shrink-0",
                meeting.recording ? "bg-accent/10" : "bg-muted"
              )}
            >
              {meeting.recording ? (
                <Play className="w-4 h-4 text-accent" />
              ) : (
                <Video className="w-4 h-4 text-muted-foreground" />
              )}
            </div>

            <div className="flex-1 min-w-0">
              <h3 className="text-sm font-medium truncate">{meeting.title}</h3>
              <p className="text-xs text-muted-foreground">
                {meeting.date} &bull; {meeting.duration}
              </p>
            </div>

            <button className="p-2 hover:bg-muted rounded-lg transition-colors">
              <MoreHorizontal className="w-4 h-4 text-muted-foreground" />
            </button>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}

function StatsCards() {
  const stats = [
    {
      label: "Meetings This Week",
      value: "12",
      change: "+3 from last week",
      icon: Video,
    },
    {
      label: "Total Meeting Time",
      value: "8.5h",
      change: "Average 42 min/meeting",
      icon: Clock,
    },
    {
      label: "Team Members",
      value: "24",
      change: "Across 3 teams",
      icon: Users,
    },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3 }}
      className="grid grid-cols-1 sm:grid-cols-3 gap-4"
    >
      {stats.map((stat, index) => (
        <motion.div
          key={stat.label}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 + index * 0.1 }}
          className="p-5 bg-card border border-border rounded-2xl"
        >
          <div className="flex items-center justify-between mb-3">
            <span className="text-sm text-muted-foreground">{stat.label}</span>
            <div className="w-8 h-8 rounded-lg bg-accent/10 flex items-center justify-center">
              <stat.icon className="w-4 h-4 text-accent" />
            </div>
          </div>
          <p className="text-2xl font-bold">{stat.value}</p>
          <p className="text-xs text-muted-foreground mt-1">{stat.change}</p>
        </motion.div>
      ))}
    </motion.div>
  );
}

export default function DashboardPage() {
  return (
    <>
      {/* Header */}
      <header className="h-16 border-b border-border bg-card/50 backdrop-blur-sm flex items-center justify-between px-4 lg:px-6 sticky top-0 z-30">
        <div className="flex items-center gap-4">
          <div className="lg:hidden w-10" /> {/* Spacer for mobile menu button */}
          <div className="hidden sm:flex items-center gap-2 px-4 py-2 bg-muted rounded-xl">
            <Search className="w-4 h-4 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search meetings, recordings..."
              className="bg-transparent border-none outline-none text-sm w-48 lg:w-64"
            />
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button className="p-2 hover:bg-muted rounded-lg transition-colors relative">
            <Bell className="w-5 h-5" />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-destructive rounded-full" />
          </button>
          <Avatar className="w-9 h-9 lg:hidden">
            <AvatarImage src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100" />
            <AvatarFallback>GS</AvatarFallback>
          </Avatar>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 p-4 lg:p-6 overflow-y-auto">
        <div className="max-w-6xl mx-auto space-y-6">
          {/* Welcome Section */}
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-2"
          >
            <h1 className="text-2xl lg:text-3xl font-bold">
              Good morning, George!
            </h1>
            <p className="text-muted-foreground mt-1">
              You have 3 meetings scheduled for today.
            </p>
          </motion.div>

          <QuickActions />
          <StatsCards />

          <div className="grid lg:grid-cols-2 gap-6">
            <UpcomingMeetings />
            <RecentMeetings />
          </div>
        </div>
      </main>
    </>
  );
}
