import axios from './axios'

export const getVideosRequest = ( ) => axios.get('/videos')

export const getVideoRequest = (id) => axios.get(`/video/${id}`)

export const getMyVideosRequest = (id_creador) => axios.get(`/videos/myVideos/${id_creador}`);

export const createVideoRequest = (video) => axios.post('/videos', video)

export const updateVideoRequest = (video) => axios.put(`/video/${video.id}`, video);

export const deleteVideoRequest = (id) => axios.delete(`/video/${id}`);

export const likeVideoRequest = (id_video, id_creador) => axios.post(`/video/${id_video}/${id_creador}`);

export const getLikesRequest = (id_creador, id_video) => axios.get(`/video/${id_creador}/${id_video}`);

export const publicVideoRequest = (video) => axios.put(`/video/publicar/${video.video_id}`);