import {
  Form,
  Input,
  Modal,
  Select,
  Tree,
  TreeSelect,
  TreeSelectProps,
} from "antd";
import { useControlled } from "@reactuses/core";
import { useMemo, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import {
  FormFields,
  JsonType,
  ObjectInfo,
  jsonToFormItemArray2,
} from "@/utils/jsonToForm";

type TemplateFieldProps = {
  open: boolean;
  onChange: (open: boolean) => void;
};
export default function TemplateField(props: TemplateFieldProps) {
  const [open] = useControlled({
    controlled: props.open,
  });
  const [form] = Form.useForm();
  const { data } = useQuery<{ id: string; name: string; prompt: JsonType }[]>({
    queryKey: ["/workflow/comfyui"],
  });

  const { data: object_info } = useQuery<ObjectInfo>({
    queryKey: ["/comfyui/object_info"],
  });
  const options = useMemo(() => {
    if (data) {
      return data.map((item) => ({
        label: item.name,
        value: item.id,
        prompt: item.prompt,
      }));
    }
  }, [data]);
  const [formItems, setFormItems] = useState<FormFields[]>();

  const treeOption = useMemo(() => {
    return formItems?.map((item) => ({
      title: item.class_type,
      value: item.id,
      children: item.fields.map((field) => ({
        title: field.field,
        value: `${field.id}-${field.field}`,
      })),
    }));
  }, [formItems]);

  const [selectFormItems, setSelectFormItems] = useState<FormFields["fields"]>(
    []
  );
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
          form.setFieldsValue({
            fields: selectFormItems,
            workflowId: form.getFieldValue("workflowId"),
          });
          form.submit();
        });
      }}
      okButtonProps={{
        type: "default",
      }}
    >
      <Form form={form} layout="vertical" name="fieldForm">
        <Form.Item
          name="workflowId"
          label="工作流名称"
          rules={[{ required: true }]}
        >
          <Select
            onChange={(v, option) => {
              let res = jsonToFormItemArray2(
                structuredClone((option as any).prompt),
                object_info!
              );
              setFormItems(res?.filter((item) => item.fields.length > 0));
            }}
            options={options}
          ></Select>
        </Form.Item>
        <Form.Item name="fields" label="字段" rules={[{ required: true }]}>
          <TreeSelect
            onChange={(v: string[]) => {
              const allFields = v.filter((i) => !i.includes("-"));
              const selectFields = v.filter(
                (i) => i.includes("-") && !allFields.includes(i.split("-")[0])
              );
              const value1 = selectFields.map((i) => {
                const id = i.split("-")[0];
                const field = i.split("-")[1];
                return formItems
                  ?.find((item) => item.id === id)
                  ?.fields.find((item) => item.field === field);
              });
              const value = allFields
                .map((i) => formItems!.find((item) => item.id === i)!.fields)
                .flat()
                .concat(value1 as any);

              setSelectFormItems(value);
            }}
            multiple
            allowClear
            treeData={treeOption}
          ></TreeSelect>
        </Form.Item>
      </Form>
    </Modal>
  );
}
