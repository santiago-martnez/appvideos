import { useAuth } from '../context/AuthContext';
import React, { useEffect, useState } from 'react';
import { getCreatorsRequest, followRequest, unfollowRequest, getFollowedCreatorsRequest} from '../api/creators';

function CreatorsPage() {
  const { user } = useAuth();
  const [creators, setCreators] = useState([]);
  const [followedCreators, setFollowedCreators] = useState([]); // Estado para almacenar los ID de los creadores seguidos

  const fetchCreators = async () => {
    try {
      const res = await getCreatorsRequest();
      setCreators(res.data); // Almacena los creadores en el estado
    } catch (error) {
      console.log(error); 
    }
  };

  const fetchFollowedCreators = async () => {
    // Realiza una solicitud para obtener los creadores seguidos por el usuario actual
    try {
      const res = await getFollowedCreatorsRequest(user.id);
      setFollowedCreators(res.data);
      console.log('getFollowed ->' ,res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleFollow = async (creatorId) => {
    try {
      await followRequest(user.id, creatorId); // Llama a la función para seguir al creador
      setFollowedCreators([...followedCreators, creatorId]); // Agrega el ID del creador seguido al estado local
    } catch (error) {
      console.error('Error al seguir al creador:', error);
    }
  };

  const handleUnfollow = async (creatorId) => {
    try {
      await unfollowRequest(user.id, creatorId); // Llama a la función para dejar de seguir al creador
      setFollowedCreators(followedCreators.filter((id) => id !== creatorId)); // Elimina el ID del creador seguido del estado local
    } catch (error) {
      console.error('Error al dejar de seguir al creador:', error);
    }
  };

  useEffect(() => {
    fetchCreators(); 
    fetchFollowedCreators()// Llama a la función fetchCreators en useEffect
  }, []);

  return (
    <div className="mx-auto mt-2 mb-2 sm:m-10 xl:ml-10 ">
      <div className="grid grid-cols-1">
        {creators
          .filter((creator) => creator.id !== user.id) // Filtrar creadores que no sean iguales a user.id
          .map((creator) => (
            <div key={creator.id} className="p-2 sm:ml-12  flex items-center justify-between border-t cursor-pointer bg-slate-600 rounded-md">
              <div className="flex items-center">
                <img
                  className="rounded-full h-10 w-10"
                  src={creator.imagen}
                  alt={`Profile Image of ${creator.username}`}
                />
                <div className="ml-2 flex flex-col">
                  <div className="leading-snug text-sm text-white font-bold">
                    {creator.username}
                  </div>
                  <div className="leading-snug text-xs text-white">@{creator.username}</div>
                </div>
              </div>
              {followedCreators.includes(creator.id) ? (
                <button
                  onClick={() => handleUnfollow(creator.id)} // Llama a la función para dejar de seguir
                  className="h-8 px-3 text-md font-bold text-white border border-blue-400 bg-blue-400 rounded-full hover:bg-blue-100"
                >
                  Unfollow
                </button>
              ) : (
                <button
                  onClick={() => handleFollow(creator.id)} // Llama a la función para seguir
                  className="h-8 px-3 text-md font-bold text-white border border-blue-400 rounded-full hover:bg-blue-100"
                >
                  Follow
                </button>
              )}
            </div>
          ))}
      </div>
    </div>
  );
  
}

export default CreatorsPage;
