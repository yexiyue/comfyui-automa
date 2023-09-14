import React from "react";
import { StyleProvider, createCache } from "@ant-design/cssinjs";
import type Entity from "@ant-design/cssinjs/es/Cache";
import { useStore } from "@/store/useStore";
import { ConfigProvider, theme } from "antd";
import { NextUIProvider } from "@nextui-org/react";

const StyledComponentsRegistry = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const cache = React.useMemo<Entity>(() => createCache(), [createCache]);
  const dark=useStore((state) => state.theme);
  return (
    <NextUIProvider>
      <StyleProvider cache={cache}>
        <ConfigProvider
          theme={{
            algorithm:
              dark === "dark" ? theme.darkAlgorithm : theme.defaultAlgorithm,
          }}
        >
          {children}
        </ConfigProvider>
      </StyleProvider>
    </NextUIProvider>
  );
};

export default StyledComponentsRegistry;
