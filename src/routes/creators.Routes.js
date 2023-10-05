import {Router} from 'express'

import {follow, getCreators, unfollow, getFollowedCreators, getFollowerCreators} from '../controllers/creatorController.js'

const router = Router();

router.get('/creator/seguidos', (req, res)=>{
    res.send('crear creador')
})
router.get('/creator/seguidores', (req, res)=>{
    res.send('crear creador')
})

router.post('/creators/follow/:id_seguidor/:id_seguido',follow, (req, res) => {
    
})
router.delete('/creators/unfollow/:id_seguidor/:id_seguido',unfollow, (req, res) => {
    
})
router.get('/creators', getCreators, (req, res)=>{
   
})
router.get('/creators/getFollows/:userId', getFollowedCreators, (req, res)=>{
   
})
router.get('/creators/getFollowers/:userId', getFollowerCreators, (req, res)=>{
   
})
export default router;