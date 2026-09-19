import { eveChannel } from "eve/channels/eve";
import { none } from "eve/channels/auth";

// Public demo — admits anonymous requests. Replace with real auth before production.
export default eveChannel({
  auth: [none()],
});
