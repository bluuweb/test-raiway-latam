import * as dotenv from "dotenv";
dotenv.config();

import pkg from "pg";
const { Pool } = pkg;

const connectionString = process.env.CONNECT_RAIWAY;

export const pool = new Pool({ connectionString, allowExitOnIdle: true });
export default pool;
