"use client";
import ListMenuItem from "@/components/ListMenuItem";
import { DatesList } from "@/store/useStore";
import { Accordion, AccordionItem, Button, Skeleton } from "@nextui-org/react";
import { useQuery } from "@tanstack/react-query";
import { Empty } from "antd";
import Link from "next/link";

export default function Slider() {
  const { data: datesList, isSuccess } = useQuery<DatesList[]>({
    queryKey: ["/default"],
  });

  return (
    <div className="flex flex-col sticky top-4 ease-in-out">
      <Button
        className="w-[95%] mx-auto mt-3"
        variant="shadow"
        color="primary"
        as={Link}
        href="/create"
      >
        添加数据集
      </Button>
      {datesList && datesList.length === 0  && (
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
        className=" mt-4 rounded-lg overflow-y-scroll scrollbar-hide h-full"
        isLoaded={isSuccess}
      >
        <Accordion
          selectionMode="multiple"
          variant="splitted"
          isCompact
          className=" pb-4 pt-2 overflow-y-scroll h-full scrollbar-hide"
        >
          {datesList ? (
            datesList.map((item) => (
              <AccordionItem
                key={item.id}
                aria-label={`Accordion ${item.name}`}
                title={item.name}
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
