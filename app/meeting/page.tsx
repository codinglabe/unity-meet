"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Mic,
  MicOff,
  Video,
  VideoOff,
  Phone,
  Monitor,
  MonitorOff,
  Settings,
  ChevronLeft,
  LayoutGrid,
  Maximize,
  Minimize,
  Send,
  Smile,
  MoreHorizontal,
  Check,
  X,
  ChevronRight,
  MessageSquare,
  AudioLines,
  Pause,
  Copy,
  Play,
  Circle,
  StopCircle,
  Volume2,
  VolumeX,
  UserPlus,
  Hand,
  Captions,
  CaptionsOff,
  Radio,
  Image,
  Sparkles,
  Focus,
  Waves,
  Eye,
  EyeOff,
  ExternalLink,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { ThemeToggleSimple } from "@/components/theme-toggle";
import { cn } from "@/lib/utils";

// Types
interface Participant {
  id: number;
  name: string;
  avatar: string;
  isMuted: boolean;
  isHost: boolean;
  isVideoOff: boolean;
  isHandRaised: boolean;
  isSpeaking: boolean;
}

interface ChatMessage {
  id: number;
  sender: string;
  message: string;
  time: string;
  isYou: boolean;
}



// Initial data
const initialParticipants: Participant[] = [
  {
    id: 1,
    name: "Alicia Padlock",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150",
    isMuted: false,
    isHost: false,
    isVideoOff: false,
    isHandRaised: false,
    isSpeaking: false,
  },
  {
    id: 2,
    name: "Sri Veronica",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150",
    isMuted: true,
    isHost: false,
    isVideoOff: false,
    isHandRaised: false,
    isSpeaking: false,
  },
  {
    id: 3,
    name: "Corbyn Stefan",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150",
    isMuted: true,
    isHost: false,
    isVideoOff: false,
    isHandRaised: false,
    isSpeaking: false,
  },
];

// Virtual backgrounds
const virtualBackgrounds = [
  { id: "none", name: "None", type: "none" },
  { id: "blur", name: "Blur", type: "blur" },
  { id: "office", name: "Office", url: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=800", type: "image" },
  { id: "nature", name: "Nature", url: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800", type: "image" },
  { id: "beach", name: "Beach", url: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800", type: "image" },
  { id: "city", name: "City", url: "https://images.unsplash.com/photo-1480714378408-67cf0d13bc1b?w=800", type: "image" },
  { id: "abstract", name: "Abstract", url: "https://images.unsplash.com/photo-1557672172-298e090bd0f1?w=800", type: "image" },
  { id: "space", name: "Space", url: "https://images.unsplash.com/photo-1462331940025-496dfbfc7564?w=800", type: "image" },
];

const initialChatMessages: ChatMessage[] = [
  {
    id: 1,
    sender: "Alicia Padlock",
    message: "How about our problem last week?",
    time: "2:02 PM",
    isYou: false,
  },
  {
    id: 2,
    sender: "You",
    message: "It's all clear, no worries",
    time: "2:03 PM",
    isYou: true,
  },
  {
    id: 3,
    sender: "Sri Veronica",
    message: "Yes, it's been solved. Since we have daily meeting to discuss everything",
    time: "2:10 PM",
    isYou: false,
  },
];

const subtitles = [
  "Hi guys thank you so much for coming - uhh been a long time no...",
  "So let's start with the project update from last week...",
  "We achieved several targets that were set in the previous meeting...",
  "Alicia, can you share the latest metrics with us?",
  "The conversion rate has improved by 15% since last month...",
];

// Components
function JoinRequest({
  name,
  onAccept,
  onReject,
}: {
  name: string;
  onAccept: () => void;
  onReject: () => void;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: -20, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -20, scale: 0.95 }}
      className="flex items-center gap-3 px-4 py-2 bg-card rounded-full border border-border shadow-lg"
    >
      <span className="text-sm">
        <span className="font-semibold text-destructive">{name}</span>{" "}
        <span className="text-muted-foreground">wants to join the meeting</span>
      </span>
      <button
        onClick={onReject}
        className="w-8 h-8 rounded-full bg-destructive flex items-center justify-center hover:bg-destructive/90 transition-colors"
      >
        <X className="w-4 h-4 text-destructive-foreground" />
      </button>
      <button
        onClick={onAccept}
        className="w-8 h-8 rounded-full bg-accent flex items-center justify-center hover:bg-accent/90 transition-colors"
      >
        <Check className="w-4 h-4 text-accent-foreground" />
      </button>
    </motion.div>
  );
}

function VideoControls({
  isMuted,
  isVideoOff,
  isScreenSharing,
  isHandRaised,
  isLiveStreaming,
  onToggleMute,
  onToggleVideo,
  onEndCall,
  onToggleScreenShare,
  onToggleHandRaise,
  onToggleLiveStream,
  onOpenBackgrounds,
}: {
  isMuted: boolean;
  isVideoOff: boolean;
  isScreenSharing: boolean;
  isHandRaised: boolean;
  isLiveStreaming: boolean;
  onToggleMute: () => void;
  onToggleVideo: () => void;
  onEndCall: () => void;
  onToggleScreenShare: () => void;
  onToggleHandRaise: () => void;
  onToggleLiveStream: () => void;
  onOpenBackgrounds: () => void;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex items-center justify-center gap-2 md:gap-3"
    >
      <motion.button
        whileTap={{ scale: 0.95 }}
        onClick={onToggleMute}
        className={cn(
          "w-11 h-11 md:w-12 md:h-12 rounded-full flex items-center justify-center transition-all",
          isMuted
            ? "bg-destructive/20 text-destructive"
            : "bg-card/80 backdrop-blur-sm text-foreground hover:bg-card"
        )}
      >
        {isMuted ? <MicOff className="w-5 h-5" /> : <Mic className="w-5 h-5" />}
      </motion.button>

      <motion.button
        whileTap={{ scale: 0.95 }}
        onClick={onToggleVideo}
        className={cn(
          "w-11 h-11 md:w-12 md:h-12 rounded-full flex items-center justify-center transition-all",
          isVideoOff
            ? "bg-destructive/20 text-destructive"
            : "bg-card/80 backdrop-blur-sm text-foreground hover:bg-card"
        )}
      >
        {isVideoOff ? (
          <VideoOff className="w-5 h-5" />
        ) : (
          <Video className="w-5 h-5" />
        )}
      </motion.button>

      <motion.button
        whileTap={{ scale: 0.95 }}
        onClick={onToggleScreenShare}
        className={cn(
          "w-11 h-11 md:w-12 md:h-12 rounded-full flex items-center justify-center transition-all",
          isScreenSharing
            ? "bg-accent text-accent-foreground"
            : "bg-card/80 backdrop-blur-sm text-foreground hover:bg-card"
        )}
      >
        {isScreenSharing ? (
          <MonitorOff className="w-5 h-5" />
        ) : (
          <Monitor className="w-5 h-5" />
        )}
      </motion.button>

      <motion.button
        whileTap={{ scale: 0.95 }}
        onClick={onOpenBackgrounds}
        className="w-11 h-11 md:w-12 md:h-12 rounded-full bg-card/80 backdrop-blur-sm text-foreground hover:bg-card flex items-center justify-center transition-all"
      >
        <Image className="w-5 h-5" />
      </motion.button>

      <motion.button
        whileTap={{ scale: 0.95 }}
        onClick={onToggleHandRaise}
        className={cn(
          "w-11 h-11 md:w-12 md:h-12 rounded-full flex items-center justify-center transition-all",
          isHandRaised
            ? "bg-yellow-500 text-white"
            : "bg-card/80 backdrop-blur-sm text-foreground hover:bg-card"
        )}
      >
        <Hand className="w-5 h-5" />
      </motion.button>

      <motion.button
        whileTap={{ scale: 0.95 }}
        onClick={onToggleLiveStream}
        className={cn(
          "w-11 h-11 md:w-12 md:h-12 rounded-full flex items-center justify-center transition-all",
          isLiveStreaming
            ? "bg-red-500 text-white"
            : "bg-card/80 backdrop-blur-sm text-foreground hover:bg-card"
        )}
      >
        <Radio className="w-5 h-5" />
      </motion.button>

      <motion.button
        whileTap={{ scale: 0.95 }}
        onClick={onEndCall}
        className="w-14 h-11 md:w-16 md:h-12 rounded-full bg-destructive text-destructive-foreground flex items-center justify-center hover:bg-destructive/90 transition-all"
      >
        <Phone className="w-5 h-5 rotate-[135deg]" />
      </motion.button>
    </motion.div>
  );
}

function SubtitleBar({
  text,
  isEnabled,
  onToggle,
  onSettings,
}: {
  text: string;
  isEnabled: boolean;
  onToggle: () => void;
  onSettings: () => void;
}) {
  if (!isEnabled) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 10 }}
      className="flex items-center gap-3 px-4 py-3 bg-foreground/90 backdrop-blur-sm rounded-2xl text-background"
    >
      <div className="flex items-center gap-1">
        <AudioLines className="w-5 h-5" />
      </div>
      <span className="text-xs text-background/70 uppercase tracking-wide">
        CC/Subtitles
      </span>
      <p className="flex-1 text-sm">{text}</p>
      <div className="flex items-center gap-2">
        <button
          onClick={onToggle}
          className="p-1 hover:bg-background/20 rounded transition-colors"
        >
          <CaptionsOff className="w-4 h-4" />
        </button>
        <button
          onClick={onSettings}
          className="p-1 hover:bg-background/20 rounded transition-colors"
        >
          <Settings className="w-4 h-4" />
        </button>
      </div>
    </motion.div>
  );
}

function ParticipantThumbnail({
  participant,
  index,
  isSelected,
  onClick,
  onToggleMute,
}: {
  participant: Participant;
  index: number;
  isSelected: boolean;
  onClick: () => void;
  onToggleMute: () => void;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: index * 0.1 }}
      whileHover={{ scale: 1.02 }}
      onClick={onClick}
      className={cn(
        "relative rounded-2xl overflow-hidden aspect-video bg-muted cursor-pointer transition-all",
        isSelected && "ring-2 ring-accent",
        participant.isSpeaking && "ring-2 ring-green-500 ring-offset-2 ring-offset-background"
      )}
    >
      {/* Speaking indicator */}
      {participant.isSpeaking && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="absolute top-2 left-2 z-10 flex items-center gap-1 px-2 py-1 bg-green-500 rounded-full"
        >
          <Waves className="w-3 h-3 text-white" />
          <span className="text-xs text-white font-medium">Speaking</span>
        </motion.div>
      )}
      {participant.isVideoOff ? (
        <div className="w-full h-full flex items-center justify-center bg-muted">
          <Avatar className="w-16 h-16">
            <AvatarImage src={participant.avatar} alt={participant.name} />
            <AvatarFallback>{participant.name[0]}</AvatarFallback>
          </Avatar>
        </div>
      ) : (
        <img
          src={participant.avatar}
          alt={participant.name}
          className="w-full h-full object-cover"
        />
      )}
      <div className="absolute inset-0 bg-gradient-to-t from-foreground/60 to-transparent" />
      
      {participant.isHandRaised && (
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          className="absolute top-2 right-2 w-8 h-8 rounded-full bg-yellow-500 flex items-center justify-center"
        >
          <Hand className="w-4 h-4 text-white" />
        </motion.div>
      )}

      <div className="absolute bottom-2 left-2 right-2 flex items-center justify-between">
        <span className="text-sm font-medium text-background">
          {participant.name}
        </span>
        <button
          onClick={(e) => {
            e.stopPropagation();
            onToggleMute();
          }}
          className={cn(
            "w-6 h-6 rounded-full flex items-center justify-center transition-colors",
            participant.isMuted ? "bg-destructive/80 hover:bg-destructive" : "bg-background/30 hover:bg-background/50"
          )}
        >
          {participant.isMuted ? (
            <MicOff className="w-3 h-3 text-background" />
          ) : (
            <Mic className="w-3 h-3 text-background" />
          )}
        </button>
      </div>
    </motion.div>
  );
}

function ChatMessage({ message }: { message: ChatMessage }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className={cn("flex flex-col gap-1", message.isYou ? "items-end" : "items-start")}
    >
      <div className="flex items-center gap-2 text-xs text-muted-foreground">
        <span className="font-medium text-foreground">{message.sender}</span>
        <span>{message.time}</span>
      </div>
      <div
        className={cn(
          "px-4 py-2 rounded-2xl max-w-[85%]",
          message.isYou
            ? "bg-accent text-accent-foreground rounded-br-sm"
            : "bg-muted text-foreground rounded-bl-sm"
        )}
      >
        <p className="text-sm">{message.message}</p>
      </div>
    </motion.div>
  );
}

function Sidebar({
  activeTab,
  onTabChange,
  participants,
  chatMessages,
  onSendMessage,
  onToggleParticipantMute,
  onRemoveParticipant,
}: {
  activeTab: "chat" | "participants";
  onTabChange: (tab: "chat" | "participants") => void;
  participants: Participant[];
  chatMessages: ChatMessage[];
  onSendMessage: (message: string) => void;
  onToggleParticipantMute: (id: number) => void;
  onRemoveParticipant: (id: number) => void;
}) {
  const [newMessage, setNewMessage] = useState("");
  const [showInviteModal, setShowInviteModal] = useState(false);
  const [inviteEmail, setInviteEmail] = useState("");
  const [inviteCopied, setInviteCopied] = useState(false);
  const chatEndRef = useRef<HTMLDivElement>(null);
  const meetingLink = "https://meetflow.app/join/abc-123-xyz";

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chatMessages]);

  const handleCopyLink = () => {
    navigator.clipboard.writeText(meetingLink);
    setInviteCopied(true);
    setTimeout(() => setInviteCopied(false), 2000);
  };

  const handleSendInvite = () => {
    if (inviteEmail.trim()) {
      // Simulate sending invite
      alert(`Invitation sent to ${inviteEmail}`);
      setInviteEmail("");
      setShowInviteModal(false);
    }
  };

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      onSendMessage(newMessage);
      setNewMessage("");
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      className="w-full lg:w-80 xl:w-96 flex flex-col h-full"
    >
      {/* Chat Section */}
      <div className="flex-1 bg-card rounded-2xl border border-border overflow-hidden flex flex-col min-h-0">
        <div className="flex border-b border-border">
          <button
            onClick={() => onTabChange("chat")}
            className={cn(
              "flex-1 py-3 px-4 text-sm font-medium transition-colors",
              activeTab === "chat"
                ? "bg-primary text-primary-foreground"
                : "text-muted-foreground hover:text-foreground"
            )}
          >
            Room Chat
          </button>
          <button
            onClick={() => onTabChange("participants")}
            className={cn(
              "flex-1 py-3 px-4 text-sm font-medium transition-colors flex items-center justify-center gap-2",
              activeTab === "participants"
                ? "bg-primary text-primary-foreground"
                : "text-muted-foreground hover:text-foreground"
            )}
          >
            Participants
            <span className="px-2 py-0.5 rounded-full bg-accent text-accent-foreground text-xs">
              {participants.length + 1}
            </span>
          </button>
        </div>

        <div className="flex-1 p-4 overflow-y-auto space-y-4 min-h-0">
          <AnimatePresence mode="wait">
            {activeTab === "chat" ? (
              <motion.div
                key="chat"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="space-y-4"
              >
                {chatMessages.map((msg) => (
                  <ChatMessage key={msg.id} message={msg} />
                ))}
                <div ref={chatEndRef} />
              </motion.div>
            ) : (
              <motion.div
                key="participants"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="space-y-3"
              >
                {/* You (Host) */}
                <div className="flex items-center gap-3 p-2 rounded-lg bg-accent/10">
                  <Avatar className="w-10 h-10">
                    <AvatarImage src="https://images.unsplash.com/photo-1560250097-0b93528c311a?w=150" />
                    <AvatarFallback>G</AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <p className="text-sm font-medium">George Smith (You)</p>
                    <p className="text-xs text-muted-foreground">Host</p>
                  </div>
                  <Mic className="w-4 h-4 text-accent" />
                </div>

                {participants.map((p) => (
                  <div
                    key={p.id}
                    className="flex items-center gap-3 p-2 rounded-lg hover:bg-muted transition-colors group"
                  >
                    <Avatar className="w-10 h-10">
                      <AvatarImage src={p.avatar} alt={p.name} />
                      <AvatarFallback>{p.name[0]}</AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <p className="text-sm font-medium">{p.name}</p>
                      <p className="text-xs text-muted-foreground">
                        {p.isHost ? "Co-host" : "Participant"}
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
                      {p.isHandRaised && (
                        <Hand className="w-4 h-4 text-yellow-500" />
                      )}
                      <button
                        onClick={() => onToggleParticipantMute(p.id)}
                        className="p-1 rounded hover:bg-muted-foreground/10 transition-colors"
                      >
                        {p.isMuted ? (
                          <MicOff className="w-4 h-4 text-muted-foreground" />
                        ) : (
                          <Mic className="w-4 h-4 text-accent" />
                        )}
                      </button>
                      <button
                        onClick={() => onRemoveParticipant(p.id)}
                        className="p-1 rounded hover:bg-destructive/10 transition-colors opacity-0 group-hover:opacity-100"
                      >
                        <X className="w-4 h-4 text-destructive" />
                      </button>
                    </div>
                  </div>
                ))}

                <button 
                  onClick={() => setShowInviteModal(true)}
                  className="flex items-center gap-3 p-2 rounded-lg hover:bg-muted transition-colors w-full text-muted-foreground"
                >
                  <div className="w-10 h-10 rounded-full border-2 border-dashed border-muted-foreground flex items-center justify-center">
                    <UserPlus className="w-4 h-4" />
                  </div>
                  <span className="text-sm">Invite Participant</span>
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <div className="p-3 border-t border-border">
          <div className="flex items-center gap-2 bg-muted rounded-full px-4 py-2">
            <Input
              type="text"
              placeholder="Type message here..."
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              onKeyPress={handleKeyPress}
              className="flex-1 border-0 bg-transparent focus-visible:ring-0 px-0"
            />
            <button className="p-1 hover:bg-card rounded-full transition-colors">
              <Smile className="w-5 h-5 text-muted-foreground" />
            </button>
            <button
              onClick={handleSendMessage}
              disabled={!newMessage.trim()}
              className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center hover:bg-primary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Send className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Invite Modal */}
      <AnimatePresence>
        {showInviteModal && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-foreground/20 backdrop-blur-sm z-50"
              onClick={() => setShowInviteModal(false)}
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-md bg-card rounded-2xl border border-border p-6 z-50 shadow-xl"
            >
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold">Invite Participant</h3>
                <button
                  onClick={() => setShowInviteModal(false)}
                  className="p-2 hover:bg-muted rounded-lg transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="space-y-4">
                {/* Copy Link */}
                <div>
                  <label className="text-sm font-medium mb-2 block">Meeting Link</label>
                  <div className="flex gap-2">
                    <Input
                      value={meetingLink}
                      readOnly
                      className="flex-1 bg-muted"
                    />
                    <Button
                      onClick={handleCopyLink}
                      variant={inviteCopied ? "default" : "outline"}
                      className="shrink-0"
                    >
                      {inviteCopied ? (
                        <>
                          <Check className="w-4 h-4 mr-2" />
                          Copied
                        </>
                      ) : (
                        <>
                          <Copy className="w-4 h-4 mr-2" />
                          Copy
                        </>
                      )}
                    </Button>
                  </div>
                </div>

                <div className="relative">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-border" />
                  </div>
                  <div className="relative flex justify-center text-xs uppercase">
                    <span className="bg-card px-2 text-muted-foreground">or</span>
                  </div>
                </div>

                {/* Email Invite */}
                <div>
                  <label className="text-sm font-medium mb-2 block">Send Email Invite</label>
                  <div className="flex gap-2">
                    <Input
                      type="email"
                      placeholder="Enter email address"
                      value={inviteEmail}
                      onChange={(e) => setInviteEmail(e.target.value)}
                      className="flex-1"
                      onKeyPress={(e) => e.key === "Enter" && handleSendInvite()}
                    />
                    <Button
                      onClick={handleSendInvite}
                      disabled={!inviteEmail.trim()}
                    >
                      <Send className="w-4 h-4 mr-2" />
                      Send
                    </Button>
                  </div>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

function SettingsModal({
  isOpen,
  onClose,
  volume,
  onVolumeChange,
}: {
  isOpen: boolean;
  onClose: () => void;
  volume: number;
  onVolumeChange: (volume: number) => void;
}) {
  if (!isOpen) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-foreground/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.95 }}
        animate={{ scale: 1 }}
        exit={{ scale: 0.95 }}
        onClick={(e) => e.stopPropagation()}
        className="bg-card rounded-2xl p-6 w-full max-w-md shadow-xl"
      >
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold">Meeting Settings</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-muted rounded-full transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="space-y-6">
          <div>
            <label className="text-sm font-medium mb-3 block">Volume</label>
            <div className="flex items-center gap-3">
              <VolumeX className="w-5 h-5 text-muted-foreground" />
              <input
                type="range"
                min="0"
                max="100"
                value={volume}
                onChange={(e) => onVolumeChange(Number(e.target.value))}
                className="flex-1 h-2 bg-muted rounded-full appearance-none cursor-pointer accent-accent"
              />
              <Volume2 className="w-5 h-5 text-muted-foreground" />
              <span className="text-sm w-10 text-right">{volume}%</span>
            </div>
          </div>

          <div>
            <label className="text-sm font-medium mb-3 block">Meeting Link</label>
            <div className="flex gap-2">
              <Input
                value="https://meetflow.app/room/abc123"
                readOnly
                className="flex-1"
              />
              <Button
                variant="outline"
                size="icon"
                onClick={() => navigator.clipboard.writeText("https://meetflow.app/room/abc123")}
              >
                <Copy className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>

        <div className="mt-6 pt-6 border-t border-border">
          <Button onClick={onClose} className="w-full">
            Done
          </Button>
        </div>
      </motion.div>
    </motion.div>
  );
}

function VirtualBackgroundModal({
  isOpen,
  onClose,
  currentBackground,
  onSelectBackground,
}: {
  isOpen: boolean;
  onClose: () => void;
  currentBackground: string;
  onSelectBackground: (id: string) => void;
}) {
  if (!isOpen) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-foreground/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.95 }}
        animate={{ scale: 1 }}
        exit={{ scale: 0.95 }}
        onClick={(e) => e.stopPropagation()}
        className="bg-card rounded-2xl p-6 w-full max-w-lg shadow-xl"
      >
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-accent" />
            <h2 className="text-xl font-semibold">Virtual Background</h2>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-muted rounded-full transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="grid grid-cols-4 gap-3">
          {virtualBackgrounds.map((bg) => (
            <button
              key={bg.id}
              onClick={() => onSelectBackground(bg.id)}
              className={cn(
                "relative aspect-video rounded-xl overflow-hidden border-2 transition-all hover:scale-105",
                currentBackground === bg.id
                  ? "border-accent ring-2 ring-accent ring-offset-2"
                  : "border-transparent hover:border-muted-foreground/30"
              )}
            >
              {bg.type === "none" ? (
                <div className="w-full h-full bg-muted flex items-center justify-center">
                  <X className="w-6 h-6 text-muted-foreground" />
                </div>
              ) : bg.type === "blur" ? (
                <div className="w-full h-full bg-gradient-to-br from-muted to-muted-foreground/20 flex items-center justify-center backdrop-blur-xl">
                  <Focus className="w-6 h-6 text-muted-foreground" />
                </div>
              ) : (
                <img
                  src={bg.url}
                  alt={bg.name}
                  className="w-full h-full object-cover"
                />
              )}
              {currentBackground === bg.id && (
                <div className="absolute inset-0 bg-accent/20 flex items-center justify-center">
                  <Check className="w-6 h-6 text-accent" />
                </div>
              )}
            </button>
          ))}
        </div>

        <div className="mt-6 text-center">
          <p className="text-sm text-muted-foreground">
            Select a background to apply during the meeting
          </p>
        </div>
      </motion.div>
    </motion.div>
  );
}

function LiveStreamModal({
  isOpen,
  onClose,
  isStreaming,
  onToggleStream,
  viewerCount,
  streamDuration,
}: {
  isOpen: boolean;
  onClose: () => void;
  isStreaming: boolean;
  onToggleStream: () => void;
  viewerCount: number;
  streamDuration: number;
}) {
  const [streamKey, setStreamKey] = useState("");
  const [streamTitle, setStreamTitle] = useState("MeetFlow Live Stream");
  const [isConnected, setIsConnected] = useState(false);
  const [showStreamKey, setShowStreamKey] = useState(false);

  if (!isOpen) return null;

  const formatDuration = (seconds: number) => {
    const hrs = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    if (hrs > 0) {
      return `${hrs}:${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
    }
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  const handleConnectYouTube = () => {
    // Simulate YouTube OAuth connection
    setIsConnected(true);
  };

  const handleStartStream = () => {
    if (streamKey || isConnected) {
      onToggleStream();
    }
  };

  // YouTube icon SVG
  const YouTubeIcon = ({ className }: { className?: string }) => (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor">
      <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
    </svg>
  );

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-foreground/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.95 }}
        animate={{ scale: 1 }}
        exit={{ scale: 0.95 }}
        onClick={(e) => e.stopPropagation()}
        className="bg-card rounded-2xl p-6 w-full max-w-md shadow-xl"
      >
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-red-500 flex items-center justify-center">
              <YouTubeIcon className="w-6 h-6 text-white" />
            </div>
            <div>
              <h2 className="text-lg font-semibold">YouTube Live</h2>
              <p className="text-xs text-muted-foreground">Stream to YouTube</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-muted rounded-full transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {isStreaming ? (
          <div className="space-y-4">
            {/* Live indicator with YouTube branding */}
            <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-xl">
              <div className="flex items-center justify-center gap-3">
                <YouTubeIcon className="w-8 h-8 text-red-500" />
                <div className="flex items-center gap-2">
                  <motion.div
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ repeat: Infinity, duration: 1.5 }}
                    className="w-3 h-3 rounded-full bg-red-500"
                  />
                  <span className="text-lg font-bold text-red-500">LIVE ON YOUTUBE</span>
                </div>
              </div>
            </div>
            
            {/* Stats */}
            <div className="grid grid-cols-3 gap-3">
              <div className="p-3 bg-muted rounded-xl text-center">
                <p className="text-xl font-bold">{viewerCount}</p>
                <p className="text-xs text-muted-foreground">Watching</p>
              </div>
              <div className="p-3 bg-muted rounded-xl text-center">
                <p className="text-xl font-bold">{formatDuration(streamDuration)}</p>
                <p className="text-xs text-muted-foreground">Duration</p>
              </div>
              <div className="p-3 bg-muted rounded-xl text-center">
                <p className="text-xl font-bold">{Math.floor(viewerCount * 0.3)}</p>
                <p className="text-xs text-muted-foreground">Likes</p>
              </div>
            </div>

            {/* Stream Info */}
            <div className="p-4 bg-muted/50 rounded-xl space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Stream Title</span>
                <span className="text-sm font-medium truncate ml-2">{streamTitle}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Quality</span>
                <span className="text-sm font-medium">1080p60 HD</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Latency</span>
                <span className="text-sm font-medium text-green-500">Ultra-low</span>
              </div>
            </div>

            {/* YouTube Studio Link */}
            <a
              href="https://studio.youtube.com"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 p-3 bg-muted rounded-xl hover:bg-muted/80 transition-colors"
            >
              <ExternalLink className="w-4 h-4" />
              <span className="text-sm font-medium">Open YouTube Studio</span>
            </a>

            <Button
              onClick={onToggleStream}
              variant="destructive"
              className="w-full"
            >
              <StopCircle className="w-4 h-4 mr-2" />
              End YouTube Stream
            </Button>
          </div>
        ) : (
          <div className="space-y-4">
            {/* Connect YouTube Account */}
            {!isConnected ? (
              <div className="p-6 border-2 border-dashed border-muted rounded-xl text-center">
                <YouTubeIcon className="w-12 h-12 mx-auto mb-4 text-red-500" />
                <h3 className="font-semibold mb-2">Connect YouTube Account</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Sign in to stream directly to your YouTube channel
                </p>
                <Button
                  onClick={handleConnectYouTube}
                  className="bg-red-500 hover:bg-red-600"
                >
                  <YouTubeIcon className="w-4 h-4 mr-2" />
                  Connect with YouTube
                </Button>
              </div>
            ) : (
              <div className="p-4 bg-green-500/10 border border-green-500/20 rounded-xl">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-red-500 flex items-center justify-center">
                    <YouTubeIcon className="w-5 h-5 text-white" />
                  </div>
                  <div className="flex-1">
                    <p className="font-medium">YouTube Connected</p>
                    <p className="text-xs text-muted-foreground">@meetflow_channel</p>
                  </div>
                  <Check className="w-5 h-5 text-green-500" />
                </div>
              </div>
            )}

            {/* Divider */}
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-border" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-card px-2 text-muted-foreground">or use stream key</span>
              </div>
            </div>

            {/* Manual Stream Key */}
            <div className="space-y-3">
              <div>
                <label className="text-sm font-medium mb-2 block">Stream Title</label>
                <Input
                  value={streamTitle}
                  onChange={(e) => setStreamTitle(e.target.value)}
                  placeholder="Enter stream title"
                />
              </div>
              <div>
                <label className="text-sm font-medium mb-2 block">YouTube Stream Key</label>
                <div className="flex gap-2">
                  <div className="relative flex-1">
                    <Input
                      type={showStreamKey ? "text" : "password"}
                      value={streamKey}
                      onChange={(e) => setStreamKey(e.target.value)}
                      placeholder="xxxx-xxxx-xxxx-xxxx-xxxx"
                      className="pr-10"
                    />
                    <button
                      type="button"
                      onClick={() => setShowStreamKey(!showStreamKey)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                    >
                      {showStreamKey ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>
                <p className="text-xs text-muted-foreground mt-1">
                  Find your stream key in YouTube Studio &gt; Go Live &gt; Stream
                </p>
              </div>
            </div>

            {/* Stream Settings */}
            <div className="space-y-2">
              <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                <span className="text-sm">Resolution</span>
                <span className="text-sm font-medium">1080p60</span>
              </div>
              <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                <span className="text-sm">Bitrate</span>
                <span className="text-sm font-medium">6000 Kbps</span>
              </div>
            </div>

            <Button
              onClick={handleStartStream}
              disabled={!isConnected && !streamKey}
              className="w-full bg-red-500 hover:bg-red-600 disabled:opacity-50"
            >
              <Radio className="w-4 h-4 mr-2" />
              Start YouTube Stream
            </Button>

            <p className="text-xs text-center text-muted-foreground">
              By streaming, you agree to YouTube&apos;s Terms of Service
            </p>
          </div>
        )}
      </motion.div>
    </motion.div>
  );
}

export default function MeetingPage() {
  const router = useRouter();
  
  // State
  const [isMuted, setIsMuted] = useState(false);
  const [isVideoOff, setIsVideoOff] = useState(false);
  const [isScreenSharing, setIsScreenSharing] = useState(false);
  const [isHandRaised, setIsHandRaised] = useState(false);
  const [showJoinRequest, setShowJoinRequest] = useState(true);
  const [joinRequests, setJoinRequests] = useState([
    { id: 1, name: "Drew Bieber" },
  ]);
  const [activeTab, setActiveTab] = useState<"chat" | "participants">("chat");
  const [showSidebar, setShowSidebar] = useState(true);
  const [isRecording, setIsRecording] = useState(true);
  const [recordingTime, setRecordingTime] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [viewMode, setViewMode] = useState<"speaker" | "grid">("speaker");
  const [showSettings, setShowSettings] = useState(false);
  const [volume, setVolume] = useState(80);
  const [subtitlesEnabled, setSubtitlesEnabled] = useState(true);
  const [currentSubtitle, setCurrentSubtitle] = useState(0);
  const [selectedParticipant, setSelectedParticipant] = useState<number | null>(null);
  const [isLiveStreaming, setIsLiveStreaming] = useState(false);
  const [showLiveStreamModal, setShowLiveStreamModal] = useState(false);
  const [streamDuration, setStreamDuration] = useState(0);
  const [viewerCount, setViewerCount] = useState(0);
  const [showBackgroundModal, setShowBackgroundModal] = useState(false);
  const [currentBackground, setCurrentBackground] = useState("none");
  const [activeSpeaker, setActiveSpeaker] = useState<number | null>(null);
  
  // Data state
  const [participants, setParticipants] = useState<Participant[]>(initialParticipants);
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>(initialChatMessages);

  // Recording timer
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isRecording) {
      interval = setInterval(() => {
        setRecordingTime((prev) => prev + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isRecording]);

  // Subtitle rotation
  useEffect(() => {
    if (!subtitlesEnabled) return;
    const interval = setInterval(() => {
      setCurrentSubtitle((prev) => (prev + 1) % subtitles.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [subtitlesEnabled]);

  // Live streaming timer
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isLiveStreaming) {
      interval = setInterval(() => {
        setStreamDuration((prev) => prev + 1);
        // Simulate fluctuating viewer count
        setViewerCount((prev) => Math.max(0, prev + Math.floor(Math.random() * 5) - 2));
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isLiveStreaming]);

  // Simulate speaking detection (random participant speaks)
  useEffect(() => {
    const interval = setInterval(() => {
      const shouldSpeak = Math.random() > 0.5;
      if (shouldSpeak && participants.length > 0) {
        const randomIndex = Math.floor(Math.random() * participants.length);
        const speakerId = participants[randomIndex].id;
        
        setActiveSpeaker(speakerId);
        setParticipants((prev) =>
          prev.map((p) => ({
            ...p,
            isSpeaking: p.id === speakerId,
          }))
        );
        
        // Stop speaking after random duration
        setTimeout(() => {
          setActiveSpeaker(null);
          setParticipants((prev) =>
            prev.map((p) => ({ ...p, isSpeaking: false }))
          );
        }, 2000 + Math.random() * 3000);
      }
    }, 4000);
    return () => clearInterval(interval);
  }, [participants.length]);

  const toggleLiveStream = useCallback(() => {
    if (!isLiveStreaming) {
      setStreamDuration(0);
      setViewerCount(Math.floor(Math.random() * 50) + 10);
    }
    setIsLiveStreaming(!isLiveStreaming);
  }, [isLiveStreaming]);

  const handleSelectBackground = useCallback((id: string) => {
    setCurrentBackground(id);
  }, []);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  // Handlers
  const handleEndCall = useCallback(() => {
    router.push("/dashboard");
  }, [router]);

  const handleAcceptJoinRequest = useCallback((id: number) => {
    const request = joinRequests.find((r) => r.id === id);
    if (request) {
      setParticipants((prev) => [
        ...prev,
        {
          id: Date.now(),
          name: request.name,
          avatar: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=150",
          isMuted: false,
          isHost: false,
          isVideoOff: false,
          isHandRaised: false,
          isSpeaking: false,
        },
      ]);
    }
    setJoinRequests((prev) => prev.filter((r) => r.id !== id));
    if (joinRequests.length === 1) setShowJoinRequest(false);
  }, [joinRequests]);

  const handleRejectJoinRequest = useCallback((id: number) => {
    setJoinRequests((prev) => prev.filter((r) => r.id !== id));
    if (joinRequests.length === 1) setShowJoinRequest(false);
  }, [joinRequests]);

  const handleSendMessage = useCallback((message: string) => {
    const now = new Date();
    const time = now.toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    });
    setChatMessages((prev) => [
      ...prev,
      {
        id: Date.now(),
        sender: "You",
        message,
        time,
        isYou: true,
      },
    ]);
  }, []);

  const handleToggleParticipantMute = useCallback((id: number) => {
    setParticipants((prev) =>
      prev.map((p) =>
        p.id === id ? { ...p, isMuted: !p.isMuted } : p
      )
    );
  }, []);

  const handleRemoveParticipant = useCallback((id: number) => {
    setParticipants((prev) => prev.filter((p) => p.id !== id));
  }, []);

  const toggleFullscreen = useCallback(() => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen();
      setIsFullscreen(true);
    } else {
      document.exitFullscreen();
      setIsFullscreen(false);
    }
  }, []);

  const toggleRecording = useCallback(() => {
    setIsRecording((prev) => !prev);
    if (!isRecording) {
      setRecordingTime(0);
    }
  }, [isRecording]);

  return (
    <div className="h-screen bg-background p-4 lg:p-6 flex flex-col overflow-hidden">
      {/* Header */}
      <motion.header
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center justify-between mb-4 lg:mb-6 shrink-0"
      >
        <div className="flex items-center gap-4">
          <Link href="/dashboard">
            <button className="w-10 h-10 rounded-full bg-card border border-border flex items-center justify-center hover:bg-muted transition-all duration-200 hover:scale-105">
              <ChevronLeft className="w-5 h-5" />
            </button>
          </Link>
          <div>
            <h1 className="text-xl lg:text-2xl font-bold gradient-text">
              Project Reporting - Week 1
            </h1>
            <p className="text-sm text-muted-foreground">
              {"George's Meeting Room"}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <AnimatePresence>
            {showJoinRequest && joinRequests[0] && (
              <JoinRequest
                name={joinRequests[0].name}
                onAccept={() => handleAcceptJoinRequest(joinRequests[0].id)}
                onReject={() => handleRejectJoinRequest(joinRequests[0].id)}
              />
            )}
          </AnimatePresence>
          <ThemeToggleSimple />
        </div>
      </motion.header>

      {/* Main Content */}
      <div className="flex flex-col lg:flex-row gap-4 lg:gap-6 flex-1 min-h-0">
        {/* Video Section */}
        <div className="flex-1 flex flex-col gap-4 min-h-0 overflow-auto">
          {/* Main Video */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className={cn(
              "relative rounded-3xl overflow-hidden bg-muted",
              viewMode === "speaker" ? "aspect-video" : "aspect-[4/3]"
            )}
          >
            {/* Virtual Background Layer */}
            {currentBackground !== "none" && !isVideoOff && !isScreenSharing && (
              <div className="absolute inset-0 z-0">
                {currentBackground === "blur" ? (
                  <div className="w-full h-full bg-gradient-to-br from-muted via-muted-foreground/30 to-muted backdrop-blur-3xl" />
                ) : (
                  <img
                    src={virtualBackgrounds.find((bg) => bg.id === currentBackground)?.url}
                    alt="Virtual background"
                    className="w-full h-full object-cover"
                  />
                )}
              </div>
            )}

            {viewMode === "speaker" ? (
              // Speaker view
              <>
                {isVideoOff ? (
                  <div className="w-full h-full flex flex-col items-center justify-center bg-muted">
                    <Avatar className="w-32 h-32 mb-4">
                      <AvatarImage src="https://images.unsplash.com/photo-1560250097-0b93528c311a?w=300" />
                      <AvatarFallback className="text-4xl">G</AvatarFallback>
                    </Avatar>
                    <p className="text-lg font-medium">Camera is off</p>
                  </div>
                ) : isScreenSharing ? (
                  <div className="w-full h-full flex flex-col items-center justify-center bg-foreground">
                    <Monitor className="w-24 h-24 mb-4 text-background" />
                    <p className="text-lg font-medium text-background">
                      You are sharing your screen
                    </p>
                  </div>
                ) : (
                  <div className="relative w-full h-full">
                    <img
                      src="https://images.unsplash.com/photo-1560250097-0b93528c311a?w=1200"
                      alt="Main speaker"
                      className={cn(
                        "w-full h-full object-cover",
                        currentBackground !== "none" && "relative z-10 mix-blend-normal"
                      )}
                    />
                  </div>
                )}
              </>
            ) : (
              // Grid view
              <div className="w-full h-full grid grid-cols-2 gap-2 p-2">
                <div className="relative rounded-xl overflow-hidden bg-muted">
                  {isVideoOff ? (
                    <div className="w-full h-full flex items-center justify-center">
                      <Avatar className="w-16 h-16">
                        <AvatarImage src="https://images.unsplash.com/photo-1560250097-0b93528c311a?w=150" />
                        <AvatarFallback>G</AvatarFallback>
                      </Avatar>
                    </div>
                  ) : (
                    <img
                      src="https://images.unsplash.com/photo-1560250097-0b93528c311a?w=600"
                      alt="You"
                      className="w-full h-full object-cover"
                    />
                  )}
                  <div className="absolute bottom-2 left-2 px-2 py-1 bg-foreground/80 rounded text-xs text-background">
                    You
                  </div>
                </div>
                {participants.slice(0, 3).map((p) => (
                  <div key={p.id} className="relative rounded-xl overflow-hidden bg-muted">
                    <img
                      src={p.avatar}
                      alt={p.name}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute bottom-2 left-2 px-2 py-1 bg-foreground/80 rounded text-xs text-background">
                      {p.name.split(" ")[0]}
                    </div>
                    {p.isMuted && (
                      <div className="absolute top-2 right-2 w-6 h-6 bg-destructive/80 rounded-full flex items-center justify-center">
                        <MicOff className="w-3 h-3 text-background" />
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}

            {/* Recording indicator */}
            <div className="absolute top-4 left-4 flex items-center gap-2 z-20">
              <div className="flex items-center gap-2 px-3 py-1.5 bg-foreground/80 backdrop-blur-sm rounded-full">
                <span className="text-sm font-medium text-background">G</span>
              </div>
              <span className="px-3 py-1.5 bg-accent/90 backdrop-blur-sm rounded-full text-sm font-medium text-accent-foreground">
                You
              </span>
            </div>

            <div className="absolute top-4 left-1/2 -translate-x-1/2 flex items-center gap-2 z-20">
              {/* Live Streaming Indicator */}
              {isLiveStreaming && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="flex items-center gap-2 px-3 py-1.5 bg-red-500 backdrop-blur-sm rounded-full"
                >
                  <motion.div
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ repeat: Infinity, duration: 1 }}
                    className="w-2 h-2 rounded-full bg-white"
                  />
                  <span className="text-sm font-medium text-white">LIVE</span>
                  <span className="text-sm text-white/80">{viewerCount} viewers</span>
                </motion.div>
              )}

              <button
                onClick={toggleRecording}
                className="flex items-center gap-2 px-3 py-1.5 bg-foreground/80 backdrop-blur-sm rounded-full hover:bg-foreground/90 transition-colors"
              >
                {isRecording ? (
                  <>
                    <motion.div
                      animate={{ scale: [1, 1.2, 1] }}
                      transition={{ repeat: Infinity, duration: 1.5 }}
                      className="w-3 h-3 rounded-full bg-destructive"
                    />
                    <span className="text-sm text-background">
                      Recording... {formatTime(recordingTime)}
                    </span>
                  </>
                ) : (
                  <>
                    <Circle className="w-3 h-3 text-background" />
                    <span className="text-sm text-background">Start Recording</span>
                  </>
                )}
              </button>
            </div>

            {/* Top right controls */}
            <div className="absolute top-4 right-4 flex items-center gap-2 z-20">
              <button
                onClick={() => setViewMode(viewMode === "speaker" ? "grid" : "speaker")}
                className={cn(
                  "w-10 h-10 rounded-lg flex items-center justify-center transition-colors",
                  viewMode === "grid"
                    ? "bg-accent text-accent-foreground"
                    : "bg-card/80 backdrop-blur-sm hover:bg-card"
                )}
              >
                <LayoutGrid className="w-5 h-5" />
              </button>
              <button
                onClick={toggleFullscreen}
                className="w-10 h-10 rounded-lg bg-card/80 backdrop-blur-sm flex items-center justify-center hover:bg-card transition-colors"
              >
                {isFullscreen ? (
                  <Minimize className="w-5 h-5" />
                ) : (
                  <Maximize className="w-5 h-5" />
                )}
              </button>
              <button
                onClick={() => setSubtitlesEnabled(!subtitlesEnabled)}
                className={cn(
                  "w-10 h-10 rounded-lg flex items-center justify-center transition-colors",
                  subtitlesEnabled
                    ? "bg-accent text-accent-foreground"
                    : "bg-card/80 backdrop-blur-sm hover:bg-card"
                )}
              >
                {subtitlesEnabled ? (
                  <Captions className="w-5 h-5" />
                ) : (
                  <CaptionsOff className="w-5 h-5" />
                )}
              </button>
              <button
                onClick={() => setShowSettings(true)}
                className="w-10 h-10 rounded-lg bg-card/80 backdrop-blur-sm flex items-center justify-center hover:bg-card transition-colors"
              >
                <Settings className="w-5 h-5" />
              </button>
            </div>

            {/* Hand raised indicator */}
            <AnimatePresence>
              {isHandRaised && (
                <motion.div
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0 }}
                  className="absolute top-20 left-4 px-4 py-2 bg-yellow-500 rounded-full flex items-center gap-2"
                >
                  <Hand className="w-5 h-5 text-white" />
                  <span className="text-sm font-medium text-white">Hand Raised</span>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Video Controls */}
            <div className="absolute bottom-20 left-1/2 -translate-x-1/2 z-20">
              <VideoControls
                isMuted={isMuted}
                isVideoOff={isVideoOff}
                isScreenSharing={isScreenSharing}
                isHandRaised={isHandRaised}
                isLiveStreaming={isLiveStreaming}
                onToggleMute={() => setIsMuted(!isMuted)}
                onToggleVideo={() => setIsVideoOff(!isVideoOff)}
                onEndCall={handleEndCall}
                onToggleScreenShare={() => setIsScreenSharing(!isScreenSharing)}
                onToggleHandRaise={() => setIsHandRaised(!isHandRaised)}
                onToggleLiveStream={() => setShowLiveStreamModal(true)}
                onOpenBackgrounds={() => setShowBackgroundModal(true)}
              />
            </div>

            {/* Subtitles */}
            <div className="absolute bottom-4 left-4 right-4 z-20">
              <AnimatePresence>
                <SubtitleBar
                  text={subtitles[currentSubtitle]}
                  isEnabled={subtitlesEnabled}
                  onToggle={() => setSubtitlesEnabled(false)}
                  onSettings={() => setShowSettings(true)}
                />
              </AnimatePresence>
            </div>
          </motion.div>

          {/* Participant Thumbnails */}
          <div className="flex gap-4 overflow-x-auto pb-2">
            {participants.map((participant, index) => (
              <div key={participant.id} className="w-48 shrink-0">
                <ParticipantThumbnail
                  participant={participant}
                  index={index}
                  isSelected={selectedParticipant === participant.id}
                  onClick={() => setSelectedParticipant(
                    selectedParticipant === participant.id ? null : participant.id
                  )}
                  onToggleMute={() => handleToggleParticipantMute(participant.id)}
                />
              </div>
            ))}
            <button className="w-12 h-full min-h-[108px] rounded-2xl bg-card border border-border flex items-center justify-center hover:bg-muted transition-colors shrink-0">
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Sidebar Toggle for Mobile */}
        <div className="lg:hidden flex justify-end">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setShowSidebar(!showSidebar)}
            className="gap-2"
          >
            {showSidebar ? <X className="w-4 h-4" /> : <MessageSquare className="w-4 h-4" />}
            {showSidebar ? "Hide" : "Show"} Chat
          </Button>
        </div>

        {/* Sidebar */}
        <AnimatePresence>
          {showSidebar && (
            <Sidebar
              activeTab={activeTab}
              onTabChange={setActiveTab}
              participants={participants}
              chatMessages={chatMessages}
              onSendMessage={handleSendMessage}
              onToggleParticipantMute={handleToggleParticipantMute}
              onRemoveParticipant={handleRemoveParticipant}
            />
          )}
        </AnimatePresence>
      </div>

      {/* Settings Modal */}
      <AnimatePresence>
        {showSettings && (
          <SettingsModal
            isOpen={showSettings}
            onClose={() => setShowSettings(false)}
            volume={volume}
            onVolumeChange={setVolume}
          />
        )}
      </AnimatePresence>

      {/* Virtual Background Modal */}
      <AnimatePresence>
        {showBackgroundModal && (
          <VirtualBackgroundModal
            isOpen={showBackgroundModal}
            onClose={() => setShowBackgroundModal(false)}
            currentBackground={currentBackground}
            onSelectBackground={handleSelectBackground}
          />
        )}
      </AnimatePresence>

      {/* Live Stream Modal */}
      <AnimatePresence>
        {showLiveStreamModal && (
          <LiveStreamModal
            isOpen={showLiveStreamModal}
            onClose={() => setShowLiveStreamModal(false)}
            isStreaming={isLiveStreaming}
            onToggleStream={toggleLiveStream}
            viewerCount={viewerCount}
            streamDuration={streamDuration}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
