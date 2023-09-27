import { Button, CircularProgress, Tooltip } from "@nextui-org/react";
import { PlusIcon } from "@heroicons/react/24/outline";
import { TemplateCard } from "@/components/TemplateCard";
import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { FormItem, FormatJsonValue } from "@/utils/jsonToForm";

export type Template = {
  workflowId: string;
  cover: string;
  description: string;
  fields: FormatJsonValue<FormItem>[];
  id: string;
  name: string;
  create_time: string;
};

export const Templates = () => {
  const {
    data: templates,
    isLoading,
    isSuccess,
  } = useQuery<Template[]>({
    queryKey: ["/templates"],
  });

  return (
    <div className="grid w-4/5 mx-auto py-6 gap-4 grid-cols-5 max-xl:grid-cols-4 max-lg:grid-cols-3 max-sm:grid-cols-2">
      {isLoading && (
        <CircularProgress
          className="fixed top-0 left-0 right-0 bottom-0 m-auto"
          label="加載中..."
        ></CircularProgress>
      )}
      {isSuccess &&
        templates.map((template) => (
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
          to="/templates/create"
        >
          <PlusIcon className="w-7 h-7"></PlusIcon>
        </Button>
      </Tooltip>
    </div>
  );
};
