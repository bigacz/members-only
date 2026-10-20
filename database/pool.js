import { Pool } from 'pg';

const dbPool = new Pool({ connectionString: process.env.PG_CONNECTION_STRING });

export default dbPool;
