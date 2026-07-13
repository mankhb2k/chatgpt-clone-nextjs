"use client";

import React, { useState } from "react";
import { useChatStore } from "@/store/chatStore";
import { Search, X, MessageSquare, Plus } from "lucide-react";

export function SearchModal() {
  const {
    chats,
    isSearchModalOpen,
    setSearchModalOpen,
    setCurrentChatId,
    createNewChat
  } = useChatStore();

  const [query, setQuery] = useState("");

  if (!isSearchModalOpen) return null;

  // Lọc các cuộc hội thoại khớp với từ khóa tìm kiếm
  const filteredChats = chats.filter((chat) =>
    chat.title.toLowerCase().includes(query.toLowerCase())
  );

  // Nhóm các cuộc trò chuyện theo thời gian (Today, Yesterday, Older)
  const getGroupedChats = () => {
    const today: typeof chats = [];
    const yesterday: typeof chats = [];
    const older: typeof chats = [];

    const now = new Date();
    const startOfToday = new Date(now.getFullYear(), now.getMonth(), now.getDate()).getTime();
    const startOfYesterday = startOfToday - 24 * 60 * 60 * 1000;

    filteredChats.forEach((chat) => {
      if (chat.createdAt >= startOfToday) {
        today.push(chat);
      } else if (chat.createdAt >= startOfYesterday) {
        yesterday.push(chat);
      } else {
        older.push(chat);
      }
    });

    return { today, yesterday, older };
  };

  const { today, yesterday, older } = getGroupedChats();

  const handleSelectChat = (id: string) => {
    setCurrentChatId(id);
    setSearchModalOpen(false);
  };

  const handleNewChat = () => {
    createNewChat();
    setSearchModalOpen(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop nền tối mờ phía sau */}
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={() => setSearchModalOpen(false)}
      />

      {/* Khung Modal chính (Screenshot 2) */}
      <div className="relative z-10 w-full max-w-lg rounded-2xl border border-[#2f2f2f] bg-[#212121] text-[#ececec] shadow-2xl overflow-hidden flex flex-col max-h-[500px]">
        {/* Hộp tìm kiếm đầu trang */}
        <div className="flex items-center gap-2 border-b border-[#2f2f2f] px-4 py-3">
          <Search className="h-5 w-5 text-slate-400 shrink-0" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search chats..."
            className="w-full bg-transparent text-[15px] outline-none placeholder-slate-500 text-white"
            autoFocus
          />
          <button
            onClick={() => setSearchModalOpen(false)}
            className="rounded-full p-1 hover:bg-[#2f2f2f] text-slate-400 hover:text-slate-200 transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Thân Modal chứa danh sách và kết quả */}
        <div className="flex-1 overflow-y-auto p-2 space-y-4">
          
          {/* Nút tạo Chat mới */}
          <button
            onClick={handleNewChat}
            className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-semibold hover:bg-[#2f2f2f] transition-colors text-left"
          >
            <div className="flex h-5 w-5 items-center justify-center rounded bg-[#2f2f2f] text-slate-300">
              <Plus className="h-4 w-4" />
            </div>
            <span>New chat</span>
          </button>

          {/* NHÓM 1: TODAY */}
          {today.length > 0 && (
            <div>
              <div className="px-3 py-1.5 text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                Today
              </div>
              <div className="space-y-0.5 mt-1">
                {today.map((chat) => (
                  <button
                    key={chat.id}
                    onClick={() => handleSelectChat(chat.id)}
                    className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm hover:bg-[#2f2f2f] transition-colors text-left"
                  >
                    <MessageSquare className="h-4 w-4 text-slate-400 shrink-0" />
                    <span className="truncate text-slate-200">{chat.title}</span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* NHÓM 2: YESTERDAY */}
          {yesterday.length > 0 && (
            <div>
              <div className="px-3 py-1.5 text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                Yesterday
              </div>
              <div className="space-y-0.5 mt-1">
                {yesterday.map((chat) => (
                  <button
                    key={chat.id}
                    onClick={() => handleSelectChat(chat.id)}
                    className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm hover:bg-[#2f2f2f] transition-colors text-left"
                  >
                    <MessageSquare className="h-4 w-4 text-slate-400 shrink-0" />
                    <span className="truncate text-slate-200">{chat.title}</span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* NHÓM 3: OLDER / PREVIOUS 7 DAYS */}
          {older.length > 0 && (
            <div>
              <div className="px-3 py-1.5 text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                Previous 7 Days
              </div>
              <div className="space-y-0.5 mt-1">
                {older.map((chat) => (
                  <button
                    key={chat.id}
                    onClick={() => handleSelectChat(chat.id)}
                    className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm hover:bg-[#2f2f2f] transition-colors text-left"
                  >
                    <MessageSquare className="h-4 w-4 text-slate-400 shrink-0" />
                    <span className="truncate text-slate-200">{chat.title}</span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Khi không tìm thấy kết quả nào */}
          {filteredChats.length === 0 && (
            <div className="py-8 text-center text-sm text-slate-500">
              No results found for "{query}"
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
