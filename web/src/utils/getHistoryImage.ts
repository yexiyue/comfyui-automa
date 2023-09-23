import { History, Store } from "@/store/useStore"

export const getHistoryImage = (histories: Store['histories'], idHistory: Store['idHistory'][number] = []) => {
    let lastPromptId = idHistory[idHistory.length - 1];
    if (histories[lastPromptId] == undefined) {
        lastPromptId = idHistory[idHistory.length - 2];
    }
    return getHistoryOutputs(histories[lastPromptId])
}

export const getHistoryOutputs = (history?: History, type?: "input" | "output" | "temp") => {
    if (!history) return []
    const outputs = history.prompt[4];
    const res = outputs.map(id => {
        const class_type = history.prompt[2][id].class_type;
        const images = history.outputs[id].images
        let resImages = images.map(image => ({
            url: `${import.meta.env.VITE_SERVER_URL}/comfyui/view?filename=${image.filename}&type=${image.type}&subfolder=${image.subfolder}`,
            ...image
        }))

        return {
            id,
            class_type,
            prompt_id: history.prompt[1],
            images: resImages,
            prompt: history.prompt[2],
        }
    })
    if (type) {
        return res.filter(item => item.images[0].type === type)
    }

    return res;
}

export const getHistoriesOutputs = (histories: Store['histories'], idHistory: Store['idHistory'][number] = [], type: "input" | "output" | "temp" = "output") => {
    return idHistory.filter(promptId => histories[promptId] != undefined).reverse().map(promptId => {
        return getHistoryOutputs(histories[promptId], type)
    })
}