import { MutationFunction, QueryFunction } from "@tanstack/react-query";
export const queryFn: QueryFunction = async ({ queryKey }) => {
    try {
        const res = await fetch(`${process.env.server}${queryKey[0]}`);
        if (!res.ok) {
            throw new Error(`Something went wrong ${queryKey[0]}`);
        }
        return await res.json();
    } catch (error: any) {
        throw new Error(error);
    }
}

export const mutationFn = (url: string, method: 'post' | 'put' | 'delete'): MutationFunction => async (body) => {
    try {
        const res = await fetch(`${process.env.server}${url}`, {
            method,
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(body)
        });
        if (!res.ok) {
            throw new Error(`Something went wrong ${method} ${url}`);
        }
        return await res.json();
    } catch (error: any) {
        throw new Error(error);
    }
}