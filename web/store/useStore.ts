import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";

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
    }
})), {
    name: "comfyui_automa_store",
    skipHydration: true
}))