"use client";

import { Sidebar, type SidebarItem } from "@/components/ui/sidebar";

interface ComponentSidebarProps {
  items: SidebarItem[];
  activeSlug: string;
}

export function ComponentSidebar({ items, activeSlug }: ComponentSidebarProps) {
  return <Sidebar items={items} activeHref={`/component/${activeSlug}`} />;
}
