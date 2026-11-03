import { createAuthClient } from "better-auth/react";
import { jwtClient } from "better-auth/client/plugins";

// No baseURL: the auth API is on the same domain (/api/auth)
export const authClient = createAuthClient({
  plugins: [jwtClient()],
});

export const { signIn, signUp, signOut, useSession } = authClient;
