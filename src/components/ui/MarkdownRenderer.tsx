"use client";

import React, { useState } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Check, Copy } from "lucide-react";

// 1. Định nghĩa kiểu dữ liệu (Props) mà component này nhận vào
interface MarkdownRendererProps {
  content: string; // Tin nhắn của AI dưới dạng chữ thô (string)
}

// 2. Định nghĩa hàm component chính
// 2. Định nghĩa hàm component chính
export function MarkdownRenderer({ content }: MarkdownRendererProps) {
  return (
    // Lớp CSS "prose-custom" dùng để định dạng khoảng cách chữ, bảng biểu mà ta viết ở globals.css
    <div className="prose-custom w-full max-w-none break-words">
      <ReactMarkdown
        remarkPlugins={[remarkGfm]} // Nạp plugin dịch bảng dữ liệu và link mở rộng
        children={content || ""}     // Truyền trực tiếp dưới dạng prop và dùng toán tử || "" phòng khi content rỗng
        components={{
          // Tùy biến cách hiển thị các đoạn mã code lập trình
          code({ className, children, ...props }) {
            // Kiểm tra xem đoạn code này viết bằng ngôn ngữ nào (ví dụ: c++, python)
            const match = /language-(\w+)/.exec(className || "");
            const inline = !match; // Code ngắn nằm cùng dòng chữ (ví dụ: `console.log`)
            const codeContent = String(children).replace(/\n$/, ""); // Nội dung code thô

            return inline ? (
              // Nếu là code nằm trong dòng chữ, hiện thẻ <code> mặc định
              <code className={className} {...props}>
                {children}
              </code>
            ) : (
              // Nếu là khối code dài nhiều dòng, chuyển dữ liệu qua component CodeBlock
              <CodeBlock language={match ? match[1] : "code"} value={codeContent} />
            );
          },
        }}
      />
    </div>
  );
}



// 3. Định nghĩa kiểu dữ liệu (Props) nhận vào của CodeBlock
interface CodeBlockProps {
  language: string; // Tên ngôn ngữ lập trình (ví dụ: python, javascript)
  value: string;    // Chuỗi mã nguồn thô cần hiển thị
}

// 4. Component hiển thị khung chứa code chuyên nghiệp
function CodeBlock({ language, value }: CodeBlockProps) {
  // Biến trạng thái copied: Lưu giá trị true/false xem người dùng đã click nút Copy chưa
  const [copied, setCopied] = useState(false);

  // Hàm xử lý việc copy text khi người dùng click
  const handleCopy = async () => {
    try {
      // Sử dụng API mặc định của trình duyệt để lưu chuỗi code vào bộ nhớ đệm
      await navigator.clipboard.writeText(value);
      
      setCopied(true); // Đổi trạng thái sang true để hiện chữ "Copied!"

      // Sau đúng 2 giây (2000 mili-giây), tự động chuyển trạng thái về false để quay lại ban đầu
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Lỗi khi copy code: ", err);
    }
  };

  return (
    // my-4 (khoảng cách trên dưới), rounded-lg (bo tròn góc), bg-[#0d0d0d] (màu nền tối)
    <div className="my-4 overflow-hidden rounded-lg border border-border-custom bg-[#0d0d0d] text-slate-200">
      
      {/* 4.1. Thanh Header của Khối Code chứa tên Ngôn ngữ và Nút Copy */}
      <div className="flex items-center justify-between bg-[#1e1e1e] px-4 py-2 text-xs font-medium text-slate-400 select-none">
        {/* capitalize: Tự động viết hoa chữ cái đầu (ví dụ: python -> Python) */}
        <span className="capitalize">{language}</span>
        
        <button
          onClick={handleCopy}
          className="flex items-center gap-1.5 hover:text-slate-200 transition-colors duration-150 cursor-pointer"
        >
          {/* Toán tử điều kiện 3 ngôi: Nếu copied=true thì hiện Check Icon, ngược lại hiện Copy Icon */}
          {copied ? (
            <>
              <Check className="h-3.5 w-3.5 text-emerald-500" />
              <span className="text-emerald-500">Copied!</span>
            </>
          ) : (
            <>
              <Copy className="h-3.5 w-3.5" />
              <span>Copy code</span>
            </>
          )}
        </button>
      </div>

      {/* 4.2. Vùng hiển thị đoạn code thực tế */}
      {/* overflow-x-auto: Hiện thanh cuộn ngang nếu dòng code quá dài */}
      <div className="overflow-x-auto p-4 font-mono text-sm leading-relaxed">
        <pre className="!m-0 !p-0">
          <code className="!p-0">{value}</code>
        </pre>
      </div>

    </div>
  );
}

