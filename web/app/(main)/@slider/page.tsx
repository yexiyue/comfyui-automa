"use client";
import ListMenuItem from "@/components/ListMenuItem";
import { DatesList } from "@/store/useStore";
import { Accordion, AccordionItem, Button } from "@nextui-org/react";
import { useQuery } from "@tanstack/react-query";
import Link from "next/link";

const getDatesList = async () => {
  const res = await fetch(`${process.env.server}/default`);
  return await res.json();
};
export default function Slider() {
  const { data, isSuccess } = useQuery({
    queryKey: ["datesList"],
    queryFn: getDatesList,
  });

  const datesList: DatesList[] = data;

  return (
    <div className="w-full h-full flex justify-center flex-col">
      <Button
        className="w-[95%] mx-auto mt-3"
        variant="shadow"
        color="primary"
        as={Link}
        href="/create"
      >
        添加数据集
      </Button>
      {isSuccess && (
        <Accordion
          selectionMode="multiple"
          variant="splitted"
          isCompact
          className=" py-4 overflow-y-scroll h-full scrollbar-hide"
        >
          {datesList.map((item) => (
            <AccordionItem
              key={item.id}
              aria-label={`Accordion ${item.name}`}
              title={item.name}
            >
              <ListMenuItem></ListMenuItem>
            </AccordionItem>
          ))}
        </Accordion>
      )}
    </div>
  );
}
