import { Form, Input, Modal, Select } from "antd";
import { useControlled } from "@reactuses/core";
import { useState } from "react";
type TemplateFieldProps = {
  open: boolean;
  onChange: (open: boolean) => void;
};
export default function TemplateField(props: TemplateFieldProps) {
  const [open] = useControlled({
    controlled: props.open,
  });
  const [form] = Form.useForm();
  const [type, setType] = useState("text");
  return (
    <Modal
      open={open}
      title="添加模版字段"
      okText="添加"
      cancelText="取消"
      onCancel={() => {
        props.onChange(false);
      }}
      onOk={() => {
        form.validateFields().then(() => {
          form.submit();
        });
      }}
    >
      <Form form={form} layout="vertical" name="fieldForm">
        <Form.Item name="fieldName" label="字段名" rules={[{ required: true }]}>
          <Input />
        </Form.Item>
        <Form.Item
          name="fieldType"
          label="字段类型"
          rules={[{ required: true }]}
        >
          <Select
            onChange={(value) => {
              setType(value);
            }}
            options={[
              {
                value: "text",
                label: "字符串",
              },
              {
                value: "number",
                label: "数字",
              },
            ]}
          ></Select>
        </Form.Item>
        <Form.Item name="defaultValue" label="默认值">
          <Input type={type} />
        </Form.Item>
      </Form>
    </Modal>
  );
}
