import { Template } from "@/app/(other)/templates/page";
import { create } from "zustand";
import { persist } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";

export type DatesList = {
    id: string;
    create_time: string;
    name: string;
    description: string
    cover: string;
    template_id: string;
    template: Template;
    [key: string]: any
}

type Store = {
    theme: string;
    setTheme: (theme: 'dark' | 'light') => void;
}

export const useStore = create(persist(immer<Store>((set) => ({
    theme: "light",
    setTheme: (theme) => {
        set(state => {
            state.theme = theme;
        })
    },
})), {
    name: "comfyui_automa_store",
    skipHydration: true
}))