import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';

// for query purposes ok
const queryClient = postgres(process.env.DB_URL as string);
export const db = drizzle(queryClient);




