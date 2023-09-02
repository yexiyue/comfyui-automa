"use client";
import { Accordion, AccordionItem } from "@nextui-org/react";

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
          {defaultContent}
        </AccordionItem>
        <AccordionItem key="2" aria-label="Accordion 2" title="Accordion 2">
          {defaultContent}
        </AccordionItem>
        <AccordionItem key="3" aria-label="Accordion 3" title="Accordion 3">
          {defaultContent}
        </AccordionItem>
        <AccordionItem key="3" aria-label="Accordion 3" title="Accordion 3">
          {defaultContent}
        </AccordionItem>
        <AccordionItem key="3" aria-label="Accordion 3" title="Accordion 3">
          {defaultContent}
        </AccordionItem>
      </Accordion>
    );
}