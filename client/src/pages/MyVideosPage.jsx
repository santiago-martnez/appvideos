import { useVideos } from '../context/VideoContext';
import React, { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { Link } from 'react-router-dom';
import 'font-awesome/css/font-awesome.min.css';


function VideosPage() {
    const { getVideos, deleteVideo, likeVideo, getLikes, videos, getMyVideos, publicVideo } = useVideos();
    const [loading, setLoading] = useState(false);
    const { user } = useAuth();


    useEffect(() => {
        getMyVideos(user.id);
    }, []);


    const handleDeleteClick = async (video_id) => {
        setLoading(true);
        try {
            await deleteVideo(video_id);
            await getVideos();
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };


    const publicar = async (video) => {
        setLoading(true);
        try {
          console.log('PUBLICANDO...', video.video_id);
          await publicVideo(video);
          await getVideos();
        } catch (error) {
          console.error(error);
        } finally {
          setLoading(false);
        }
    };
      



    if (videos.length === 0) return <h1>no hay videos subidos por {user.username}</h1>;

    return (
        <div className="container mx-auto flex flex-col items-center justify-center">
            <div className="flex justify-center">
                <div className="grid grid-cols-1 sm:grid-cols-1 w-3/4 mt-0 ml-20 md:grid-cols-2 mt-2 lg:grid-cols-4 gap-2 p-2 mt-2">
                    {videos.map((video, index) => (
                        <div
                            className="text-white bg-slate-600 max-w-sm rounded overflow-hidden shadow-lg m-2"
                            key={`video_${video.id}_${index}`}
                        >
                            <button
                                className="text-gray-200 text-base"
                                onClick={() => publicar(video)}
                            >
                                {video.video_publicado ? (
                                    <span>
                                        <i className="m-1 p-2 fa fa-eye"></i>
                                        Publicado
                                    </span>
                                ) : (
                                    <span>
                                        <i className="m-1 p-2 fa fa-eye-slash"></i>
                                        No publicado
                                    </span>
                                )}
                            </button>

                            <div className="relative">
                                <iframe
                                    className="w-full aspect-ratio-16/9"
                                    src={`https://www.youtube.com/embed/${video.video_url}`}
                                    frameBorder="0"
                                    allowFullScreen
                                    title={video.video_titulo}
                                ></iframe>
                            </div>
                            <div className="px-6 py-4">
                                <div className="font-bold text-xl mb-2">{video.video_titulo}</div>
                                <p className="text-gray-200 text-base">{video.video_descripcion}</p>

                                <button onClick={() => handleDeleteClick(video.video_id)}>Eliminar</button>

                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default VideosPage;
