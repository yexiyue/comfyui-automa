import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  Button,
} from "@nextui-org/react";
import { Link } from "react-router-dom";
import { SunIcon, MoonIcon, Cog8ToothIcon } from "@heroicons/react/20/solid";
import { useLocation } from "react-router-dom";
import { useStore } from "@/store/useStore";
export default function Header() {
  const [theme, setTheme] = useStore((store) => [store.theme, store.setTheme]);
  const { pathname } = useLocation();
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  // const [_, setDark] = useDarkMode({
  //   defaultValue: theme === "dark",
  //   classNameDark: "dark",
  //   classNameLight: "light",
  // });
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
        <NavbarItem isActive={pathname === "/automa"}>
          <Link to="/automa">automa工作流</Link>
        </NavbarItem>
        <NavbarItem isActive={pathname === "/about"}>
          <Link to="/about">关于</Link>
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
              // setDark();
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
