import { MutationFunction, QueryFunction } from "@tanstack/react-query";
export const queryFn: QueryFunction = async ({ queryKey }) => {
    try {
        const res = await fetch(`${import.meta.env.VITE_SERVER_URL}${queryKey[0]}`);
        if (!res.ok) {
            throw new Error(`Something went wrong ${queryKey[0]}`);
        }
        return await res.json();
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
        throw new Error(error);
    }
}

export const mutationFn = <T, D = any>(url: string, method: 'post' | 'put' | 'delete'): MutationFunction<T, D> => async (body) => {
    try {
        const res = await fetch(`${import.meta.env.VITE_SERVER_URL}${url}`, {
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
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
        throw new Error(error);
    }
}