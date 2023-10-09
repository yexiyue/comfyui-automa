import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
} from "@nextui-org/react";
import { Form, message, Input } from "antd";
import { FormInstance } from "antd/es/form";
import TextArea from "antd/es/input/TextArea";
import { DatesList } from "@/store/useStore";
import { mutationFn } from "@/api/queryFn";
import { useQueryClient, useMutation } from "@tanstack/react-query";
import { FormItem, FormatJsonValue } from "@/utils/jsonToForm";
import SelectImage from "@/components/form/SelectImage";
import SliderInput from "@/components/form/SliderInput";

type AddModalProps = {
  id: string;
  isOpen: boolean;
  form: FormInstance<any>;
  fields: DatesList["template"]["fields"];
  onOpenChange: (open: boolean) => void;
};
export default ({ isOpen, onOpenChange, form, fields, id }: AddModalProps) => {
  const [messageApi, messageHolder] = message.useMessage();
  const queryClient = useQueryClient();
  const { mutate } = useMutation({
    mutationFn: mutationFn(`/dates/${id}`, "post"),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [`/dates/${id}`],
      });
    },
  });
  return (
    <>
      {messageHolder}
      <Modal isOpen={isOpen} placement="center" scrollBehavior="inside">
        <ModalContent>
          {() => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                添加数据
              </ModalHeader>
              <ModalBody>
                <Form form={form} layout="vertical">
                  {fields?.map((item: FormatJsonValue<FormItem>) => (
                    <Form.Item
                      label={`#${item.id} ${item.class_type} ${item.field}`}
                      name={`${item.id}-${item.field}`}
                      key={`${item.id}-${item.field}`}
                      initialValue={item.default}
                    >
                      {item.type === "number" && (
                        <SliderInput
                          step={item.step}
                          min={item.min}
                          max={item.max}
                        ></SliderInput>
                      )}
                      {item.type === "textarea" &&
                        (item.multiline ? (
                          <TextArea rows={3}></TextArea>
                        ) : (
                          <Input></Input>
                        ))}
                      {item.type === "select" && (
                        <SelectImage
                          className="w-full"
                          options={item.option.map((o) => ({
                            label: o,
                            value: o,
                          }))}
                          showSearch
                          upload={item.image_upload}
                        ></SelectImage>
                      )}
                    </Form.Item>
                  ))}
                </Form>
              </ModalBody>
              <ModalFooter>
                <Button
                  color="danger"
                  variant="light"
                  onPress={() => {
                    form.resetFields();
                    onOpenChange(false);
                  }}
                >
                  取消
                </Button>
                <Button
                  color="primary"
                  onPress={() => {
                    form.validateFields().then((values) => {
                      mutate(values, {
                        onSuccess() {
                          messageApi.success("添加成功", 1);
                          form.resetFields();
                          onOpenChange(false);
                        },
                        onError(error) {
                          messageApi.error(error.message, 1);
                        },
                      });
                    });
                  }}
                >
                  添加
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
};
