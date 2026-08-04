import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Send, ArrowLeft, Search, Plus, MessageSquare, Sparkles, CheckCircle2, Clock } from "lucide-react";
import { useStudentMatching } from "../../context/StudentMatchingContext";
import Avatar from "../../components/ui/Avatar";
import Badge from "../../components/ui/Badge";
import Button from "../../components/ui/Button";
import QuizMessageCard from "../../components/cards/QuizMessageCard";

export default function StudentChat() {
  const navigate = useNavigate();
  const {
    threadsList,
    activeTutorId,
    setActiveTutorId,
    selectedTutor,
    activeThreadStatus,
    chatMessages,
    setChatMessages,
  } = useStudentMatching();

  const [inputMessage, setInputMessage] = useState("");
  const chatEndRef = useRef(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chatMessages, activeTutorId]);

  function handleSendMessage(e) {
    e.preventDefault();
    if (!inputMessage.trim()) return;

    const newMsg = {
      id: `msg-${Date.now()}`,
      sender: "student",
      timestamp: new Date().toLocaleTimeString("vi-VN", { hour: "2-digit", minute: "2-digit" }),
      text: inputMessage.trim(),
    };

    setChatMessages((prev) => [...prev, newMsg]);
    setInputMessage("");

    // Simulate quick response from selected tutor after 1s
    setTimeout(() => {
      setChatMessages((prev) => [
        ...prev,
        {
          id: `msg-reply-${Date.now()}`,
          sender: "tutor",
          timestamp: "Vừa xong",
          text: `Gia sư ${selectedTutor?.name || ""} đã nhận được tin nhắn của bạn và sẽ phản hồi trong giây lát!`,
        },
      ]);
    }, 1000);
  }

  const statusBadgeMap = {
    MATCHED: { label: "Đã Match", tone: "emerald" },
    WAITING_APPROVAL: { label: "Chờ duyệt", tone: "amber" },
    "CHAT_&_QUIZ": { label: "Làm Test", tone: "blue" },
    ONBOARDING: { label: "Điền Hồ sơ", tone: "neutral" },
  };

  return (
    <div className="flex h-[calc(100vh-7rem)] overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm dark:border-slate-800 dark:bg-slate-900">
      {/* Left Column: Tutors Inbox List */}
      <div className="flex w-72 flex-col border-r border-slate-200 bg-slate-50/50 dark:border-slate-800 dark:bg-slate-950/60 md:w-80 shrink-0">
        {/* Header & Add Tutor */}
        <div className="p-4 border-b border-slate-200 dark:border-slate-800">
          <div className="mb-3 flex items-center justify-between">
            <h2 className="text-base font-bold text-slate-900 dark:text-slate-50 flex items-center gap-2">
              <MessageSquare size={18} className="text-blue-600 dark:text-blue-400" /> Hộp thư & Bài Test
            </h2>
            <span className="rounded-full bg-blue-100 px-2 py-0.5 text-xs font-bold text-blue-700 dark:bg-blue-950 dark:text-blue-300">
              {threadsList.length}
            </span>
          </div>

          <Button
            onClick={() => navigate("/student/marketplace")}
            variant="secondary"
            className="w-full text-xs"
          >
            <Plus size={14} /> Tìm & Kết nối Gia sư khác
          </Button>
        </div>

        {/* List of Tutors */}
        <div className="flex-1 overflow-y-auto divide-y divide-slate-100 dark:divide-slate-800/60">
          {threadsList.map((thread) => {
            const isActive = thread.id === activeTutorId;
            const statusConfig = statusBadgeMap[thread.studentStatus] || { label: "Đã kết nối", tone: "neutral" };
            const lastMsg = thread.chatMessages?.[thread.chatMessages.length - 1];

            return (
              <button
                key={thread.id}
                onClick={() => setActiveTutorId(thread.id)}
                className={`w-full p-3.5 text-left transition-all flex items-start gap-3 ${
                  isActive
                    ? "bg-white shadow-xs dark:bg-slate-800/90 border-l-4 border-blue-600 dark:border-blue-400"
                    : "hover:bg-slate-100/70 dark:hover:bg-slate-800/40"
                }`}
              >
                <Avatar initials={thread.tutor?.initials || "GS"} size="md" />

                <div className="min-w-0 flex-1">
                  <div className="mb-0.5 flex items-center justify-between gap-1">
                    <p className={`truncate text-sm font-semibold ${isActive ? "text-blue-700 dark:text-blue-300" : "text-slate-900 dark:text-slate-100"}`}>
                      {thread.tutor?.name}
                    </p>
                    <Badge tone={statusConfig.tone}>{statusConfig.label}</Badge>
                  </div>

                  <p className="truncate text-xs text-slate-500 dark:text-slate-400">
                    {thread.tutor?.specialization?.[0]} &middot; {thread.tutor?.ratePerHour}
                  </p>

                  <p className="mt-1.5 truncate text-[11px] text-slate-400 dark:text-slate-500">
                    {lastMsg?.text || (lastMsg?.type ? "Đã gửi bản tin mới" : "Chưa có tin nhắn")}
                  </p>
                </div>
              </button>
            );
          })}

          {threadsList.length === 0 && (
            <div className="p-6 text-center text-xs text-slate-400">
              Chưa có cuộc trò chuyện nào. Hãy tìm gia sư trên Marketplace để bắt đầu!
            </div>
          )}
        </div>
      </div>

      {/* Right Column: Chat Window for Active Tutor */}
      <div className="flex flex-1 flex-col">
        {/* Selected Tutor Header Bar */}
        <div className="flex items-center justify-between border-b border-slate-200 bg-white p-3.5 dark:border-slate-800 dark:bg-slate-900">
          <div className="flex items-center gap-3">
            <Avatar initials={selectedTutor?.initials || "GS"} size="md" />
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-semibold text-slate-900 dark:text-slate-50">{selectedTutor?.name}</h3>
                <Badge tone={statusBadgeMap[activeThreadStatus]?.tone || "neutral"}>
                  {statusBadgeMap[activeThreadStatus]?.label || "Đã kết nối"}
                </Badge>
              </div>
              <p className="text-xs text-slate-500">
                {selectedTutor?.specialization?.join(" · ")} &middot; {selectedTutor?.ratePerHour}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => navigate("/student/marketplace")}
              className="text-xs text-slate-500"
            >
              <Search size={14} /> Danh sách Gia sư
            </Button>
          </div>
        </div>

        {/* Chat Messages Stream */}
        <div className="flex-1 overflow-y-auto bg-slate-50/50 p-4 dark:bg-slate-950/40">
          <div className="mx-auto max-w-3xl space-y-4">
            {chatMessages.map((msg) => {
              if (msg.sender === "system") {
                return (
                  <div key={msg.id} className="py-2 text-center text-xs text-slate-400">
                    <span className="rounded-full bg-slate-200/60 px-3 py-1 dark:bg-slate-800">{msg.text}</span>
                  </div>
                );
              }

              // Rich interactive cards
              if (msg.type) {
                return <QuizMessageCard key={msg.id} message={msg} />;
              }

              const isStudent = msg.sender === "student";

              return (
                <div key={msg.id} className={`flex items-start gap-2.5 ${isStudent ? "flex-row-reverse" : ""}`}>
                  <Avatar initials={isStudent ? "HS" : selectedTutor?.initials || "GS"} size="sm" />
                  <div className={`max-w-[75%] space-y-1 ${isStudent ? "items-end text-right" : ""}`}>
                    <div
                      className={`rounded-2xl px-4 py-2.5 text-xs shadow-xs ${
                        isStudent
                          ? "bg-blue-600 text-white dark:bg-blue-600"
                          : "bg-white text-slate-800 dark:bg-slate-800 dark:text-slate-100"
                      }`}
                    >
                      {msg.text}
                    </div>
                    <span className="block text-[10px] text-slate-400">{msg.timestamp}</span>
                  </div>
                </div>
              );
            })}
            <div ref={chatEndRef} />
          </div>
        </div>

        {/* Input Footer */}
        <form onSubmit={handleSendMessage} className="flex items-center gap-2 border-t border-slate-200 bg-white p-3 dark:border-slate-800 dark:bg-slate-900">
          <input
            type="text"
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            placeholder={`Nhắn tin với Gia sư ${selectedTutor?.name || ""}...`}
            className="flex-1 rounded-xl border border-slate-200 bg-slate-50 px-4 py-2.5 text-xs outline-none focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-100 dark:border-slate-800 dark:bg-slate-950 dark:focus:border-blue-500"
          />
          <Button type="submit" size="md">
            <Send size={16} />
          </Button>
        </form>
      </div>
    </div>
  );
}
