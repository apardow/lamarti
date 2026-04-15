import { revalidatePath } from "next/cache";
import { NextRequest, NextResponse } from "next/server";

const DEFAULT_PATHS = ["/noticias", "/convocatorias", "/cronologia", "/"];

export async function POST(request: NextRequest) {
  const secret =
    request.nextUrl.searchParams.get("secret") ??
    request.headers.get("X-Revalidate-Secret");

  if (secret !== process.env.WP_REVALIDATE_SECRET) {
    return NextResponse.json({ error: "Invalid secret" }, { status: 401 });
  }

  const path = request.nextUrl.searchParams.get("path");
  const paths = path ? [path] : DEFAULT_PATHS;

  for (const p of paths) {
    revalidatePath(p);
  }

  return NextResponse.json({
    revalidated: true,
    paths,
    timestamp: new Date().toISOString(),
  });
}
