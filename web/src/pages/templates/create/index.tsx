import TemplateField from "@/components/TemplateField";
import { PlusOutlined, SmileOutlined } from "@ant-design/icons";
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

export const TemplateCreate = () => {
  const [messageApi, contextHolder] = message.useMessage();
  const { mutate } = useMutation({
    mutationFn: mutationFn("/templates", "post"),
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
  const [workflowId, setWorkflowId] = useState("");
  const handlePreview = async (file: UploadFile) => {
    const url = URL.createObjectURL(file.originFileObj as any);

    setPreviewImage(url);
    setPreviewOpen(true);
    setPreviewTitle(
      file.name || file.url!.substring(file.url!.lastIndexOf("/") + 1)
    );
  };

  const [fieldOpen, setFieldOpen] = useState(false);
  const router = useNavigate();
  const onSubmit = async () => {
    const values = await form.validateFields();
    if (values.cover) {
      values.cover = values.cover[0].response.url[0];
    } else {
      values.cover = `${
        import.meta.env.VITE_SERVER_URL
      }/template_cover_default.png`;
    }
    values.workflowId = workflowId;
    mutate(values, {
      onSuccess: () => {
        messageApi.success("添加成功", 1).then(() => {
          router("/templates/");
        });
      },
      onError(error) {
        messageApi.error(error.message, 1);
      },
    });
  };

  return (
    <div className="mx-auto mt-5 w-2/5 pb-10">
      {contextHolder}
      <Form.Provider
        onFormFinish={(name, { values, forms }) => {
          if (name === "fieldForm") {
            setWorkflowId(values.workflowId);
            const { template, fieldForm } = forms;
            template.setFieldsValue({ fields: [...values.fields] });
            fieldForm.resetFields();
            setFieldOpen(false);
          }
        }}
      >
        <Form
          name="template"
          labelCol={{ span: 4 }}
          wrapperCol={{
            span: 20,
          }}
          form={form}
        >
          <Form.Item name="name" label="模版名称" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Form.Item
            name="description"
            label="模版描述"
            rules={[{ required: true }]}
          >
            <TextArea rows={3} />
          </Form.Item>
          <Form.Item
            label="模版封面"
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
          <Form.Item name="fields" hidden />

          <Form.Item
            label="模版字段"
            shouldUpdate={(prevValues, curValues) =>
              prevValues.fields !== curValues.fields
            }
            rules={[{ required: true }]}
          >
            {({ getFieldValue, setFieldsValue }) => {
              const fields: {
                field: string;
                type: string;
                default: string;
              }[] = getFieldValue("fields") || [];
              return fields.length > 0 ? (
                <div className="flex flex-col gap-3">
                  {fields.map((field, index) => (
                    <div
                      key={field.field + index}
                      className="gap-3 flex flex-row"
                    >
                      <Tag color="success">{field.field}</Tag>
                      <Tag color="cyan">{field.type}</Tag>
                      {field.default && (
                        <Tag color="orange">{field.default}</Tag>
                      )}
                      <AntdButton
                        size="small"
                        type="default"
                        danger
                        onClick={() => {
                          const newValue = fields.filter((_, i) => i !== index);
                          setFieldsValue({ fields: newValue });
                        }}
                      >
                        删除
                      </AntdButton>
                    </div>
                  ))}
                </div>
              ) : (
                <Typography.Text type="secondary">
                  ( <SmileOutlined /> 暂时没有模版字段 )
                </Typography.Text>
              );
            }}
          </Form.Item>
          <div className="w-56 mx-auto">
            <AntdButton
              type="dashed"
              onClick={() => {
                setFieldOpen(true);
              }}
              block
              icon={<PlusOutlined />}
            >
              从工作流中选择模版字段
            </AntdButton>
          </div>
          <div className="mt-6 flex justify-between">
            <Button
              color="primary"
              variant="shadow"
              className="w-1/3"
              onClick={() => {
                history.back();
              }}
            >
              返回
            </Button>
            <Button
              color="primary"
              variant="shadow"
              className="w-1/3"
              onClick={onSubmit}
            >
              添加模版
            </Button>
          </div>
        </Form>
        <TemplateField open={fieldOpen} onChange={setFieldOpen}></TemplateField>
      </Form.Provider>
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
