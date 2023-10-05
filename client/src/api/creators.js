import axios from './axios'

export const getCreatorsRequest = ( ) => axios.get('/creators')

export const followRequest = (id_creador_seguidor, id_creador_seguido) => axios.post(`/creators/follow/${id_creador_seguidor}/${id_creador_seguido}`);

export const unfollowRequest = (id_creador_seguidor, id_creador_seguido) => axios.delete(`/creators/unfollow/${id_creador_seguidor}/${id_creador_seguido}`);

export const getFollowedCreatorsRequest = (id_creador_seguidor) => axios.get(`/creators/getFollows/${id_creador_seguidor}`);

export const getFollowerCreatorsRequest = (id_creador_seguido) => axios.get(`/creators/getFollowers/${id_creador_seguido}`);

export const getMyVideosRequest = (id_creador) => axios.get(`/videos/myVideos/${id_creador}`);