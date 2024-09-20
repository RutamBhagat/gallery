import * as schema from "./schema";

import { neon, neonConfig } from "@neondatabase/serverless";

import { drizzle } from "drizzle-orm/neon-http";
import { env } from "~/env";

// Disable preflight check for Neon serverless driver in production
if (env.NODE_ENV === "production") {
  neonConfig.fetchConnectionCache = true;
}

/**
 * Cache the database connection in development. This avoids creating a new connection on every HMR
 * update.
 */
const globalForDb = globalThis as unknown as {
  conn: ReturnType<typeof neon> | undefined;
};

const conn = globalForDb.conn ?? neon(env.DATABASE_URL);
if (env.NODE_ENV !== "production") globalForDb.conn = conn;

// Create and export the database instance
export const db = drizzle(conn, { schema });
