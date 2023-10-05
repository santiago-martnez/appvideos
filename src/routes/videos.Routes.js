import {Router} from 'express'
import {authRequired} from '../middlewares/validateToken.js';
import {getVideo, getVideos, createVideo, deleteVideo, updateVideo, likeVideos, getLikes, getMyVideos, publicVideo} from '../controllers/videosController.js'




const router = Router()


router.get('/video/:id', authRequired, getVideo, (req, res)=>{
   
})
router.post('/videos', authRequired, createVideo, (req, res)=>{
   
})
router.delete('/video/:id', authRequired, deleteVideo, (req, res)=>{
   
})
router.get('/videos', authRequired, getVideos , (req, res)=>{
   
})
router.get('/videos/myVideos/:creadorId', authRequired, getMyVideos, (req, res)=>{
   
})
router.put('/video/:id', authRequired, updateVideo , (req, res)=>{
   
})
router.post('/video/:videoId/:creadorId', authRequired, likeVideos , (req, res)=>{
   
})
router.get('/video/:userId/:videoId', authRequired, getLikes , (req, res)=>{
   
})
router.put('/video/publicar/:id_video', authRequired ,publicVideo , (req, res)=>{
   
})

export default router;