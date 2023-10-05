import { createContext, useContext, useState} from "react";
import { createVideoRequest, getVideosRequest, deleteVideoRequest, likeVideoRequest, getLikesRequest, getMyVideosRequest, publicVideoRequest} from "../api/videos.js"

const VideoContext = createContext();

export const useVideos = () => {
    const context = useContext(VideoContext);

    if (!context) {
        throw new Error("useVideos must be used within a VideoProvider");
    }
    return context;
}


export function VideoProvider({ children }) {
    const [videos, setVideos] = useState([]);
    const [refreshIndicator, setRefreshIndicator] = useState(false);


    const getMyVideos = async (id_creador) => {
        try {
            const res = await getMyVideosRequest(id_creador);
            setVideos(res.data);
            
        } catch (error) {
            console.log('error de getmyvideos')
            console.error(error)
        }
    }

    const getVideosSeguidos = async (id_creador) => {
        try {
            const res = getVideosSeguidosRequest(id_creador);
            return res.data;
        } catch (error) {
            console.log(error)
        }
    }

    const publicVideo = async (video) => {
        try {
            console.log('Recibí el id en el CONTEXTO:', video.video_id);
            console.log('antes de aplicar publicVideoRequest');
            const res = await publicVideoRequest(video);
            console.log(res);
            console.log('despues de aplicar publicVideoRequest');
            // Verificar si la respuesta es exitosa y si los datos han cambiado antes de actualizar el estado
            if (res.status === 200) {
                setVideos(res.data);
                console.log(res.data);
            } else {
                console.error('La solicitud no fue exitosa');
            }
        } catch (error) {
            console.log(' aparecio un error');
            console.error(error);
        }
    }



    const getVideos = async () => {
        try {
            const res = await getVideosRequest();
            setVideos(res.data);

        } catch (error) {
            console.error(error)
        }
    }

    const createVideo = async (video) => {
        const res = await createVideoRequest(video);
        console.log(res);
    }

    const deleteVideo = async(id) =>{
        try {
            const res = await deleteVideoRequest(id);
            if (res.status === 200) {
                const updatedVideos = videos.filter(video => video.id !== id);
                console.log(updatedVideos); // Verifica que los videos se actualicen correctamente
                setVideos(updatedVideos);
                setRefreshIndicator(!refreshIndicator);
            }
        } catch (error) {
            console.error(error)
        }
    }

    const likeVideo = async(id_video, id_creador) => {
        try {
            const res = await likeVideoRequest(id_video, id_creador);
        } catch (error) {
            console.log(error)
        }
        
    }
    const getLikes = async (id_creador, id_video) => {
        try {
          const res = await getLikesRequest(id_creador, id_video);
          // Puedes realizar cualquier otro procesamiento necesario aquí
          return res.data;
        } catch (error) {
          console.log(error);
        }
    };



    return (
        <VideoContext.Provider
         value={{
            videos,
            getMyVideos,
            createVideo,
            getVideos,
            deleteVideo,
            likeVideo,
            getLikes,
            publicVideo,
            
        }}
        >
            {children}
        </VideoContext.Provider>
    );
}