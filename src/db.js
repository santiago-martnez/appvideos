import pkg from 'pg';
const { Pool } = pkg;

const pool =  new Pool({
    user: 'postgres',
    password: 'corona',
    host: 'localhost',
    port: 5432,
    database: 'appvideos'
})

export default pool;