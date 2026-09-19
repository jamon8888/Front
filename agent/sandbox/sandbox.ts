import { defineSandbox } from "eve/sandbox";

export default defineSandbox({
  // defaultBackend via framework when backend omitted; override only to pick Vercel backend
  // Uncomment to pin Vercel backend explicitly:
  // backend: (await import("eve/sandbox/vercel")).vercel(),
});
