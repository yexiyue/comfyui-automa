import SelectImage from "@/components/form/SelectImage";
import SliderInput from "@/components/form/SliderInput";
import { useFormItems } from "@/hooks/useFormItems";
import { Accordion, AccordionItem } from "@nextui-org/react";
import { Form, Input, Select } from "antd";
import TextArea from "antd/es/input/TextArea";
import { useStore } from "@/store/useStore";
import { useWhyDidYouUpdate } from "ahooks";

type PromptToFormProps = {
  id: string;
};

export default function PromptToForm(props: PromptToFormProps) {
  const [prompts, idConfig, updatePrompts, setIdConfig] = useStore((store) => [
    store.prompts,
    store.idConfig,
    store.updatePrompts,
    store.setIdConfig,
  ]);

  const { formItems } = useFormItems(prompts[props.id]);

  return (
    <div className="w-1/3 h-[calc(100vh-56px)] min-w-[300px] max-w-[400px] p-2 pb-8 overflow-y-auto">
      {formItems && (
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
                title={`${item.class_type} #${item.id}`}
                subtitle={`${item.parent_id ? "#" + item.parent_id : ""} ${
                  item.parentField ?? ""
                }`}
              >
                {item.fields.map((i) => {
                  return (
                    <div className="w-full mb-2" key={`${i.id}-${i.field}`}>
                      <p className="text-sm mb-2 text-gray-500">{i.field}</p>
                      <div className="flex">
                        {i.type === "number" && (
                          <SliderInput
                            value={prompts[props.id][item.id].inputs[i.field]}
                            step={i.step}
                            min={i.min}
                            max={i.max}
                            onChange={(value) => {
                              updatePrompts(props.id, {
                                id: item.id,
                                field: i.field,
                                value,
                              });
                            }}
                          ></SliderInput>
                        )}
                        {i.type === "textarea" &&
                          (i.multiline ? (
                            <TextArea
                              value={prompts[props.id][item.id].inputs[i.field]}
                              onChange={(value) => {
                                updatePrompts(props.id, {
                                  id: item.id,
                                  field: i.field,
                                  value: value.target.value,
                                });
                              }}
                              rows={3}
                            ></TextArea>
                          ) : (
                            <Input
                              value={prompts[props.id][item.id].inputs[i.field]}
                              onChange={(value) => {
                                updatePrompts(props.id, {
                                  id: item.id,
                                  field: i.field,
                                  value: value.target.value,
                                });
                              }}
                              defaultValue={i.default}
                            ></Input>
                          ))}
                        {i.type === "select" && (
                          <SelectImage
                            className="w-full"
                            options={i.option.map((o) => ({
                              label: o,
                              value: o,
                            }))}
                            showSearch
                            upload={i.image_upload}
                            value={prompts[props.id][item.id].inputs[i.field]}
                            onChange={(value) => {
                              updatePrompts(props.id, {
                                id: item.id,
                                field: i.field,
                                value,
                              });
                            }}
                          ></SelectImage>
                        )}
                        {i.field === "seed" && (
                          <Select
                            className="w-[30%] ml-4"
                            value={idConfig?.[props.id]?.random?.[i.id]}
                            onChange={(value) => {
                              setIdConfig(props.id, {
                                random: {
                                  ...idConfig?.[props.id]?.random,
                                  [i.id]: value,
                                },
                              });
                            }}
                            defaultValue={false}
                            options={[
                              {
                                label: "随机",
                                value: true,
                              },
                              {
                                label: "固定",
                                value: false,
                              },
                            ]}
                          ></Select>
                        )}
                      </div>
                    </div>
                  );
                })}
              </AccordionItem>
            );
          })}
        </Accordion>
      )}
    </div>
  );
}
