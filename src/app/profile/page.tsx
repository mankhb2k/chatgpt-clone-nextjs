"use client";

import {
  ArrowLeft,
  Mail,
  Calendar,
  ShieldCheck,
  Key,
  Laptop,
  Smartphone,
  CreditCard,
  Zap,
  HardDrive,
  MessageSquare,
  Edit2
} from "lucide-react";
import Link from "next/link";
import React, { useState } from "react";

export default function ProfilePage() {
  const [mfaEnabled, setMfaEnabled] = useState(true);
  const [userName] = useState("Nguyen Van Truong");
  const [userEmail] = useState("truong.nv@gmail.com");

  return (
    <div className="flex-1 h-screen overflow-y-auto bg-[#0d0d0d] text-[#ececec]">
      <div className="mx-auto max-w-4xl px-6 py-8">
        
        {/* Header điều hướng */}
        <div className="flex items-center gap-4 mb-8">
          <Link
            href="/"
            className="flex h-10 w-10 items-center justify-center rounded-full border border-[#2f2f2f] bg-[#171717] hover:bg-[#212121] text-slate-300 hover:text-white transition-colors cursor-pointer"
          >
            <ArrowLeft className="h-5 w-5" />
          </Link>
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-white">Your Profile</h1>
            <p className="text-xs text-slate-500">Manage your account details and preferences</p>
          </div>
        </div>

        {/* Nội dung chính chia làm 2 cột */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          {/* CỘT TRÁI: Avatar & Thông tin chung */}
          <div className="md:col-span-1 space-y-6">
            <div className="rounded-2xl border border-[#2f2f2f] bg-[#171717] p-6 text-center flex flex-col items-center relative overflow-hidden group">
              {/* Trang trí background nhẹ */}
              <div className="absolute -top-12 -left-12 h-24 w-24 rounded-full bg-purple-500/10 blur-xl" />
              <div className="absolute -bottom-12 -right-12 h-24 w-24 rounded-full bg-emerald-500/10 blur-xl" />

              {/* Avatar hoành tráng */}
              <div className="relative h-24 w-24 mb-4 group/avatar">
                <div className="h-full w-full rounded-full border-2 border-slate-700 bg-[#2f2f2f] flex items-center justify-center text-3xl font-bold text-white select-none">
                  {userName.split(" ").map(n => n[0]).join("")}
                </div>
                <button className="absolute bottom-0 right-0 p-1.5 rounded-full bg-white text-black border border-[#2f2f2f] hover:bg-slate-200 transition-colors shadow-lg cursor-pointer">
                  <Edit2 className="h-3 w-3" />
                </button>
              </div>

              <h2 className="text-lg font-bold text-white leading-tight">{userName}</h2>
              <span className="text-xs text-slate-400 mt-1 block">{userEmail}</span>

              {/* Nhãn Plan hiện tại */}
              <div className="mt-5 w-full rounded-xl bg-purple-950/30 border border-purple-500/20 px-3 py-2 flex items-center justify-between text-left">
                <div>
                  <span className="text-[10px] uppercase font-bold tracking-wider text-purple-400">Current Plan</span>
                  <p className="text-xs font-semibold text-white mt-0.5">ChatGPT Plus Tier</p>
                </div>
                <Zap className="h-4 w-4 text-purple-400 fill-current" />
              </div>
            </div>

            {/* Các số liệu sử dụng */}
            <div className="rounded-2xl border border-[#2f2f2f] bg-[#171717] p-4 space-y-4">
              <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider">Usage Stats</h3>
              
              <div className="space-y-3 text-xs">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-slate-400">
                    <MessageSquare className="h-3.5 w-3.5" />
                    <span>Total queries</span>
                  </div>
                  <span className="font-semibold text-white">1,248</span>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-slate-400">
                    <HardDrive className="h-3.5 w-3.5" />
                    <span>Storage used</span>
                  </div>
                  <span className="font-semibold text-white">27.8 MB / 1 GB</span>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-slate-400">
                    <Calendar className="h-3.5 w-3.5" />
                    <span>Member since</span>
                  </div>
                  <span className="font-semibold text-white">Jan 2026</span>
                </div>
              </div>
            </div>
          </div>

          {/* CỘT PHẢI: Cấu hình chi tiết */}
          <div className="md:col-span-2 space-y-6">
            
            {/* Thẻ Premium Upgrade Card */}
            <div className="relative rounded-2xl overflow-hidden border border-purple-500/30 bg-gradient-to-r from-purple-950/20 to-indigo-950/20 p-6 flex flex-col justify-between min-h-[160px]">
              <div className="absolute top-0 right-0 h-40 w-40 bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-full blur-2xl -mr-10 -mt-10" />
              
              <div>
                <span className="rounded-full bg-purple-500/20 border border-purple-400/30 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-purple-300">
                  Premium Access
                </span>
                <h3 className="text-xl font-bold text-white mt-3">Take your productivity to new heights</h3>
                <p className="text-xs text-slate-400 mt-1 max-w-md leading-relaxed">
                  Upgrade your plan to unlock high-capacity models like GPT-4o, advanced custom parameters, priority web search capabilities, and dedicated workspace environments.
                </p>
              </div>

              <div className="mt-6 flex items-center justify-between">
                <span className="text-xs font-semibold text-slate-300">$20 / month</span>
                <button className="flex items-center gap-1.5 rounded-full bg-white px-5 py-2 text-xs font-bold text-black hover:bg-slate-200 transition-all shadow-md cursor-pointer">
                  <CreditCard className="h-3.5 w-3.5" />
                  <span>Upgrade to Plus</span>
                </button>
              </div>
            </div>

            {/* Bảo mật & Đăng nhập */}
            <div className="rounded-2xl border border-[#2f2f2f] bg-[#171717] p-6 space-y-4">
              <h3 className="text-sm font-semibold text-white">Security & Login</h3>
              
              <div className="divide-y divide-[#2f2f2f]">
                {/* Email verification */}
                <div className="flex items-center justify-between py-3.5 first:pt-0">
                  <div className="flex items-center gap-3">
                    <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#212121] text-emerald-400 border border-[#2f2f2f]">
                      <Mail className="h-4 w-4" />
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-white">Email Address</p>
                      <p className="text-xs text-slate-500 mt-0.5">Primary email for account access</p>
                    </div>
                  </div>
                  <span className="text-xs text-slate-400">{userEmail}</span>
                </div>

                {/* Password reset */}
                <div className="flex items-center justify-between py-3.5">
                  <div className="flex items-center gap-3">
                    <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#212121] text-amber-400 border border-[#2f2f2f]">
                      <Key className="h-4 w-4" />
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-white">Password</p>
                      <p className="text-xs text-slate-500 mt-0.5">Update or reset your current password</p>
                    </div>
                  </div>
                  <button className="rounded-lg border border-[#2f2f2f] px-3.5 py-1.5 text-xs font-semibold text-slate-300 hover:text-white hover:bg-[#212121] transition-colors cursor-pointer">
                    Change password
                  </button>
                </div>

                {/* Multi-factor authentication */}
                <div className="flex items-center justify-between py-3.5 last:pb-0">
                  <div className="flex items-center gap-3">
                    <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#212121] text-blue-400 border border-[#2f2f2f]">
                      <ShieldCheck className="h-4 w-4" />
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-white">Multi-factor Authentication</p>
                      <p className="text-xs text-slate-500 mt-0.5">Verify identities via authenticator app</p>
                    </div>
                  </div>
                  
                  {/* Switch component nguyên tử */}
                  <button
                    onClick={() => setMfaEnabled(!mfaEnabled)}
                    className={`relative inline-flex h-5.5 w-10 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out outline-none ${
                      mfaEnabled ? "bg-emerald-500" : "bg-[#2f2f2f]"
                    }`}
                  >
                    <span
                      className={`pointer-events-none inline-block h-4.5 w-4.5 transform rounded-full bg-white shadow transition duration-200 ease-in-out ${
                        mfaEnabled ? "translate-x-4.5" : "translate-x-0"
                      }`}
                    />
                  </button>
                </div>
              </div>
            </div>

            {/* Các thiết bị đang đăng nhập (Active Sessions) */}
            <div className="rounded-2xl border border-[#2f2f2f] bg-[#171717] p-6 space-y-4">
              <h3 className="text-sm font-semibold text-white">Active Sessions</h3>
              <p className="text-xs text-slate-500">You are currently logged in on these devices</p>

              <div className="divide-y divide-[#2f2f2f]">
                {/* Thiết bị 1 */}
                <div className="flex items-center justify-between py-3.5 first:pt-0">
                  <div className="flex items-center gap-3">
                    <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#212121] text-slate-300 border border-[#2f2f2f]">
                      <Laptop className="h-4 w-4" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <p className="text-sm font-semibold text-white">Windows 11 PC</p>
                        <span className="rounded-full bg-emerald-500/10 border border-emerald-500/20 px-2 py-0.5 text-[9px] font-bold text-emerald-400 uppercase tracking-wider">
                          Current device
                        </span>
                      </div>
                      <p className="text-xs text-slate-500 mt-0.5">Google Chrome • Hanoi, Vietnam</p>
                    </div>
                  </div>
                  <span className="text-xs text-slate-400">Active now</span>
                </div>

                {/* Thiết bị 2 */}
                <div className="flex items-center justify-between py-3.5 last:pb-0">
                  <div className="flex items-center gap-3">
                    <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#212121] text-slate-400 border border-[#2f2f2f]">
                      <Smartphone className="h-4 w-4" />
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-slate-300">iPhone 15 Pro</p>
                      <p className="text-xs text-slate-500 mt-0.5">Safari Mobile • Hanoi, Vietnam</p>
                    </div>
                  </div>
                  <button className="rounded-lg border border-[#2f2f2f] px-3 py-1.5 text-xs font-semibold text-slate-400 hover:text-rose-400 hover:border-rose-900 transition-colors cursor-pointer">
                    Revoke
                  </button>
                </div>
              </div>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
}
