import TemplateField from "@/components/TemplateField";
import { PlusOutlined, SmileOutlined } from "@ant-design/icons";
import {
  Button,
  Form,
  Input,
  Modal,
  Tag,
  Typography,
  Upload,
  UploadFile,
  message,
} from "antd";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { Template } from "..";
import { useMutation, useQuery } from "@tanstack/react-query";
import { CircularProgress } from "@nextui-org/react";
import { mutationFn } from "@/api/queryFn";
const { TextArea } = Input;

export const TemplateDetail = () => {
  const params = useParams();
  const { isLoading, data, isSuccess } = useQuery<{ data: Template }>({
    queryKey: [`/templates/${params.id}`],
  });

  const updateTemplate = useMutation({
    mutationFn: mutationFn(`/templates/${params.id}`, "put"),
  });

  const [messageApi, contextHolder] = message.useMessage();

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

    if (data.data.cover) {
      setImage(data.data.cover);
      const name: string[] = data.data.cover.split("/");
      data.data.cover = [
        {
          uid: -1,
          name: name[name.length - 1],
          status: "done",
          url: data.data.cover,
        },
      ] as any;
    }
    form.setFieldsValue(data.data);
  }, [data]);

  const [fieldOpen, setFieldOpen] = useState(false);
  const router = useNavigate();
  const onSubmit = async () => {
    const values = await form.validateFields();
    values.cover = values.cover?.[0]?.response?.url?.[0] || image || "";
    updateTemplate.mutate(values, {
      onSuccess: () => {
        messageApi
          .success({
            content: "更新成功",
            duration: 1,
          })
          .then(() => {
            router("/templates/");
          });
      },
      onError(error) {
        messageApi.error(error.message, 1);
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
      {isSuccess && (
        <div className="mx-auto mt-5 w-2/5">
          <Form.Provider
            onFormFinish={(name, { values, forms }) => {
              if (name === "fieldForm") {
                const { template, fieldForm } = forms;
                const fields = template.getFieldValue("fields") || [];
                template.setFieldsValue({ fields: [...fields, values] });
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
              <Form.Item
                name="name"
                label="模版名称"
                rules={[{ required: true }]}
              >
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
                  action={`${import.meta.env.VITE_SERVER}/upload`}
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
              <Form.Item name="fields" hidden />

              <Form.Item
                label="模版字段"
                shouldUpdate={(prevValues, curValues) =>
                  prevValues.fields !== curValues.fields
                }
              >
                {({ getFieldValue, setFieldsValue }) => {
                  const fields: {
                    fieldName: string;
                    fieldType: string;
                    defaultValue: string;
                  }[] = getFieldValue("fields") || [];
                  return fields.length > 0 ? (
                    <div className="flex flex-col gap-3">
                      {fields.map((field, index) => (
                        <div
                          key={field.fieldName + index}
                          className="gap-3 flex flex-row"
                        >
                          <Tag color="success">{field.fieldName}</Tag>
                          <Tag color="cyan">{field.fieldType}</Tag>
                          {field.defaultValue && (
                            <Tag color="orange">{field.defaultValue}</Tag>
                          )}
                          <Button
                            size="small"
                            danger
                            onClick={() => {
                              const newValue = fields.filter(
                                (_, i) => i !== index
                              );
                              setFieldsValue({ fields: newValue });
                            }}
                            color="danger"
                          >
                            删除
                          </Button>
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
                <Button
                  type="dashed"
                  onClick={() => {
                    setFieldOpen(true);
                  }}
                  block
                  icon={<PlusOutlined />}
                >
                  添加模版字段
                </Button>
              </div>
              <div className="mt-6 flex justify-around">
                <Button
                  type="primary"
                  onClick={() => {
                    history.back();
                  }}
                >
                  取消
                </Button>
                <Button type="primary" onClick={onSubmit}>
                  更新模版
                </Button>
              </div>
            </Form>
            <TemplateField
              open={fieldOpen}
              onChange={setFieldOpen}
            ></TemplateField>
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
      )}
    </>
  );
};
