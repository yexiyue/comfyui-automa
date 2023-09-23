import { Template } from "@/pages/templates";
import { JsonType } from "@/utils/jsonToForm";
import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import localforage from 'localforage'
export type DatesList = {
    id: string;
    create_time: string;
    name: string;
    description: string
    cover: string;
    fields: Template['fields'];
    meta?: {
        name: string;
        value: string
    }[];
    [key: string]: any
}

export type History = {
    prompt: [number, string, JsonType, Record<string, any>, string[]],
    outputs: {
        [key: string]: {
            images: [
                {
                    filename: string,
                    subfolder: string,
                    type: string
                }
            ]
        }
    }
}

export type Store = {
    theme: string;
    prompts: {
        [id: string]: JsonType
    },
    ws?: WebSocket;
    wsMessage: {
        sid?: string,
        status: {
            exec_info: { queue_remaining: number },
        },
        progress?: {
            value: number,
            max: number,
        },
        imgUrl?: string
    };
    histories: {
        [prompt_id: string]: History
    };
    idHistory: {
        [id: string]: string[]
    };

    initWsbSocket: () => void;
    setWsMessageStatus: (message: Store['wsMessage']) => void;
    setWsMessageProgress: (message: Store['wsMessage']['progress']) => void;
    setImgUrl: (url: string) => void;
    setTheme: (theme: 'dark' | 'light') => void;
    setPrompts: (id: string, json: JsonType) => void;
    updatePrompts: (id: string, data: {
        id: string,
        field: string,
        value: any
    }, cb?: (prompt: JsonType) => void) => void;
    setHistories: (history: Store['histories']) => void;
    setIdHistory: (id: string, prompt_id: string) => void;
    removeIdHistory: (id: string, prompt_id: string) => void;
    clearIdHistory: (id: string) => void;
}

export const useStore = create(persist<Store>((set, get) => ({
    theme: "light",
    setTheme: (theme) => {
        set(state => {
            return { theme }
        })
    },
    prompts: {},
    setPrompts(id, json) {
        set(state => {
            if (id in state.prompts) {
                return { ...state }
            }
            state.prompts[id] = json;
            return { prompts: { ...state.prompts } }
        })
    },
    updatePrompts(id, data, cb) {
        set(state => {
            const prompt = state.prompts[id];
            prompt[data.id].inputs[data.field] = data.value;
            cb?.(prompt);
            return { prompts: { ...state.prompts } }
        })
    },
    wsMessage: {
        status: {
            exec_info: { queue_remaining: 0 },
        }
    },
    initWsbSocket() {
        if (get().ws) return;
        console.log("initWsbSocket");
        set(state => {
            const ws = new WebSocket("ws://localhost:4060/ws");
            state.ws = ws
            
            ws.onmessage = (event) => {
                console.log(event.data)
                if (typeof event.data === 'string') {
                    const data = JSON.parse(event.data)
                    if (data.type === 'status') {
                        get().setWsMessageStatus(data.data)
                    } else if (data.type === 'progress') {
                        get().setWsMessageProgress(data.data)
                    }
                } else {

                }
            }
            return { ...state }
        })
    },
    setWsMessageStatus(message) {
        set(state => {
            return { wsMessage: message }
        })
    },
    setWsMessageProgress(message) {
        set((state) => {
            return { wsMessage: { ...state.wsMessage, progress: message } }
        })
    },
    setImgUrl(url: string) {
        set(state => {
            state.wsMessage.imgUrl = url;
            return { wsMessage: { ...state.wsMessage } }
        })
    },

    histories: {},
    setHistories(history: Store['histories']) {
        set(state => {
            Object.assign(state.histories, history)
            return { histories: { ...state.histories } };
        })
    },
    idHistory: {},
    setIdHistory(id: string, prompt_ids: string) {
        set(state => {
            const ids = state.idHistory[id] || [];
            if (ids.includes(prompt_ids)) {
                return { ...state };
            } else {
                ids.push(prompt_ids);
                state.idHistory[id] = ids;
                return { idHistory: { ...state.idHistory } }
            }
        })
    },
    removeIdHistory(id: string, prompt_id: string) {
        set(state => {
            const ids = state.idHistory[id] || [];
            if (ids.includes(prompt_id)) {
                ids.splice(ids.indexOf(prompt_id), 1);
                state.idHistory[id] = ids;
                delete state.histories[prompt_id];
                return { idHistory: { ...state.idHistory }, histories: { ...state.histories } }
            } else {
                return { ...state }
            }
        })
    },
    clearIdHistory(id: string) {
        set(state => {
            const ids = state.idHistory[id] || [];
            ids.forEach(prompt_id => {
                delete state.histories?.[prompt_id];
            })
            return { idHistory: { ...state.idHistory, [id]: [] }, histories: { ...state.histories } }
        })
    },

}), {
    name: "comfyui_automa_store",
    partialize(state) {
        return { ...state, ws: undefined, queue: undefined } as any
    },
    storage: createJSONStorage(() => localforage as any)
}))