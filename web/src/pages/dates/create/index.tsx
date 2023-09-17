import { mutationFn } from "@/api/queryFn";
import { Template } from "@/pages/templates";
import { HomeOutlined, PlusOutlined } from "@ant-design/icons";
import {
  Card,
  CardBody,
  CardHeader,
  Button as NextButton,
} from "@nextui-org/react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  Breadcrumb,
  Form,
  Input,
  Modal,
  Select,
  Upload,
  UploadFile,
  message,
} from "antd";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useMemo, useState } from "react";
const { TextArea } = Input;

export const DatesCreate = () => {
  const queryClient = useQueryClient();
  const { data: templates, isSuccess } = useQuery<Template[]>({
    queryKey: ["/templates"],
  });
  const [messageApi, contextHolder] = message.useMessage();
  const { mutate } = useMutation({
    mutationFn: mutationFn("/default", "post"),
  });
  const options = useMemo(() => {
    if (isSuccess)
      return templates.map((template) => ({
        label: template.name,
        value: template.id,
      }));
  }, [templates]);

  const normFile = (e: any) => {
    if (Array.isArray(e)) {
      return e;
    }
    return e?.fileList;
  };

  const [form] = Form.useForm();
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState("");
  const [previewTitle, setPreviewTitle] = useState("");
  const handlePreview = async (file: UploadFile) => {
    const url = URL.createObjectURL(file.originFileObj as any);

    setPreviewImage(url);
    setPreviewOpen(true);
    setPreviewTitle(
      file.name || file.url!.substring(file.url!.lastIndexOf("/") + 1)
    );
  };

  const router = useNavigate();
  const onSubmit = async () => {
    const values = await form.validateFields();
    if (values.cover) {
      values.cover = values.cover[0].response.url[0];
    } else {
      values.cover = `${import.meta.env.VITE_SERVER_URL}/dates_cover_default.png`;
    }

    if (templates && values?.template_id) {
      let template = templates.find((t) => t.id === values.template_id);
      values.fields = template?.fields;
    } else {
      values.fields = [];
    }
    delete values?.template_id;

    mutate(values, {
      onError(error) {
        messageApi.error(error.message, 1);
      },
      onSuccess() {
        queryClient.invalidateQueries({ queryKey: ["/default"] });
        messageApi.success("添加成功", 1).then(() => {
          router("/");
        });
      },
    });
  };

  return (
    <>
      {contextHolder}
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
                title: <span>添加数据集</span>,
              },
            ]}
          />
        </CardHeader>
        <CardBody>
          <div className="mx-auto mt-5 w-1/2 min-w-[550px]">
            <Form
              name="template"
              labelCol={{ span: 4 }}
              wrapperCol={{
                span: 20,
              }}
              form={form}
            >
              <Form.Item
                name="name"
                label="数据集名称"
                rules={[{ required: true }]}
              >
                <Input />
              </Form.Item>
              <Form.Item
                name="description"
                label="数据集描述"
                rules={[{ required: true }]}
              >
                <TextArea rows={3} />
              </Form.Item>
              <Form.Item
                label="数据集封面"
                name="cover"
                valuePropName="fileList"
                getValueFromEvent={normFile}
              >
                <Upload
                  action="http://127.0.0.1:4060/upload"
                  onPreview={handlePreview}
                  accept=".png,.jpg,.jpeg,.webp"
                  maxCount={1}
                  listType="picture-card"
                >
                  <div>
                    <PlusOutlined />
                    <div style={{ marginTop: 8 }}>Upload</div>
                  </div>
                </Upload>
              </Form.Item>
              <Form.Item
                name="template_id"
                label="模版"
                rules={[{ required: true }]}
              >
                <Select
                  placeholder="请选择模版"
                  options={options}
                  allowClear
                ></Select>
              </Form.Item>

              <div className="mt-6">
                <NextButton
                  color="primary"
                  className="w-full"
                  variant="shadow"
                  onClick={onSubmit}
                >
                  添加数据集
                </NextButton>
              </div>
            </Form>

            <Modal
              open={previewOpen}
              title={previewTitle}
              footer={null}
              onCancel={() => {
                setPreviewImage("");
                setPreviewOpen(false);
                setPreviewTitle("");
              }}
            >
              <img alt="example" style={{ width: "100%" }} src={previewImage} />
            </Modal>
          </div>
        </CardBody>
      </Card>
    </>
  );
};
