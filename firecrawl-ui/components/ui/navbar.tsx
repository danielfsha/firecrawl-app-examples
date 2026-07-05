"use client";

import * as React from "react";
import { motion, AnimatePresence } from "motion/react";
import { cn } from "@/lib/utils";
import useMeasure from "@/hooks/use-measure";
import FirecrawlLogo from "./firecrawl-logo";
import { Corner } from "./corner";
import { X, Menu, ChevronDown, ChevronUp } from "lucide-react";
import { Button } from "./button";

// Context

interface NavbarContextValue {
  openDropdown: string | null;
  setOpenDropdown: (id: string | null) => void;
  mobileOpen: boolean;
  setMobileOpen: (open: boolean) => void;
  mobileExpanded: string | null;
  setMobileExpanded: (id: string | null) => void;
}

const NavbarContext = React.createContext<NavbarContextValue>({
  openDropdown: null,
  setOpenDropdown: () => {},
  mobileOpen: false,
  setMobileOpen: () => {},
  mobileExpanded: null,
  setMobileExpanded: () => {},
});

// Navbar Root

function Navbar({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const [openDropdown, setOpenDropdown] = React.useState<string | null>(null);
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [mobileExpanded, setMobileExpanded] = React.useState<string | null>(
    null
  );
  const navRef = React.useRef<HTMLElement>(null);

  React.useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (navRef.current && !navRef.current.contains(e.target as Node)) {
        setOpenDropdown(null);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <NavbarContext.Provider
      value={{
        openDropdown,
        setOpenDropdown,
        mobileOpen,
        setMobileOpen,
        mobileExpanded,
        setMobileExpanded,
      }}
    >
      <nav
        ref={navRef}
        className={cn(
          "relative top-0 left-0 right-0 z-50 w-full bg-white backdrop-blur-md font-sans",
          className
        )}
        onMouseLeave={() => setOpenDropdown(null)}
      >
        {children}
      </nav>
    </NavbarContext.Provider>
  );
}

// Layout: 3-column grid that spans full width

function NavbarContent({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return <div className={cn("grid-layout-3col", className)}>{children}</div>;
}

// Row 1: Banner row

function NavbarBannerRow({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <>
      {/* Left side column */}
      <div className="relative row-start-1 col-start-1 border-r border-b border-[var(--fc-border-faint)]">
        <Corner
          position="bottom-right"
          className="text-[var(--fc-border-faint)]"
        />
      </div>
      {/* Middle: banner */}
      <div
        className={cn(
          "relative row-start-1 col-start-2 flex items-center justify-center border-b border-[var(--fc-border-faint)] p-4",
          className
        )}
      >
        <Corner
          position="bottom-left"
          className="text-[var(--fc-border-faint)]"
        />
        <Corner
          position="bottom-right"
          className="text-[var(--fc-border-faint)]"
        />
        {children}
      </div>
      {/* Right side column */}
      <div className="relative row-start-1 col-start-3 border-l border-b border-[var(--fc-border-faint)]">
        <Corner
          position="bottom-left"
          className="text-[var(--fc-border-faint)]"
        />
      </div>
    </>
  );
}

function NavbarBanner({
  children,
  className,
  href,
}: {
  children: React.ReactNode;
  className?: string;
  href?: string;
}) {
  const Comp = href ? "a" : "div";
  return (
    <Comp
      href={href}
      className={cn(
        "block bg-primary text-white text-center px-6 py-3 rounded-[10px] w-full text-[15px]",
        href && "hover:bg-primary/90 transition-colors",
        className
      )}
    >
      {children}
    </Comp>
  );
}

// Row 2: Nav row (logo | links | ctas all in middle column)

function NavbarRow({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <>
      {/* Left side column continues */}
      <div className="relative row-start-2 col-start-1 border-r border-b border-[var(--fc-border-faint)]">
        <Corner
          position="bottom-right"
          className="text-[var(--fc-border-faint)]"
        />
        <Corner
          position="top-right"
          className="text-[var(--fc-border-faint)]"
        />
      </div>
      {/* Middle: nav content */}
      <div
        className={cn(
          "relative row-start-2 col-start-2 flex items-center justify-between h-20 border-b border-[var(--fc-border-faint)] py-7 px-4 lg:px-8",
          className
        )}
      >
        <Corner position="top-left" className="text-[var(--fc-border-faint)]" />
        <Corner
          position="top-right"
          className="text-[var(--fc-border-faint)]"
        />
        <Corner
          position="bottom-left"
          className="text-[var(--fc-border-faint)]"
        />
        <Corner
          position="bottom-right"
          className="text-[var(--fc-border-faint)]"
        />
        {children}
      </div>
      {/* Right side column continues */}
      <div className="relative row-start-2 col-start-3 border-l border-b border-[var(--fc-border-faint)]">
        <Corner
          position="bottom-left"
          className="text-[var(--fc-border-faint)]"
        />
        <Corner position="top-left" className="text-[var(--fc-border-faint)]" />
      </div>
    </>
  );
}

// Nav items

function NavbarLink({
  children,
  href,
  className,
}: {
  children: React.ReactNode;
  href?: string;
  className?: string;
}) {
  return (
    <a
      href={href || "#"}
      className={cn(
        "px-3 py-2 text-sm font-medium text-[var(--fc-accent-black)] rounded-md transition-colors hover:bg-[var(--fc-black-alpha-4)]",
        className
      )}
    >
      {children}
    </a>
  );
}

function NavbarDropdown({
  id,
  label,
  className,
}: {
  id: string;
  label: string;
  className?: string;
}) {
  const { openDropdown, setOpenDropdown } = React.useContext(NavbarContext);
  const isOpen = openDropdown === id;

  return (
    <div
      className={cn("relative", className)}
      onMouseEnter={() => setOpenDropdown(id)}
    >
      <button
        type="button"
        className="text-sm flex items-center gap-1 px-3 py-2 font-medium text-[var(--fc-accent-black)] rounded-md transition-colors hover:bg-[var(--fc-black-alpha-4)] cursor-pointer"
      >
        {label}
        <ChevronDown
          className={cn(
            "w-3.5 h-3.5 transition-transform",
            isOpen && "rotate-180"
          )}
        />
      </button>
    </div>
  );
}

// Full-width Dropdown Panel

function NavbarDropdownPanel({
  id,
  children,
  className,
}: {
  id: string;
  children: React.ReactNode;
  className?: string;
}) {
  const { openDropdown, setOpenDropdown } = React.useContext(NavbarContext);
  const isOpen = openDropdown === id;

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, height: 0, filter: "blur(4px)" }}
          animate={{ opacity: 1, height: "auto", filter: "blur(0px)" }}
          exit={{ opacity: 0, height: 0, filter: "blur(4px)" }}
          transition={{ type: "spring", stiffness: 400, damping: 30 }}
          className="absolute top-full left-0 right-0 w-full overflow-hidden border-b border-[var(--fc-border-faint)] bg-white"
          onMouseEnter={() => setOpenDropdown(id)}
          onMouseLeave={() => setOpenDropdown(null)}
        >
          <div className={cn("grid-layout-3col", className)}>
            <div className="relative border-r border-(--fc-border-faint)">
              <Corner
                position="top-right"
                className="text-(--fc-border-faint)"
              />
              <Corner
                position="bottom-right"
                className="text-(--fc-border-faint)"
              />
              <Corner
                position="top-left"
                className="text-(--fc-border-faint)"
              />
              <Corner
                position="bottom-left"
                className="text-(--fc-border-faint)"
              />
            </div>
            <div className="relative col-start-2 grid grid-cols-3 border-b border-(--fc-border-faint) p-4">
              <Corner
                position="top-left"
                className="text-(--fc-border-faint)"
              />
              <Corner
                position="top-right"
                className="text-(--fc-border-faint)"
              />
              <Corner
                position="bottom-left"
                className="text-(--fc-border-faint)"
              />
              <Corner
                position="bottom-right"
                className="text-(--fc-border-faint)"
              />
              {children}
            </div>
            <div className="relative border-l border-(--fc-border-faint)">
              <Corner
                position="top-left"
                className="text-(--fc-border-faint)"
              />
              <Corner
                position="bottom-left"
                className="text-(--fc-border-faint)"
              />
              <Corner
                position="top-right"
                className="text-(--fc-border-faint)"
              />
              <Corner
                position="bottom-right"
                className="text-(--fc-border-faint)"
              />
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function NavbarDropdownColumn({
  children,
  className,
  position = "middle",
}: {
  children: React.ReactNode;
  className?: string;
  position?: "left" | "middle" | "right";
}) {
  return (
    <div
      className={cn(
        "relative py-4",
        position === "left" && "pr-4",
        position === "middle" &&
          "px-4 border-l border-r border-[var(--fc-border-faint)]",
        position === "right" && "pl-4",
        className
      )}
    >
      {position === "left" && (
        <Corner
          position="bottom-right"
          className="text-[var(--fc-border-faint)]"
        />
      )}
      {position === "middle" && (
        <>
          <Corner
            position="bottom-left"
            className="text-[var(--fc-border-faint)]"
          />
          <Corner
            position="bottom-right"
            className="text-[var(--fc-border-faint)]"
          />
        </>
      )}
      {position === "right" && (
        <Corner
          position="bottom-left"
          className="text-[var(--fc-border-faint)]"
        />
      )}
      {children}
    </div>
  );
}

function NavbarDropdownSection({
  title,
  children,
  className,
}: {
  title?: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("flex flex-col", className)}>
      {title && (
        <span className="px-2 pb-2 text-xs font-medium text-[var(--fc-black-alpha-40)] uppercase tracking-wider">
          {title}
        </span>
      )}
      <div className="flex flex-col gap-0.5">{children}</div>
    </div>
  );
}

function NavbarDropdownItem({
  children,
  href,
  description,
  className,
}: {
  children: React.ReactNode;
  href?: string;
  description?: string;
  className?: string;
}) {
  return (
    <a
      href={href || "#"}
      className={cn(
        "flex items-start gap-3 px-2 py-2 rounded-md transition-colors hover:bg-[var(--fc-black-alpha-4)]",
        className
      )}
    >
      <div className="flex flex-col gap-0.5">
        <span className="text-md font-medium text-[var(--fc-accent-black)]">
          {children}
        </span>
        {description && (
          <span className="text-sm text-[var(--fc-black-alpha-48)]">
            {description}
          </span>
        )}
      </div>
    </a>
  );
}

// Mobile

function NavbarMobileToggle({ className }: { className?: string }) {
  const { mobileOpen, setMobileOpen } = React.useContext(NavbarContext);
  return (
    <Button
      variant={"secondary"}
      type="button"
      onClick={() => setMobileOpen(!mobileOpen)}
      className={"flex lg:hidden"}
    >
      {mobileOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
    </Button>
  );
}

function NavbarMobileMenu({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const { mobileOpen } = React.useContext(NavbarContext);
  return (
    <motion.div
      animate={{ height: mobileOpen ? "calc(100dvh - 56px)" : 0 }}
      initial={false}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
      className={cn("lg:hidden overflow-hidden bg-white", className)}
    >
      <div className="flex flex-col px-4 pb-4 overflow-y-auto h-full">
        {children}
      </div>
    </motion.div>
  );
}

function NavbarMobileDropdown({
  id,
  label,
  children,
}: {
  id: string;
  label: string;
  children: React.ReactNode;
}) {
  const { mobileExpanded, setMobileExpanded } = React.useContext(NavbarContext);
  const isOpen = mobileExpanded === id;
  const contentRef = React.useRef<HTMLDivElement>(null);
  const { height } = useMeasure({ ref: contentRef });

  return (
    <div className="border-b border-[var(--fc-border-faint)]">
      <button
        type="button"
        onClick={() => setMobileExpanded(isOpen ? null : id)}
        className="flex w-full items-center justify-between py-4 text-base font-medium text-[var(--fc-accent-black)] cursor-pointer"
      >
        {label}
        {isOpen ? (
          <ChevronUp className="w-4 h-4" />
        ) : (
          <ChevronDown className="w-4 h-4" />
        )}
      </button>
      <motion.div
        animate={{ height: isOpen ? height : 0, opacity: isOpen ? 1 : 0 }}
        initial={false}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
        className="overflow-hidden"
      >
        <div ref={contentRef} className="flex flex-col gap-1 pb-4">
          {children}
        </div>
      </motion.div>
    </div>
  );
}

function NavbarMobileLink({
  children,
  href,
  className,
}: {
  children: React.ReactNode;
  href?: string;
  className?: string;
}) {
  return (
    <a
      href={href || "#"}
      className={cn(
        "flex items-center gap-3 py-4 text-base font-medium text-[var(--fc-accent-black)] border-b border-[var(--fc-border-faint)]",
        className
      )}
    >
      {children}
    </a>
  );
}

function NavbarMobileDropdownItem({
  children,
  href,
  icon,
  className,
}: {
  children: React.ReactNode;
  href?: string;
  icon?: React.ReactNode;
  className?: string;
}) {
  return (
    <a
      href={href || "#"}
      className={cn(
        "flex items-center gap-3 px-2 py-3 rounded-md text-sm font-medium text-[var(--fc-accent-black)] border-b border-[var(--fc-border-faint)]",
        className
      )}
    >
      {icon && <span className="text-primary">{icon}</span>}
      {children}
    </a>
  );
}

function NavbarMobileSectionTitle({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "px-2 pt-2 pb-1 text-xs font-medium text-[var(--fc-black-alpha-40)]",
        className
      )}
    >
      {children}
    </span>
  );
}

// Exports

export {
  Navbar,
  NavbarContent,
  NavbarBannerRow,
  NavbarBanner,
  NavbarRow,
  NavbarLink,
  NavbarDropdown,
  NavbarDropdownPanel,
  NavbarDropdownColumn,
  NavbarDropdownSection,
  NavbarDropdownItem,
  NavbarMobileToggle,
  NavbarMobileMenu,
  NavbarMobileDropdown,
  NavbarMobileLink,
  NavbarMobileDropdownItem,
  NavbarMobileSectionTitle,
};
