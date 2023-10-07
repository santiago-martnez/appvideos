import {useForm} from 'react-hook-form'
import { useVideos } from '../context/VideoContext'
import {useNavigate} from 'react-router-dom'

function VideoFormPage() {
  const {register, handleSubmit} = useForm()
  const {createVideo} = useVideos();
  const navigate = useNavigate();

  const onSubmit = handleSubmit((data)=>{
    createVideo(data)
    navigate('/videos')
  })

  return (
    <div className="flex items-center justify-center h-screen">
      <div className="bg-slate-600 w-1/2 p-8 rounded-md ml-10">
        <h1 className="text-center text-white font-bold p-2 text-xl">Subir video</h1>
      <form onSubmit={onSubmit} encType="multipart/form-data">
        <input type="text" placeholder="Titulo del video" 
          {...register('titulo')}
          className="w-full bg-slate-800 text-white px-4 py-2 rounded-md"
          autoFocus
        />

        <input type="text" placeholder="URL del video" 
          {...register('urlvideo')}
          className="w-full bg-slate-800 text-white mt-2 px-4 py-2 rounded-md"
          autoFocus
        />

        <textarea 
          rows="3"
          placeholder="Descripcion del video"
          {...register("descripcion")} 
          className="w-full bg-slate-800 text-white px-4 py-2 rounded-md my-2"
          ></textarea>
        <button className="bg-blue-300 hover:bg-blue-200 px-3 py-1 rounded-md" type="submit">
          Publicar video
        </button>
      </form>
    </div>
    </div>
    
  )
}

export default VideoFormPage
