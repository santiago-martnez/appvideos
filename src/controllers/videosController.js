import pool from '../db.js'; 

export const getLikes = async (req, res) => {
    try {
      const { userId, videoId } = req.params;
  
      // Realiza una consulta a la base de datos para verificar si el usuario ha dado like al video
      const query = await pool.query("SELECT * FROM user_like WHERE creador_id = $1 AND video_id = $2", [userId, videoId]);
  
      // Inicializa la variable isLiked como false
      let isLiked = false;
  
      // Si la consulta devuelve al menos un resultado, significa que el usuario ha dado like al video
      if (query.rows.length > 0) {
        isLiked = true;
      }
  
      // Devuelve la respuesta JSON con el valor de isLiked
      res.json({ isLiked });
    
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Error al verificar el like del video." });
    }
};  
  
export const likeVideos = async (req, res) => {
    const id_video = req.params.videoId;
    const id_creador = req.params.creadorId;
    
    try {
         // Verificar si ya existe un registro en user_like para este video y creador
         const result = await pool.query(
            "SELECT * FROM user_like WHERE video_id = $1 AND creador_id = $2",
            [id_video, id_creador]
        );

        if (result.rows.length > 0) {
            // Ya existe un registro en user_like para este video y creador
            
            res.status(200).json({ message: 'Ya existe un like para este video y creador' });

            //por lo que procedo a eliminar el like para cumplir la funcion de likear-deslikear con el mismo boton en el frontend
            await pool.query(
                "DELETE FROM user_like WHERE video_id = $1 AND creador_id = $2",
                [id_video, id_creador]
            );
            console.log('se saco el like del video')
            
        } else {
            // No existe un registro en user_like, puedes proceder a agregar el "like"
            // Insertar un nuevo registro en la tabla user_like
            await pool.query(
                "INSERT INTO user_like (video_id, creador_id) VALUES ($1, $2)",
                [id_video, id_creador]
                
            );
            console.log('se asigno un nuevo like')
            res.status(200).json({ message: 'Operación de like exitosa' });
            
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Hubo un error en la consulta SQL' });
    }
};

export const publicVideo = async (req, res) => {
    const id_video = req.params.id_video;
    console.log('ID DEL VIDEO A CAMBIAR ESTADO DE PUBLICADO (ENVIADO DESDE EL BACKEND):', id_video);

    try {
        // Realiza una consulta para obtener el estado de 'publicado' del video
        const videoInfo = await pool.query(
            "SELECT publicado FROM video WHERE id = $1",
            [id_video]
        );

        // Verifica si el video está publicado o no
        const isVideoPublicado = videoInfo.rows[0].publicado;

        if (isVideoPublicado) {
            // El video ya está publicado
            // Por lo tanto, lo despublico para hacer efecto de publicar/despublicar en el cliente con el mismo botón
            const videoModificado = await pool.query(
                "UPDATE video SET publicado = FALSE WHERE id = $1",
                [id_video]
            );
            res.json(videoModificado.rows);
        } else {
            // Actualiza el estado de 'publicado' a TRUE
            const videoModificado = await pool.query(
                "UPDATE video SET publicado = TRUE WHERE id = $1",
                [id_video]
            );
            res.json(videoModificado.rows);
        }
    } catch (error) {
        res.status(500).json({ message: "Error al procesar la solicitud." });
    }
};

export const getVideos = async(req, res)=> {
    const videoFound = await pool.query(`
    SELECT
        video.id as video_id,
        video.titulo as video_titulo,
        video.descripcion as video_descripcion,
        video.urlvideo as video_url,
        video.publicado as video_publicado,
        creador.id as creador_id,
        creador.username as creador_username,
        CASE WHEN user_like.video_id IS NOT NULL THEN true ELSE false END AS hasLiked
    FROM
        video
    INNER JOIN
        creador ON video.creador_id = creador.id
    LEFT JOIN
        user_like ON video.id = user_like.video_id AND creador.id = user_like.creador_id
    ORDER BY
        video.id DESC
`);
    res.json(videoFound.rows);
}

export const getMyVideos = async (req, res) => {
    try {
        const { creadorId } = req.params; 
        
        const videoFound = await pool.query(
            `
            SELECT
                video.id as video_id,
                video.titulo as video_titulo,
                video.descripcion as video_descripcion,
                video.urlvideo as video_url,
                video.publicado as video_publicado,
                video.creador_id as video_creador
            FROM
                video
            WHERE
                video.creador_id = $1
            ORDER BY
                video.id DESC
            `,
            [creadorId] // Pasa el ID del usuario como parámetro
        );
        res.json(videoFound.rows);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Error al obtener los videos del usuario." });
    }
};


export const createVideo = async (req, res)=> {
    const {titulo, descripcion, urlvideo} = req.body;
    const userFound = await pool.query(
        "SELECT * FROM creador WHERE id = $1",
        [req.user.id]
    );
    
    let videoId = null;
    
    const parts = urlvideo.split('v=');

    if (parts.length > 1) {
    videoId = parts[1].split('&')[0];
    console.log(videoId);

    } else {
    console.log('No se encontró el ID del video en la URL.');
    }


    const result = await pool.query(
        "INSERT INTO video (creador_id,titulo, descripcion, urlvideo, publicado) VALUES ($1, $2, $3, $4, $5) RETURNING *",
        [userFound.rows[0].id, titulo, descripcion, videoId, false]
    );
    
    const videoSubido = result.rows[0];
  
    res.json({
        videoSubido,
    }); 
}


export const getVideo = async(req, res)=> {
    const id = req.params.id;
   const videoFound = await pool.query(
        "SELECT * FROM video WHERE id = $1",
       [id]
    );




    const video = videoFound.rows[0];
    res.json({
        video
    }) 
}
export const updateVideo = async(req, res)=> {

}
export const deleteVideo = async(req, res)=> {
    const id = req.params.id;
    try {
        // Eliminar registros de user_like relacionados con el video
        await pool.query(
            "DELETE FROM user_like WHERE video_id = $1",
            [id]
        );
        // Realizar una consulta SQL DELETE para eliminar el video por su ID
        const result = await pool.query(
            "DELETE FROM video WHERE id = $1",
            [id]
        );

        // Verificar si se eliminó correctamente
        if (result.rowCount === 1) {
            res.status(200).json({ message: "Video eliminado correctamente" });
        } else {
            res.status(404).json({ message: "No se encontró el video con el ID especificado" });
        }
    } catch (error) {
        console.error("Error al eliminar el video:", error);
        res.status(500).json({ message: "Error al eliminar el video" });
    }
}