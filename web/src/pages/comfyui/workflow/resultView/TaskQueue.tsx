import { TaskItem } from "@/components/TaskItem";
import { useQueueStore } from "@/store/useQueueStore";
import { QueueListIcon } from "@heroicons/react/24/outline";
import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
} from "@nextui-org/react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { message } from "antd";
import { useEffect } from "react";

export default function TaskQueue({
  id,
  isOpen,
  onOpenChange,
}: {
  id: string;
  isOpen: boolean;
  onOpenChange: () => void;
}) {
  const { data } = useQuery<any>({
    queryKey: ["/comfyui/queue"],
  });
  const [getQueue, synchronous, deleteTask] = useQueueStore((store) => [
    store.getQueue,
    store.synchronous,
    store.deleteTask,
  ]);
  const { queue_running, queue_pending, length } = getQueue(id);
  useEffect(() => {
    synchronous(data);
  }, [data]);
  const queryClient = useQueryClient();
  const [messageApi, contextHolder] = message.useMessage();
  const { mutate: cancel } = useMutation({
    mutationFn: async (data: { delete: string[] }) => {
      try {
        const res = await fetch(
          `${import.meta.env.VITE_SERVER_URL}/comfyui/queue`,
          {
            method: "post",
            headers: {
              "content-type": "application/json",
            },
            body: JSON.stringify(data),
          }
        );
        if (res.ok) {
          return await res.blob();
        }
      } catch (error) {
        throw error;
      }
    },
    onSuccess: (_, variables) => {
      deleteTask(variables.delete);
      queryClient.invalidateQueries({
        queryKey: ["/comfyui/queue"],
      });
    },
  });
  return (
    <>
      {contextHolder}
      <Modal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        scrollBehavior="inside"
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col  gap-1">
                任务队列
              </ModalHeader>
              <ModalBody>
                <div className="h-[70vh] w-full flex flex-col gap-4">
                  {length <= 0 && (
                    <div className="w-full flex flex-col justify-center items-center mt-[30%]">
                      <QueueListIcon className="w-6 h-6 text-gray-400"></QueueListIcon>
                      暂无任务队列
                    </div>
                  )}
                  {queue_running.map((item) => (
                    <TaskItem {...item} status="running"></TaskItem>
                  ))}
                  {queue_pending.map((item) => (
                    <TaskItem {...item} status="waiting"></TaskItem>
                  ))}
                </div>
              </ModalBody>
              <ModalFooter>
                <Button
                  size="md"
                  color="primary"
                  variant="light"
                  onPress={onClose}
                >
                  关闭
                </Button>
                <Button
                  size="md"
                  color="danger"
                  variant="light"
                  onPress={() => {
                    cancel(
                      {
                        delete: queue_pending.map((i) => i.promptId),
                      },
                      {
                        onSuccess(data, variables, context) {
                          messageApi.success("清空成功", 2);
                          onClose();
                        },
                      }
                    );
                  }}
                >
                  清空当前队列
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
