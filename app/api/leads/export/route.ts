import { env } from "cloudflare:workers";
import { getChatGPTUser } from "@/app/chatgpt-auth";
import { getDb } from "@/db";
import { getAdminAccess } from "@/lib/admin-auth";
import { leadsToCsv, listLeads } from "@/lib/leads";

export const dynamic = "force-dynamic";
const privateHeaders = { "Cache-Control": "private, no-store, max-age=0", "Vary": "Cookie, Authorization", "X-Content-Type-Options": "nosniff" };

export async function GET(request: Request) {
  const access = getAdminAccess(await getChatGPTUser(), env.ADMIN_EMAILS);
  if (!access.allowed) return Response.json({ ok: false, error: access.reason }, { status: access.status, headers: privateHeaders });
  if (!env.DB) return Response.json({ ok: false, error: "Enquiry storage is unavailable." }, { status: 503, headers: privateHeaders });
  const cursor = new URL(request.url).searchParams.get("before") ?? undefined;
  const result = await listLeads(getDb(), cursor, 5000);
  return new Response(leadsToCsv(result.items), {
    headers: {
      ...privateHeaders,
      "Content-Type": "text/csv; charset=utf-8",
      "Content-Disposition": `attachment; filename="jody-enquiries-${new Date().toISOString().slice(0, 10)}.csv"`,
      ...(result.nextCursor ? { "X-Next-Cursor": result.nextCursor } : {}),
      "X-Export-Limit": "5000",
    },
  });
}
