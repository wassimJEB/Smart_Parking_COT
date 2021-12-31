const express=require('express');
const router=express.Router();
const identityProvider = require('./controllers/Identity.provider')




router.post('/register',identityProvider.createUser);

router.post('/login',identityProvider.signIn);

router.post('/users/authorize',identityProvider.PreSignIn);

router.post('/users/oauth/token',identityProvider.PostSignIn);

router.post('/oauth/token/refresh',identityProvider.RefreshSignIn);






module.exports=router;