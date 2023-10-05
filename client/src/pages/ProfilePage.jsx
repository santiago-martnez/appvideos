
import { useAuth } from '../context/AuthContext';
import React, { useEffect, useState } from 'react';
import {getFollowedCreatorsRequest} from '../api/creators';
import {getFollowerCreatorsRequest} from '../api/creators';


function ProfilePage() {
    const { profile, user } = useAuth();
    const [followedCount, setFollowedCount] = useState(0); // Contador de seguidores
    const [followerCount, setFollowerCount] = useState(0)

    console.log(user)

    const fetchData = async () => {
        try {
            const res = await profile(user);
            console.log("fetchdata de profilepage =>", res)

        } catch (error) {
            console.error(error);
        }
    };

      // Función para obtener los IDs de las personas que sigues
  const getFollowedCreatorsIds = async () => {
    try {
      const response = await getFollowedCreatorsRequest(user.id);
      const ids = response.data; // Supongo que `getFollowedCreatorsRequest` devuelve los IDs como un arreglo
      return ids;
    } catch (error) {
      console.error(error);
      return [];
    }
  };

    // Función para obtener los IDs de las personas que sigues
    const getFollowerCreatorsIds = async () => {
      try {
        const response = await getFollowerCreatorsRequest(user.id);
        const ids = response.data; // Supongo que `getFollowedCreatorsRequest` devuelve los IDs como un arreglo
        return ids;
      } catch (error) {
        console.error(error);
        return [];
      }
    };




    useEffect(() => {
        fetchData();
        // Obtener los IDs de las personas que sigues y actualizar el contador de seguidores
        getFollowedCreatorsIds().then((ids) => setFollowedCount(ids.length));
        getFollowerCreatorsIds().then((ids) => setFollowerCount(ids.length));
    }, []);

    return (
        <div>
          <div className="w-full h-screen px-10 pt-10 mr-0 pr-0">
            <div className="relative mt-16 mb-32 max-w-sm mx-auto mt-24">
              <div className="ml-10 rounded-md overflow-hidden shadow-md bg-slate-700">
                <div className="absolute -mt-20 w-full flex justify-center">
                  <div className="h-40 w-40">
                    <img src={user.imagen} className="rounded-full object-cover h-full w-full shadow-md" alt="Perfil" />
                  </div>
                </div>
                <div className="px-6 mt-16 ">
                  <h1 className="text-white font-bold text-3xl text-center mb-1 pt-4">{user.username}</h1>
                  <p className="text-center text-white text-base pt-3 font-normal">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Aperiam alias sit suscipit animi explicabo veniam, ut minus blanditiis nemo nulla libero sed maiores praesentium tenetur recusandae accusantium rem sequi quos?
                  </p>
                  <div className="w-full flex justify-center pt-5 pb-5">
                    <a  className="mx-2">
                      <div>
                        <p className="text-white text-center">Seguidos: <span className="font-bold text-1xl">{followedCount}</span></p>
                      </div>
                    </a>
                    <a className="mx-2">
                      <div>
                        <p className="text-white text-center">Seguidores: <span className="font-bold text-1xl">{followerCount}</span></p>
                      </div>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )
}

export default ProfilePage
