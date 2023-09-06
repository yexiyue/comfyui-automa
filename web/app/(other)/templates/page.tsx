"use client";
import { useEffect, useState } from "react";
import { Button, Tooltip } from "@nextui-org/react";
import { PlusIcon } from "@heroicons/react/24/outline";
import TemplateCard from "@/components/TemplateCard";
import Link from "next/link";
import { useStore } from "@/store/useStore";

export type Template = {
  cover: string;
  description: string;
  fields: { fieldName: string; fieldType: string; defaultValue: string }[];
  id: string;
  name: string;
  create_time: string;
};

async function getData() {
  const res = await fetch(`${process.env.server}/templates`);

  return await res.json();
}
export default function Templates() {
  const [templates, setTemplates] = useStore((store) => [
    store.templates,
    store.setTemplates,
  ]);

  useEffect(() => {
    getData().then((data) => {
      setTemplates(data);
    });
  }, []);

  return (
    <div className="grid w-4/5 mx-auto py-6 gap-4 grid-cols-5 max-xl:grid-cols-4 max-lg:grid-cols-3 max-sm:grid-cols-2" >
      {templates.map((template) => (
        <TemplateCard key={template.id} {...template}></TemplateCard>
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
          as={Link}
          href="/templates/create"
        >
          <PlusIcon className="w-7 h-7"></PlusIcon>
        </Button>
      </Tooltip>
    </div>
  );
}
