import { mutationFn } from "@/api/queryFn";
import { Template } from "@/pages/templates";

import { DatesList } from "@/store/useStore";
import { importExcel } from "@/utils/importExcel";
import { InboxOutlined } from "@ant-design/icons";
import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  useDisclosure,
} from "@nextui-org/react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Drawer, Form, Space, UploadFile, message } from "antd";
import Dragger from "antd/es/upload/Dragger";
import { useState } from "react";

type ImportDrawerProps = {
  id: string;
  open: boolean;
  fields: DatesList["template"]["fields"];
  setOpen: (open: boolean) => void;
};
export default ({ open, setOpen, fields, id }: ImportDrawerProps) => {
  const [fileList, setFileList] = useState<UploadFile[]>([]);
  const [form] = Form.useForm();
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const queryClient = useQueryClient();
  const [messageApi, messageHolder] = message.useMessage();
  const { mutate } = useMutation({
    mutationFn: (data: any[]) =>
      mutationFn(`/dates/${id}/import`, "post")(data),
    onSuccess() {
      queryClient.invalidateQueries({
        queryKey: [`/dates/${id}`],
      });
      queryClient.invalidateQueries({
        queryKey: [`/default/${id}`],
      });
      messageApi.success("导入成功", 1);
    },
    onError(error) {
      messageApi.error(error.message, 1);
    },
  });

  const { mutate: forceImport } = useMutation({
    mutationFn: (data: any[]) =>
      mutationFn(`/dates/${id}/force_import`, "post")(data),
    onError(error) {
      messageApi.error(error.message, 1);
    },
  });

  const { mutate: updateDefault } = useMutation({
    mutationFn: (data: any) => mutationFn(`/default/${id}`, "put")(data),
    onSuccess() {
      queryClient.invalidateQueries({
        queryKey: [`/dates/${id}`],
      });
      queryClient.invalidateQueries({
        queryKey: [`/default/${id}`],
      });
      messageApi.success("导入成功", 1);
    },
    onError(error) {
      messageApi.error(error.message, 1);
    },
  });
  const [importData, setImportData] = useState<{
    data: any[];
    templateFields: Template["fields"];
  }>();

  return (
    <>
      {messageHolder}
      <Drawer
        title="导入数据"
        width="40%"
        onClose={() => {
          setOpen(false);
        }}
        open={open}
        placement="left"
        bodyStyle={{ paddingBottom: 80 }}
        extra={
          <Space>
            <Button
              onClick={() => {
                setOpen(false);
                form.resetFields();
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
              onClick={async () => {
                const values = await form.validateFields();
                const data = await importExcel(values.file[0].originFileObj);
                if (!fields) {
                  return forceImport(data, {
                    onSuccess: () => {
                      messageApi.success("导入成功");
                    },
                  });
                }
                const oldFields = fields.map((item: any) => `${item.id}-${item.field}`);
                let keys = Object.keys(data[0]);
                let diff1 = oldFields.every((item: any) =>
                  keys.includes(item)
                );
                let diff2 = keys.every((item) => oldFields.includes(item));
                if (!diff1 || !diff2) {
                  setOpen(false);
                  return onOpen();
                }
                mutate(data, {
                  onSuccess: () => {
                    form.resetFields();
                    setOpen(false);
                  },
                });
              }}
            >
              确定
            </Button>
          </Space>
        }
      >
        <div className="w-[80%] h-[40%] mt-8 mx-auto">
          <Form form={form}>
            <Form.Item
              name="file"
              rules={[
                {
                  required: true,
                  message: "请选择Excel文件",
                },
              ]}
              valuePropName="fileList"
              getValueFromEvent={(e) => {
                if (Array.isArray(e)) {
                  return e;
                }
                return e?.fileList;
              }}
            >
              <Dragger
                beforeUpload={(file) => {
                  setFileList([file]);
                  return false;
                }}
                fileList={fileList}
                maxCount={1}
                accept="xlsx,xls"
              >
                <p className="ant-upload-drag-icon">
                  <InboxOutlined />
                </p>
                <p className="ant-upload-text">选择或拖拽Excel文件</p>
                <p className="ant-upload-hint">一次只能导入一个文件</p>
              </Dragger>
            </Form.Item>
          </Form>
        </div>
      </Drawer>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">警告</ModalHeader>
              <ModalBody>
                <p>数据不兼容，请重新选择文件</p>
              </ModalBody>
              <ModalFooter>
                <Button
                  color="danger"
                  variant="light"
                  onPress={() => {
                    onClose();
                    form.resetFields();
                  }}
                >
                  取消
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
};
