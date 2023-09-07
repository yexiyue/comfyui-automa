"use client";
import { mutationFn } from "@/api/queryFn";
import { DatesList } from "@/store/useStore";
import { HomeOutlined } from "@ant-design/icons";
import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Spacer,
  useDisclosure,
} from "@nextui-org/react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  Breadcrumb,
  Drawer,
  Form,
  Input,
  Popconfirm,
  Space,
  Table,
  message,
} from "antd";
import { ColumnsType } from "antd/es/table";
import Link from "next/link";
import { useMemo, useState } from "react";
const { TextArea } = Input;
export default function DateList({ params }: { params: { id: string } }) {
  const { data: fields, isLoading: fieldsLoading } = useQuery<
    {
      data: DatesList;
    },
    Error,
    DatesList["template"]["fields"]
  >({
    queryKey: [`/default/${params.id}`],
    select(data) {
      return data.data.template.fields;
    },
  });

  const { data, isLoading } = useQuery<any[]>({
    queryKey: [`/dates/${params.id}`],
  });
  const queryClient = useQueryClient();
  const { mutate } = useMutation({
    mutationFn: mutationFn(`/dates/${params.id}`, "post"),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [`/dates/${params.id}`],
      });
    },
  });
  const { mutate: deleteMutate } = useMutation({
    mutationFn: (id: string) =>
      mutationFn(`/dates/${params.id}/${id}`, "delete")(null),
  });
  const { mutate: updateMutate } = useMutation({
    mutationFn: (data: { id: string; values: any }) =>
      mutationFn(`/dates/${params.id}/${data.id}`, "put")(data.values),
  });
  const { isOpen, onOpenChange, onOpen } = useDisclosure();
  const [form] = Form.useForm();
  const [open, setOpen] = useState(false);
  const [messageApi, messageHolder] = message.useMessage();
  const [updateId, setUpdateId] = useState<string>();

  const columns = useMemo(() => {
    let columns: ColumnsType<any> = [
      {
        key: `index${params.id}`,
        title: "序号",
        render: (text, record, index) => index + 1,
      },
      {
        key: `action${params.id}`,
        title: "操作",
        width: 200,
        render: (text, record, index) => (
          <div className="flex items-center justify-around">
            <Button
              size="sm"
              color="primary"
              onClick={() => {
                form.setFieldsValue(record);
                setUpdateId(record.id);
                setOpen(true);
              }}
            >
              修改
            </Button>
            <Popconfirm
              title="警告"
              description="确定删除该数据吗？"
              okText="Yes"
              cancelText="No"
              onConfirm={() => {
                deleteMutate(record.id, {
                  onSuccess() {
                    queryClient.invalidateQueries({
                      queryKey: [`/dates/${params.id}`],
                    });
                    messageApi.success("删除成功", 1);
                  },
                  onError(error) {
                    messageApi.error(error.message, 1);
                  },
                });
              }}
            >
              <Button size="sm" color="danger">
                删除
              </Button>
            </Popconfirm>
          </div>
        ),
      },
    ];
    if (!fields || fields?.length <= 0) return;
    columns.splice(
      1,
      0,
      ...fields!.map((item) => ({
        key: item.fieldName,
        dataIndex: item.fieldName,
        sorter:
          item.fieldType === "number" ? (a: any, b: any) => a - b : undefined,
        title: item.fieldName,
      }))
    );
    return columns;
  }, [params, fields]);

  return (
    <div>
      {messageHolder}
      <Breadcrumb
        items={[
          {
            title: (
              <Link href="/">
                <HomeOutlined />
              </Link>
            ),
          },
          {
            title: <span>数据列表</span>,
          },
        ]}
      />
      <Spacer x={16} />
      <div className=" p-4">
        <Button
          size="sm"
          color="primary"
          onClick={onOpen}
          isLoading={fieldsLoading}
        >
          添加数据
        </Button>
        <Spacer x={16} />
        <Table
          columns={columns}
          rowKey={(item) => item.id}
          dataSource={data}
          loading={isLoading}
          size="small"
          pagination={{
            defaultPageSize: 20,
          }}
        />
      </div>
      <Modal isOpen={isOpen} placement="center" onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                添加数据
              </ModalHeader>
              <ModalBody>
                <Form form={form} layout="vertical">
                  {fields?.map((item) => (
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
      <Drawer
        title="修改数据"
        width="50%"
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
                          queryKey: [`/dates/${params.id}`],
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
    </div>
  );
}
