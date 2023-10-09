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
import { getRandom } from "@/utils/getRandom";

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
    idConfig,
    initWsbSocket,
    setHistories,
  ] = useStore((store) => [
    store.wsMessage,
    store.prompts,
    store.histories,
    store.idHistory,
    store.idConfig,
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

  const [addQueue, getQueue, storeInterrupt] = useQueueStore((store) => [
    store.addQueue,
    store.getQueue,
    store.interrupt,
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
    return getHistoriesOutputs(histories, idHistory[id], "output");
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
      try {
        const res = await fetch(
          `${import.meta.env.VITE_SERVER_URL}/comfyui/interrupt`,
          {
            method: "post",
            headers: {
              "content-type": "application/json",
            },
            body: JSON.stringify({}),
          }
        );
        if (res.ok) {
          return await res.blob();
        }
      } catch (error) {
        throw error;
      }
    },
    onSuccess: () => {
      storeInterrupt();
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
                const prompt = prompts[id];
                const random = idConfig[id].random;
                if (random) {
                  for (const key in random) {
                    if (random[key]) {
                      prompt[key].inputs.seed = getRandom();
                    }
                  }
                }
                postPrompt(
                  {
                    prompt: prompt,
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
              color="primary"
              variant="shadow"
              size="sm"
              as={Link}
              to={`/comfyui/${id}/update`}
            >
              工作流设置
            </Button>
            {showProgress && (
              <Button
                color="danger"
                variant="shadow"
                size="sm"
                onClick={() => {
                  interrupt();
                }}
              >
                取消当次任务
              </Button>
            )}
          </Space>
          <div>
            {showProgress && (
              <Progress
                percent={Math.ceil(
                  (wsMessage.progress!.value / wsMessage.progress!.max) * 100
                )}
              ></Progress>
            )}

            <div className="flex flex-wrap justify-center mt-4 gap-[30px]">
              {outputImages &&
                outputImages?.length > 0 &&
                outputImages!.map((image, index) => (
                  <div key={index}>
                    <p className="text-xs">{image.class_type}</p>
                    <div className="bg-gray-100 rounded-[20px] py-4 hover:shadow-2xl transition cursor-pointer">
                      {image.images.map((item) => (
                        <Image
                          key={item.url}
                          src={item.url}
                          className="w-[400px] h-[400px] object-contain"
                        ></Image>
                      ))}
                    </div>
                  </div>
                ))}
            </div>
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
