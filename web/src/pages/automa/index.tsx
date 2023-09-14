import { Button } from "@nextui-org/react";
import { useQuery } from "@tanstack/react-query";

export const Automa = () => {
  const { data } = useQuery({
    queryKey: ["/apis/9cd31db2-bc72-4d19-b75d-8e7e2f12e329"],
  });
  const exec = () => {
    console.log(data);
    window.dispatchEvent(
      new CustomEvent("automa:execute-workflow", {
        detail: {
          id: "VZNS46m7EGt2v6mOupNFM",
          data: {
            variables: {
              date: data,
            },
          },
        },
      })
    );
  };
  return (
    <div>
      Automa
      <Button onClick={exec}>一键执行</Button>
    </div>
  );
};
