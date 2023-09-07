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
import AddModal from "./AddModal";
import UpdateDower from "./UpdateDrawer";
import ImportDrawer from "./ImportDrawer";
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

  const { mutate: deleteMutate } = useMutation({
    mutationFn: (id: string) =>
      mutationFn(`/dates/${params.id}/${id}`, "delete")(null),
  });

  const { isOpen, onOpenChange, onOpen } = useDisclosure();
  const [form] = Form.useForm();
  const [open, setOpen] = useState(false);
  const [messageApi, messageHolder] = message.useMessage();
  const [updateId, setUpdateId] = useState<string>();
  const [importOpen, setImportOpen] = useState(false);
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
      <div className=" p-4">
        <div className="flex gap-4 mb-4">
          <Button
            size="sm"
            color="primary"
            onClick={onOpen}
            isLoading={fieldsLoading}
          >
            添加数据
          </Button>
          <Button size="sm" color="primary" onClick={() => setImportOpen(true)}>
            导入数据
          </Button>
        </div>
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
      <AddModal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        id={params.id}
        fields={fields!}
        form={form}
      ></AddModal>
      <UpdateDower
        id={params.id}
        form={form}
        updateId={updateId!}
        open={open}
        setOpen={setOpen}
        fields={fields!}
      ></UpdateDower>
      <ImportDrawer
        open={importOpen}
        setOpen={setImportOpen}
        id={params.id}
        fields={fields!}
      ></ImportDrawer>
    </div>
  );
}
