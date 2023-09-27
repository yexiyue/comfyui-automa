import { jsonToFormItemArray2, JsonType, ObjectInfo, FormFields, jsonToFormDeep2 } from "@/utils/jsonToForm";
import { useQuery } from "@tanstack/react-query";

import { useState, useEffect, useRef } from "react";

export const useFormItems = (json: JsonType) => {
    const { data } = useQuery<ObjectInfo>({
        queryKey: ["/comfyui/object_info"],
    });

    const [formItems, setFormItems] = useState<FormFields[]>();
    const once = useRef(false)
    useEffect(() => {
        if (!data || once.current) return;
        let res = jsonToFormItemArray2(structuredClone(json), data);
        once.current = true
        setFormItems(res?.filter(item => item.fields.length > 0));
    }, [data]);

    return {
        formItems
    }
}