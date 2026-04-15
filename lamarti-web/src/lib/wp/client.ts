const WP_API_URL = process.env.WP_API_URL;

if (!WP_API_URL) {
  throw new Error("WP_API_URL environment variable is not set");
}

export async function wpFetch<T>(
  path: string,
  options?: {
    revalidate?: number;
    tags?: string[];
    searchParams?: Record<string, string | number>;
  }
): Promise<T> {
  const url = new URL(`${WP_API_URL}${path}`);

  if (options?.searchParams) {
    for (const [key, value] of Object.entries(options.searchParams)) {
      url.searchParams.set(key, String(value));
    }
  }

  const res = await fetch(url.toString(), {
    next: {
      revalidate: options?.revalidate ?? 60,
      tags: options?.tags,
    },
  });

  if (!res.ok) {
    throw new Error(`WP fetch failed: ${res.status} ${res.statusText} — ${url}`);
  }

  return res.json() as Promise<T>;
}
