"use client";

import { Check, Copy } from "lucide-react";
import React, { useState } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

interface MarkdownRendererProps {
  content: string;
}

interface CodeBlockProps {
  language: string;
  value: string;
}

function CodeBlock({ language, value }: CodeBlockProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(value);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      // eslint-disable-next-line no-console
      console.error("Lỗi khi copy code: ", err);
    }
  };

  return (
    <div className="my-4 overflow-hidden rounded-lg border border-border-custom bg-[#0d0d0d] text-slate-200">
      <div className="flex items-center justify-between bg-[#1e1e1e] px-4 py-2 text-xs font-medium text-slate-400 select-none">
        <span className="capitalize">{language}</span>
        <button
          onClick={handleCopy}
          className="flex items-center gap-1.5 hover:text-slate-200 transition-colors duration-150 cursor-pointer"
        >
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

      <div className="overflow-x-auto p-4 font-mono text-sm leading-relaxed">
        <pre className="!m-0 !p-0">
          <code className="!p-0">{value}</code>
        </pre>
      </div>
    </div>
  );
}

interface CodeComponentProps extends React.ComponentPropsWithoutRef<"code"> {
  node?: unknown;
}

// Extract code component out of MarkdownRenderer to fix react/no-unstable-nested-components
const CodeComponent = ({ className, children, ...props }: CodeComponentProps) => {
  const match = /language-(\w+)/.exec(className || "");
  const inline = !match;
  
  // Safely extract string content to fix typescript no-base-to-string
  const codeContent = Array.isArray(children)
    ? children.map(child => (typeof child === "string" ? child : "")).join("").replace(/\n$/, "")
    : typeof children === "string"
    ? children.replace(/\n$/, "")
    : "";

  if (inline) {
    const cleanProps = { ...props };
    delete cleanProps.node;
    return (
      <code className={className} {...cleanProps}>
        {children}
      </code>
    );
  }

  return (
    <CodeBlock language={match ? match[1] : "code"} value={codeContent} />
  );
};

export function MarkdownRenderer({ content }: MarkdownRendererProps) {
  return (
    <div className="prose-custom w-full max-w-none break-words">
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        components={{
          code: CodeComponent,
        }}
      >
        {content || ""}
      </ReactMarkdown>
    </div>
  );
}
