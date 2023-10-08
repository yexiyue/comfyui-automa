import { History, Store } from "@/store/useStore"

export const getHistoryImage = (histories: Store['histories'], idHistory: Store['idHistory'][number] = []) => {
    const images = getHistoriesOutputs(histories, idHistory).reverse()
    return images[images.length - 1]
}

export const getHistoryOutputs = (history?: History, type?: "input" | "output" | "temp") => {
    if (!history) return []
    const outputs = history.prompt[4];
    const res = []
    for (let id of outputs) {

        const class_type = history.prompt[2][id]?.class_type;
        const images = history.outputs[id]?.images
        if (!images) continue
        let resImages = images.map(image => ({
            url: `${import.meta.env.VITE_SERVER_URL}/comfyui/view?filename=${image.filename}&type=${image.type}&subfolder=${image.subfolder}`,
            ...image
        }))

        res.push({
            id,
            class_type,
            prompt_id: history.prompt[1],
            images: resImages,
            prompt: history.prompt[2],
        })
    }
    if (type) {
        return res.filter(item => item.images[0].type === type)
    }

    return res;
}

export const getHistoriesOutputs = (histories: Store['histories'], idHistory: Store['idHistory'][number] = [], type?: "input" | "output" | "temp") => {
    const res: ReturnType<typeof getHistoryOutputs>[] = [];
    idHistory.filter(promptId => histories[promptId] != undefined).reverse().forEach(promptId => {
        const images = getHistoryOutputs(histories[promptId], type);
        if (images.length > 0) {
            res.push(images)
        }
    })
    return res;
}