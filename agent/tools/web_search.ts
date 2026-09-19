import { defineTool } from "eve/tools";
import { z } from "zod";

export default defineTool({
  description: "Search the web for a query (Eve port of Front web_search tool).",
  inputSchema: z.object({
    query: z.string().min(1).describe("Search query"),
  }),
  async execute({ query }, ctx) {
    // Stub via GitHub search to avoid external search API keys; replace with Tavily/Brave when key present
    const signal = ctx.abortSignal ? AbortSignal.any([ctx.abortSignal, AbortSignal.timeout(5000)]) : AbortSignal.timeout(5000);
    try {
      const res = await fetch(`https://api.github.com/search/repositories?q=${encodeURIComponent(query)}&per_page=3`, {
        headers: { accept: "application/vnd.github+json" },
        signal,
      });
      if (!res.ok) return { query, results: [], note: "web_search stub — no external key" };
      const data = (await res.json()) as { items?: Array<Record<string, unknown>> };
      const items = (data.items ?? []).slice(0, 3).map((r) => ({
        repo: String(r.full_name ?? ""),
        description: String(r.description ?? ""),
        stars: Number(r.stargazers_count ?? 0),
        url: String(r.html_url ?? ""),
      }));
      return { query, results: items };
    } catch {
      return { query, results: [], error: "search failed" };
    }
  },
});
