import { DateItemCard } from "@/components/DateItemCard";
import { DatesList } from "@/store/useStore";
import { HomeOutlined } from "@ant-design/icons";
import {
  Card,
  CardBody,
  CardHeader,
  CircularProgress,
  Image,
} from "@nextui-org/react";
import { useQuery } from "@tanstack/react-query";
import { Breadcrumb, Carousel } from "antd";
import { Link } from "react-router-dom";

export const Home = () => {
  const { data, isLoading, isSuccess } = useQuery<DatesList[]>({
    queryKey: ["/default"],
  });
  console.log(data);
  return (
    <div>
      {isLoading && (
        <CircularProgress
          className="fixed top-0 left-0 right-0 bottom-0 m-auto"
          label="加載中..."
        ></CircularProgress>
      )}
      {isSuccess && (
        <Card>
          <CardHeader>
            <Breadcrumb
              items={[
                {
                  title: (
                    <>
                      <HomeOutlined />
                      首页
                    </>
                  ),
                },
              ]}
            />
          </CardHeader>
          <CardBody>
            <div className="w-[90%] mx-auto grid py-6 gap-6 grid-cols-4 max-xl:grid-cols-3 max-lg:grid-cols-2 max-sm:grid-cols-1">
              {data.map((item) => (
                <DateItemCard
                  id={item.id}
                  key={item.id}
                  name={item.name}
                  description={item.description}
                  cover={item.cover}
                  create_time={item.create_time}
                ></DateItemCard>
              ))}
            </div>
          </CardBody>
        </Card>
      )}
    </div>
  );
};
