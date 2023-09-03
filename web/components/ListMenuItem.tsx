"use client";
import {
  ChartPieIcon,
  WindowIcon,
  TableCellsIcon,
  AdjustmentsHorizontalIcon,
} from "@heroicons/react/20/solid";
import { Listbox, ListboxItem } from "@nextui-org/react";
import { useState } from "react";

export default function ListMenuItem() {
  const [selectedKey, setSelectedKey] = useState(new Set([]));
  return (
    <Listbox
      aria-label="Actions"
      selectionMode="single"
      selectedKeys={selectedKey}
      onSelectionChange={setSelectedKey as any}
    >
      <ListboxItem
        color="primary"
        startContent={<WindowIcon className="w-4 h-4"></WindowIcon>}
        key="date"
      >
        元数据项
      </ListboxItem>
      <ListboxItem
        color="primary"
        startContent={<TableCellsIcon className="w-4 h-4"></TableCellsIcon>}
        key="list"
      >
        数据列表
      </ListboxItem>
      <ListboxItem
        key="analysis"
        color="primary"
        startContent={<ChartPieIcon className="w-4 h-4"></ChartPieIcon>}
      >
        数据统计
      </ListboxItem>
      <ListboxItem
        color="primary"
        startContent={
          <AdjustmentsHorizontalIcon className="w-4 h-4"></AdjustmentsHorizontalIcon>
        }
        key="setting"
      >
        表单设置
      </ListboxItem>
    </Listbox>
  );
}
