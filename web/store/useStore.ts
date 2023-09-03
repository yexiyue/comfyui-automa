import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";

type Store = {
    
}

export const useStore = create(persist(immer((set) => ({

})), {
    name: "comfyui_automa_store"
}))