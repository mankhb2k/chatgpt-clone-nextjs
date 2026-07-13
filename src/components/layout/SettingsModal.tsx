import {
  X,
  Settings,
  Bell,
  Sliders,
  AtSign,
  Mic,
  CreditCard,
  Database,
  Box,
  Shield,
  Key,
  Users,
  User,
  Keyboard,
  ChevronDown,
  Lock
} from "lucide-react";
import React, { useState } from "react";
import { Dialog } from "@/components/ui/Dialog";
import { Switch } from "@/components/ui/Switch";
import { useChatStore } from "@/store/chatStore";

export function SettingsModal() {
  const { isSettingsModalOpen, setSettingsModalOpen } = useChatStore();
  const [activeTab, setActiveTab] = useState("general");
  const [isBannerVisible, setBannerVisible] = useState(true);
  const [higherIntel, setHigherIntel] = useState(true);
  const [enableDictation, setEnableDictation] = useState(false);

  // Danh sách các tab ở cột bên trái
  const tabs = [
    { id: "general", label: "General", icon: Settings },
    { id: "notifications", label: "Notifications", icon: Bell },
    { id: "personalization", label: "Personalization", icon: Sliders },
    { id: "plugins", label: "Plugins", icon: AtSign },
    { id: "voice", label: "Voice", icon: Mic },
    { id: "billing", label: "Billing", icon: CreditCard },
    { id: "data-controls", label: "Data controls", icon: Database },
    { id: "storage", label: "Storage", icon: Box },
    { id: "safety", label: "Safety", icon: Shield },
    { id: "security-login", label: "Security and login", icon: Key },
    { id: "parental-controls", label: "Parental controls", icon: User },
    { id: "trusted-contact", label: "Trusted contact", icon: Users },
    { id: "account", label: "Account", icon: User },
    { id: "keyboard", label: "Keyboard", icon: Keyboard },
  ];

  return (
    <Dialog
      isOpen={isSettingsModalOpen}
      onClose={() => setSettingsModalOpen(false)}
      className="max-w-3xl h-[580px]"
      showOverlayBlur={true}
    >
      <div className="w-full h-full flex overflow-hidden">
        {/* CỘT TRÁI: Thanh Menu Điều hướng Cài đặt */}
        <div className="w-[240px] bg-[#171717] border-r border-[#2f2f2f] flex flex-col p-3 shrink-0">
          {/* Nút Đóng Modal ở trên cùng cột trái */}
          <div className="mb-2">
            <button
              onClick={() => setSettingsModalOpen(false)}
              className="rounded-md p-1.5 hover:bg-[#212121] text-slate-400 hover:text-slate-200 transition-colors cursor-pointer"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          {/* Danh sách các tab */}
          <div className="flex-1 overflow-y-auto space-y-0.5 custom-scrollbar pr-1">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex w-full items-center gap-3 rounded-lg px-2.5 py-2 text-[13px] font-medium transition-colors text-left cursor-pointer ${
                    isActive
                      ? "bg-[#212121] text-white"
                      : "text-slate-400 hover:text-slate-200 hover:bg-[#212121]/50"
                  }`}
                >
                  <Icon className="h-4 w-4 shrink-0" />
                  <span className="truncate">{tab.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* CỘT PHẢI: Vùng nội dung chi tiết cài đặt */}
        <div className="flex-1 bg-[#171717] flex flex-col overflow-hidden">
          
          {/* Chỉ render chi tiết nội dung khi tab đang chọn là "general" */}
          {activeTab === "general" ? (
            <div className="flex-1 overflow-y-auto p-6 space-y-6 custom-scrollbar">
              <h2 className="text-lg font-semibold text-white">General</h2>

              {/* Banner bảo mật MFA (Screenshot 3) */}
              {isBannerVisible && (
                <div className="relative rounded-xl border border-[#2f2f2f] bg-black p-4 flex gap-3.5">
                  {/* Icon Khiên Khóa */}
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-[#212121] text-white">
                    <Lock className="h-4.5 w-4.5" />
                  </div>

                  {/* Nội dung Banner */}
                  <div className="flex-1 pr-6">
                    <h4 className="text-sm font-semibold text-white">Secure your account</h4>
                    <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                      Add multi-factor authentication (MFA), like a text message or authenticator app, to help protect your account when logging in.
                    </p>
                    <button className="mt-3 rounded-full border border-[#2f2f2f] bg-black px-4 py-1.5 text-xs font-semibold text-white hover:bg-[#212121] transition-colors cursor-pointer">
                      Set up MFA
                    </button>
                  </div>

                  {/* Nút tắt banner */}
                  <button
                    onClick={() => setBannerVisible(false)}
                    className="absolute top-3 right-3 text-slate-500 hover:text-slate-300 p-0.5 rounded cursor-pointer"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>
              )}

              {/* Các tùy chọn cài đặt hệ thống */}
              <div className="space-y-4 pt-1">
                
                {/* 1. Appearance */}
                <div className="flex items-center justify-between border-b border-[#2f2f2f]/40 pb-3">
                  <span className="text-[13.5px] font-medium text-slate-200">Appearance</span>
                  <div className="relative">
                    <button className="flex items-center gap-1.5 rounded-lg border border-[#2f2f2f] bg-transparent px-3 py-1.5 text-xs text-slate-300 hover:bg-[#212121] cursor-pointer">
                      <span>System</span>
                      <ChevronDown className="h-3 w-3 text-slate-500" />
                    </button>
                  </div>
                </div>

                {/* 2. Contrast */}
                <div className="flex items-center justify-between border-b border-[#2f2f2f]/40 pb-3">
                  <span className="text-[13.5px] font-medium text-slate-200">Contrast</span>
                  <div className="relative">
                    <button className="flex items-center gap-1.5 rounded-lg border border-[#2f2f2f] bg-transparent px-3 py-1.5 text-xs text-slate-300 hover:bg-[#212121] cursor-pointer">
                      <span>System</span>
                      <ChevronDown className="h-3 w-3 text-slate-500" />
                    </button>
                  </div>
                </div>

                {/* 3. Accent color */}
                <div className="flex items-center justify-between border-b border-[#2f2f2f]/40 pb-3">
                  <span className="text-[13.5px] font-medium text-slate-200">Accent color</span>
                  <div className="relative">
                    <button className="flex items-center gap-2 rounded-lg border border-[#2f2f2f] bg-transparent px-3 py-1.5 text-xs text-slate-300 hover:bg-[#212121] cursor-pointer">
                      {/* Dấu chấm xám chỉ thị Default */}
                      <span className="h-2 w-2 rounded-full bg-slate-500" />
                      <span>Default</span>
                      <ChevronDown className="h-3 w-3 text-slate-500" />
                    </button>
                  </div>
                </div>

                {/* 4. Language */}
                <div className="flex items-center justify-between border-b border-[#2f2f2f]/40 pb-3">
                  <span className="text-[13.5px] font-medium text-slate-200">Language</span>
                  <div className="relative">
                    <button className="flex items-center gap-1.5 rounded-lg border border-[#2f2f2f] bg-transparent px-3 py-1.5 text-xs text-slate-300 hover:bg-[#212121] cursor-pointer">
                      <span>Auto-detect</span>
                      <ChevronDown className="h-3 w-3 text-slate-500" />
                    </button>
                  </div>
                </div>

                {/* 5. Higher intelligence */}
                <div className="border-b border-[#2f2f2f]/40 pb-3 space-y-1.5">
                  <div className="flex items-center justify-between">
                    <span className="text-[13.5px] font-medium text-slate-200">Higher intelligence</span>
                    <Switch checked={higherIntel} onChange={setHigherIntel} />
                  </div>
                  <p className="text-[11.5px] text-slate-500 leading-normal max-w-md">
                    ChatGPT can automatically use a higher intelligence setting when you ask a complex question.
                  </p>
                </div>

                {/* 6. Enable Dictation */}
                <div className="flex items-center justify-between pb-3">
                  <span className="text-[13.5px] font-medium text-slate-200">Enable Dictation</span>
                  <Switch checked={enableDictation} onChange={setEnableDictation} />
                </div>

              </div>
            </div>
          ) : (
            // Placeholder cho các tab cài đặt khác
            <div className="flex-1 flex flex-col items-center justify-center p-6 text-center select-none">
              <span className="text-slate-500 text-sm">
                Tab "{tabs.find((t) => t.id === activeTab)?.label}" is placeholder.
              </span>
            </div>
          )}

        </div>
      </div>
    </Dialog>
  );
}
