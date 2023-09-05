import { Template } from "@/app/(other)/templates/page";
import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";

type Store = {
    theme: string;
    templates: Template[];
    setTheme: (theme: 'dark' | 'light') => void;
    setTemplates: (templates: Template[]) => void;
}

export const useStore = create(persist(immer<Store>((set) => ({
    theme: "light",
    templates: [],
    setTheme: (theme) => {
        set(state => {
            state.theme = theme;
        })
    },
    setTemplates: (templates: Template[]) => {
        set(state => {
            state.templates = templates;
        })
    }
})), {
    name: "comfyui_automa_store",
    skipHydration: true
}))