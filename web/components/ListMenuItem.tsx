"use client";
import {
  WindowIcon,
  TableCellsIcon,
  AdjustmentsHorizontalIcon,
} from "@heroicons/react/20/solid";
import { PhotoIcon } from "@heroicons/react/24/outline";
import { Listbox, ListboxItem } from "@nextui-org/react";

export default function ListMenuItem() {

  return (
    <Listbox variant="flat" aria-label="ListMenuItem">
      <ListboxItem
        color="primary"
        startContent={<WindowIcon className="w-4 h-4"></WindowIcon>}
        key="date"
      >
        元信息
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
        startContent={<PhotoIcon className="w-4 h-4"></PhotoIcon>}
      >
        图片空间
      </ListboxItem>
      <ListboxItem
        color="primary"
        startContent={
          <AdjustmentsHorizontalIcon className="w-4 h-4"></AdjustmentsHorizontalIcon>
        }
        key="setting"
      >
        设置
      </ListboxItem>
    </Listbox>
  );
}
