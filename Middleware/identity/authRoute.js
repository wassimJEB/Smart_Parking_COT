const express=require('express');
const router=express.Router();
const identityProvider = require('./controllers/Identity.provider');
const mqttController=require('../mqtt/controllers/mqttController');



router.post('/register',identityProvider.createUser);

router.post('/login',identityProvider.signIn);

router.post('/users/authorize',identityProvider.PreSignIn);

router.post('/users/oauth/token',identityProvider.PostSignIn);

//router.post('/oauth/token/refresh',identityProvider.RefreshSignIn);

router.get('/car-list', mqttController.listPlate);




module.exports=router;