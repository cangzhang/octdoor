import { createClient } from "@libsql/client/web";

export const turso = createClient({
  url: import.meta.env.VITE_DB_URL,
  authToken: import.meta.env.VITE_DB_TOKEN,
});
