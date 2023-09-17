import TemplateField from "@/components/TemplateField";
import { PlusOutlined, SmileOutlined, UploadOutlined } from "@ant-design/icons";
import {
  Button as AntdButton,
  Form,
  Input,
  Modal,
  Tag,
  Typography,
  Upload,
  UploadFile,
  message,
} from "antd";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { mutationFn } from "@/api/queryFn";
import { Button } from "@nextui-org/react";

const { TextArea } = Input;

export const ComfyuiCreate = () => {
  const [messageApi, contextHolder] = message.useMessage();
  const { mutate } = useMutation({
    mutationFn: mutationFn("/workflow/comfyui", "post"),
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
    const url = URL.createObjectURL(file.originFileObj as any);

    setPreviewImage(url);
    setPreviewOpen(true);
    setPreviewTitle(
      file.name || file.url!.substring(file.url!.lastIndexOf("/") + 1)
    );
  };

  const [prompt, setPrompt] = useState<any>();

  const router = useNavigate();
  const onSubmit = async () => {
    const values = await form.validateFields();
    values.prompt = prompt;
    if (values.cover) {
      values.cover = values.cover[0].response.url[0];
    } else {
      values.cover = `${import.meta.env.VITE_SERVER_URL}/comfyui_cover_default.png`;
    }

    mutate(values, {
      onSuccess: () => {
        messageApi.success("添加成功", 1).then(() => {
          router("/comfyui");
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
        <Form.Item label="工作流">
          <Upload
            beforeUpload={(file) => {
              const fileReader = new FileReader();
              fileReader.readAsText(file);
              fileReader.onload = () => {
                try {
                  const json = JSON.parse(fileReader.result as string);
                  setPrompt(json);
                } catch (error: any) {
                  messageApi.error(error.message, 1);
                }
              };
              return false;
            }}
            accept=".json"
            maxCount={1}
          >
            <AntdButton icon={<UploadOutlined />}>点击进行上传</AntdButton>
          </Upload>
        </Form.Item>

        <div className="mt-6">
          <Button
            color="primary"
            className="w-full"
            variant="shadow"
            onClick={onSubmit}
          >
            添加工作流
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
