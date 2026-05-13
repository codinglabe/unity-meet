"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Video,
  Settings,
  Home,
  CalendarDays,
  FileText,
  LogOut,
  Menu,
  X,
} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ThemeToggleSimple } from "@/components/theme-toggle";
import { cn } from "@/lib/utils";

const navItems = [
  { icon: Home, label: "Dashboard", href: "/dashboard" },
  { icon: CalendarDays, label: "Schedule", href: "/schedule" },
  { icon: FileText, label: "Recordings", href: "/recordings" },
  { icon: Settings, label: "Settings", href: "/settings" },
];

function SidebarContent({ onClose }: { onClose?: () => void }) {
  const pathname = usePathname();

  return (
    <>
      <div className="p-6 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <div className="w-9 h-9 rounded-xl gradient-primary flex items-center justify-center shadow-lg shadow-primary/25">
            <Video className="w-5 h-5 text-white" />
          </div>
          <span className="font-bold text-xl gradient-text">MeetFlow</span>
        </Link>
        {onClose && (
          <button
            onClick={onClose}
            className="p-2 hover:bg-muted rounded-lg transition-colors lg:hidden"
          >
            <X className="w-5 h-5" />
          </button>
        )}
      </div>

      <nav className="flex-1 px-4">
        <ul className="space-y-1">
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <li key={item.label}>
                <Link
                  href={item.href}
                  onClick={onClose}
                  className={cn(
                    "flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200",
                    isActive
                      ? "gradient-primary text-white shadow-md shadow-primary/20"
                      : "text-muted-foreground hover:bg-muted hover:text-foreground"
                  )}
                >
                  <item.icon className="w-5 h-5" />
                  <span className="font-medium">{item.label}</span>
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      <div className="p-4 border-t border-border space-y-3">
        <div className="flex items-center justify-between px-3">
          <span className="text-sm text-muted-foreground">Theme</span>
          <ThemeToggleSimple />
        </div>
        <div className="flex items-center gap-3 p-3 rounded-xl bg-muted">
          <Avatar className="w-10 h-10">
            <AvatarImage src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100" />
            <AvatarFallback>GS</AvatarFallback>
          </Avatar>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium truncate">George Smith</p>
            <p className="text-xs text-muted-foreground truncate">
              george@meetflow.com
            </p>
          </div>
          <button className="p-1 hover:bg-card rounded transition-colors">
            <LogOut className="w-4 h-4 text-muted-foreground" />
          </button>
        </div>
      </div>
    </>
  );
}

export function DashboardSidebar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Mobile Menu Button */}
      <button
        onClick={() => setIsOpen(true)}
        className="lg:hidden fixed top-4 left-4 z-50 p-2 bg-card border border-border rounded-lg shadow-sm hover:bg-muted transition-colors"
      >
        <Menu className="w-5 h-5" />
      </button>

      {/* Mobile Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-foreground/20 backdrop-blur-sm z-40 lg:hidden"
            onClick={() => setIsOpen(false)}
          />
        )}
      </AnimatePresence>

      {/* Desktop Sidebar - always visible */}
      <aside className="hidden lg:flex w-64 bg-card border-r border-border flex-col shrink-0 h-screen sticky top-0">
        <SidebarContent />
      </aside>

      {/* Mobile Sidebar - animated */}
      <AnimatePresence>
        {isOpen && (
          <motion.aside
            initial={{ x: -280 }}
            animate={{ x: 0 }}
            exit={{ x: -280 }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed left-0 top-0 bottom-0 w-64 bg-card border-r border-border z-50 flex flex-col lg:hidden"
          >
            <SidebarContent onClose={() => setIsOpen(false)} />
          </motion.aside>
        )}
      </AnimatePresence>
    </>
  );
}
