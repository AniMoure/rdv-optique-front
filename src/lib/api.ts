export const API_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:3000";

export const fetcher = (url: string) => fetch(url).then((res) => res.json());
