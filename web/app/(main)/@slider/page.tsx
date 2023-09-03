"use client";
import { AdjustmentsHorizontalIcon, ChartPieIcon, TableCellsIcon, WindowIcon } from "@heroicons/react/24/outline";
import { Accordion, AccordionItem, Button } from "@nextui-org/react";
import Link from "next/link";

export default function Slider() {
    const menus = [
        {
            key: "1",
            label: "1",
            title:"1",
        }
    ]
     const defaultContent =
       "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.";
    return (
      <Accordion
        selectionMode="multiple"
        variant="splitted"
        isCompact
        className=" py-4 overflow-y-scroll h-full scrollbar-hide"
      >
        <AccordionItem key="1" aria-label="Accordion 1" title="Accordion 1">
          <section className="flex flex-col gap-2">
            <Button
              radius="sm"
              startContent={<ChartPieIcon className="w-4 h-4"></ChartPieIcon>}
              as={Link}
              href="/dates/yexiyue"
            >
              数据统计
            </Button>
            <Button
              radius="sm"
              startContent={<WindowIcon className="w-4 h-4"></WindowIcon>}
              as={Link}
              href="/dates/yexiyue/meta"
            >
              元数据项
            </Button>
            <Button
              radius="sm"
              startContent={
                <TableCellsIcon className="w-4 h-4"></TableCellsIcon>
              }
              as={Link}
              href="/dates/yexiyue/list"
            >
              数据列表
            </Button>
            <Button
              radius="sm"
              startContent={
                <AdjustmentsHorizontalIcon className="w-4 h-4"></AdjustmentsHorizontalIcon>
              }
              as={Link}
              href="/dates/yexiyue/setting"
            >
              表单设置
            </Button>
          </section>
        </AccordionItem>
        <AccordionItem key="2" aria-label="Accordion 2" title="Accordion 2">
          {defaultContent}
        </AccordionItem>
        <AccordionItem key="3" aria-label="Accordion 3" title="Accordion 3">
          {defaultContent}
        </AccordionItem>
      </Accordion>
    );
}