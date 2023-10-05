import pool from '../db.js'; 

export const getCreators = async (req, res) => {
    const creadores = await pool.query("SELECT * FROM creador");

    res.json(creadores.rows);
}; 

export const follow = async (req, res) => {
    const seguidor = req.params.id_seguidor; 
    const seguido = req.params.id_seguido;

    console.log(seguidor);console.log(seguido);

    try {
        // Insertar una nueva fila en la tabla 'followers' para registrar la relación de seguimiento
        const nuevoFollow = await pool.query('INSERT INTO followers (id_creador_seguidor, id_creador_seguido) VALUES ($1, $2)', [seguidor, seguido]);
        res.json(nuevoFollow.rows);

      } catch (error) {
        console.error('Error al seguir al usuario:', error);
        res.status(500).json({ error: 'Error interno del servidor.' });
      }
};  

export const unfollow = async (req, res) => {
    const seguidor = req.params.id_seguidor; 
    const seguido = req.params.id_seguido;
    console.log('seguidor->', seguidor);
    console.log('seguido ->', seguido);
    try {
        // Eliminar la fila correspondiente en la tabla 'followers'
        const resultado = await pool.query('DELETE FROM followers WHERE id_creador_seguidor = $1 AND id_creador_seguido = $2', [seguidor, seguido]);
        
        const rowCount = resultado.rowCount;
        console.log(rowCount);


        // Verificar si se eliminó una fila (resultado.rowCount = 1) o no
        if (resultado.rowCount === 1) {
            res.status(200).json({ message: 'Se ha dejado de seguir al usuario.' });
        } else {
            res.status(404).json({ error: 'No se encontró la relación de seguimiento.' });
        }
    } catch (error) {
        console.error('Error al dejar de seguir al usuario:', error);
        res.status(500).json({ error: 'Error interno del servidor.' });
    }
};

// Controlador para obtener los creadores seguidos por el usuario actual
export const getFollowedCreators = async (req, res) => {
    const userId = req.params.userId; // Suponiendo que el ID del usuario actual se pasa como parámetro en la URL
    console.log('getFollowedCreators de ->',userId)
    try {
      // Realiza una consulta a la base de datos para obtener los creadores seguidos por el usuario
      const queryResult = await pool.query(
        'SELECT id_creador_seguido FROM followers WHERE id_creador_seguidor = $1',
        [userId]
      );
      console.log(queryResult.rows[0])
      
      // Extrae los IDs de los creadores seguidos de la respuesta de la consulta
      const followedCreators = queryResult.rows.map((row) => row.id_creador_seguido);


      console.log('followed creators _>',followedCreators);
  
      // Retorna la lista de IDs de creadores seguidos como respuesta
      res.status(200).json(followedCreators);
    } catch (error) {
      console.error('Error al obtener los creadores seguidos:', error);
      res.status(500).json({ error: 'Error interno del servidor.' });
    }
};


export const getFollowerCreators = async (req, res) => {
  const userId = req.params.userId; // Suponiendo que el ID del usuario actual se pasa como parámetro en la URL
  console.log('getFollowersCreators de ->',userId)
  try {
    // Realiza una consulta a la base de datos para obtener los creadores seguidos por el usuario
    const queryResult = await pool.query(
      'SELECT id_creador_seguidor FROM followers WHERE id_creador_seguido = $1',
      [userId]
    );

    console.log(queryResult.rows[0])
    
    // Extrae los IDs de los creadores seguidores de la respuesta de la consulta
    const followerCreators = queryResult.rows.map((row) => row.id_creador_seguidor);


    console.log('follower creators _>',followerCreators);

    // Retorna la lista de IDs de creadores seguidos como respuesta
    res.status(200).json(followerCreators);
  } catch (error) {
    console.error('Error al obtener los creadores seguidos:', error);
    res.status(500).json({ error: 'Error interno del servidor.' });
  }
};
  