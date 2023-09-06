"use client";
import ListMenuItem from "@/components/ListMenuItem";
import {
  AdjustmentsHorizontalIcon,
  ChartPieIcon,
  TableCellsIcon,
  WindowIcon,
} from "@heroicons/react/24/outline";
import {
  Accordion,
  AccordionItem,
  Button,
  Listbox,
  ListboxItem,
} from "@nextui-org/react";
import Link from "next/link";

export default function Slider() {
  const menus = [
    {
      key: "1",
      label: "1",
      title: "1",
    },
  ];
  const defaultContent =
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.";
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
      <Accordion
        selectionMode="multiple"
        variant="splitted"
        isCompact
        className=" py-4 overflow-y-scroll h-full scrollbar-hide"
      >
        <AccordionItem key="1" aria-label="Accordion 1" title="Accordion 1">
          <ListMenuItem></ListMenuItem>
        </AccordionItem>
        <AccordionItem key="2" aria-label="Accordion 2" title="Accordion 2">
          <ListMenuItem></ListMenuItem>
        </AccordionItem>
        <AccordionItem key="3" aria-label="Accordion 3" title="Accordion 3">
          {defaultContent}
        </AccordionItem>
      </Accordion>
    </div>
  );
}
