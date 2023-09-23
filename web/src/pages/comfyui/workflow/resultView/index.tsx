import { mutationFn } from "@/api/queryFn";
import { useStore } from "@/store/useStore";
import { getHistoriesOutputs, getHistoryImage } from "@/utils/getHistoryImage";
import { HomeOutlined } from "@ant-design/icons";
import {
  Card,
  CardHeader,
  CardBody,
  Button,
  Image,
  useDisclosure,
} from "@nextui-org/react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Breadcrumb, Progress, Space } from "antd";
import { useEffect, useMemo } from "react";
import { Link } from "react-router-dom";
import { HistoryView } from "./HistoryView";
import TaskQueue from "./TaskQueue";
import { QueueList, useQueueStore } from "@/store/useQueueStore";
type ResultViewProps = {
  id: string;
  name: string;
};
export default function ResultView({ id, name }: ResultViewProps) {
  const [
    wsMessage,
    prompts,
    histories,
    idHistory,
    initWsbSocket,
    setHistories,
  ] = useStore((store) => [
    store.wsMessage,
    store.prompts,
    store.histories,
    store.idHistory,
    store.initWsbSocket,
    store.setHistories,
  ]);
  const { isOpen, onClose, onOpen } = useDisclosure();
  const queryClient = useQueryClient();
  initWsbSocket();
  const { mutate: postPrompt } = useMutation({
    mutationFn: mutationFn<{
      prompt_id: string;
    }>("/comfyui/prompt", "post"),
  });

  const { data: history } = useQuery<Record<string, any>>({
    queryKey: ["/comfyui/history"],
  });

  const { data } = useQuery<QueueList>({
    queryKey: ["/comfyui/queue"],
  });

  const [addQueue, getQueue] = useQueueStore((store) => [
    store.addQueue,
    store.getQueue,
  ]);

  const { length, queue_running } = getQueue(id);

  useEffect(() => {
    if (history) setHistories(history);
  }, [history]);

  const outputImages = useMemo(() => {
    // 重新计算图片
    if (!idHistory || !histories) return;
    return getHistoryImage(histories, idHistory[id]);
  }, [histories, idHistory]);

  const historyOutputs = useMemo(() => {
    if (!idHistory || !histories) return;
    return getHistoriesOutputs(histories, idHistory[id]);
  }, [histories, idHistory]);

  const {
    isOpen: isTaskOpen,
    onOpen: onTaskOpen,
    onOpenChange: onTaskOpenChange,
  } = useDisclosure();

  const showProgress = useMemo(() => {
    return (
      wsMessage.progress &&
      data?.queue_running?.[0]?.[1] === queue_running?.[0]?.promptId
    );
  }, [wsMessage, data, queue_running]);

  const { mutate: interrupt } = useMutation({
    mutationFn: async () => {
      fetch(`/comfyui/interrupt`, {
        method: "post",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({
          // delete: [queue_running?.[0]?.promptId],
          // clear: true,
        }),
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["/comfyui/queue"],
      });
    },
  });

  return (
    <div className="flex-1 p-2 pl-0">
      <Card className="h-full">
        <CardHeader>
          <Space size="large">
            <Breadcrumb
              items={[
                {
                  title: (
                    <Link to="/comfyui">
                      <HomeOutlined />
                    </Link>
                  ),
                },
                {
                  title: <span>工作流：{name}</span>,
                },
              ]}
            />
            <Button
              size="sm"
              color="primary"
              variant="light"
              onClick={onTaskOpen}
            >
              当前工作流任务队列:{length}
            </Button>
          </Space>
        </CardHeader>
        <CardBody className="pt-0">
          <Space>
            <Button
              color="primary"
              variant="shadow"
              size="sm"
              onClick={() => {
                postPrompt(
                  {
                    prompt: prompts[id],
                  },
                  {
                    onSuccess(data) {
                      addQueue(id, data.prompt_id);
                      queryClient.invalidateQueries({
                        queryKey: ["/comfyui/queue"],
                      });
                    },
                  }
                );
              }}
            >
              生成图片
            </Button>
            <Button color="primary" variant="shadow" size="sm" onClick={onOpen}>
              历史记录
            </Button>
            <Button
              color="danger"
              variant="shadow"
              size="sm"
              onClick={() => {
                interrupt(undefined);
              }}
            >
              取消当次任务
            </Button>
          </Space>
          <div>
            {showProgress && (
              <Progress
                percent={Math.ceil(
                  (wsMessage.progress!.value / wsMessage.progress!.max) * 100
                )}
              ></Progress>
            )}

            {outputImages &&
              outputImages?.length > 0 &&
              outputImages!.map((image, index) => (
                <div key={index}>
                  <p>{image.class_type}</p>
                  <div>
                    {image.images.map((item) => (
                      <Image
                        key={item.url}
                        src={item.url}
                        className="w-full h-full"
                      ></Image>
                    ))}
                  </div>
                </div>
              ))}
          </div>
        </CardBody>
      </Card>
      <HistoryView
        historyOutputs={historyOutputs}
        id={id}
        isOpen={isOpen}
        onClose={onClose}
      ></HistoryView>
      <TaskQueue
        id={id}
        isOpen={isTaskOpen}
        onOpenChange={onTaskOpenChange}
      ></TaskQueue>
    </div>
  );
}
