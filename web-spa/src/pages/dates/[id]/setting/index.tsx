import { mutationFn } from "@/api/queryFn";
import { DatesList } from "@/store/useStore";
import {
  HomeOutlined,
  MinusCircleOutlined,
  PlusOutlined,
} from "@ant-design/icons";
import {
  Card,
  CardBody,
  CardHeader,
  Button as NextButton,
  CircularProgress,
  Modal as NextModal,
  ModalContent,
  ModalBody,
  ModalFooter,
  ModalHeader,
  useDisclosure,
} from "@nextui-org/react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  Breadcrumb,
  Button,
  Form,
  Input,
  Modal,
  Space,
  Upload,
  UploadFile,
  message,
} from "antd";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
const { TextArea } = Input;
export default function DateSetting() {
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
  useEffect(() => {
    if (!data) return;
    let value = { ...data };
    if (value.cover) {
      setImage(value.cover);
      let name: string[] = value.cover.split("/");
      value.cover = [
        {
          uid: -1,
          name: name[name.length - 1],
          status: "done",
          url: value.cover,
        },
      ] as any;
    }
    form.setFieldsValue(value);
  }, [data]);
  const [image, setImage] = useState("");
  const [messageApi, contextHolder] = message.useMessage();
  const queryClient = useQueryClient();

  const { mutate } = useMutation({
    mutationFn: mutationFn(`/default/${params.id}`, "put"),
  });

  const { mutate: deleteMutate } = useMutation({
    mutationFn: mutationFn(`/default/${params.id}`, "delete"),
  });

  const normFile = (e: any) => {
    if (Array.isArray(e)) {
      return e;
    }
    return e?.fileList;
  };

  const [form] = Form.useForm();
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState("");
  const [previewTitle, setPreviewTitle] = useState("");
  const handlePreview = async (file: UploadFile) => {
    if (file.url) {
      setPreviewImage(file.url);
    } else {
      const url = URL.createObjectURL(file.originFileObj as any);
      setPreviewImage(url);
    }

    setPreviewOpen(true);
    setPreviewTitle(
      file.name || file.url!.substring(file.url!.lastIndexOf("/") + 1)
    );
  };

  const onSubmit = async () => {
    const values = await form.validateFields();
    values.cover = values.cover?.[0]?.response?.url?.[0] || image || "";

    mutate(values, {
      onError(error) {
        messageApi.error(error.message, 1);
      },
      onSuccess() {
        queryClient.invalidateQueries({ queryKey: ["/default"] });
        messageApi.success("保存成功", 1);
      },
    });
  };

  const { isOpen, onOpenChange, onOpen } = useDisclosure();
  const router = useNavigate();
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
                title: <span>设置</span>,
              },
            ]}
          />
        </CardHeader>
        <CardBody>
          <div className="mx-auto mt-5 w-1/2 min-w-[550px]">
            <Form
              name="template"
              labelCol={{ span: 4 }}
              wrapperCol={{
                span: 24,
              }}
              form={form}
            >
              <Form.Item
                name="name"
                label="数据集名称"
                rules={[{ required: true }]}
              >
                <Input />
              </Form.Item>
              <Form.Item
                name="description"
                label="数据集描述"
                rules={[{ required: true }]}
              >
                <TextArea rows={3} />
              </Form.Item>
              <Form.Item
                label="数据集封面"
                name="cover"
                valuePropName="fileList"
                getValueFromEvent={normFile}
              >
                <Upload
                  action={`${import.meta.env.VITE_SERVER_URL}/upload`}
                  onPreview={handlePreview}
                  accept=".png,.jpg,.jpeg,.webp"
                  maxCount={1}
                  listType="picture-card"
                >
                  <div>
                    <PlusOutlined />
                    <div style={{ marginTop: 8 }}>Upload</div>
                  </div>
                </Upload>
              </Form.Item>
              <Form.List name="meta" initialValue={[]}>
                {(fields, { add, remove }) => (
                  <>
                    {fields.map(({ key, name, ...restField }) => (
                      <Space
                        key={key}
                        style={{
                          display: "flex",
                          marginBottom: 8,
                        }}
                        align="baseline"
                      >
                        <Form.Item
                          {...restField}
                          name={[name, "name"]}
                          rules={[{ required: true, message: "名称" }]}
                        >
                          <Input placeholder="名称" />
                        </Form.Item>
                        <Form.Item
                          {...restField}
                          name={[name, "value"]}
                          rules={[{ required: true, message: "值" }]}
                        >
                          <Input placeholder="值" />
                        </Form.Item>
                        <MinusCircleOutlined onClick={() => remove(name)} />
                      </Space>
                    ))}
                    <Form.Item>
                      <Button
                        type="dashed"
                        onClick={() => add()}
                        block
                        icon={<PlusOutlined />}
                      >
                        添加元信息
                      </Button>
                    </Form.Item>
                  </>
                )}
              </Form.List>
              <div className="mt-6 flex gap-4">
                <NextButton
                  color="danger"
                  className="w-full"
                  variant="light"
                  onClick={onOpen}
                >
                  删除
                </NextButton>
                <NextButton
                  color="primary"
                  className="w-full"
                  variant="shadow"
                  onClick={onSubmit}
                >
                  保存
                </NextButton>
              </div>
            </Form>

            <Modal
              open={previewOpen}
              title={previewTitle}
              footer={null}
              onCancel={() => {
                setPreviewImage("");
                setPreviewOpen(false);
                setPreviewTitle("");
              }}
            >
              <img alt="example" style={{ width: "100%" }} src={previewImage} />
            </Modal>
          </div>
        </CardBody>
      </Card>
      <NextModal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">警告</ModalHeader>
              <ModalBody>
                <p className="text-xl">确定删除该数据集吗？</p>
              </ModalBody>
              <ModalFooter>
                <NextButton color="primary" variant="light" onPress={onClose}>
                  取消
                </NextButton>
                <NextButton
                  color="danger"
                  onPress={() => {
                    deleteMutate(undefined, {
                      onSuccess() {
                        queryClient.invalidateQueries({
                          queryKey: ["/default"],
                        });
                        messageApi.success("删除成功", 1).then(() => {
                          router("/", {
                            replace: true,
                          });
                        });
                      },
                    });
                  }}
                >
                  确定
                </NextButton>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </NextModal>
    </>
  );
}
