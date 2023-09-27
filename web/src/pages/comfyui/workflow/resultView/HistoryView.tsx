import { useStore } from "@/store/useStore";
import { getHistoriesOutputs } from "@/utils/getHistoryImage";
import { PhotoIcon } from "@heroicons/react/24/outline";
import { CardFooter, Card, Button, Image } from "@nextui-org/react";
import { Drawer, Popconfirm } from "antd";

type HistoryViewProps = {
  historyOutputs?: ReturnType<typeof getHistoriesOutputs>;
  onClose: () => void;
  isOpen: boolean;
  id: string;
};
export function HistoryView({
  historyOutputs,
  isOpen,
  onClose,
  id,
}: HistoryViewProps) {
  const [removeIdHistory, clearIdHistory, setPrompts] = useStore((store) => [
    store.removeIdHistory,
    store.clearIdHistory,
    store.setPrompts,
  ]);
  return (
    <Drawer
      title="历史记录"
      width="35%"
      placement="right"
      onClose={onClose}
      open={isOpen}
      extra={
        <Popconfirm
          title="清空历史记录"
          description="确定要清空历史记录吗？"
          onConfirm={() => {
            clearIdHistory(id);
            onClose();
          }}
          okText="确定"
          cancelText="取消"
          okButtonProps={{
            type: "default",
            danger: true,
          }}
        >
          <Button color="danger" size="sm">
            清空历史
          </Button>
        </Popconfirm>
      }
    >
      <div className="flex flex-col justify-center items-center gap-6">
        {!historyOutputs?.length && (
          <div className=" mt-[50%]">
            <PhotoIcon className="w-20 h-20 text-gray-300"></PhotoIcon>
            暂无历史记录
          </div>
        )}
        {historyOutputs?.map((item, index) => {
          return item.map((item1, index1) => (
            <Card
              key={`${index}-${index1}`}
              isFooterBlurred
              className="relative cursor-pointer max-w-[400px]"
            >
              <Image
                removeWrapper
                isZoomed
                className=" w-full h-full object-cover z-0"
                src={item1.images[0].url}
              ></Image>
              <CardFooter className="absolute bottom-0 left-0 z-10">
                <div className="flex items-center justify-between w-full">
                  <Button
                    color="primary"
                    variant="shadow"
                    size="sm"
                    onClick={async () => {
                      const res = await fetch(item1.images[0].url, {
                        method: "get",
                        headers: {
                          "Content-Type": "application/octet-stream",
                        },
                      });
                      const blob = await res.blob();
                      const url = URL.createObjectURL(blob);
                      const a = document.createElement("a");
                      a.download = item1.images[0].filename;
                      a.href = url;
                      a.click();
                      a.remove();
                    }}
                  >
                    保存图片
                  </Button>
                  <Button
                    color="primary"
                    variant="shadow"
                    size="sm"
                    onClick={() => {
                      setPrompts(id, item1.prompt);
                    }}
                  >
                    使用该提示词
                  </Button>
                  <Button
                    color="danger"
                    size="sm"
                    onClick={() => {
                      removeIdHistory(id, item1.prompt_id);
                    }}
                  >
                    删除
                  </Button>
                </div>
              </CardFooter>
            </Card>
          ));
        })}
      </div>
    </Drawer>
  );
}
