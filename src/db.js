import pkg from 'pg';
const { Pool } = pkg;
import { config } from 'dotenv';

config()
console.log(process.env.DATABASE_URL);

const pool =  new Pool({
   connectionString: process.env.DATABASE_URL,
   ssl: true
})


// Manejar el evento de conexión exitosa
pool.on('connect', () => {
    console.log('Conexión exitosa a la base de datos');
  });
  
  // Manejar errores de conexión
  pool.on('error', (err) => {
    console.error('Error de conexión a la base de datos:', err);
  });
  

export default pool;