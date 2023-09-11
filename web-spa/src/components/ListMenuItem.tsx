import {
  WindowIcon,
  TableCellsIcon,
  AdjustmentsHorizontalIcon,
} from "@heroicons/react/20/solid";
import { PhotoIcon } from "@heroicons/react/24/outline";
import { Listbox, ListboxItem } from "@nextui-org/react";
import { useNavigate } from "react-router-dom";

type ListMenuItemProps = {
  id: string;
};
export default function ListMenuItem({ id }: ListMenuItemProps) {
  const router = useNavigate();

  return (
    <Listbox variant="flat" aria-label="ListMenuItem">
      <ListboxItem
        key="image"
        color="primary"
        startContent={<PhotoIcon className="w-4 h-4"></PhotoIcon>}
        onClick={() => {
          router(`/dates/${id}/`);
        }}
      >
        图片空间
      </ListboxItem>
      <ListboxItem
        color="primary"
        startContent={<WindowIcon className="w-4 h-4"></WindowIcon>}
        key="meta"
        onClick={() => {
          router(`/dates/${id}/meta`);
        }}
      >
        元信息
      </ListboxItem>
      <ListboxItem
        color="primary"
        startContent={<TableCellsIcon className="w-4 h-4"></TableCellsIcon>}
        key="list"
        onClick={() => {
          router(`/dates/${id}/list`);
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
          router(`/dates/${id}/setting`);
        }}
      >
        设置
      </ListboxItem>
    </Listbox>
  );
}
