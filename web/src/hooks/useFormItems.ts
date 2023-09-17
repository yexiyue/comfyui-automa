import { jsonToFormItemArray2, JsonType, ObjectInfo, FormFields } from "@/utils/jsonToForm";
import { useQuery } from "@tanstack/react-query";

import { useState, useEffect } from "react";

export const useFormItems = (json: JsonType) => {
    const { data } = useQuery<ObjectInfo>({
        queryKey: ["/comfyui/object_info"],
    });
    
    const [formItems, setFormItems] = useState<FormFields[]>();

    useEffect(() => {
        if (!data) return;
        let res = jsonToFormItemArray2(structuredClone(json), data);
        setFormItems(res?.filter(item => item.fields.length > 0));
    }, [data]);

    return {
        formItems
    }
}