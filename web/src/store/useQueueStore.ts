import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import { immer } from 'zustand/middleware/immer'
import { History, useStore } from "./useStore";

export type QueueList = {
    queue_pending: History["prompt"][];
    queue_running: History["prompt"][];
}

export type Task = {
    workflowId: string;
    promptId: string;
}

export type QueueStore = {
    queue: {
        queue_running: Task[],
        queue_pending: Task[]
    };
    backups: Task[],
    addQueue: (id: string, promptId: string, type?: 'head' | 'tail') => void;
    getQueue: (id: string) => QueueStore['queue'] & {
        length: number
    };
    flag: boolean;
    advance: () => void;
    interrupt: () => void;
    deleteTask: (ids: string[]) => void;
    synchronous: (data: {
        queue_running: History['prompt'][],
        queue_pending: History['prompt'][]
    }) => void;
}

export const useQueueStore = create(persist(immer<QueueStore>((set, get) => ({
    queue: {
        queue_pending: [],
        queue_running: []
    },
    backups: [],
    flag: false,
    addQueue: (id: string, promptId: string) => {
        set(state => {
            if (state.queue.queue_running.length === 0) {
                state.queue.queue_running.push({ workflowId: id, promptId: promptId })
            } else {
                state.queue.queue_pending.push({ workflowId: id, promptId: promptId })
            }
            state.backups.push({ workflowId: id, promptId: promptId })
        })
    },
    getQueue: (id: string) => {
        const r = get().queue.queue_running.find(x => x.workflowId === id);
        const r2 = get().queue.queue_pending.filter(x => x.workflowId === id);
        return {
            length: r2.length + (r ? 1 : 0),
            queue_running: r ? [r] : [],
            queue_pending: r2
        }
    },
    advance: () => {
        set(state => {
            if (state.queue.queue_running.length > 0) {
                const res = state.queue.queue_running.shift();
                if (res) {
                    useStore.getState().setIdHistory(res.workflowId, res.promptId)
                }
            }
            if (state.queue.queue_pending.length > 0) {
                state.queue.queue_running.push(state.queue.queue_pending.shift()!);
            }
        })
    },
    synchronous: (data) => {
        if (!data) return;
        const queue = [...data.queue_running, ...data.queue_pending].map(item => item[1]);
        set(state => {
            const myQueue = state.backups;
            if (myQueue.length === queue.length && myQueue.every((x, i) => x.promptId === queue[i])) {
                return;
            } else {
                state.queue.queue_running = queue.slice(0, 1).map(item => ({
                    workflowId: myQueue.find(x => x.promptId === item)?.workflowId || '未知工作流',
                    promptId: item,
                }))
                state.queue.queue_pending = queue.slice(1).map(item => ({
                    workflowId: myQueue.find(x => x.promptId === item)?.workflowId || '未知工作流',
                    promptId: item,
                }))
            }
        })
    },
    interrupt: () => {
        set(state => {
            if (state.queue.queue_running.length > 0) {
                const prev = state.queue.queue_running.shift();
                useStore().removeIdHistory(prev?.workflowId!, prev?.promptId!)
            }
            if (state.queue.queue_pending.length > 0) {
                state.queue.queue_running.push(state.queue.queue_pending.shift()!);
            }

        })
    },
    deleteTask: (ids: string[]) => {
        set(state => {
            const queue = [...state.queue.queue_running, ...state.queue.queue_pending]
            const newQueue = queue.filter(x => !ids.includes(x.promptId))
            if (newQueue.length >= 1) {
                state.queue.queue_running = newQueue.slice(0, 1);
            }
            state.queue.queue_pending = newQueue.slice(1);
        })
    }
})), {
    name: "queue",
    storage: createJSONStorage(() => sessionStorage)
}));