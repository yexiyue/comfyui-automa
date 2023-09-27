import { JsonType } from "@/utils/jsonToForm";
import { CircularProgress } from "@nextui-org/react";
import { useQueries, useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import PromptToForm from "./PromptToForm";
import ResultView from "./resultView";
import { useStore } from "@/store/useStore";
import { useEffect, useState } from "react";
export type ComfyuiWorkflowDate = {
  cover: string;
  description: string;
  id: string;
  name: string;
  create_time: string;
  prompt: JsonType;
};
export default function ComfyuiWorkflow() {
  const params = useParams();
  const id = params.id;
  const [prompts,setPrompts] = useStore((store) => [
    store.prompts,
    store.setPrompts,
  ]);
  const { data, isSuccess, isLoading } = useQuery<
    {
      data: ComfyuiWorkflowDate;
    },
    Error,
    ComfyuiWorkflowDate
  >({
    queryKey: [`/workflow/comfyui/${id}`],
    select(data) {
      return data.data;
    },
  });

  useEffect(() => {
    if (!data || !id) return;
    if (!prompts[id]) {
      setPrompts(id, data.prompt);
    }
  }, [data]);

  return (
    <>
      {isLoading && (
        <CircularProgress
          className="fixed top-0 left-0 right-0 bottom-0 m-auto"
          label="加載中..."
        ></CircularProgress>
      )}
      {isSuccess && data && (
        <div className="w-full h-full flex relative">
          <PromptToForm id={id!}></PromptToForm>
          <ResultView name={data.name} id={id!}></ResultView>
        </div>
      )}
    </>
  );
}
