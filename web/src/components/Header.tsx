import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  Button,
} from "@nextui-org/react";
import { Link, useNavigate } from "react-router-dom";
import { SunIcon, MoonIcon, Cog8ToothIcon } from "@heroicons/react/20/solid";
import { useLocation } from "react-router-dom";
import { useStore } from "@/store/useStore";
import { useEffect, useState } from "react";
export default function Header() {
  const [theme, setTheme] = useStore((store) => [store.theme, store.setTheme]);
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const [start, setStart] = useState(false);
  useEffect(() => {
    document.documentElement.className = theme;
  }, [theme]);
  return (
    <Navbar className=" border-b-1 h-14" shouldHideOnScroll>
      <NavbarBrand>
        <p className="font-bold text-inherit">ConmfyUI Automa</p>
      </NavbarBrand>
      <NavbarContent className="hidden sm:flex gap-4 flex-1" justify="center">
        <NavbarItem isActive={pathname === "/"}>
          <Link to="/">数据集</Link>
        </NavbarItem>
        <NavbarItem isActive={pathname === "/templates"}>
          <Link to="/templates">模版</Link>
        </NavbarItem>
        <NavbarItem isActive={pathname === "/comfyui"}>
          <Link to="/comfyui">comfyui</Link>
        </NavbarItem>
        <NavbarItem isActive={pathname === "/automa"}>
          <Link to="/automa">automa</Link>
        </NavbarItem>
        <NavbarItem isActive={pathname === "/about"}>
          <Link to="/about">关于</Link>
        </NavbarItem>
      </NavbarContent>
      <NavbarContent justify="end">
        <NavbarItem>
          <Button
            size="sm"
            color={pathname === "/comfyui/server" ? "primary" : "default"}
            onClick={() => {
              if (pathname === "/comfyui/server") return;
              fetch(`${import.meta.env.VITE_SERVER_URL}/start`).then(() => {
                setStart(true);
                navigate("/comfyui/server");
              });
            }}
          >
            {!start
              ? "一键启动"
              : pathname === "/comfyui/server"
              ? "Comfyui"
              : "进入Comfyui"}
          </Button>
        </NavbarItem>
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
            to="/setting"
            variant="flat"
          >
            <Cog8ToothIcon className="w-5 h-5"></Cog8ToothIcon>
          </Button>
        </NavbarItem>
      </NavbarContent>
    </Navbar>
  );
}
