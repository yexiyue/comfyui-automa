import { DatesList } from "@/store/useStore";
import { HomeOutlined } from "@ant-design/icons";
import {
  Card,
  CardBody,
  CardHeader,
  Chip,
  CircularProgress,
} from "@nextui-org/react";
import { useQuery } from "@tanstack/react-query";
import { Breadcrumb } from "antd";
import moment from "moment";
import { Link, useParams } from "react-router-dom";
export default function DateMeta() {
  const params = useParams();
  const { data, isLoading } = useQuery<
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

  return (
    <>
      {isLoading && (
        <CircularProgress
          className="fixed top-0 left-0 right-0 bottom-0 m-auto"
          label="加載中..."
        ></CircularProgress>
      )}
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
                title: <span>元信息</span>,
              },
            ]}
          />
        </CardHeader>
        <CardBody>
          <div
            className="bg-no-repeat bg-current bg-cover h-[calc(100vh-100px)] flex justify-center items-center"
            style={{
              backgroundImage: `url(${data?.cover})`,
            }}
          >
            <div className="flex mt-6 gap-2 flex-col bg-[#00000050] rounded-2xl w-2/3 p-5 items-center backdrop-blur-sm">
              <p>
                <Chip color="primary">数据接口：{`${import.meta.env.VITE_SERVER_URL}/apis/${params.id}`}</Chip>
              </p>
              <p>
                <Chip color="primary">数据集名称：{data?.name}</Chip>
              </p>
              <p>
                <Chip color="secondary">数据集描述：{data?.description}</Chip>
              </p>
              <p>
                <Chip color="success">
                  创建时间：
                  {moment(data?.create_time).format("YYYY年MM月DD日 HH:mm:ss")}
                </Chip>
              </p>
              {data?.meta?.map((item) => (
                <p>
                  <Chip color="warning">
                    {item.name}：{item.value}
                  </Chip>
                </p>
              ))}
            </div>
          </div>
        </CardBody>
      </Card>
    </>
  );
}
