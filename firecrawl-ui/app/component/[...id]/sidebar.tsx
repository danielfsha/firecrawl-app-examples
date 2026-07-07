"use client";

import { Sidebar, type SidebarSection } from "@/components/ui/sidebar";

interface ComponentSidebarProps {
  sections: SidebarSection[];
  activeHref: string;
}

export function ComponentSidebar({ sections, activeHref }: ComponentSidebarProps) {
  return <Sidebar sections={sections} activeHref={activeHref} />;
}
