"use client";

import { Route } from "next";
import { usePathname } from "next/navigation";
import { FC, ReactNode, useMemo } from "react";
import { BiSearch } from "react-icons/bi";
import { HiHome } from "react-icons/hi";
import Box from "./Box";
import SidebarItem from "./SidebarItem";
import Library from "./Library";

type SidebarProps = {
  children: ReactNode;
};

const Sidebar: FC<SidebarProps> = ({ children }) => {
  const pathname = usePathname();
  const routes = useMemo(
    () => [
      {
        label: "Home",
        href: "/",
        active: pathname !== "/search",
        icon: HiHome,
      },
      {
        href: "/search",
        active: pathname === "/search",
        icon: BiSearch,
        label: "Search",
      },
    ],
    [pathname]
  );
  return (
    <div className="flex h-screen md:p-2 gap-x-2">
      <div className="hidden flex-col h-full w-[300px] md:flex gap-y-2  ">
        <Box>
          {routes.map((route) => (
            <SidebarItem key={route.label} {...route} />
          ))}
        </Box>
        <Box className="h-full overflow-y-auto">
          <Library />
        </Box>
      </div>
      <main className="h-full flex-1 overflow-y-auto ">{children}</main>
    </div>
  );
};

export default Sidebar;
