import { drizzle } from 'drizzle-orm/postgres-js';
import { migrate } from 'drizzle-orm/postgres-js/migrator';
import postgres from 'postgres';

import {users} from "./schema"

// for query purposes
const queryClient = postgres(process.env.DB_URL as string);
export const db = drizzle(queryClient);


