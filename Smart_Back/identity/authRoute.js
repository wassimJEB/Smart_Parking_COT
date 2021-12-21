const express=require('express');
const router=express.Router();
const identityProvider = require('./controllers/Identity.provider')




router.post('/register',identityProvider.createUser)
router.post('/login',identityProvider.signIn)





module.exports=router;