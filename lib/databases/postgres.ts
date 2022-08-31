import pkg from "pg";
import dotenv from 'dotenv';
dotenv.config();
const { Pool } = pkg;

const DATABASE_URL = process.env.DATABASE_URL;

const pool = new Pool({
    connectionString: DATABASE_URL,
    ssl: {
        rejectUnauthorized: false
    }
});

(async ()=>{

    await pool.connect();

})();

export default pool;