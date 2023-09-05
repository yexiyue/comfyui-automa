"use client";
import { useEffect, useState } from "react";
import { Button, Tooltip } from "@nextui-org/react";
import { PlusIcon } from "@heroicons/react/24/outline";

export type Template = {
  cover: string;
  description: string;
  fields: { fieldName: string; fieldType: string; defaultValue: string }[];
  id: string;
  name: string;
};

async function getData() {
  const res = await fetch(`${process.env.server}/templates`);

  return await res.json();
}
export default function Templates() {
  const [templates, setTemplates] = useState<Template[]>([]);

  useEffect(() => {
    getData().then((data) => {
      setTemplates(data);
    });
  }, []);
  return (
    <div>
      {templates.map((template) => (
        <div>{JSON.stringify(template)}</div>
      ))}
      <Tooltip showArrow={true} content="添加模版">
        <Button
          className="fixed bottom-20 right-20 h-16 scale-75"
          variant="shadow"
          color="primary"
          size="sm"
          style={{
            borderRadius: "50%",
          }}
        >
          <PlusIcon className="w-7 h-7"></PlusIcon>
        </Button>
      </Tooltip>
    </div>
  );
}
