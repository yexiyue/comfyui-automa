import { useQueueStore } from "@/store/useQueueStore";
import { useStore, History } from "@/store/useStore";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { usePrevious } from "ahooks";
import { useEffect } from "react";

export const useWatchQueue = () => {

    const queryClient = useQueryClient()

    const [wsMessage,] = useStore((store) => [store.wsMessage]);
    const [advance] = useQueueStore((store) => [store.advance]);
    const prevProgress = usePrevious(wsMessage.progress);

    const { data } = useQuery<{
        queue_pending: History["prompt"][];
        queue_running: History["prompt"][];
    }>({
        queryKey: ["/comfyui/queue"],
    });

    useEffect(() => {
        if (prevProgress && wsMessage.progress == undefined) {
            queryClient.invalidateQueries({
                queryKey: ["/comfyui/history"],
            });
            fetch(`${import.meta.env.VITE_SERVER_URL}/comfyui/queue`)
                .then((res) => res.json())
                .then((res) => {
                    console.log(res)
                    if (res.queue_running.length > 0) {
                        console.log('上面分支')
                        if (data?.queue_running.length) {
                            console.log(res.queue_running[0][1], data.queue_running[0][1])
                            if (res.queue_running[0][1] !== data.queue_running[0][1]) {
                                queryClient.invalidateQueries({
                                    queryKey: ["/comfyui/queue"],
                                });
                                advance();
                            }
                        }
                    } else {
                        console.log('下面分支')
                        if (data?.queue_running.length) {
                            queryClient.invalidateQueries({
                                queryKey: ["/comfyui/queue"],
                            });
                            advance();
                        }
                    }
                });
        }
    }, [prevProgress, wsMessage.progress]);
}