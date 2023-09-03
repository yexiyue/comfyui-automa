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
export default function Header() {
  const [dark, toggleDark] = useDarkMode({
    classNameDark: "dark",
    classNameLight: "light",
    defaultValue: false,
  });
  const pathname = usePathname();
  return (
    <Navbar className=" border-b-1 h-14" shouldHideOnScroll>
      <NavbarBrand>
        <p className="font-bold text-inherit">YEXIYUE</p>
      </NavbarBrand>
      <NavbarContent className="hidden sm:flex gap-4 flex-1" justify="center">
        <NavbarItem isActive={pathname === "/"}>
          <Link color="foreground" href="/home">
            首页
          </Link>
        </NavbarItem>
        <NavbarItem>
          <Link href="/" color="foreground">
            数据集
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
          <Button size="sm" onClick={toggleDark}>
            {dark ? (
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
