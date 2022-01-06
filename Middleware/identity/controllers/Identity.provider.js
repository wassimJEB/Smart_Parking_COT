
const HttpStatus = require('http-status-codes');
const bcrypt = require('bcrypt');
const User = require('../models/userModel')
const argon2 = require('argon2');
const jwt = require('jsonwebtoken');
const crypto = require('crypto')

const randomBytes = require('randombytes');
const mongoose = require('mongoose'),
    Schema = mongoose.Schema
const { v4: uuidv4 } = require('uuid');

//---------Register------------

exports.createUser=async(req,res)=> {
    //input : forename,surname,username,email,passeword,role
    //route : '/register'
    //output : created or not

        //ba3d test mel front
        const requete=JSON.parse(Object.keys(req.body)[0]);
        //const requete=req.body;
        //console.log(requete);


        /*----- USE BCRYPT---------
        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(requete.password,10)*/

        //-----USE ARGON2-------
        try {
            requete.password = await argon2.hash(requete.password, {
                type: argon2.argon2id,
                memoryCost: 2 ** 16,
                hashLength: 64,
                saltLength: 32,
                timeCost: 11,
                parallelism: 2
            });
            requete.created_at = Date.now();
            requete.permissionLevel = 1 ;

            //-------Creation --------
            const saved = await User.createIdentity(requete)
            console.log('created ');
            return res.status(HttpStatus.CREATED).json({message: 'Created jawna behy'});

        }catch(err){
            res.status(400).send({errors : ['Resaisir les données']});
        }
}



//---------SignIN------------
let challenges = {};
let codes = {};
let identities = {}
function printPKCEData() {
    console.log('challenges: ' + JSON.stringify(challenges, null, 2));
    console.log('codes: ' + JSON.stringify(codes, null, 2));
    console.log('identities: ' + JSON.stringify(identities, null, 2));
}

exports.PreSignIn = async(req, res , next) => {
    //output : SignInId
    const requete=JSON.parse(Object.keys(req.body)[0]);
    clientId = requete.clientId;
    codeChallenge = requete.codeChallenge;
    SignInId = clientId + "#" + uuidv4().toString();
    console.log(SignInId);
    console.log('sign')
    challenges[codeChallenge] = SignInId;

    data = {
        SignInId:SignInId,
        clientId:clientId,
        codeChallenge:codeChallenge
    }
    //console.log(data)

    return res.status(200).send(data);
}

exports.signIn = async (req, res , next) => {
    //input : singInId , username , password
    //route : '/login'
    //output : authorizationCode

    try {
        //if req mel front
        const requete=JSON.parse(Object.keys(req.body)[0]);


        //if req mel postman
        //const requete = req.body
        //----------------- Comparaison SignINID from back and front

        console.log('login')
       console.log(requete.SignInId)
        if(!requete.SignInId){
            console.log('T3ada')
           return res.status(401).send({errors : ['Unauthorized']});
       }


        User.findByUsername(requete.username).then(async (user)=> {

            if(!user[0]){
                //Les coordonnées n'existent pas
                return res.status(400).send({errors : ['Invalid Credentials ']});
            }else{
                if(await argon2.verify(user[0].password,requete.password)){
                    this.authorizationCode = randomBytes(16).toString('hex');
                    console.log(this.authorizationCode)

                    return res.status(200).send({authorizationCode : this.authorizationCode});

                }else{
                    //Password error
                    return res.status(400).send({errors : ['Invalid Credentials']});
                }
            }
        });
    }catch(err){
        return next(err);
    }
};
exports.PostSignIn = async(req, res , next) => {


    let requete=JSON.parse(Object.keys(req.body)[0]);
    //let requete=JSON.parse(Object.keys(req.header)[0]);

    if(requete.authorizationCode != this.authorizationCode){
        //console.log('mch mrigl')
        return res.status(401).send({errors : ['Unauthorized']});
    }

    let hash = crypto.createHash('sha256')
        .update(requete.codeVerifier)
        .digest('hex');


    user = User.findByUsername(requete.username).then(async (user)=> {
        var now = Math.floor(Date.now()/1000);
        requete = {
            iss : 'wassimjeb.me',
            aud : 'urn:' + (req.get('origin') ? req.get('origin') : '*.wassimjeb.me'),
            sub : user[0].username ,
            name : user[0].forename + ' ' + user[0].surname,
            userId : user[0]._id,
            roles : user[0].permissionLevel,
            jti : uuidv4(),
            iat : now,
            exp : now + 1000
        };
        //Create JWT Token and return it
        //console.log('Create JWT Token and return it')

        jwt.sign(requete, require('crypto').randomBytes(64).toString('hex'), (err, token) => {
            res.json({
                token
            });
            console.log(token);
        });
        this.clientId=null;
        this.codeChallenge=null;
        this.codeVerifier=null;
        this.authorizationCode=null;
        this.SignInId=null;
    });
    //input : codeverifier , authorizationCode
    //route : /oauth/token
    //check codeverifier compatiblity using the authorizationCode
    //generate Access Token & Refresh Token

}


