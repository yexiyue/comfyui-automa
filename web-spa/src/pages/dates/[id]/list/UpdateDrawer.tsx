import { Drawer, Space, Form, FormInstance, message } from "antd";
import { Button } from "@nextui-org/react";
import { Input } from "antd";
import { DatesList } from "@/store/useStore";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { mutationFn } from "@/api/queryFn";
const { TextArea } = Input;

type UpdateDrawerProps = {
  id: string;
  updateId: string;
  open: boolean;
  form: FormInstance<any>;
  fields: DatesList["template"]["fields"];
  setOpen: (open: boolean) => void;
};

export default ({
  id,
  updateId,
  open,
  form,
  fields,
  setOpen,
}: UpdateDrawerProps) => {
  const [messageApi, messageHolder] = message.useMessage();
  const queryClient = useQueryClient();
  const { mutate: updateMutate } = useMutation({
    mutationFn: (data: { id: string; values: any }) =>
      mutationFn(`/dates/${id}/${data.id}`, "put")(data.values),
  });
  return (
    <>
      {messageHolder}
      <Drawer
        title="修改数据"
        width="40%"
        onClose={() => {
          form.resetFields();
          setOpen(false);
        }}
        open={open}
        bodyStyle={{ paddingBottom: 80 }}
        extra={
          <Space>
            <Button
              onClick={() => {
                form.resetFields();
                setOpen(false);
              }}
              size="sm"
              color="danger"
              variant="light"
            >
              取消
            </Button>
            <Button
              color="primary"
              size="sm"
              onClick={() => {
                form.validateFields().then((values) => {
                  updateMutate(
                    {
                      id: updateId!,
                      values,
                    },
                    {
                      onSuccess() {
                        queryClient.invalidateQueries({
                          queryKey: [`/dates/${id}`],
                        });
                        setOpen(false);
                        form.resetFields();
                        messageApi.success("更新成功", 1);
                      },
                      onError(error) {
                        messageApi.error(error.message, 1);
                      },
                    }
                  );
                });
              }}
            >
              确定
            </Button>
          </Space>
        }
      >
        <Form form={form} layout="vertical">
          {fields?.map((item) => (
            <Form.Item
              label={item.fieldName}
              name={item.fieldName}
              rules={[{ required: true, message: `请输入${item.fieldName}` }]}
            >
              {item.fieldType === "number" ? (
                <Input type={item.fieldType} />
              ) : (
                <TextArea rows={3} />
              )}
            </Form.Item>
          ))}
        </Form>
      </Drawer>
    </>
  );
};
