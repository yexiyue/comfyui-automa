import { Select, SelectProps, Upload } from "antd";
import { useControllableValue } from "ahooks";
import { Image } from "@nextui-org/react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
export default function SelectImage(
  props: SelectProps & {
    upload?: boolean;
    type?: "image" | "mask";
  }
) {
  const [value, setValue] = useControllableValue(props);
  let { upload = false } = props;
  const queryClient = useQueryClient();
  const { mutate } = useMutation<
    {
      name: string;
      type: string;
      subfolder: string;
    },
    Error,
    FormData
  >({
    mutationFn: async (formData: FormData) => {
      try {
        const res = await fetch(
          `${import.meta.env.VITE_SERVER_URL}/comfyui/upload/${
            props.type ?? "image"
          }`,
          {
            method: "post",
            body: formData,
          }
        );
        return await res.json();
      } catch (error) {
        throw error;
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["/comfyui/object_info"],
      });
    },
  });
  return (
    <>
      <Select {...props} value={value} onChange={setValue} />
      {upload && (
        <Upload
          accept=".png,.jpg,.jpeg"
          beforeUpload={(file) => {
            const formData = new FormData();
            formData.set("image", file);
            console.log(file);
            mutate(formData, {
              onSuccess: (data) => {
                setValue(data.name);
              },
            });
            return false;
          }}
          maxCount={1}
          fileList={[]}
        >
          <Image
            src={`${
              import.meta.env.VITE_SERVER_URL
            }/comfyui/view?filename=${value}&type=input`}
          ></Image>
        </Upload>
      )}
    </>
  );
}
