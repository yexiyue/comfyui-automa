import { PlusOutlined, UploadOutlined } from "@ant-design/icons";
import {
  Button as AntdButton,
  Form,
  Input,
  Modal,
  Upload,
  UploadFile,
  message,
} from "antd";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useMutation, useQuery } from "@tanstack/react-query";
import { mutationFn } from "@/api/queryFn";
import { Button } from "@nextui-org/react";
import { ComfyuiWorkflowDate } from "./workflow";

const { TextArea } = Input;

export const ComfyuiUpdate = () => {
  const params = useParams();
  const id = params.id;
  const { data, isSuccess, isLoading } = useQuery<
    {
      data: ComfyuiWorkflowDate;
    },
    Error,
    ComfyuiWorkflowDate
  >({
    queryKey: [`/workflow/comfyui/${id}`],
    select(data) {
      return data.data;
    },
  });

  const [messageApi, contextHolder] = message.useMessage();
  const { mutate } = useMutation({
    mutationFn: mutationFn(`/workflow/comfyui/${id}`, "put"),
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
  const [image, setImage] = useState("");
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

  useEffect(() => {
    if (!data) return;
    let value = { ...data };
    if (value.cover) {
      setImage(value.cover);
      const name: string[] = value.cover.split("/");
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

  const router = useNavigate();
  const onSubmit = async () => {
    const values = await form.validateFields();
    values.cover = values.cover?.[0]?.response?.url?.[0] || image || "";

    mutate(values, {
      onSuccess: () => {
        messageApi.success("添加成功", 1).then(() => {
          router(`/comfyui/${id}`);
        });
      },
      onError(error) {
        messageApi.error(error.message, 1);
      },
    });
  };

  return (
    <div className="mx-auto mt-5 w-2/5">
      {contextHolder}

      <Form
        name="workflow"
        labelCol={{ span: 4 }}
        wrapperCol={{
          span: 20,
        }}
        form={form}
      >
        <Form.Item name="name" label="工作流名称" rules={[{ required: true }]}>
          <Input />
        </Form.Item>
        <Form.Item
          name="description"
          label="工作流描述"
          rules={[{ required: true }]}
        >
          <TextArea rows={3} />
        </Form.Item>
        <Form.Item
          label="工作流封面"
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
              <div style={{ marginTop: 8 }}>上传图片</div>
            </div>
          </Upload>
        </Form.Item>

        <div className="mt-6 flex justify-evenly">
          <Button
            className="w-[50px]"
            variant="shadow"
            onClick={() => {
              history.back();
            }}
          >
            取消
          </Button>
          <Button
            color="primary"
            className="w-[50px]"
            variant="shadow"
            onClick={onSubmit}
          >
            更新
          </Button>
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
  );
};
