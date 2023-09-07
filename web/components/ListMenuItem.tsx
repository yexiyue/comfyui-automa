"use client";
import {
  WindowIcon,
  TableCellsIcon,
  AdjustmentsHorizontalIcon,
} from "@heroicons/react/20/solid";
import { PhotoIcon } from "@heroicons/react/24/outline";
import { Listbox, ListboxItem } from "@nextui-org/react";
import { useRouter } from "next/navigation";

type ListMenuItemProps = {
  id: string;
};
export default function ListMenuItem({ id }: ListMenuItemProps) {
  const router = useRouter();
  return (
    <Listbox variant="flat" aria-label="ListMenuItem">
      <ListboxItem
        key="image"
        color="primary"
        startContent={<PhotoIcon className="w-4 h-4"></PhotoIcon>}
        onClick={() => {
          router.push(`/dates/${id}/`);
        }}
      >
        图片空间
      </ListboxItem>
      <ListboxItem
        color="primary"
        startContent={<WindowIcon className="w-4 h-4"></WindowIcon>}
        key="meta"
        onClick={() => {
          router.push(`/dates/${id}/meta`);
        }}
      >
        元信息
      </ListboxItem>
      <ListboxItem
        color="primary"
        startContent={<TableCellsIcon className="w-4 h-4"></TableCellsIcon>}
        key="list"
        onClick={() => {
          router.push(`/dates/${id}/list`);
        }}
      >
        数据列表
      </ListboxItem>
      <ListboxItem
        color="primary"
        startContent={
          <AdjustmentsHorizontalIcon className="w-4 h-4"></AdjustmentsHorizontalIcon>
        }
        key="setting"
        onClick={() => {
          router.push(`/dates/${id}/setting`);
        }}
      >
        设置
      </ListboxItem>
    </Listbox>
  );
}
