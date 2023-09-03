"use client";
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  Button,
} from "@nextui-org/react";
import Link from "next/link";
import { SunIcon, MoonIcon, Cog8ToothIcon } from "@heroicons/react/20/solid";
import { useDarkMode } from "@reactuses/core";
import { usePathname } from "next/navigation";
import { useStore } from "@/store/useStore";
import { useEffect } from "react";
export default function Header() {
  const [theme, setTheme] = useStore((store) => [store.theme, store.setTheme]);
  const pathname = usePathname();

  return (
    <Navbar className=" border-b-1 h-14" shouldHideOnScroll>
      <NavbarBrand>
        <p className="font-bold text-inherit">YEXIYUE</p>
      </NavbarBrand>
      <NavbarContent className="hidden sm:flex gap-4 flex-1" justify="center">
        <NavbarItem isActive={pathname === "/"}>
          <Link href="/" color="foreground">
            数据集
          </Link>
        </NavbarItem>
        <NavbarItem isActive={pathname === "/templates"}>
          <Link color="foreground" href="/templates">
            模版
          </Link>
        </NavbarItem>
        <NavbarItem isActive={pathname === "/about"}>
          <Link color="foreground" href="/about">
            关于
          </Link>
        </NavbarItem>
      </NavbarContent>
      <NavbarContent justify="end">
        <NavbarItem>
          <Button
            size="sm"
            onClick={() => {
              if (theme === "dark") {
                setTheme("light");
              } else {
                setTheme("dark");
              }
            }}
          >
            {theme === "dark" ? (
              <SunIcon className="w-5 h-5" />
            ) : (
              <MoonIcon className="w-5 h-5" />
            )}
          </Button>
        </NavbarItem>
        <NavbarItem isActive={pathname === "/setting"}>
          <Button
            size="sm"
            as={Link}
            color="primary"
            href="/setting"
            variant="flat"
          >
            <Cog8ToothIcon className="w-5 h-5"></Cog8ToothIcon>
          </Button>
        </NavbarItem>
      </NavbarContent>
    </Navbar>
  );
}
