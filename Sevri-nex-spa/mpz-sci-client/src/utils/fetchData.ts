import { BodyType, MethodType } from "@/types/fetch";
export async function fetchData<T>(url: string, method?: MethodType, body?: BodyType): Promise<T> {
    const response = await fetch(url, {
        method,
        headers: {
            "Content-Type": "application/json",
            "Cache-Control": "no-cache, no-store, must-revalidate",
            Pragma: "no-cache",
            Expires: "0",
        },
        body: JSON.stringify(body),
        cache: "no-cache",
    });
    return await response.json() as T;
}