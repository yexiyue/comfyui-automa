import { mutationFn } from "@/api/queryFn";
import { Task, useQueueStore } from "@/store/useQueueStore";
import { useStore } from "@/store/useStore";
import { Button, CircularProgress } from "@nextui-org/react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
export function TaskItem(
  props: Task & {
    status: "running" | "waiting";
  }
) {
  const [wsMessage] = useStore((store) => [store.wsMessage]);
  const queryClient = useQueryClient();
  const [interruptTask, deleteTask] = useQueueStore((store) => [
    store.interrupt,
    store.deleteTask,
  ]);
  const { mutate: interrupt } = useMutation({
    mutationFn: async (body: any) => {
      fetch(`${import.meta.env.VITE_SERVER_URL}/comfyui/interrupt`, {
        method: "post",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(body),
      });
    },
    onSuccess: () => {
      interruptTask();
    },
  });

  const { mutate: cancel } = useMutation({
    mutationFn: async (body: any) => {
      fetch(`${import.meta.env.VITE_SERVER_URL}/comfyui/queue`, {
        method: "post",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(body),
      });
    },
    onSuccess: () => {
      deleteTask([props.promptId]);
      queryClient.invalidateQueries({
        queryKey: ["/comfyui/queue"],
      });
    },
  });
  return (
    <div className="flex items-center justify-between h-12 gap-3">
      <div className="flex-1 h-12 py-4 flex flex-col justify-around">
        <p className="text-md">任务ID:</p>
        <p className=" text-xs text-gray-400">{props.promptId}</p>
      </div>

      {props.status === "running" && wsMessage.progress && (
        <>
          <CircularProgress
            size="md"
            value={Math.ceil(
              (wsMessage.progress!.value / wsMessage.progress!.max) * 100
            )}
            color="primary"
            showValueLabel={true}
          />
          <Button
            size="sm"
            color="danger"
            onClick={() => {
              interrupt({});
            }}
            variant="light"
          >
            终止
          </Button>
        </>
      )}
      {props.status === "waiting" && (
        <>
          <span className="text-xs mt-4">等待中...</span>
          <Button
            size="sm"
            color="danger"
            onClick={() =>
              cancel({
                client_id: wsMessage.sid,
                delete: [props.promptId],
              })
            }
            variant="light"
          >
            取消
          </Button>
        </>
      )}
    </div>
  );
}
