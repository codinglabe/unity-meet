"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import {
  Plus,
  Calendar,
  Clock,
  Users,
  ChevronLeft,
  ChevronRight,
  MoreHorizontal,
  Play,
  MapPin,
  Repeat,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

const scheduledMeetings = [
  {
    id: 1,
    title: "Weekly Team Standup",
    time: "10:00 AM - 10:30 AM",
    date: 15,
    participants: 8,
    recurring: true,
    location: "Meeting Room A",
    color: "bg-accent",
  },
  {
    id: 2,
    title: "Product Review",
    time: "2:00 PM - 3:00 PM",
    date: 15,
    participants: 5,
    recurring: false,
    location: "Virtual",
    color: "bg-primary",
  },
  {
    id: 3,
    title: "Client Call",
    time: "11:00 AM - 11:45 AM",
    date: 16,
    participants: 4,
    recurring: false,
    location: "Virtual",
    color: "bg-destructive",
  },
  {
    id: 4,
    title: "Design Workshop",
    time: "3:00 PM - 5:00 PM",
    date: 18,
    participants: 12,
    recurring: false,
    location: "Conference Room",
    color: "bg-accent",
  },
  {
    id: 5,
    title: "Sprint Planning",
    time: "9:00 AM - 10:30 AM",
    date: 19,
    participants: 6,
    recurring: true,
    location: "Virtual",
    color: "bg-primary",
  },
];

function CalendarView({
  currentDate,
  selectedDate,
  onSelectDate,
}: {
  currentDate: Date;
  selectedDate: number;
  onSelectDate: (date: number) => void;
}) {
  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();
  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const today = new Date().getDate();
  const isCurrentMonth =
    new Date().getMonth() === month && new Date().getFullYear() === year;

  const days = [];
  for (let i = 0; i < firstDay; i++) {
    days.push(null);
  }
  for (let i = 1; i <= daysInMonth; i++) {
    days.push(i);
  }

  const hasMeeting = (day: number) =>
    scheduledMeetings.some((m) => m.date === day);

  return (
    <div className="bg-card border border-border rounded-2xl p-6">
      <div className="grid grid-cols-7 gap-1 mb-4">
        {daysOfWeek.map((day) => (
          <div
            key={day}
            className="text-center text-xs font-medium text-muted-foreground py-2"
          >
            {day}
          </div>
        ))}
      </div>

      <div className="grid grid-cols-7 gap-1">
        {days.map((day, index) => (
          <button
            key={index}
            onClick={() => day && onSelectDate(day)}
            disabled={!day}
            className={cn(
              "aspect-square rounded-xl flex flex-col items-center justify-center text-sm transition-colors relative",
              !day && "invisible",
              day === selectedDate && "bg-primary text-primary-foreground",
              day !== selectedDate &&
                day === today &&
                isCurrentMonth &&
                "bg-accent/20",
              day !== selectedDate && "hover:bg-muted"
            )}
          >
            {day}
            {day && hasMeeting(day) && day !== selectedDate && (
              <span className="absolute bottom-1.5 w-1 h-1 rounded-full bg-accent" />
            )}
          </button>
        ))}
      </div>
    </div>
  );
}

function MeetingsList({ selectedDate }: { selectedDate: number }) {
  const meetings = scheduledMeetings.filter((m) => m.date === selectedDate);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-card border border-border rounded-2xl p-6"
    >
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg font-semibold">
          Meetings on {months[new Date().getMonth()]} {selectedDate}
        </h2>
        <Button size="sm" className="gap-2">
          <Plus className="w-4 h-4" />
          New Meeting
        </Button>
      </div>

      {meetings.length === 0 ? (
        <div className="text-center py-12">
          <div className="w-16 h-16 rounded-2xl bg-muted flex items-center justify-center mx-auto mb-4">
            <Calendar className="w-8 h-8 text-muted-foreground" />
          </div>
          <h3 className="font-medium mb-1">No meetings scheduled</h3>
          <p className="text-sm text-muted-foreground">
            Click the button above to schedule a new meeting
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {meetings.map((meeting, index) => (
            <motion.div
              key={meeting.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className="flex gap-4 p-4 rounded-xl bg-muted/50 hover:bg-muted transition-colors group"
            >
              <div className={cn("w-1 rounded-full shrink-0", meeting.color)} />

              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <h3 className="font-medium">{meeting.title}</h3>
                  {meeting.recurring && (
                    <Repeat className="w-4 h-4 text-muted-foreground" />
                  )}
                </div>

                <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-muted-foreground">
                  <span className="flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5" />
                    {meeting.time}
                  </span>
                  <span className="flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5" />
                    {meeting.location}
                  </span>
                  <span className="flex items-center gap-1">
                    <Users className="w-3.5 h-3.5" />
                    {meeting.participants} participants
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-2 shrink-0">
                <Link href="/meeting">
                  <Button
                    size="sm"
                    className="opacity-0 group-hover:opacity-100 transition-opacity gap-1"
                  >
                    <Play className="w-3 h-3" />
                    Join
                  </Button>
                </Link>
                <button className="p-2 hover:bg-card rounded-lg transition-colors opacity-0 group-hover:opacity-100">
                  <MoreHorizontal className="w-4 h-4 text-muted-foreground" />
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </motion.div>
  );
}

export default function SchedulePage() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(new Date().getDate());

  const goToPrevMonth = () => {
    setCurrentDate(
      new Date(currentDate.getFullYear(), currentDate.getMonth() - 1)
    );
  };

  const goToNextMonth = () => {
    setCurrentDate(
      new Date(currentDate.getFullYear(), currentDate.getMonth() + 1)
    );
  };

  return (
    <>
      <header className="h-16 border-b border-border bg-card/50 backdrop-blur-sm flex items-center justify-between px-4 lg:px-6 sticky top-0 z-30">
        <div className="flex items-center gap-4">
          <div className="lg:hidden w-10" />
          <h1 className="text-lg font-semibold">Schedule</h1>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={goToPrevMonth}
            className="p-2 hover:bg-muted rounded-lg transition-colors"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <span className="text-sm font-medium min-w-[140px] text-center">
            {months[currentDate.getMonth()]} {currentDate.getFullYear()}
          </span>
          <button
            onClick={goToNextMonth}
            className="p-2 hover:bg-muted rounded-lg transition-colors"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </header>

      <main className="flex-1 p-4 lg:p-6 overflow-y-auto">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-[350px_1fr] gap-6">
            <CalendarView
              currentDate={currentDate}
              selectedDate={selectedDate}
              onSelectDate={setSelectedDate}
            />
            <MeetingsList selectedDate={selectedDate} />
          </div>
        </div>
      </main>
    </>
  );
}
