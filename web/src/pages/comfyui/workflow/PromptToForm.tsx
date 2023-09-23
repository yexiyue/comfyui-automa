import SelectImage from "@/components/form/SelectImage";
import SliderInput from "@/components/form/SliderInput";
import { useFormItems } from "@/hooks/useFormItems";
import { JsonType, formatJsonToFormItem } from "@/utils/jsonToForm";
import { Accordion, AccordionItem } from "@nextui-org/react";
import { Form, Input } from "antd";
import { useControllableValue, useUpdate, useWhyDidYouUpdate } from "ahooks";
import TextArea from "antd/es/input/TextArea";
import { useStore } from "@/store/useStore";
import { useMutation } from "@tanstack/react-query";
import { mutationFn } from "@/api/queryFn";
import { useEffect } from "react";

type PromptToFormProps = {
  id: string;
};

export default function PromptToForm(props: PromptToFormProps) {
  const [prompts, updatePrompts] = useStore((store) => [
    store.prompts,
    store.updatePrompts,
  ]);

  const { formItems } = useFormItems(prompts[props.id]);

  const [form] = Form.useForm();

  const { mutate } = useMutation({
    mutationFn: mutationFn(`/workflow/comfyui/${props.id}`, "put"),
  });
  return (
    <div className="w-1/3 h-[calc(100vh-56px)] min-w-[300px] max-w-[450px] p-2 pb-8 overflow-y-auto">
      {formItems && (
        <Form
          form={form}
          onValuesChange={(changedValues) => {
            Object.keys(changedValues).forEach((key) => {
              const names = key.split("-");
              const id = names[0];
              const field = names[1];
              updatePrompts(
                props.id,
                {
                  id,
                  field,
                  value: changedValues[key],
                },
                (prompt) => {
                  //mutate({ prompt });
                }
              );
            });
          }}
          layout="vertical"
        >
          <Accordion
            selectionMode="multiple"
            defaultExpandedKeys={formItems.map((item) => item.id)}
            isCompact
            variant="splitted"
          >
            {formItems.map((item) => {
              return (
                <AccordionItem
                  key={item.id}
                  aria-label={`Accordion ${item.id}`}
                  title={item.class_type}
                >
                  {item.fields.map((i) => {
                    return (
                      <>
                        <Form.Item
                          initialValue={i.default}
                          key={`${i.id}-${i.field}`}
                          label={i.field}
                          name={`${i.id}-${i.field}`}
                        >
                          <>
                            {i.type === "number" && (
                              <SliderInput
                                step={i.step}
                                min={i.min}
                                max={i.max}
                              ></SliderInput>
                            )}
                            {i.type === "textarea" &&
                              (i.multiline ? (
                                <TextArea rows={3}></TextArea>
                              ) : (
                                <Input defaultValue={i.default}></Input>
                              ))}
                            {i.type === "select" && (
                              <SelectImage
                                options={i.option.map((o) => ({
                                  label: o,
                                  value: o,
                                }))}
                                upload={i.image_upload}
                              ></SelectImage>
                            )}
                          </>
                        </Form.Item>
                      </>
                    );
                  })}
                </AccordionItem>
              );
            })}
          </Accordion>
        </Form>
      )}
    </div>
  );
}
