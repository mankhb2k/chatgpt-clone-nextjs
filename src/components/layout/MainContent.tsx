"use client";

import {
  PanelLeftOpen,
  ChevronDown,
  Gift,
  LayoutGrid,
  Plus,
  Mic,
  ArrowUp,
  Image as ImageIcon,
  PenTool,
  Search,
  FolderOpen,
  Square,
  Globe,
  Share2,
  MoreHorizontal,
  Grid,
  List,
  Sparkles,
  FileText
} from "lucide-react";
import React, { useState, useRef, useEffect } from "react";
import { MarkdownRenderer } from "@/components/ui/MarkdownRenderer";
import { useChatStore } from "@/store/chatStore";

export function MainContent() {
  const {
    chats,
    currentChatId,
    currentView,
    isSidebarOpen,
    isGenerating,
    setSidebarOpen,
    selectedModel,
    setSelectedModel,
    webSearchGlobal,
    setWebSearchGlobal,
    sendMessage
  } = useChatStore();

  const [input, setInput] = useState("");
  const [modelDropdownOpen, setModelDropdownOpen] = useState(false);
  const [librarySearch, setLibrarySearch] = useState("");
  const [libraryTab, setLibraryTab] = useState<"all" | "images" | "files">("all");
  const [libraryViewMode, setLibraryViewMode] = useState<"list" | "grid">("list");
  
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const activeChat = chats.find((c) => c.id === currentChatId);

  // Tự động giãn nở chiều cao của ô nhập liệu (Textarea) khi gõ nhiều dòng
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = `${Math.min(textareaRef.current.scrollHeight, 200)}px`;
    }
  }, [input]);

  // Tự động cuộn xuống cuối danh sách tin nhắn khi có tin nhắn mới hoặc đang sinh chữ
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [activeChat?.messages, isGenerating]);

  // Xử lý gửi tin nhắn
  const handleSend = () => {
    if (!input.trim() || isGenerating) return;
    void sendMessage(input.trim());
    setInput("");
  };

  // Bắt sự kiện phím Enter (nhấn Enter để gửi, Shift+Enter để xuống dòng)
  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  // Chọn gợi ý nhanh từ màn hình trang chủ
  const handleSuggestionClick = (suggestionText: string) => {
    setInput(suggestionText);
    if (textareaRef.current) {
      textareaRef.current.focus();
    }
  };

  // Dữ liệu giả lập cho phần Library (Thư viện) - Screenshot 3
  const libraryItems = [
    { name: "Pasted text.txt", type: "file", date: "Jul 10", size: "27.8 KB" },
    { name: "image(16).png", type: "image", date: "Jun 19", size: "4.40 MB" },
    { name: "image(15).png", type: "image", date: "Jun 19", size: "900 KB" },
    { name: "Independence Hall on a $100 bill.png", type: "image", date: "Jun 19", size: "3.53 MB" },
    { name: "image(14).png", type: "image", date: "Jun 19", size: "733 KB" },
    { name: "Redesigned $100 bill with Franklin portrait.png", type: "image", date: "Jun 19", size: "3.54 MB" },
    { name: "image(13).png", type: "image", date: "Jun 19", size: "927 KB" },
    { name: "image(12).png", type: "image", date: "Jun 19", size: "680 KB" },
  ];

  // Hàm render ô nhập liệu dùng chung ở cả trang chủ (chính giữa) và trang chat (dưới cùng)
  const renderChatInput = () => {
    return (
      <div
        className={`relative flex flex-col rounded-full border border-[#2f2f2f] bg-[#2f2f2f]/40 px-4 py-2.5 transition-all focus-within:border-slate-500 w-full max-w-2xl mx-auto`}
      >
        <div className="flex items-center justify-between gap-2">
          {/* Nút cộng + bên trái */}
          <button className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#2f2f2f]/60 text-slate-300 hover:text-white transition-colors cursor-pointer">
            <Plus className="h-4.5 w-4.5" />
          </button>
 
          {/* Textarea nhập chữ */}
          <textarea
            ref={textareaRef}
            rows={1}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Ask anything"
            className="flex-1 resize-none bg-transparent px-3 py-2 text-[15px] text-white placeholder-slate-400 outline-none max-h-[200px]"
            style={{ height: "auto" }}
          />
 
          {/* Hàng nút chức năng bên phải */}
          <div className="flex items-center gap-1.5 shrink-0">
            {/* Nút Web Search */}
            <button
              onClick={() => setWebSearchGlobal(!webSearchGlobal)}
              className={`flex h-9 items-center gap-1.5 rounded-full px-3.5 text-xs font-semibold border transition-all cursor-pointer ${
                (activeChat ? activeChat.webSearchEnabled : webSearchGlobal)
                  ? "bg-blue-600/20 border-blue-500 text-blue-400"
                  : "border-[#2f2f2f] bg-transparent text-slate-300 hover:text-white"
              }`}
              title="Toggle Web Search"
            >
              <Globe className="h-3.5 w-3.5" />
              <span>Search</span>
            </button>
 
            {/* Microphone */}
            <button className="flex h-9 w-9 items-center justify-center rounded-full bg-transparent text-slate-400 hover:text-white transition-colors cursor-pointer">
              <Mic className="h-4.5 w-4.5" />
            </button>
 
            {/* Soundwave wave (white filled circle with black wave lines) */}
            <button className="flex h-9 w-9 items-center justify-center rounded-full bg-white text-[#0d0d0d] hover:opacity-90 transition-opacity cursor-pointer">
              <svg viewBox="0 0 24 24" className="h-4.5 w-4.5 fill-current" xmlns="http://www.w3.org/2000/svg">
                <rect x="4" y="9" width="2" height="6" rx="1"/>
                <rect x="8" y="6" width="2" height="12" rx="1"/>
                <rect x="12" y="3" width="2" height="18" rx="1"/>
                <rect x="16" y="6" width="2" height="12" rx="1"/>
                <rect x="20" y="9" width="2" height="6" rx="1"/>
              </svg>
            </button>
 
            {/* Nút gửi hoặc dừng sinh chữ (Chỉ hiện khi có chữ nhập vào hoặc AI đang trả lời) */}
            {(input.trim() || isGenerating) && (
              <button
                onClick={handleSend}
                className="flex h-9 w-9 items-center justify-center rounded-full bg-white text-[#0d0d0d] hover:bg-slate-200 transition-colors cursor-pointer"
              >
                {isGenerating ? <Square className="h-4 w-4 fill-current" /> : <ArrowUp className="h-4.5 w-4.5" />}
              </button>
            )}
          </div>
        </div>
      </div>
    );
  };
 
  return (
    <div className="flex h-full flex-1 flex-col bg-[#0d0d0d] text-[#ececec] overflow-hidden relative">
      
      {/* 1. Header trên cùng */}
      <header className="flex h-14 items-center justify-between px-4 border-b border-[#2f2f2f] bg-[#0d0d0d]/80 backdrop-blur-md z-10 select-none">
        <div className="flex items-center gap-2">
          {/* Nút mở Sidebar nếu đang đóng */}
          {!isSidebarOpen && (
            <button
              onClick={() => setSidebarOpen(true)}
              className="rounded-md p-1.5 hover:bg-[#212121] text-slate-400 hover:text-slate-200 transition-colors mr-2 cursor-pointer"
            >
              <PanelLeftOpen className="h-5 w-5" />
            </button>
          )}

          {/* Dropdown chọn mô hình AI (Model Selector) - Screenshot 1 */}
          {currentView === "chat" && (
            <div className="relative">
              <button
                onClick={() => setModelDropdownOpen(!modelDropdownOpen)}
                className="flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-sm font-semibold text-slate-300 hover:bg-[#212121] transition-colors cursor-pointer"
              >
                <span>{selectedModel}</span>
                <ChevronDown className="h-4 w-4 text-slate-500" />
              </button>

              {modelDropdownOpen && (
                <>
                  <div className="fixed inset-0 z-20" onClick={() => setModelDropdownOpen(false)} />
                  <div className="absolute left-0 mt-1 z-30 w-80 rounded-xl border border-[#2f2f2f] bg-[#171717] p-1.5 shadow-2xl">
                    {/* ChatGPT Plus */}
                    <div
                      onClick={() => {
                        setSelectedModel("ChatGPT Plus");
                        setModelDropdownOpen(false);
                      }}
                      className={`flex items-start gap-3 rounded-lg p-3 hover:bg-[#212121] cursor-pointer transition-colors ${
                        selectedModel === "ChatGPT Plus" ? "bg-[#212121]" : ""
                      }`}
                    >
                      <Sparkles className="h-5 w-5 text-purple-400 mt-0.5" />
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <span className="text-sm font-semibold text-white">ChatGPT Plus</span>
                          <button className="rounded-full bg-[#2f2f2f] px-2 py-0.5 text-[10px] font-bold text-slate-200 hover:bg-slate-700 transition-colors">
                            Try for free
                          </button>
                        </div>
                        <p className="text-xs text-slate-400 mt-0.5">Our smartest model & more</p>
                      </div>
                    </div>

                    {/* ChatGPT Standard */}
                    <div
                      onClick={() => {
                        setSelectedModel("ChatGPT");
                        setModelDropdownOpen(false);
                      }}
                      className={`flex items-start gap-3 rounded-lg p-3 hover:bg-[#212121] cursor-pointer transition-colors mt-1 ${
                        selectedModel === "ChatGPT" ? "bg-[#212121]" : ""
                      }`}
                    >
                      <svg viewBox="0 0 24 24" className="h-5 w-5 fill-current text-emerald-400 mt-0.5" xmlns="http://www.w3.org/2000/svg">
                        <path d="M21.74 11.9a.86.86 0 0 0-.15-.43L19 7.63V4.5a1.5 1.5 0 0 0-1.5-1.5H14.4l-3.84-2.6a.85.85 0 0 0-.89 0L6.83 3H3.75A1.5 1.5 0 0 0 2.25 4.5v3.13L.36 11.47a.86.86 0 0 0 0 .86l1.89 3.84V19.3a1.5 1.5 0 0 0 1.5 1.5h3.08l3.84 2.6a.86.86 0 0 0 .89 0l3.84-2.6H17.5a1.5 1.5 0 0 0 1.5-1.5v-3.13l1.89-3.84a.86.86 0 0 0 .85-.83zM12 21.36L8.85 19.3H4.25v-4.6L2.14 12l2.11-2.7v-4.6h4.6L12 2.64l3.15 2.06h4.6v4.6L21.86 12l-2.11 2.7v4.6h-4.6z"/>
                      </svg>
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <span className="text-sm font-semibold text-white">ChatGPT</span>
                          {selectedModel === "ChatGPT" && <span className="text-emerald-500 text-sm">✓</span>}
                        </div>
                        <p className="text-xs text-slate-400 mt-0.5">Great for everyday tasks</p>
                      </div>
                    </div>
                  </div>
                </>
              )}
            </div>
          )}

          {currentView === "library" && <span className="text-sm font-semibold text-slate-300">Library</span>}
          {currentView === "projects" && <span className="text-sm font-semibold text-slate-300">Projects</span>}
        </div>

        {/* Nút bên góc phải */}
        <div className="flex items-center gap-2">
          {/* Nút Share & Menu "..." chỉ hiện khi đang xem một đoạn chat có tin nhắn */}
          {currentView === "chat" && activeChat && activeChat.messages.length > 0 && (
            <>
              <button className="flex items-center gap-1.5 rounded-full border border-[#2f2f2f] px-3.5 py-1 text-xs font-semibold hover:bg-[#212121] transition-colors cursor-pointer">
                <Share2 className="h-3.5 w-3.5" />
                <span>Share</span>
              </button>
              <button className="rounded-full p-1.5 hover:bg-[#212121] text-slate-400 hover:text-slate-200 transition-colors cursor-pointer">
                <MoreHorizontal className="h-4.5 w-4.5" />
              </button>
            </>
          )}

          {/* Các nút Header chung */}
          <button className="flex items-center gap-1.5 text-xs text-slate-400 hover:text-slate-200 transition-colors cursor-pointer">
            <Gift className="h-4 w-4" />
            <span>Free offer</span>
          </button>
          <button className="rounded-md p-1.5 hover:bg-[#212121] text-slate-400 hover:text-slate-200 transition-colors cursor-pointer">
            <LayoutGrid className="h-4 w-4" />
          </button>
        </div>
      </header>

      {/* 2. Phần nội dung chính tùy thuộc vào Trang được chọn (currentView) */}
      <div className="flex-1 overflow-y-auto">
        
        {/* VIEW 1: TRANG CHAT CHÍNH */}
        {currentView === "chat" && (
          <div className="flex h-full flex-col justify-between">
            {/* 2.1. Danh sách tin nhắn hoặc Welcome Screen ở chính giữa */}
            <div className="flex-1 overflow-y-auto px-4 py-6">
              <div className={`mx-auto w-full ${
                (!activeChat || activeChat.messages.length === 0)
                  ? "flex flex-col items-center justify-center min-h-[70vh] max-w-2xl"
                  : "max-w-2xl space-y-6"
              }`}>
                {!activeChat || activeChat.messages.length === 0 ? (
                  // Giao diện Welcome (Khi chưa có tin nhắn nào) - Ô chat chính giữa & Gợi ý text-only
                  <div className="flex flex-col items-center justify-center text-center w-full">
                    <h2 className="text-3xl font-medium text-white tracking-tight mb-8">
                      What's on the agenda today?
                    </h2>
                    
                    {/* Ô chat ở giữa */}
                    <div className="w-full mb-6">
                      {renderChatInput()}
                    </div>
 
                    {/* Gợi ý nhanh các câu hỏi (Thiết kế phẳng text-only, hover sáng lên) */}
                    <div className="w-full flex flex-col items-start gap-4 pl-4 text-left">
                      <button
                        onClick={() => handleSuggestionClick("Hãy tạo một hình vẽ biểu diễn thuật toán")}
                        className="flex items-center gap-3.5 text-slate-400 hover:text-white transition-colors cursor-pointer group text-left outline-none bg-transparent border-0 p-0"
                      >
                        <ImageIcon className="h-5 w-5 text-slate-400 group-hover:text-white transition-colors" />
                        <span className="text-[14.5px] font-normal">Create an image</span>
                      </button>
 
                      <button
                        onClick={() => handleSuggestionClick("Viết cho tôi đoạn code python sắp xếp nhanh")}
                        className="flex items-center gap-3.5 text-slate-400 hover:text-white transition-colors cursor-pointer group text-left outline-none bg-transparent border-0 p-0"
                      >
                        <PenTool className="h-5 w-5 text-slate-400 group-hover:text-white transition-colors" />
                        <span className="text-[14.5px] font-normal">Write or edit</span>
                      </button>
 
                      <button
                        onClick={() => handleSuggestionClick("Tóm tắt vụ việc nổi bật gần đây")}
                        className="flex items-center gap-3.5 text-slate-400 hover:text-white transition-colors cursor-pointer group text-left outline-none bg-transparent border-0 p-0"
                      >
                        <Globe className="h-5 w-5 text-slate-400 group-hover:text-white transition-colors" />
                        <span className="text-[14.5px] font-normal">Look something up</span>
                      </button>
                    </div>
                  </div>
                ) : (
                  // Giao diện danh sách tin nhắn thực tế
                  activeChat.messages.map((msg) => {
                    const isUser = msg.role === "user";
                    return (
                      <div key={msg.id} className={`flex items-start gap-4 ${isUser ? "justify-end" : "justify-start"}`}>
                        {/* Avatar AI */}
                        {!isUser && (
                          <div className="flex h-8 w-8 shrink-0 select-none items-center justify-center rounded-full border border-[#2f2f2f] bg-[#171717]">
                            <svg viewBox="0 0 24 24" className="h-4.5 w-4.5 fill-current text-emerald-400" xmlns="http://www.w3.org/2000/svg">
                              <path d="M21.74 11.9a.86.86 0 0 0-.15-.43L19 7.63V4.5a1.5 1.5 0 0 0-1.5-1.5H14.4l-3.84-2.6a.85.85 0 0 0-.89 0L6.83 3H3.75A1.5 1.5 0 0 0 2.25 4.5v3.13L.36 11.47a.86.86 0 0 0 0 .86l1.89 3.84V19.3a1.5 1.5 0 0 0 1.5 1.5h3.08l3.84 2.6a.86.86 0 0 0 .89 0l3.84-2.6H17.5a1.5 1.5 0 0 0 1.5-1.5v-3.13l1.89-3.84a.86.86 0 0 0 .85-.83zM12 21.36L8.85 19.3H4.25v-4.6L2.14 12l2.11-2.7v-4.6h4.6L12 2.64l3.15 2.06h4.6v4.6L21.86 12l-2.11 2.7v-4.6h-4.6z"/>
                            </svg>
                          </div>
                        )}
 
                        <div className={`flex flex-col max-w-[85%] ${isUser ? "items-end" : "items-start"}`}>
                          {/* Khối hiển thị Web Search giả lập */}
                          {msg.isSearching && (
                            <div className="flex items-center gap-2 rounded-lg bg-[#171717] border border-[#2f2f2f] px-3.5 py-1.5 text-xs text-blue-400 mb-2 animate-pulse">
                              <Globe className="h-3.5 w-3.5 animate-spin" />
                              <span>Đang tìm kiếm trên Web...</span>
                            </div>
                          )}
 
                          {msg.searchResults && msg.searchResults.length > 0 && (
                            <div className="flex flex-col gap-1.5 mb-3 bg-[#171717] border border-[#2f2f2f] rounded-xl p-3 w-full text-xs">
                              <div className="flex items-center gap-1.5 text-slate-400 font-semibold uppercase tracking-wider text-[10px]">
                                <Globe className="h-3 w-3" />
                                <span>Kết quả tìm kiếm Web</span>
                              </div>
                              {msg.searchResults.map((res) => (
                                <a
                                  key={res.url}
                                  href={res.url}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="text-blue-400 hover:underline font-medium block truncate"
                                >
                                  {res.title}
                                </a>
                              ))}
                            </div>
                          )}
 
                          {/* Bong bóng tin nhắn */}
                          <div
                            className={`rounded-2xl px-4 py-2.5 text-[15px] leading-relaxed ${
                              isUser ? "bg-[#2f2f2f] text-white" : "bg-transparent text-slate-200"
                            }`}
                          >
                            {isUser ? (
                              <p className="whitespace-pre-wrap">{msg.content}</p>
                            ) : (
                              <MarkdownRenderer content={msg.content} />
                            )}
                          </div>
                        </div>
                      </div>
                    );
                  })
                )}
                <div ref={messagesEndRef} />
              </div>
            </div>
 
            {/* 2.2. Khu vực Ô nhập tin nhắn cố định ở dưới (Chỉ hiện khi cuộc trò chuyện có tin nhắn) */}
            {activeChat && activeChat.messages.length > 0 ? (
              <div className="border-t border-[#2f2f2f] bg-[#0d0d0d] px-4 py-4">
                <div className="mx-auto max-w-2xl">
                  {renderChatInput()}
                  <div className="mt-2 text-center text-[10px] text-slate-500 select-none">
                    ChatGPT can make mistakes. Check important info.
                  </div>
                </div>
              </div>
            ) : (
              // Nếu chưa có tin nhắn, render disclaimer ở chân trang giống Screenshot 1 & 2
              <div className="bg-[#0d0d0d] pb-4 text-center text-[10px] text-slate-500 select-none">
                ChatGPT can make mistakes. Check important info.
              </div>
            )}
          </div>
        )}
        {/* VIEW 2: TRANG THƯ VIỆN (LIBRARY) - Screenshot 3 */}
        {currentView === "library" && (
          <div className="mx-auto max-w-4xl px-6 py-8">
            <div className="flex items-center justify-between border-b border-[#2f2f2f] pb-6 mb-6">
              <h1 className="text-3xl font-semibold text-white">Library</h1>
              <div className="flex items-center gap-3">
                {/* Tìm kiếm file */}
                <div className="relative">
                  <Search className="absolute left-3 top-2.5 h-4 w-4 text-slate-500" />
                  <input
                    type="text"
                    value={librarySearch}
                    onChange={(e) => setLibrarySearch(e.target.value)}
                    placeholder="Search"
                    className="w-60 rounded-full bg-[#171717] border border-[#2f2f2f] py-2 pl-9 pr-4 text-sm text-white placeholder-slate-500 outline-none focus:border-slate-500 transition-colors"
                  />
                </div>
                {/* Nút New */}
                <button className="flex items-center gap-1 rounded-full bg-white px-4 py-2 text-xs font-bold text-[#0d0d0d] hover:bg-slate-200 transition-colors cursor-pointer">
                  <span>New</span>
                  <ChevronDown className="h-3 w-3" />
                </button>
              </div>
            </div>

            {/* Bộ lọc và Chọn view */}
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-1.5">
                <button
                  onClick={() => setLibraryTab("all")}
                  className={`rounded-full px-3.5 py-1.5 text-xs font-semibold transition-colors cursor-pointer ${
                    libraryTab === "all" ? "bg-[#2f2f2f] text-white" : "text-slate-400 hover:text-white"
                  }`}
                >
                  All
                </button>
                <button
                  onClick={() => setLibraryTab("images")}
                  className={`rounded-full px-3.5 py-1.5 text-xs font-semibold transition-colors cursor-pointer ${
                    libraryTab === "images" ? "bg-[#2f2f2f] text-white" : "text-slate-400 hover:text-white"
                  }`}
                >
                  Images
                </button>
                <button
                  onClick={() => setLibraryTab("files")}
                  className={`rounded-full px-3.5 py-1.5 text-xs font-semibold transition-colors cursor-pointer ${
                    libraryTab === "files" ? "bg-[#2f2f2f] text-white" : "text-slate-400 hover:text-white"
                  }`}
                >
                  Files
                </button>
              </div>

              {/* View Mode icons */}
              <div className="flex items-center gap-1 bg-[#171717] rounded-lg p-0.5 border border-[#2f2f2f]">
                <button
                  onClick={() => setLibraryViewMode("list")}
                  className={`p-1.5 rounded-md transition-colors cursor-pointer ${
                    libraryViewMode === "list" ? "bg-[#2f2f2f] text-white" : "text-slate-400 hover:text-white"
                  }`}
                >
                  <List className="h-4 w-4" />
                </button>
                <button
                  onClick={() => setLibraryViewMode("grid")}
                  className={`p-1.5 rounded-md transition-colors cursor-pointer ${
                    libraryViewMode === "grid" ? "bg-[#2f2f2f] text-white" : "text-slate-400 hover:text-white"
                  }`}
                >
                  <Grid className="h-4 w-4" />
                </button>
              </div>
            </div>

            {/* Danh sách items của Thư viện */}
            <div className="border border-[#2f2f2f] rounded-xl overflow-hidden bg-[#171717]">
              <div className="grid grid-cols-12 px-4 py-3 border-b border-[#2f2f2f] text-xs font-bold text-slate-400 select-none uppercase tracking-wider">
                <div className="col-span-6">Name</div>
                <div className="col-span-3 text-right">Modified</div>
                <div className="col-span-3 text-right">Size</div>
              </div>

              <div className="divide-y divide-[#2f2f2f]">
                {libraryItems
                  .filter((item) => {
                    if (libraryTab === "images" && item.type !== "image") return false;
                    if (libraryTab === "files" && item.type !== "file") return false;
                    return item.name.toLowerCase().includes(librarySearch.toLowerCase());
                  })
                  .map((item) => (
                    <div
                      key={item.name}
                      className="grid grid-cols-12 items-center px-4 py-3.5 hover:bg-[#212121] transition-colors text-sm text-slate-200 cursor-pointer"
                    >
                      <div className="col-span-6 flex items-center gap-3">
                        {item.type === "image" ? (
                          <ImageIcon className="h-4 w-4 text-emerald-400 shrink-0" />
                        ) : (
                          <FileText className="h-4 w-4 text-blue-400 shrink-0" />
                        )}
                        <span className="font-medium truncate">{item.name}</span>
                      </div>
                      <div className="col-span-3 text-right text-slate-400 text-xs">{item.date}</div>
                      <div className="col-span-3 text-right text-slate-400 text-xs">{item.size}</div>
                    </div>
                  ))}
              </div>
            </div>
          </div>
        )}

        {/* VIEW 3: TRANG DỰ ÁN (PROJECTS) - Screenshot 4 */}
        {currentView === "projects" && (
          <div className="mx-auto max-w-4xl px-6 py-8">
            <div className="flex items-center justify-between border-b border-[#2f2f2f] pb-6 mb-6">
              <h1 className="text-3xl font-semibold text-white">Projects</h1>
              <div className="flex items-center gap-3">
                {/* Tìm kiếm dự án */}
                <div className="relative">
                  <Search className="absolute left-3 top-2.5 h-4 w-4 text-slate-500" />
                  <input
                    type="text"
                    placeholder="Search projects"
                    className="w-60 rounded-full bg-[#171717] border border-[#2f2f2f] py-2 pl-9 pr-4 text-sm text-white placeholder-slate-500 outline-none focus:border-slate-500 transition-colors"
                  />
                </div>
                {/* Nút New */}
                <button className="flex items-center gap-1 rounded-full bg-white px-4 py-2 text-xs font-bold text-[#0d0d0d] hover:bg-slate-200 transition-colors cursor-pointer">
                  <span>New</span>
                </button>
              </div>
            </div>

            {/* Bộ lọc Dự án */}
            <div className="flex items-center gap-1.5 mb-16">
              <button className="rounded-full px-3.5 py-1.5 text-xs font-semibold bg-[#2f2f2f] text-white cursor-pointer">
                All
              </button>
              <button className="rounded-full px-3.5 py-1.5 text-xs font-semibold text-slate-400 hover:text-white cursor-pointer">
                Created by you
              </button>
              <button className="rounded-full px-3.5 py-1.5 text-xs font-semibold text-slate-400 hover:text-white cursor-pointer">
                Shared with you
              </button>
            </div>

            {/* Màn hình Trống (Empty State) */}
            <div className="flex flex-col items-center justify-center py-20 text-center select-none">
              <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-[#171717] border border-[#2f2f2f] text-slate-400 mb-4">
                <FolderOpen className="h-7 w-7" />
              </div>
              <h3 className="text-lg font-semibold text-white">No projects yet</h3>
              <p className="text-sm text-slate-500 mt-1 max-w-sm">
                Create projects to group relevant conversations, instructions, and files in one place.
              </p>
            </div>
          </div>
        )}

      </div>

    </div>
  );
}
