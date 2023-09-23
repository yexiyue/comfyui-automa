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
import { useQuery } from "@tanstack/react-query";
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
  const [getQueue, synchronous] = useQueueStore((store) => [
    store.getQueue,
    store.synchronous,
  ]);
  const { queue_running, queue_pending, length } = getQueue(id);
  useEffect(() => {
    synchronous(data);
  }, [data]);
  return (
    <Modal isOpen={isOpen} onOpenChange={onOpenChange} scrollBehavior="inside">
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader className="flex flex-col  gap-1">任务队列</ModalHeader>
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
                onPress={onClose}
              >
                清空当前队列
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
}
