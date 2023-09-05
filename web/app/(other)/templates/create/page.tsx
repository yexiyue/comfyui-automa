"use client";
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
} from "antd";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Template } from "../page";
const { TextArea } = Input;

async function createTemplate(value: Template) {
  const res = await fetch(`${process.env.server}/templates`, {
    method: "post",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(value),
  });
  return await res.json();
}

export default () => {
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

  const [fieldOpen, setFieldOpen] = useState(false);
  const router = useRouter();
  const onSubmit = async () => {
    const values = await form.validateFields();
    values.cover = values.cover[0].response.url[0];
    await createTemplate(values);
    router.push("/templates/");
  };

  return (
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
              action="http://127.0.0.1:4060/upload"
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
                    <div key={index} className="gap-3 flex flex-row">
                      <Tag color="success">{field.fieldName}</Tag>
                      <Tag color="cyan">{field.fieldType}</Tag>
                      {field.defaultValue && (
                        <Tag color="orange">{field.defaultValue}</Tag>
                      )}
                      <Button
                        size="small"
                        danger
                        onClick={() => {
                          let newValue = fields.filter((_, i) => i !== index);
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
          <div className="mt-6">
            <Button block type="primary" onClick={onSubmit}>
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
