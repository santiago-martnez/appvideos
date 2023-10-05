import React, { useEffect } from 'react'
import {useForm} from 'react-hook-form'
import {useAuth} from '../context/AuthContext'
import {Navigate, useNavigate} from 'react-router-dom'

function RegisterPage() {

  const {
    register,
    handleSubmit,
    formState: {errors},
    } = useForm();
  const {signup, isAuthenticated, errors: registerErrors} = useAuth();
  const navigate = useNavigate()

 useEffect(()=>{
    if(isAuthenticated) navigate("/videos");
 }, [isAuthenticated])

  const onSubmit = handleSubmit(async(values)=>{
    signup(values);
  });

  return (
    <div className="flex items-center justify-center h-screen">

      {
        registerErrors.map((error, i) => (
          <div className="bg-red-500 p-2 text-white" key={i}>
            {error}
          </div>
        ))
      }

      <form onSubmit={onSubmit}>
        <div className="ml-4 mb-3">
          <input type="text" 
            {...register("username", {required:true})}
            className="w-full bg-zinc-700 text-white px-4 mt-3 py-2 rounded-md"
            placeholder="Usuario nuevo"
          />
          {errors.username && (
            <p className="text-red-500">Username is required</p>
          )}
        </div>

        <div className="ml-4 mb-3">
          <input type="text"  
          {...register("password", {required: true})}
            className="w-full bg-zinc-700 text-white px-4 mt-3 py-2 rounded-md"
            placeholder="Contraseña"
          />
          {errors.password && (
            <p className="text-red-500">Password is required</p>
          )}
        </div>
      

      

        <button type="submit" className="ml-4 bg-black text-white p-2 m-1 rounded-md">
          Register
        </button>

      </form>
    </div>
  )
} 

export default RegisterPage
