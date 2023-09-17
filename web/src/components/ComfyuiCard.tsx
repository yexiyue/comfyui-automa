import { mutationFn } from "@/api/queryFn";
import {
  Button,
  Card,
  CardFooter,
  CardHeader,
  Image,
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useDisclosure,
} from "@nextui-org/react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { message } from "antd";
import moment from "moment";
import { Link } from "react-router-dom";

type ComfyuiCardProps = {
  id: string;
  name: string;
  cover: string;
  description: string;
  create_time: string;
};

export const ComfyuiCard = ({
  id,
  name,
  cover,
  description,
  create_time,
}: ComfyuiCardProps) => {
  const [messageApi, messageHolder] = message.useMessage();
  const queryClient = useQueryClient();
  const { mutate } = useMutation({
    mutationFn: mutationFn(`/workflow/comfyui/${id}`, "delete"),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["/workflow/comfyui"],
      });
      messageApi.success("删除成功", 1);
    },
    onError(error) {
      messageApi.error(error.message, 1);
    },
  });

  const { isOpen, onOpenChange, onOpen } = useDisclosure();
  return (
    <>
      {messageHolder}
      <Card
        isPressable
        as={Link}
        to={`/comfyui/${id}`}
        isFooterBlurred
        className=" h-[300px] w-[200px] relative cursor-pointer"
      >
        <CardHeader className="absolute z-10 top-0 flex flex-col items-start text-white  backdrop-blur-sm">
          <p className="font-bold">{name}</p>
          <p className="text-xs">{description}</p>
        </CardHeader>
        <Image
          removeWrapper
          isZoomed
          className=" w-full h-full object-cover z-0"
          src={cover}
        ></Image>
        <CardFooter className="absolute z-10 bottom-0 flex flex-row">
          <p className="text-xs">
            {moment(create_time).format("YYYY/MM/DD HH:mm:ss")}
          </p>
          <Button
            size="sm"
            color="danger"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              onOpen();
            }}
          >
            删除
          </Button>
        </CardFooter>
      </Card>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">警告</ModalHeader>
              <ModalBody>确认删除工作流{`(${name})`}吗？</ModalBody>
              <ModalFooter>
                <Button color="primary" variant="light" onPress={onClose}>
                  取消
                </Button>
                <Button
                  color="danger"
                  variant="light"
                  onPress={() => {
                    mutate(null);
                    onClose();
                  }}
                >
                  确认
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
};
