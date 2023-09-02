"use client";
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  Button,
} from "@nextui-org/react";
import Link from "next/link";
import { SunIcon, MoonIcon } from "@heroicons/react/20/solid";
import { useDarkMode } from "@reactuses/core";
export default function Header() {
  const [dark, toggleDark] = useDarkMode({
    classNameDark: "dark",
    classNameLight: "light",
    defaultValue: false,
  });
  return (
    <Navbar className=" border-b-1 h-14">
      <NavbarBrand>
        <p className="font-bold text-inherit">YEXIYUE</p>
      </NavbarBrand>
      <NavbarContent className="hidden sm:flex gap-4 flex-1" justify="center">
        <NavbarItem>
          <Link color="foreground" href="#">
            Features
          </Link>
        </NavbarItem>
        <NavbarItem>
          <Link href="#" aria-current="page">
            Customers
          </Link>
        </NavbarItem>
        <NavbarItem>
          <Link color="foreground" href="#">
            Integrations
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
        <NavbarItem>
          <Button
            size="sm"
            as={Link}
            color="primary"
            href="/about"
            variant="flat"
          >
            About
          </Button>
        </NavbarItem>
      </NavbarContent>
    </Navbar>
  );
}
