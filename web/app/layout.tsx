"use client";
import Header from "@/components/Header";
import "./globals.css";
import { Inter } from "next/font/google";
import StyledComponentsRegistry from "@/components/AntdRegistry";
import { useStore } from "@/store/useStore";
import { useEffect } from "react";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const theme = useStore((state) => state.theme);
  //控制store 水合化时间
  useEffect(() => {
    useStore.persist.rehydrate()
  },[])
  return (
    <html lang="en" className={`scrollbar-hide ${theme}`}>
      <body className={inter.className}>
        <StyledComponentsRegistry>
          <div className="h-screen w-screen">
            <Header></Header>
            <main>{children}</main>
          </div>
        </StyledComponentsRegistry>
      </body>
    </html>
  );
}
