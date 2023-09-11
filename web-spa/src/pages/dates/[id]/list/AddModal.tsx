import {
  Button,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
} from "@nextui-org/react";
import { Form, message } from "antd";
import { FormInstance } from "antd/es/form";
import TextArea from "antd/es/input/TextArea";
import { DatesList } from "@/store/useStore";
import { mutationFn } from "@/api/queryFn";
import { useQueryClient, useMutation } from "@tanstack/react-query";

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
      <Modal
        isOpen={isOpen}
        placement="center"
        scrollBehavior="inside"
        onOpenChange={onOpenChange}
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                添加数据
              </ModalHeader>
              <ModalBody>
                <Form form={form} layout="vertical">
                  {fields?.map((item: any) => (
                    <Form.Item
                      label={item.fieldName}
                      name={item.fieldName}
                      rules={[
                        { required: true, message: `请输入${item.fieldName}` },
                      ]}
                    >
                      {item.fieldType === "number" ? (
                        <Input type={item.fieldType} />
                      ) : (
                        <TextArea rows={3} />
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
                    onClose();
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
                          onClose();
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
