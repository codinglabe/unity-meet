"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Video,
  Play,
  Download,
  Trash2,
  Share2,
  Search,
  Clock,
  Users,
  Calendar,
  Grid,
  List,
} from "lucide-react";
import { cn } from "@/lib/utils";

const recordings = [
  {
    id: 1,
    title: "Project Reporting - Week 1",
    date: "May 10, 2026",
    duration: "45:32",
    participants: 6,
    size: "245 MB",
    thumbnail:
      "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400",
  },
  {
    id: 2,
    title: "Design Review Session",
    date: "May 8, 2026",
    duration: "1:02:15",
    participants: 8,
    size: "380 MB",
    thumbnail:
      "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400",
  },
  {
    id: 3,
    title: "Sprint Planning",
    date: "May 6, 2026",
    duration: "1:30:45",
    participants: 12,
    size: "520 MB",
    thumbnail:
      "https://images.unsplash.com/photo-1552664730-d307ca884978?w=400",
  },
  {
    id: 4,
    title: "Client Presentation",
    date: "May 5, 2026",
    duration: "38:20",
    participants: 5,
    size: "198 MB",
    thumbnail:
      "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=400",
  },
  {
    id: 5,
    title: "Weekly Team Standup",
    date: "May 3, 2026",
    duration: "28:15",
    participants: 8,
    size: "142 MB",
    thumbnail:
      "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=400",
  },
  {
    id: 6,
    title: "Product Demo",
    date: "May 1, 2026",
    duration: "52:40",
    participants: 15,
    size: "310 MB",
    thumbnail:
      "https://images.unsplash.com/photo-1531482615713-2afd69097998?w=400",
  },
];

function RecordingCard({
  recording,
  index,
  viewMode,
}: {
  recording: (typeof recordings)[0];
  index: number;
  viewMode: "grid" | "list";
}) {
  const [showActions, setShowActions] = useState(false);

  if (viewMode === "list") {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: index * 0.05 }}
        className="flex items-center gap-4 p-4 bg-card border border-border rounded-2xl hover:shadow-md transition-shadow group"
        onMouseEnter={() => setShowActions(true)}
        onMouseLeave={() => setShowActions(false)}
      >
        <div className="relative w-32 h-20 rounded-xl overflow-hidden shrink-0 bg-muted">
          <img
            src={recording.thumbnail}
            alt={recording.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-foreground/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
            <div className="w-10 h-10 rounded-full bg-card/90 flex items-center justify-center">
              <Play className="w-5 h-5 text-foreground" />
            </div>
          </div>
        </div>

        <div className="flex-1 min-w-0">
          <h3 className="font-medium truncate">{recording.title}</h3>
          <div className="flex items-center gap-4 mt-1 text-sm text-muted-foreground">
            <span className="flex items-center gap-1">
              <Calendar className="w-3.5 h-3.5" />
              {recording.date}
            </span>
            <span className="flex items-center gap-1">
              <Clock className="w-3.5 h-3.5" />
              {recording.duration}
            </span>
            <span className="flex items-center gap-1">
              <Users className="w-3.5 h-3.5" />
              {recording.participants}
            </span>
          </div>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <span className="text-sm text-muted-foreground">{recording.size}</span>
          <AnimatePresence>
            {showActions && (
              <motion.div
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 10 }}
                className="flex items-center gap-1"
              >
                <button className="p-2 hover:bg-muted rounded-lg transition-colors">
                  <Share2 className="w-4 h-4 text-muted-foreground" />
                </button>
                <button className="p-2 hover:bg-muted rounded-lg transition-colors">
                  <Download className="w-4 h-4 text-muted-foreground" />
                </button>
                <button className="p-2 hover:bg-destructive/10 rounded-lg transition-colors">
                  <Trash2 className="w-4 h-4 text-destructive" />
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: index * 0.05 }}
      className="bg-card border border-border rounded-2xl overflow-hidden hover:shadow-md transition-shadow group"
      onMouseEnter={() => setShowActions(true)}
      onMouseLeave={() => setShowActions(false)}
    >
      <div className="relative aspect-video bg-muted">
        <img
          src={recording.thumbnail}
          alt={recording.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-foreground/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
          <div className="w-14 h-14 rounded-full bg-card/90 flex items-center justify-center">
            <Play className="w-7 h-7 text-foreground" />
          </div>
        </div>
        <div className="absolute bottom-2 right-2 px-2 py-1 bg-foreground/80 rounded text-xs text-background">
          {recording.duration}
        </div>
      </div>

      <div className="p-4">
        <h3 className="font-medium truncate mb-2">{recording.title}</h3>
        <div className="flex items-center justify-between text-sm text-muted-foreground">
          <span>{recording.date}</span>
          <span className="flex items-center gap-1">
            <Users className="w-3.5 h-3.5" />
            {recording.participants}
          </span>
        </div>

        <AnimatePresence>
          {showActions && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              className="flex items-center justify-between mt-4 pt-4 border-t border-border"
            >
              <span className="text-xs text-muted-foreground">
                {recording.size}
              </span>
              <div className="flex items-center gap-1">
                <button className="p-2 hover:bg-muted rounded-lg transition-colors">
                  <Share2 className="w-4 h-4 text-muted-foreground" />
                </button>
                <button className="p-2 hover:bg-muted rounded-lg transition-colors">
                  <Download className="w-4 h-4 text-muted-foreground" />
                </button>
                <button className="p-2 hover:bg-destructive/10 rounded-lg transition-colors">
                  <Trash2 className="w-4 h-4 text-destructive" />
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}

export default function RecordingsPage() {
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredRecordings = recordings.filter((r) =>
    r.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <>
      <header className="h-16 border-b border-border bg-card/50 backdrop-blur-sm flex items-center justify-between px-4 lg:px-6 sticky top-0 z-30">
        <div className="flex items-center gap-4">
          <div className="lg:hidden w-10" />
          <h1 className="text-lg font-semibold">Recordings</h1>
        </div>

        <div className="flex items-center gap-3">
          <div className="hidden sm:flex items-center gap-2 px-4 py-2 bg-muted rounded-xl">
            <Search className="w-4 h-4 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search recordings..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="bg-transparent border-none outline-none text-sm w-40 lg:w-56"
            />
          </div>

          <div className="flex items-center gap-1 bg-muted rounded-lg p-1">
            <button
              onClick={() => setViewMode("grid")}
              className={cn(
                "p-2 rounded-md transition-colors",
                viewMode === "grid" ? "bg-card shadow-sm" : "hover:bg-card/50"
              )}
            >
              <Grid className="w-4 h-4" />
            </button>
            <button
              onClick={() => setViewMode("list")}
              className={cn(
                "p-2 rounded-md transition-colors",
                viewMode === "list" ? "bg-card shadow-sm" : "hover:bg-card/50"
              )}
            >
              <List className="w-4 h-4" />
            </button>
          </div>
        </div>
      </header>

      <main className="flex-1 p-4 lg:p-6 overflow-y-auto">
        <div className="max-w-6xl mx-auto">
          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6"
          >
            <div className="bg-card border border-border rounded-2xl p-4">
              <p className="text-sm text-muted-foreground">Total Recordings</p>
              <p className="text-2xl font-bold mt-1">{recordings.length}</p>
            </div>
            <div className="bg-card border border-border rounded-2xl p-4">
              <p className="text-sm text-muted-foreground">Total Duration</p>
              <p className="text-2xl font-bold mt-1">5h 38m</p>
            </div>
            <div className="bg-card border border-border rounded-2xl p-4">
              <p className="text-sm text-muted-foreground">Storage Used</p>
              <p className="text-2xl font-bold mt-1">1.8 GB</p>
            </div>
            <div className="bg-card border border-border rounded-2xl p-4">
              <p className="text-sm text-muted-foreground">This Month</p>
              <p className="text-2xl font-bold mt-1">4</p>
            </div>
          </motion.div>

          {/* Recordings Grid/List */}
          {filteredRecordings.length === 0 ? (
            <div className="text-center py-16">
              <div className="w-16 h-16 rounded-2xl bg-muted flex items-center justify-center mx-auto mb-4">
                <Video className="w-8 h-8 text-muted-foreground" />
              </div>
              <h3 className="font-medium mb-1">No recordings found</h3>
              <p className="text-sm text-muted-foreground">
                {searchQuery
                  ? "Try a different search term"
                  : "Your meeting recordings will appear here"}
              </p>
            </div>
          ) : (
            <div
              className={cn(
                viewMode === "grid"
                  ? "grid sm:grid-cols-2 lg:grid-cols-3 gap-4"
                  : "space-y-3"
              )}
            >
              {filteredRecordings.map((recording, index) => (
                <RecordingCard
                  key={recording.id}
                  recording={recording}
                  index={index}
                  viewMode={viewMode}
                />
              ))}
            </div>
          )}
        </div>
      </main>
    </>
  );
}
