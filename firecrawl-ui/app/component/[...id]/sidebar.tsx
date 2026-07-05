"use client";

import { Sidebar, type SidebarItem } from "@/components/ui/sidebar";

const COMPONENT_ITEMS: SidebarItem[] = [
  { label: "Button", href: "/component/button" },
  { label: "Tabs", href: "/component/tabs" },
  { label: "Switch", href: "/component/switch" },
  { label: "Input", href: "/component/input" },
  { label: "Card", href: "/component/card" },
  { label: "Accordion", href: "/component/accordion" },
  { label: "Code Block", href: "/component/code-block" },
  { label: "Code Install", href: "/component/code-install" },
  { label: "Grid Loaders", href: "/component/grid-loaders" },
  { label: "Corner", href: "/component/corner" },
  { label: "Navbar", href: "/component/navbar" },
  { label: "Separator", href: "/component/separator" },
  { label: "Flip Counter", href: "/component/flip-counter" },
  { label: "Logo", href: "/component/logo" },
];

export function ComponentSidebar({ activeSlug }: { activeSlug: string }) {
  return <Sidebar items={COMPONENT_ITEMS} />;
}
