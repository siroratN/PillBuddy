import { drizzle } from 'drizzle-orm/postgres-js';
import { migrate } from 'drizzle-orm/postgres-js/migrator';
import postgres from 'postgres';

// for migrations
const migrationClient = postgres(process.env.DB_URL as string, { max: 1 });

async function runMigrations() {
    await migrate(drizzle(migrationClient), {
        migrationsFolder: './migrations',
        migrationsSchema: './schema.ts'
    });
    console.log('Migration complete');
}

runMigrations().catch((error) => {
    console.error('Migration failed:', error);
});
