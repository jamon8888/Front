import { defineTool } from "eve/tools";
import { z } from "zod";

export default defineTool({
  description: "Get public stats for a GitHub repository: stars, forks, open issues, language, and description.",
  inputSchema: z.object({
    repo: z
      .string()
      .regex(/^[\w.-]+\/[\w.-]+$/, 'Must be in "owner/name" format.')
      .describe('The repository in "owner/name" format, e.g. "vercel/next.js"'),
  }),
  async execute({ repo }, ctx) {
    const signal = ctx.abortSignal ? AbortSignal.any([ctx.abortSignal, AbortSignal.timeout(5000)]) : AbortSignal.timeout(5000);
    try {
      const res = await fetch(`https://api.github.com/repos/${repo}`, {
        headers: { accept: "application/vnd.github+json" },
        signal,
      });
      if (!res.ok) return { error: `Could not find repository ${repo}.` };
      const data = (await res.json()) as Record<string, unknown>;
      return {
        repo: String(data.full_name ?? repo),
        description: String(data.description ?? ""),
        stars: Number(data.stargazers_count ?? 0),
        forks: Number(data.forks_count ?? 0),
        openIssues: Number(data.open_issues_count ?? 0),
        language: String(data.language ?? "Unknown"),
        url: String(data.html_url ?? `https://github.com/${repo}`),
      };
    } catch {
      return { error: `Could not reach GitHub for ${repo}.` };
    }
  },
});
