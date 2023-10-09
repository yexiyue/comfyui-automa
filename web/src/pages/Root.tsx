import Header from "@/components/Header";
import "@/assets/globals.css";
import StyledComponentsRegistry from "@/components/AntdRegistry";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { queryFn } from "@/api/queryFn";
import { Outlet } from "react-router-dom";

export const RootLayout = () => {
  // 使用react-query
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        retry: 0,
        queryFn: queryFn,
      },
    },
  });
  return (
    <QueryClientProvider client={queryClient}>
      <StyledComponentsRegistry>
        <div className="h-screen w-screen">
          <Header></Header>
          <main>
            <Outlet></Outlet>
          </main>
        </div>
      </StyledComponentsRegistry>
    </QueryClientProvider>
  );
};
