import { useForm } from 'react-hook-form'
import { useAuth } from '../context/AuthContext';
import { Link, useNavigate } from 'react-router-dom';
import { Navigate, Outlet } from 'react-router-dom';
import { useEffect } from 'react';

function LoginPage() {

  const { register, handleSubmit, formState: { errors } } = useForm();
  const { signin, errors: signinErrors, isAuthenticated } = useAuth()
  
  const navigate = useNavigate();

  const onSubmit = handleSubmit(async(data) => {
    await signin(data);
    navigate("/videos")
  })

  useEffect(() => {
  }, [isAuthenticated])
  if (isAuthenticated) {
    navigate("/videos");
    console.log('go videos')
  }

  return (
    
<div className="flex items-center justify-center h-screen">
  {signinErrors.map((error, i) => (
    <div className="bg-red-500 p-2 text-white" key={i}>
      {error}
    </div>
  ))}
  <form onSubmit={onSubmit}>
    <div className="ml-4 mb-3">
      <input
        type="text"
        {...register("username", { required: true })}
        className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md"
        placeholder="Usuario"
        autoComplete="username"
      />
      {errors.username && (
        <p className="text-red-500">Username is required</p>
      )}
    </div>

    <div className="ml-4 mb-3">
      <input
        type="password"
        {...register("password", { required: true })}
        className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md"
        placeholder="Contraseña"
        autoComplete="current-password"
      />
      {errors.password && (
        <p className="text-red-500">Password is required</p>
      )}
    </div>

    <button type="submit" className="ml-4 bg-black text-white p-2 m-1 rounded-md">
      Login
    </button>

    <p className="ml-4 ">
      ¿No tienes cuenta? <Link to="/register">Crear cuenta</Link>
    </p>
  </form>
</div>
  )
}

export default LoginPage
