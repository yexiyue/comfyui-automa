import SelectImage from "@/components/form/SelectImage";
import SliderInput from "@/components/form/SliderInput";
import { useFormItems } from "@/hooks/useFormItems";
import { JsonType, ObjectInfo } from "@/utils/jsonToForm";
import { Accordion, AccordionItem, Image } from "@nextui-org/react";
import { useQuery } from "@tanstack/react-query";
import { Form, Input, Select, Upload } from "antd";
import TextArea from "antd/es/input/TextArea";

type PromptToFormProps = {
  prompt: JsonType;
};

export default function PromptToForm({ prompt }: PromptToFormProps) {
  const { formItems } = useFormItems(prompt);
  const [form] = Form.useForm();
  return (
    <div className="w-1/3 h-[calc(100vh-56px)] p-2 pb-8 overflow-y-auto">
      {formItems && (
        <Form
          form={form}
          onValuesChange={(changedValues, allValues) => {
            console.log(changedValues);
          }}
          layout="vertical"
        >
          <Accordion selectionMode="multiple" isCompact variant="splitted">
            {formItems.map((item) => {
              return (
                <AccordionItem
                  key={item.id}
                  aria-label={`Accordion ${item.id}`}
                  title={item.class_type}
                >
                  {item.fields.map((i) => {
                    return (
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
