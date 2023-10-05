import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

function NavBar() {
  const { isAuthenticated, logout, user } = useAuth();

  return (
    <div className=" flex min-h-screen w-20">

      {/* Sidebar */}
      <div className=" md:w-64 bg-slate-700 h-full">
        <div className="flex items-center justify-center h-16 bg-slate-950">
          <span className="text-white font-bold uppercase">URL videos !</span>
        </div>
        <div className="flex flex-col flex-1 overflow-y-auto">
          <nav className="flex-1 px-1 py-4 bg-slate-700">


          {isAuthenticated ? (
          <>
           <p className="text-center text-white pb-3">Bienvenido {user.username}</p>
              
            <Link to="/videos" className="flex items-center px-4 py-2 text-gray-100 hover:bg-slate-950">
             <i className="mr-2 fa fa-video-camera"></i>
              Videos Inicio
            </Link>
            <Link to="/videos/new" className="flex items-center px-4 py-2 mt-2 text-gray-100 hover:bg-slate-950">
            <i className="mr-2 fa fa-level-up"></i>
              Subir video
            </Link>
            <Link to="/videos/following" className="flex items-center px-4 py-2 mt-2 text-gray-100 hover:bg-slate-950">
              <i className="mr-2 fa fa-video-camera"></i>
              Videos de seguidos
            </Link>
            <Link to={`/videos/myVideos/${user.id}`} className="flex items-center px-4 py-2 mt-2 text-gray-100 hover:bg-slate-950">
              <i className="mr-2 fa fa-play-circle"></i>
              Mis videos publicados/no publicados
            </Link>
            <Link to="/creators" className="flex items-center px-4 py-2 mt-2 text-gray-100 hover:bg-slate-950">
              <i className="mr-2 fa fa-users"></i>
              Otros creadores
            </Link>
            <Link to="/profile" className="flex items-center px-4 py-2 mt-2 text-gray-100 hover:bg-slate-950">
              <i className="mr-2 fa fa-user"></i>
              Mi perfil
            </Link>
            <Link 
            
                to='/' 
                onClick={()=>{
                  logout();
                }}
                className="m-2 flex  bg-blue-300 px-4 py-1 rounded-md hover:bg-blue-200"><i className="mr-2 mt-1 fa fa-sign-out"></i>Cerrar sesión</Link>
          </>
        ) : (
          <>
          
              <Link className="text-center m-1 flex bg-blue-300 px-4 py-1 rounded-md hover:bg-blue-200" to='/videos'>Iniciar sesión</Link>
          
            
              <Link className="text-center m-1 flex  bg-blue-300 px-4 py-1 rounded-md hover:bg-blue-200" to='/register'>Registerse</Link>
            
          </>
        )}

          </nav>
        </div>
      </div>
    </div>
  );
}

export default NavBar;






