"use client";

import { useEveAgent } from "eve/react";

export function EveChat() {
  const agent = useEveAgent();
  const isBusy = agent.status === "submitted" || agent.status === "streaming";
  const isResuming = agent.status === "resuming";

  return (
    <form
      onSubmit={(event) => {
        event.preventDefault();
        const form = new FormData(event.currentTarget);
        const message = String(form.get("message") ?? "").trim();
        if (message.length > 0 && !isResuming) {
          void agent.send(message, isBusy ? { turnPolicy: "steer" } : undefined);
        }
      }}
      className="flex flex-col gap-4"
    >
      <div className="flex flex-col gap-2">
        {agent.data.messages.map((message) => (
          <article key={message.id} className="rounded border p-2">
            <header className="text-xs font-medium">{message.role}</header>
            {message.parts.map((part, index) =>
              part.type === "text" ? <p key={index}>{part.text}</p> : null
            )}
          </article>
        ))}
      </div>
      <input disabled={isResuming} name="message" placeholder="Message Eve workspace agent..." className="rounded border px-3 py-2" />
      <button disabled={isResuming} type="submit" className="rounded bg-primary px-4 py-2 text-primary-foreground">
        Send
      </button>
    </form>
  );
}
