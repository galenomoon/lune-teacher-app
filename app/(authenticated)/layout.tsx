"use client";
import { Sidebar } from "@/components/global/sidebar";
import PWAInstallPrompt from "@/components/global/pwa-install-prompt";
import React from "react";
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar";

export default function AuthenticatedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SidebarProvider>
      {/* <Sidebar /> */}
      <SidebarInset>
        <div className="flex flex-1 flex-col gap-4 pt-0">{children}</div>
        <PWAInstallPrompt />
      </SidebarInset>
    </SidebarProvider>
  );
}
