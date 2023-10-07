import { useVideos } from '../context/VideoContext';
import React, { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { Link } from 'react-router-dom';
import 'font-awesome/css/font-awesome.min.css';

function VideosPage() {
  const { getVideos, deleteVideo, likeVideo, getLikes, videos } = useVideos();
  const [loading, setLoading] = useState(false);
  const { user } = useAuth();
  const [videoLikes, setVideoLikes] = useState({});

  useEffect(() => {
    getVideos();
  }, []);

  useEffect(() => {
    const fetchVideoLikes = async () => {
      const likes = {};
      for (const video of videos) {
        const isLiked = await isVideoLikedByUser(video, user);
        likes[video.video_id] = isLiked;
      }
      setVideoLikes(likes);
    };

    fetchVideoLikes();
  }, [videos, user]);

  const handleLikeClick = async (video) => {
    setLoading(true);
    try {
      await likeVideo(video.video_id, user.id);
      await getVideos();
      setVideoLikes((prevLikes) => ({
        ...prevLikes,
        [video.video_id]: !prevLikes[video.video_id],
      }));
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const isVideoLikedByUser = async (video, usuario) => {
    const res = await getLikes(usuario.id, video.video_id);
    return res.isLiked;
  };

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

  if (videos.length === 0) return <h1>No hay videos disponibles.</h1>;

  return (
    <div className="container mx-auto flex flex-col items-center justify-center">
      <div className="flex justify-center">
        <div className=" grid grid-cols-1 sm:grid-cols-1 w-3/4 mt-0 ml-20 md:grid-cols-2 mt-2 lg:grid-cols-4 gap-2 p-2 mt-2">
          {videos.map((video, index) => (
            // Verifica si el video está publicado antes de renderizarlo
            video.video_publicado && (
              <div
                className="text-white bg-slate-600 max-w-sm rounded overflow-hidden shadow-lg "
                key={`video_${video.id}_${index}`}
              >
                <p className="text-sm p-3 bg-slate-950">
                  Video subido por <span className="font-bold">{video.creador_username}</span>
                </p>
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
                  {loading ? (
                    <p>Cargando...</p>
                  ) : videoLikes[video.video_id] ? (
                    <button className="p-1 m-2 bg-gray-800 rounded-md" onClick={() => handleLikeClick(video)}>
                      <i className="fa fa-heart"></i>
                    </button>
                  ) : (
                    <button className="p-1 m-2 bg-gray-800 rounded-md" onClick={() => handleLikeClick(video)}>
                      <i className="fa fa-heart-o"></i>
                    </button>
                  )}
                  <button onClick={() => handleDeleteClick(video.video_id)}>Eliminar</button>
                </div>
              </div>
            )
          ))}
        </div>
      </div>
    </div>
  );
}

export default VideosPage;
