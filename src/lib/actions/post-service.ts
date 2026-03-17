"use server";

export async function getPageDetail(
    id: string
) {
    const res = await fetch(`${process.env.EXTERNAL_API_URL}/posts/${id}`, {
        next: { revalidate: 60 },
    });

    if (!res.ok) {
        throw new Error('Failed to fetch data');
    }

    return res.json();
}

export async function getPageList() {
    const res = await fetch(`${process.env.EXTERNAL_API_URL}/posts`, {
        next: { revalidate: 60 },
    });

    if (!res.ok) {
        throw new Error('Failed to fetch data');
    }

    return res.json();
}