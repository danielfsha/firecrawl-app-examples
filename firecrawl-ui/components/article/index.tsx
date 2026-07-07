"use client";

import {
  createContext,
  useContext,
  useMemo,
  useCallback,
  useState,
  useRef,
  useEffect,
} from "react";
import { Check, Copy, ExternalLink, ChevronDown, Link } from "lucide-react";
import { motion, AnimatePresence, LayoutGroup } from "motion/react";
import { cn } from "@/lib/utils";
import { useCopyToClipboard } from "@/hooks/use-clipboard";
import { Button } from "@/components/ui/button";

export interface ArticlePageData {
  title: string;
  description?: string;
  slug: string;
}

export interface ArticleContextValue {
  page: ArticlePageData;
}

const ArticleContext = createContext<ArticleContextValue | null>(null);

export function useArticle(): ArticleContextValue {
  const context = useContext(ArticleContext);
  if (!context) {
    throw new Error("useArticle must be used within <ArticleRoot>");
  }
  return context;
}

interface RootProps {
  data: ArticlePageData;
  children: React.ReactNode;
  className?: string;
}

function CopyPageButton() {
  const { isCopied, copy } = useCopyToClipboard();
  const [open, setOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const handleClick = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, [open]);

  const handleCopyPage = useCallback(() => {
    const content = document.querySelector("[data-article-content]");
    if (content) {
      copy(content.textContent || "");
    }
    setOpen(false);
  }, [copy]);

  const handleCopyLink = useCallback(() => {
    copy(window.location.href);
    setOpen(false);
  }, [copy]);

  return (
    <div ref={menuRef} className="relative shrink-0">
      <div className="flex items-center rounded-md overflow-hidden">
        <button
          type="button"
          onClick={handleCopyPage}
          className="flex items-center gap-1.5 px-3 h-8 text-sm font-medium bg-secondary text-secondary-foreground hover:bg-[color-mix(in_oklch,var(--secondary),var(--foreground)_5%)] transition-colors cursor-pointer"
        >
          <AnimatePresence mode="popLayout" initial={false}>
            <motion.div
              key={isCopied ? "check" : "copy"}
              initial={{ scale: 0, opacity: 0, filter: "blur(4px)" }}
              animate={{ scale: 1, opacity: 1, filter: "blur(0px)" }}
              exit={{ scale: 0, opacity: 0, filter: "blur(4px)" }}
              transition={{
                type: "spring",
                damping: 20,
                stiffness: 400,
                mass: 0.5,
              }}
            >
              {isCopied ? (
                <svg
                  className="h-4 w-4"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M20 6 9 17l-5-5" />
                </svg>
              ) : (
                <svg
                  className="h-4 w-4"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
                  <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
                </svg>
              )}
            </motion.div>
          </AnimatePresence>
          {isCopied ? "Copied!" : "Copy Page"}
        </button>
        <button
          type="button"
          onClick={() => setOpen(!open)}
          className="flex items-center justify-center px-2 h-8 border-l border-(--fc-border-faint) bg-secondary text-secondary-foreground hover:bg-[color-mix(in_oklch,var(--secondary),var(--foreground)_5%)] transition-colors cursor-pointer"
        >
          <ChevronDown
            className={cn(
              "h-3.5 w-3.5 transition-transform",
              open && "rotate-180"
            )}
          />
        </button>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -4, filter: "blur(4px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            exit={{ opacity: 0, y: -4, filter: "blur(4px)" }}
            transition={{ duration: 0.15 }}
            className={cn(
              "absolute right-0 top-[calc(100%+8px)] z-50 w-[270px] rounded-lg border border-(--fc-border-faint) bg-white p-1",
              "shadow-[0_0px_0px_1px_rgba(0,0,0,0.01),0_20px_44px_0px_rgba(0,0,0,0.05)]"
            )}
          >
            <LayoutGroup>
              <MenuItemButton
                icon={<Copy className="h-4 w-4" />}
                title="Copy Page"
                description="Copy page as Markdown for LLMs"
                onClick={handleCopyPage}
              />
              <MenuItemButton
                icon={<Link className="h-4 w-4" />}
                title="Copy Link"
                description="Copy URL to clipboard"
                onClick={handleCopyLink}
              />
              {/* <div className="my-1 h-px bg-(--fc-border-faint)" /> */}
              <MenuItemButton
                icon={
                  <svg
                    className="h-4 w-4"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M22.282 9.821a5.985 5.985 0 0 0-.516-4.91 6.046 6.046 0 0 0-6.51-2.9A6.065 6.065 0 0 0 4.981 4.18a5.998 5.998 0 0 0-3.998 2.9 6.047 6.047 0 0 0 .743 7.097 5.98 5.98 0 0 0 .51 4.911 6.051 6.051 0 0 0 6.515 2.9A5.985 5.985 0 0 0 13.26 24a6.056 6.056 0 0 0 5.772-4.206 5.99 5.99 0 0 0 3.997-2.9 6.056 6.056 0 0 0-.747-7.073zM13.26 22.43a4.476 4.476 0 0 1-2.876-1.04l.141-.081 4.779-2.758a.795.795 0 0 0 .392-.681v-6.737l2.02 1.168a.071.071 0 0 1 .038.052v5.583a4.504 4.504 0 0 1-4.494 4.494zM3.6 18.304a4.47 4.47 0 0 1-.535-3.014l.142.085 4.783 2.759a.771.771 0 0 0 .78 0l5.843-3.369v2.332a.08.08 0 0 1-.033.062L9.74 19.95a4.5 4.5 0 0 1-6.14-1.646zM2.34 7.896a4.485 4.485 0 0 1 2.366-1.973V11.6a.766.766 0 0 0 .388.676l5.815 3.355-2.02 1.168a.076.076 0 0 1-.071 0l-4.83-2.786A4.504 4.504 0 0 1 2.34 7.872zm16.597 3.855l-5.833-3.387L15.119 7.2a.076.076 0 0 1 .071 0l4.83 2.791a4.494 4.494 0 0 1-.676 8.105v-5.678a.79.79 0 0 0-.407-.667zm2.01-3.023l-.141-.085-4.774-2.782a.776.776 0 0 0-.785 0L9.409 9.23V6.897a.066.066 0 0 1 .028-.061l4.83-2.787a4.5 4.5 0 0 1 6.68 4.66zm-12.64 4.135l-2.02-1.164a.08.08 0 0 1-.038-.057V6.075a4.5 4.5 0 0 1 7.375-3.453l-.142.08L8.704 5.46a.795.795 0 0 0-.393.681zm1.097-2.365l2.602-1.5 2.607 1.5v2.999l-2.597 1.5-2.612-1.5z"
                      fill="currentColor"
                    />
                  </svg>
                }
                title="Open in ChatGPT"
                description="Ask questions about this page"
                external
                onClick={() => {
                  window.open(
                    `https://chatgpt.com/?q=${encodeURIComponent(`Read and summarize: ${window.location.href}`)}`,
                    "_blank"
                  );
                  setOpen(false);
                }}
              />
              <MenuItemButton
                icon={
                  <svg
                    className="h-4 w-4"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M4.709 15.955l4.397-2.467.074-.214-.074-.119-.214 0-.735-.045-2.512-.068-2.179-.09-2.111-.113-.531-.113-.498-.656.051-.327.447-.3.64.056 1.414.097 2.122.146 1.539.09 2.28.237h.362l.051-.146-.124-.091-.097-.09-2.195-1.488-2.376-1.572-1.245-.905-.673-.459-.34-.43-.146-.938.611-.673.821.056.21.056.831.64 1.776 1.375 2.32 1.708.34.282.136-.097.017-.068-.153-.255-1.261-2.28-1.346-2.319-.599-.961-.158-.576c-.056-.237-.097-.436-.097-.679l.696-.944.385-.124.928.124.391.34.576 1.319.934 2.076 1.449 2.823.424.837.226.776.085.237.146 0v-.136l.119-1.59.22-1.952.214-2.512.074-.708.35-.848.696-.459.543.26.447.64-.062.413-.266 1.726-.52 2.704-.34 1.811h.198l.226-.226.916-1.216 1.539-1.924.679-.763.792-.844.508-.401.961 0 .708 1.051-.317 1.086-.99 1.255-.821 1.063-1.177 1.585-.735 1.267.068.101.175-.017 2.659-.566 1.437-.26 1.714-.294.776.362.085.368-.305.753-1.834.453-2.15.43-3.202.757-.039.029.045.056 1.443.136.617.033h1.51l2.813.21.735.486.44.595-.074.453-1.131.576-1.527-.362-3.564-.848-1.222-.305-.169 0v.101l1.019.996 1.866 1.686 2.337 2.173.119.537-.3.424-.317-.045-2.054-1.545-.792-.696-1.794-1.51-.119 0v.158l.413.605 2.183 3.281.113 1.006-.158.327-.566.198-.622-.113-1.278-1.794-1.319-2.02-1.064-1.811-.13.074-.628 6.762-.294.345-.679.26-.566-.43-.3-.696.3-1.375.362-1.794.294-1.426.266-1.771.158-.588-.011-.039-.13.017-1.335 1.834-2.031 2.744-1.607 1.72-.385.153-.667-.345.062-.617.373-.549 2.224-2.829 1.341-1.753.866-1.013-.006-.146h-.051l-5.907 3.835-1.051.136-.453-.424.056-.696.214-.226 1.776-1.222z"
                      fill="currentColor"
                    />
                  </svg>
                }
                title="Open in Claude"
                description="Ask questions about this page"
                external
                onClick={() => {
                  window.open(
                    `https://claude.ai/new?q=${encodeURIComponent(`Read and summarize: ${window.location.href}`)}`,
                    "_blank"
                  );
                  setOpen(false);
                }}
              />
            </LayoutGroup>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function MenuItemButton({
  icon,
  title,
  description,
  external,
  onClick,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
  external?: boolean;
  onClick: () => void;
}) {
  const [hovered, setHovered] = useState(false);

  return (
    <button
      type="button"
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="relative flex w-full items-start gap-3 rounded-md px-3 py-1 text-left cursor-pointer"
    >
      {hovered && (
        <motion.span
          layoutId="article-menu-hover"
          className="absolute inset-0 rounded-md bg-(--fc-black-alpha-4) pointer-events-none"
          transition={{ type: "spring", stiffness: 500, damping: 35 }}
        />
      )}
      <span className="relative z-10 mt-0.5 shrink-0 text-(--fc-black-alpha-48)">
        {icon}
      </span>
      <div className="relative z-10 flex flex-col gap-0.5">
        <span
          className={cn(
            "text-sm font-medium flex items-center gap-1 transition-colors",
            hovered ? "text-primary" : "text-(--fc-accent-black)"
          )}
        >
          {title}
          {external && (
            <ExternalLink className="h-3 w-3 text-(--fc-black-alpha-32)" />
          )}
        </span>
        <span className="text-xs text-(--fc-black-alpha-48)">
          {description}
        </span>
      </div>
    </button>
  );
}

function Root({ data, children, className }: RootProps) {
  const contextValue: ArticleContextValue = useMemo(
    () => ({ page: data }),
    [data]
  );

  return (
    <ArticleContext.Provider value={contextValue}>
      <div
        className={cn(className, "mx-auto py-4 font-sans")}
        style={{
          display: "flex",
          flexDirection: "column",
          width: "100%",
          maxWidth: "720px",
        }}
      >
        {children}
      </div>
    </ArticleContext.Provider>
  );
}

interface HeaderProps {
  className?: string;
}

function Header({ className }: HeaderProps) {
  const { page } = useArticle();

  return (
    <div
      className={cn(className)}
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "8px",
        marginBottom: "32px",
        paddingBottom: "24px",
        borderBottom: "1px solid var(--fc-border-faint)",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "flex-start",
          justifyContent: "space-between",
          gap: "16px",
        }}
      >
        <h1
          style={{
            fontSize: "20px",
            fontWeight: 600,
            lineHeight: "150%",
            letterSpacing: "-0.333px",
            color: "var(--fc-accent-black)",
            fontFeatureSettings: '"calt"',
            margin: 0,
          }}
        >
          {page.title}
        </h1>
        <CopyPageButton />
      </div>
      {page.description && (
        <p
          style={{
            fontSize: "14px",
            fontWeight: 450,
            lineHeight: "24px",
            letterSpacing: "-0.087px",
            color: "var(--fc-black-alpha-48)",
            margin: 0,
          }}
        >
          {page.description}
        </p>
      )}
    </div>
  );
}

interface ContentProps {
  children: React.ReactNode;
  className?: string;
}

function Content({ children, className }: ContentProps) {
  return (
    <article
      className={cn(className)}
      data-article-content
      style={{ width: "100%" }}
    >
      {children}
    </article>
  );
}

export {
  Root as ArticleRoot,
  Header as ArticleHeader,
  Content as ArticleContent,
};
