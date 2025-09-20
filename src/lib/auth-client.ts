import {
  anonymousClient,
  inferAdditionalFields,
} from "better-auth/client/plugins";
import { createAuthClient } from "better-auth/react";
import type { auth } from "@/lib/auth";
import { getBaseURL } from "@/lib/get-base-url";

export const authClient = createAuthClient({
  baseURL: getBaseURL(),
  plugins: [anonymousClient(), inferAdditionalFields<typeof auth>()],
});
