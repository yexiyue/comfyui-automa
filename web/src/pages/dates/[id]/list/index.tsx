import { mutationFn } from "@/api/queryFn";
import { DatesList } from "@/store/useStore";
import { HomeOutlined } from "@ant-design/icons";
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  useDisclosure,
} from "@nextui-org/react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Breadcrumb, Form, Popconfirm, Switch, Table, message } from "antd";
import { ColumnsType } from "antd/es/table";
import { Link, useParams } from "react-router-dom";
import { useMemo, useState } from "react";
import AddModal from "./AddModal";
import UpdateDower from "./UpdateDrawer";
import ImportDrawer from "./ImportDrawer";
import { exportExcel } from "@/utils/importExcel";

export default function DateList() {
  const params = useParams();
  const { data: defaultData, isLoading: fieldsLoading } = useQuery<
    {
      data: DatesList;
    },
    Error,
    DatesList
  >({
    queryKey: [`/default/${params.id}`],
    select(data) {
      return data.data;
    },
  });
  const fields = useMemo(() => {
    if (defaultData) {
      return defaultData.fields;
    }
  }, [defaultData]);

  const { data, isLoading } = useQuery<any[]>({
    queryKey: [`/dates/${params.id}`],
  });
  const queryClient = useQueryClient();

  const { mutate: deleteMutate } = useMutation({
    mutationFn: (id: string) =>
      mutationFn(`/dates/${params.id}/${id}`, "delete")(null),
  });

  const { mutate: updateMutation } = useMutation({
    mutationFn: ({ id, data }: { id: string; data: any }) =>
      mutationFn(`/dates/${params.id}/${id}`, "put")(data),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [`/dates/${params.id}`],
      });
      messageApi.success("更新成功", 1);
    },
    onError(error) {
      messageApi.error(error.message, 1);
    },
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
            <Switch
              checked={record.open}
              onChange={() => {
                updateMutation({
                  id: record.id,
                  data: {
                    open: !record.open,
                  },
                });
              }}
            ></Switch>
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
      ...fields!.map((item: any) => ({
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
      <Card>
        <CardHeader>
          <Breadcrumb
            items={[
              {
                title: (
                  <Link to="/">
                    <HomeOutlined />
                  </Link>
                ),
              },
              {
                title: <span>数据列表</span>,
              },
            ]}
          />
        </CardHeader>
        <CardBody>
          <div className="flex gap-4 mb-4">
            <Button
              size="sm"
              color="primary"
              onClick={onOpen}
              isLoading={fieldsLoading}
            >
              添加数据
            </Button>
            <Button
              size="sm"
              color="primary"
              onClick={() => setImportOpen(true)}
            >
              导入数据
            </Button>
            <Button
              size="sm"
              color="primary"
              onClick={() => {
                exportExcel(data!, `${defaultData?.name}.xlsx`);
              }}
            >
              导出数据
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
        </CardBody>
      </Card>
      <AddModal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        id={params.id!}
        fields={fields!}
        form={form}
      ></AddModal>
      <UpdateDower
        id={params.id!}
        form={form}
        updateId={updateId!}
        open={open}
        setOpen={setOpen}
        fields={fields!}
      ></UpdateDower>
      <ImportDrawer
        open={importOpen}
        setOpen={setImportOpen}
        id={params.id!}
        fields={fields!}
      ></ImportDrawer>
    </div>
  );
}
