"use client";
import { mutationFn } from "@/api/queryFn";
import { Template } from "@/app/(other)/templates/page";
import { DatesList } from "@/store/useStore";
import {
  HomeOutlined,
  MinusCircleOutlined,
  PlusOutlined,
  SmileOutlined,
} from "@ant-design/icons";
import {
  Card,
  CardBody,
  CardHeader,
  Button as NextButton,
  CircularProgress,
} from "@nextui-org/react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  Breadcrumb,
  Button,
  Form,
  Input,
  Modal,
  Select,
  Space,
  Tag,
  Typography,
  Upload,
  UploadFile,
  message,
} from "antd";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
const { TextArea } = Input;
export default function DateSetting({ params }: { params: { id: string } }) {
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
  const [image, setImage] = useState("");
  useEffect(() => {
    if (!data) return;

    if (data.cover) {
      setImage(data.cover);
      let name: string[] = data.cover.split("/");
      data.cover = [
        {
          uid: -1,
          name: name[name.length - 1],
          status: "done",
          url: data.cover,
        },
      ] as any;
    }
    form.setFieldsValue(data);
  }, [data]);
  const [messageApi, contextHolder] = message.useMessage();
  const queryClient = useQueryClient();

  const { mutate } = useMutation({
    mutationFn: mutationFn(`/default/${params.id}`, "put"),
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

  const router = useRouter();
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
                  <Link href="/">
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
                  action={`${process.env.server}/upload`}
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
              <div className="mt-6">
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
    </>
  );
}
