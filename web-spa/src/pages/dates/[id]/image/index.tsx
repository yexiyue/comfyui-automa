import { DatesList } from "@/store/useStore";
import { HomeOutlined, InboxOutlined } from "@ant-design/icons";
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Image,
  CircularProgress,
  useDisclosure,
  CardFooter,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
} from "@nextui-org/react";
import { useQuery } from "@tanstack/react-query";
import { Breadcrumb, Drawer, Empty, Input, message, Upload } from "antd";
import { Link, useParams } from "react-router-dom";
import { useState } from "react";
const { Dragger } = Upload;
export default function DateImage() {
  const params = useParams();
  const { data, isLoading } = useQuery<
    {
      data: DatesList;
    },
    Error,
    DatesList
  >({
    queryKey: [`/default/${params.id}`],
    select(data) {
      return data.data;
    },
  });

  const {
    data: images,
    isSuccess,
    refetch,
  } = useQuery<string[]>({
    queryKey: [`/image-space/${data?.name}`],
    enabled: !!data?.name,
  });
  const [messageApi, contextHolder] = message.useMessage();

  const { isOpen, onOpen, onClose } = useDisclosure();
  const {
    isOpen: imageView,
    onOpen: imageViewOpen,
    onClose: imageViewClose,
  } = useDisclosure();
  const [previewImage, setPreviewImage] = useState("");
  return (
    <>
      {contextHolder}
      {isLoading && (
        <CircularProgress
          className="fixed top-0 left-0 right-0 bottom-0 m-auto"
          label="加載中..."
        ></CircularProgress>
      )}
      <Card>
        <CardHeader>
          <Breadcrumb
            items={[
              {
                title: (
                  <Link to="/">
                    <HomeOutlined />
                  </Link>
                ),
              },
              {
                title: <span>图片空间</span>,
              },
            ]}
          />
        </CardHeader>
        <CardBody>
          <Button
            color="primary"
            variant="shadow"
            onClick={onOpen}
            className="w-12"
          >
            上传图片
          </Button>
          <div className=" grid grid-cols-4 my-4 gap-4 max-xl:grid-cols-3 max-lg:grid-cols-2 max-md:grid-cols-1">
            {!images || images.length === 0 ? (
              <Empty
                image="https://gw.alipayobjects.com/zos/antfincdn/ZHrcdLPrvN/empty.svg"
                className="w-full flex flex-col justify-center items-center"
                description={<span>暂时没有图片</span>}
              ></Empty>
            ) : null}
            {!isSuccess ? (
              <CircularProgress
                className="fixed top-0 left-0 right-0 bottom-0 m-auto"
                label="加載中..."
              ></CircularProgress>
            ) : (
              images!.map((item) => {
                return (
                  <Card
                    isPressable
                    key={item}
                    isFooterBlurred
                    className=" h-[300px] w-[200px] relative cursor-pointer"
                    onClick={() => {
                      setPreviewImage(item);
                      imageViewOpen();
                    }}
                  >
                    <Image
                      removeWrapper
                      isZoomed
                      className=" w-full h-full object-cover z-0"
                      src={item}
                    ></Image>
                  </Card>
                );
              })
            )}
          </div>
        </CardBody>
      </Card>
      <Drawer
        title="上传图片"
        placement="right"
        onClose={() => {
          refetch();
          onClose();
        }}
        open={isOpen}
        width="50%"
      >
        <div className="w-[80%] h-[40%] mt-8 mx-auto">
          <Dragger
            accept=".jpg,.png,.jpeg,.webp"
            action={`${import.meta.env.VITE_API_URL}/upload/${data?.name}`}
            maxCount={10}
            multiple
          >
            <p className="ant-upload-drag-icon">
              <InboxOutlined />
            </p>
            <p className="ant-upload-text">点击或拖拽上传图片</p>
            <p className="ant-upload-hint">支持PNG/JPG等图片格式</p>
          </Dragger>
        </div>
      </Drawer>
      <Modal size="full" isOpen={imageView} onClose={imageViewClose}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                图片预览
              </ModalHeader>
              <ModalBody
                className="h-[80%] bg-no-repeat bg-center bg-contain"
                style={{
                  backgroundImage: `url(${previewImage})`,
                }}
              ></ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  Close
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
