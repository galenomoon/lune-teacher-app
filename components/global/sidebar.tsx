"use client";
import {
  Calendar,
  PanelLeftCloseIcon,
  PanelLeftOpenIcon,
  BanknoteArrowDown,
  Home,
  User,
  LogOutIcon,
} from "lucide-react";

import {
  Sidebar as SidebarUI,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarHeader,
  useSidebar,
} from "@/components/ui/sidebar";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { destroyCookie } from "nookies";
import { useRouter } from "next/navigation";

export function Sidebar() {
  const pathname = usePathname();
  const { toggleSidebar, open } = useSidebar();
  const router = useRouter();
  const sidebarGroups = [
    {
      label: "Menu",
      items: [
        {
          title: "Início",
          url: "/",
          icon: Home,
          pending: false,
        },
        // {
        //   title: "Agenda",
        //   url: "/agenda",
        //   icon: Calendar,
        //   pending: false,
        // },
        // {
        //   title: "Financeiro",
        //   url: "/financeiro",
        //   icon: BanknoteArrowDown,
        //   pending: false,
        // },
        {
          title: "Perfil",
          url: "/perfil",
          icon: User,
          pending: false,
        },
      ],
    },
  ];

  const handleLogout = () => {
    destroyCookie(undefined, "token");
    router.push("/login");
  };

  return (
    <SidebarUI collapsible="icon" variant="sidebar">
      <SidebarContent className="bg-purple-lune text-white ">
        <SidebarHeader className="flex items-center gap-6 pt-6 pb-0 justify-center">
          <header className="flex items-center justify-between w-full px-4 py-3 border-b border-white/10">
            <span className="text-xl font-bold tracking-tight">
              Lune Teacher
            </span>
          </header>
        </SidebarHeader>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton
                  asChild
                  className={cn(
                    "mt-0 hover:text-yellow-500 bg-white/10 py-2 px-4 h-fit hover:bg-purple-lune transition-colors duration-300"
                  )}
                >
                  <button onClick={toggleSidebar} className="cursor-pointer">
                    {open ? <PanelLeftCloseIcon /> : <PanelLeftOpenIcon />}
                    <span>Fechar Menu</span>
                  </button>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
        {sidebarGroups.map((group) => (
          <SidebarGroup key={group.label}>
            <SidebarGroupLabel className="text-white/60">
              {group.label}
            </SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {group.items.map((item) => {
                  const isActive = pathname === item.url;
                  const isBlocked = false;

                  return (
                    <SidebarMenuItem key={item.title}>
                      <SidebarMenuButton
                        asChild
                        className={cn(
                          isBlocked ? "cursor-not-allowed !opacity-20" : "",
                          "hover:text-yellow-500 hover:bg-purple-lune transition-colors duration-300",
                          isActive &&
                            "text-yellow-500 bg-white/5 hover:text-white"
                        )}
                      >
                        {isBlocked ? (
                          <div className="cursor-not-allowed !opacity-20">
                            <item.icon />
                            <span>{item.title}</span>
                          </div>
                        ) : (
                          <a href={item.url} className="cursor-pointer">
                            <item.icon />
                            <span>{item.title}</span>
                            {!!item?.pending && (
                              <div className="relative flex items-center justify-center">
                                <div className="w-3 h-3 bg-yellow-500 rounded-full animate-ping"></div>
                                <div className="absolute w-2 h-2 bg-yellow-500 rounded-full"></div>
                              </div>
                            )}
                          </a>
                        )}
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  );
                })}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        ))}
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton
                  asChild
                  className={cn(
                    "mt-0 hover:text-yellow-500  py-2 px-4 h-fit hover:bg-purple-lune transition-colors duration-300"
                  )}
                >
                  <button onClick={handleLogout} className="cursor-pointer">
                    <LogOutIcon />
                    <span>Sair</span>
                  </button>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </SidebarUI>
  );
}
