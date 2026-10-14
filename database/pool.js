import { Pool } from 'pg';

process.loadEnvFile('./.env');

const dbPool = new Pool({ connectionString: process.env.PG_CONNECTION_STRING });

export default dbPool;
