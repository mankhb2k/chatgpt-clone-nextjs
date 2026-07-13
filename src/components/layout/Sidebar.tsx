"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useChatStore } from "@/store/chatStore";
import {
  PanelLeftClose,
  Plus,
  Search,
  BookOpen,
  Folder,
  AtSign,
  Terminal,
  MoreHorizontal,
  Gift,
  Trash2,
  Edit3,
  Check,
  X,
  Settings,
  LogOut,
  Sliders,
  User,
  HelpCircle,
  ChevronRight,
  Sparkles
} from "lucide-react";

export function Sidebar() {
  const {
    chats,
    currentChatId,
    currentView,
    setCurrentChatId,
    setCurrentView,
    createNewChat,
    deleteChat,
    renameChat,
    setSidebarOpen,
    setSearchModalOpen,
    isProfileMenuOpen,
    setProfileMenuOpen,
    setSettingsModalOpen
  } = useChatStore();

  // Trạng thái cục bộ phục vụ việc sửa tên chat trực tiếp tại danh sách
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editTitle, setEditTitle] = useState("");

  // Trạng thái hiển thị menu xác nhận xóa của từng chat
  const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null);

  // Kích hoạt chế độ sửa tên
  const startEditing = (id: string, currentTitle: string, e: React.MouseEvent) => {
    e.stopPropagation(); // Ngăn sự kiện click chọn chat
    setEditingId(id);
    setEditTitle(currentTitle);
  };

  // Lưu tên mới sau khi sửa
  const saveRename = (id: string, e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (editTitle.trim()) {
      renameChat(id, editTitle.trim());
    }
    setEditingId(null);
  };

  // Hủy sửa tên
  const cancelRename = (e: React.MouseEvent) => {
    e.stopPropagation();
    setEditingId(null);
  };

  // Mở popup xác nhận xóa
  const triggerDelete = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setDeleteConfirmId(id);
  };

  // Thực hiện xóa chat thực tế
  const confirmDelete = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    deleteChat(id);
    setDeleteConfirmId(null);
  };

  // Hủy xóa chat
  const cancelDelete = (e: React.MouseEvent) => {
    e.stopPropagation();
    setDeleteConfirmId(null);
  };

  return (
    <div className="flex h-full w-[260px] flex-col bg-[#171717] text-[#ececec] border-r border-[#2f2f2f] select-none">
      
      {/* 1. Header: Logo và Nút thu nhỏ Sidebar - Screenshot 1 */}
      <div className="flex items-center justify-between px-3.5 py-3">
        {/* ChatGPT SVG Logo */}
        <div className="flex items-center gap-2 cursor-pointer" onClick={() => setCurrentView("chat")}>
          <svg
            viewBox="0 0 24 24"
            className="h-6 w-6 fill-current text-white hover:opacity-85 transition-opacity"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M21.74 11.9a.86.86 0 0 0-.15-.43L19 7.63V4.5a1.5 1.5 0 0 0-1.5-1.5H14.4l-3.84-2.6a.85.85 0 0 0-.89 0L6.83 3H3.75A1.5 1.5 0 0 0 2.25 4.5v3.13L.36 11.47a.86.86 0 0 0 0 .86l1.89 3.84V19.3a1.5 1.5 0 0 0 1.5 1.5h3.08l3.84 2.6a.86.86 0 0 0 .89 0l3.84-2.6H17.5a1.5 1.5 0 0 0 1.5-1.5v-3.13l1.89-3.84a.86.86 0 0 0 .85-.83zM12 21.36L8.85 19.3H4.25v-4.6L2.14 12l2.11-2.7v-4.6h4.6L12 2.64l3.15 2.06h4.6v4.6L21.86 12l-2.11 2.7v4.6h-4.6z"/>
            <circle cx="12" cy="12" r="2"/>
          </svg>
        </div>
        {/* Nút thu nhỏ Sidebar */}
        <button
          onClick={() => setSidebarOpen(false)}
          className="rounded-md p-1.5 hover:bg-[#212121] text-slate-400 hover:text-slate-200 transition-colors cursor-pointer"
          title="Close sidebar"
        >
          <PanelLeftClose className="h-5 w-5" />
        </button>
      </div>

      {/* 2. Menu Điều Hướng Chính */}
      <div className="px-3 py-1.5 space-y-1">
        {/* Nút Chat mới (Sử dụng biểu tượng Edit3/SquarePen của ChatGPT) */}
        <button
          onClick={() => createNewChat()}
          className="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm text-slate-300 hover:bg-[#212121] transition-colors cursor-pointer"
        >
          <Edit3 className="h-4 w-4 text-slate-400" />
          <span>New chat</span>
        </button>

        {/* Nút Tìm kiếm Chat */}
        <button
          onClick={() => setSearchModalOpen(true)}
          className="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm text-slate-300 hover:bg-[#212121] transition-colors cursor-pointer"
        >
          <Search className="h-4 w-4 text-slate-400" />
          <span>Search chats</span>
        </button>

        {/* Nút Thư viện */}
        <button
          onClick={() => setCurrentView("library")}
          className={`flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors cursor-pointer ${
            currentView === "library" ? "bg-[#212121] text-white" : "text-slate-300 hover:bg-[#212121]"
          }`}
        >
          <BookOpen className="h-4 w-4" />
          <span>Library</span>
        </button>

        {/* Nút Dự án */}
        <button
          onClick={() => setCurrentView("projects")}
          className={`flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors cursor-pointer ${
            currentView === "projects" ? "bg-[#212121] text-white" : "text-slate-300 hover:bg-[#212121]"
          }`}
        >
          <Folder className="h-4 w-4" />
          <span>Projects</span>
        </button>

        {/* Nút Plugins */}
        <div className="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm text-slate-300 hover:bg-[#212121] transition-colors cursor-pointer opacity-75">
          <AtSign className="h-4 w-4" />
          <span>Plugins</span>
        </div>

        {/* Nút Codex */}
        <div className="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm text-slate-300 hover:bg-[#212121] transition-colors cursor-pointer opacity-75">
          <Terminal className="h-4 w-4" />
          <span>Codex</span>
        </div>

        {/* Nút Xem thêm */}
        <div className="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm text-slate-300 hover:bg-[#212121] transition-colors cursor-pointer opacity-75">
          <MoreHorizontal className="h-4 w-4" />
          <span>More</span>
        </div>
      </div>

      {/* 3. Danh sách cuộc hội thoại gần đây (Recents) */}
      <div className="mt-4 flex-1 overflow-y-auto px-3">
        <h3 className="px-3 text-xs font-semibold text-slate-500 uppercase tracking-wider select-none mb-1">
          Recents
        </h3>
        <div className="space-y-0.5">
          {chats.map((chat) => {
            const isSelected = chat.id === currentChatId && currentView === "chat";
            const isEditing = editingId === chat.id;
            const isDeleting = deleteConfirmId === chat.id;

            return (
              <div
                key={chat.id}
                onClick={() => {
                  if (!isEditing && !isDeleting) {
                    setCurrentChatId(chat.id);
                  }
                }}
                className={`group relative flex items-center justify-between rounded-lg px-3 py-2 text-sm transition-all duration-150 cursor-pointer ${
                  isSelected ? "bg-[#212121] text-white" : "text-slate-300 hover:bg-[#212121]"
                }`}
              >
                {/* 3.1. Chế độ sửa tên trực tiếp */}
                {isEditing ? (
                  <form
                    onSubmit={(e) => saveRename(chat.id, e)}
                    className="flex w-full items-center gap-1.5"
                    onClick={(e) => e.stopPropagation()} // Chống click chọn chat khi đang gõ
                  >
                    <input
                      type="text"
                      value={editTitle}
                      onChange={(e) => setEditTitle(e.target.value)}
                      className="w-full rounded border border-[#10a37f] bg-transparent px-1.5 py-0.5 text-xs text-white outline-none focus:ring-1 focus:ring-[#10a37f]"
                      autoFocus
                    />
                    <button type="submit" className="text-emerald-500 hover:text-emerald-400 p-0.5">
                      <Check className="h-3.5 w-3.5" />
                    </button>
                    <button type="button" onClick={cancelRename} className="text-rose-500 hover:text-rose-400 p-0.5">
                      <X className="h-3.5 w-3.5" />
                    </button>
                  </form>
                ) : (
                  // 3.2. Chế độ hiển thị bình thường
                  <>
                    <span className="truncate pr-8 text-[13.5px] font-normal leading-relaxed">
                      {chat.title}
                    </span>

                    {/* Nút sửa/xóa nổi lên khi hover chuột vào item */}
                    <div className="absolute right-2 flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity bg-gradient-to-l from-[#212121] via-[#212121] to-transparent pl-4">
                      <button
                        onClick={(e) => startEditing(chat.id, chat.title, e)}
                        className="text-slate-400 hover:text-slate-200 p-0.5"
                        title="Rename"
                      >
                        <Edit3 className="h-3.5 w-3.5" />
                      </button>
                      <button
                        onClick={(e) => triggerDelete(chat.id, e)}
                        className="text-slate-400 hover:text-rose-400 p-0.5"
                        title="Delete"
                      >
                        <Trash2 className="h-3.5 w-3.5" />
                      </button>
                    </div>
                  </>
                )}

                {/* 3.3. Hộp thoại popup xác thực xóa nổi lên bên trong mục đó */}
                {isDeleting && (
                  <div
                    onClick={(e) => e.stopPropagation()}
                    className="absolute inset-0 z-10 flex items-center justify-between rounded-lg bg-[#2f2f2f] px-3 text-xs"
                  >
                    <span className="text-slate-200">Delete chat?</span>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={(e) => confirmDelete(chat.id, e)}
                        className="rounded bg-rose-600 px-2 py-1 font-semibold text-white hover:bg-rose-500 transition-colors"
                      >
                        Delete
                      </button>
                      <button
                        onClick={cancelDelete}
                        className="rounded bg-[#424242] px-2 py-1 font-semibold text-slate-300 hover:bg-[#525252] transition-colors"
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* 4. Footer: Nút Claim Offer và Thông tin tài khoản */}
      <div className="p-3 border-t border-[#2f2f2f] space-y-2">
        {/* Nút Claim Offer */}
        <button className="flex w-full items-center justify-center gap-2 rounded-full border border-[#2f2f2f] bg-transparent py-2 text-xs font-semibold hover:bg-[#212121] transition-colors cursor-pointer">
          <Gift className="h-4 w-4 text-amber-500" />
          <span>Claim offer</span>
        </button>

        {/* Hộp thoại thông tin cá nhân (Profile Menu Dropdown) - Screenshot 4 */}
        <div className="relative">
          {isProfileMenuOpen && (
            <>
              {/* Backdrop để tắt menu khi click ra ngoài */}
              <div
                className="fixed inset-0 z-30"
                onClick={(e) => {
                  e.stopPropagation();
                  setProfileMenuOpen(false);
                }}
              />
              <div
                onClick={(e) => e.stopPropagation()}
                className="absolute bottom-full left-0 mb-2 z-40 w-[236px] rounded-2xl border border-[#2f2f2f] bg-[#171717] p-1.5 shadow-2xl animate-in fade-in slide-in-from-bottom-2 duration-150"
              >
                {/* Mục Profile ở trên cùng */}
                <div className="flex items-center justify-between rounded-lg p-2.5 hover:bg-[#212121] transition-colors cursor-pointer">
                  <div className="flex items-center gap-2.5">
                    <div className="flex h-6 w-6 items-center justify-center rounded-full bg-pink-500 text-[10px] font-bold text-white">
                      TN
                    </div>
                    <div className="text-[13px] font-medium text-white truncate max-w-[130px]">
                      Truong Nguyen
                    </div>
                  </div>
                  <ChevronRight className="h-3.5 w-3.5 text-slate-500" />
                </div>

                <div className="my-1 border-t border-[#2f2f2f]" />

                {/* Try Plus Free */}
                <div className="flex items-center gap-2.5 rounded-lg p-2.5 hover:bg-[#212121] text-[13px] text-slate-200 transition-colors cursor-pointer">
                  <Sparkles className="h-4 w-4 text-purple-400" />
                  <span>Try Plus free</span>
                </div>

                {/* Personalization */}
                <div className="flex items-center gap-2.5 rounded-lg p-2.5 hover:bg-[#212121] text-[13px] text-slate-200 transition-colors cursor-pointer">
                  <Sliders className="h-4 w-4 text-slate-400" />
                  <span>Personalization</span>
                </div>

                {/* Profile */}
                <Link
                  href="/profile"
                  onClick={() => setProfileMenuOpen(false)}
                  className="flex items-center gap-2.5 rounded-lg p-2.5 hover:bg-[#212121] text-[13px] text-slate-200 transition-colors cursor-pointer"
                >
                  <User className="h-4 w-4 text-slate-400" />
                  <span>Profile</span>
                </Link>

                {/* Settings */}
                <div
                  onClick={() => {
                    setSettingsModalOpen(true);
                    setProfileMenuOpen(false);
                  }}
                  className="flex items-center gap-2.5 rounded-lg p-2.5 hover:bg-[#212121] text-[13px] text-slate-200 transition-colors cursor-pointer"
                >
                  <Settings className="h-4 w-4 text-slate-400" />
                  <span>Settings</span>
                </div>

                <div className="my-1 border-t border-[#2f2f2f]" />

                {/* Help */}
                <div className="flex items-center justify-between rounded-lg p-2.5 hover:bg-[#212121] text-[13px] text-slate-200 transition-colors cursor-pointer">
                  <div className="flex items-center gap-2.5">
                    <HelpCircle className="h-4 w-4 text-slate-400" />
                    <span>Help</span>
                  </div>
                  <ChevronRight className="h-3.5 w-3.5 text-slate-500" />
                </div>

                {/* Log out */}
                <div className="flex items-center gap-2.5 rounded-lg p-2.5 hover:bg-[#212121] text-[13px] text-rose-400 hover:bg-rose-500/10 transition-colors cursor-pointer">
                  <LogOut className="h-4 w-4" />
                  <span>Log out</span>
                </div>
              </div>
            </>
          )}

          {/* Button thông tin tài khoản */}
          <div
            onClick={() => setProfileMenuOpen(!isProfileMenuOpen)}
            className="flex items-center gap-3 rounded-lg p-2 hover:bg-[#212121] transition-colors cursor-pointer"
          >
            {/* Avatar viết tắt của Truong Nguyen */}
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-pink-500 text-xs font-bold text-white">
              TN
            </div>
            <div className="flex-1 overflow-hidden">
              <div className="truncate text-sm font-semibold text-white">Truong Nguyen</div>
              <div className="text-xs text-slate-400">Free</div>
            </div>
          </div>
        </div>
      </div>

    </div>
  );
}
