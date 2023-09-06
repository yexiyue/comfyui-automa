"use client";
import ListMenuItem from "@/components/ListMenuItem";
import { DatesList } from "@/store/useStore";
import { Accordion, AccordionItem, Button, Skeleton } from "@nextui-org/react";
import { useQuery } from "@tanstack/react-query";
import Link from "next/link";

export default function Slider() {
  const { data: datesList, isSuccess } = useQuery<DatesList[]>({
    queryKey: ["/default"],
  });

  return (
    <div className="w-full h-full flex flex-col">
      <Button
        className="w-[95%] mx-auto mt-3"
        variant="shadow"
        color="primary"
        as={Link}
        href="/create"
      >
        添加数据集
      </Button>
      <Skeleton className=" mt-4 rounded-lg" isLoaded={isSuccess}>
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
                <ListMenuItem></ListMenuItem>
              </AccordionItem>
            ))
          ) : (
            <AccordionItem key={"zhanwei"} aria-label={`Accordion`}>
              <ListMenuItem></ListMenuItem>
            </AccordionItem>
          )}
        </Accordion>
      </Skeleton>
    </div>
  );
}
