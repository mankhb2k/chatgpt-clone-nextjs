"use client";

import React from "react";
import { Sidebar } from "@/components/layout/Sidebar";
import { MainContent } from "@/components/layout/MainContent";
import { SearchModal } from "@/components/ui/SearchModal";
import { SettingsModal } from "@/components/ui/SettingsModal";
import { useChatStore } from "@/store/chatStore";

export default function Home() {
  const { isSidebarOpen } = useChatStore();

  return (
    <main className="flex h-screen w-screen overflow-hidden bg-[#0d0d0d]">
      {/* 1. Thanh điều hướng bên trái (Sidebar) */}
      {isSidebarOpen && <Sidebar />}

      {/* 2. Vùng làm việc chính bên phải */}
      <MainContent />

      {/* 3. Hộp thoại tìm kiếm hội thoại */}
      <SearchModal />

      {/* 4. Hộp thoại cài đặt tài khoản */}
      <SettingsModal />
    </main>
  );
}
