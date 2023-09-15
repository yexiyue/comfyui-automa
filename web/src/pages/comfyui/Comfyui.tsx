import { ExclamationTriangleIcon } from "@heroicons/react/24/outline";
import { Button } from "@nextui-org/react";
import { useQuery } from "@tanstack/react-query";

export const Comfyui = () => {
  const { data, isSuccess, isError, error } = useQuery({
    queryKey: ["comfyui"],
    queryFn: async () => {
      try {
        const res = await fetch(
          `${import.meta.env.VITE_SERVER_URL}/comfyui/system_stats`
        );
        return await res.json();
      } catch (error) {
        console.error(error);
        throw new Error(`comfyui 服务未成功启动`);
      }
    },
  });
  console.log(data);
  return (
    <div className=" w-full h-[calc(100vh-56px)] flex justify-center items-center text-center">
      {isSuccess && (
        <>
          <Button
            className="absolute left-3 top-16"
            size="sm"
            color="primary"
            variant="shadow"
            onClick={() => {
              history.back();
            }}
          >
            返回
          </Button>
          <embed src="http://localhost:8188" width="100%" height="100%"></embed>
        </>
      )}
      {isError && (
        <div className="flex justify-center items-center flex-col">
          <ExclamationTriangleIcon className=" w-10 h-10 text-red-400"></ExclamationTriangleIcon>
          <p className=" text-red-400 text-lg ">{error.message}</p>
        </div>
      )}
    </div>
  );
};
