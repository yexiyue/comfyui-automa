"use client";

import React from "react";
import { StyleProvider, createCache, extractStyle } from "@ant-design/cssinjs";
import { useServerInsertedHTML } from "next/navigation";
import type Entity from "@ant-design/cssinjs/es/Cache";
import { useStore } from "@/store/useStore";
import { ConfigProvider, theme } from "antd";

const StyledComponentsRegistry = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const cache = React.useMemo<Entity>(() => createCache(), [createCache]);
  useServerInsertedHTML(() => (
    <style
      id="antd"
      dangerouslySetInnerHTML={{ __html: extractStyle(cache, true) }}
    />
  ));
  const dark=useStore((state) => state.theme);
  return (
    <StyleProvider cache={cache}>
      <ConfigProvider
        theme={{
          algorithm: dark==='dark'?theme.darkAlgorithm:theme.defaultAlgorithm,
        }}
      >
        {children}
      </ConfigProvider>
    </StyleProvider>
  );
};

export default StyledComponentsRegistry;
