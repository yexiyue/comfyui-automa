import { JsonType } from "@/utils/jsonToForm";
import { CircularProgress } from "@nextui-org/react";
import { useQueries, useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import PromptToForm from "./PromptToForm";
import ResultView from "./ResultView";
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
  console.log(data);
  return (
    <>
      {isLoading && (
        <CircularProgress
          className="fixed top-0 left-0 right-0 bottom-0 m-auto"
          label="加載中..."
        ></CircularProgress>
      )}
      {isSuccess && data && (
        <div className="w-full h-full flex relative" >
          <PromptToForm prompt={data.prompt}></PromptToForm>
          <ResultView></ResultView>
        </div>
      )}
    </>
  );
}
