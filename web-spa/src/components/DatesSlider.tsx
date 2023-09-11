import ListMenuItem from "@/components/ListMenuItem";
import { DatesList } from "@/store/useStore";
import {
  Accordion,
  AccordionItem,
  Button,
  Skeleton,
  Tooltip,
} from "@nextui-org/react";
import { useQuery } from "@tanstack/react-query";
import { Empty } from "antd";
import { Link } from "react-router-dom";

export default function Slider() {
  const { data: datesList, isSuccess } = useQuery<DatesList[]>({
    queryKey: ["/default"],
  });

  return (
    <div className="flex flex-col fixed w-1/5 top-14 h-full ease-in-out">
      <Button
        className="w-[95%] mx-auto mt-3 flex-shrink-0"
        variant="shadow"
        color="primary"
        as={Link}
        to="/create"
      >
        添加数据集
      </Button>
      {datesList && datesList.length === 0 && (
        <Empty
          image="https://gw.alipayobjects.com/zos/antfincdn/ZHrcdLPrvN/empty.svg"
          className="w-full flex flex-col justify-center items-center"
          imageStyle={{
            height: 60,
          }}
          description={<span>暂时没有数据集</span>}
        ></Empty>
      )}
      <Skeleton
        className=" mt-4 rounded-lg overflow-y-scroll scrollbar-hide"
        isLoaded={isSuccess}
      >
        <Accordion
          selectionMode="multiple"
          variant="splitted"
          isCompact
          className="mb-20 pb-4 pt-2 overflow-y-scroll scrollbar-hide"
        >
          {datesList ? (
            datesList.map((item) => (
              <AccordionItem
                key={item.id}
                aria-label={`Accordion ${item.name}`}
                title={
                  <Tooltip content={item.description} showArrow={true}>
                    <span>{item.name}</span>
                  </Tooltip>
                }
              >
                <ListMenuItem id={item.id}></ListMenuItem>
              </AccordionItem>
            ))
          ) : (
            <AccordionItem key={"temp"} aria-label={`Accordion`}>
              <ListMenuItem id={""}></ListMenuItem>
            </AccordionItem>
          )}
        </Accordion>
      </Skeleton>
    </div>
  );
}
