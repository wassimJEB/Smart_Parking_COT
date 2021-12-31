// Inclusion de Mongoose
var mongoose = require('mongoose');

// On se connecte à la base de données
// N'oubliez pas de lancer ~/mongodb/bin/mongod dans un terminal !
mongoose.connect('mongodb://localhost/blog', function(err) {
    if (err) { throw err; }
});

// Création du schéma pour les commentaires
var commentaireArticleSchema = new mongoose.Schema({
    pseudo : { type : String, match: /^[a-zA-Z0-9-_]+$/ },
    contenu : String,
    date : { type : Date, default : Date.now }
});

// Création du Model pour les commentaires
var CommentaireArticleModel = mongoose.model('commentaires', commentaireArticleSchema);

// On crée une instance du Model
var monCommentaire = new CommentaireArticleModel({ pseudo : 'Atinux' });
monCommentaire.contenu = 'Salut, super article sur Mongoose !';

// On le sauvegarde dans MongoDB !
monCommentaire.save(function (err) {
    if (err) { throw err; }
    console.log('Commentaire ajouté avec succès !');
    // On se déconnecte de MongoDB maintenant
    mongoose.connection.close();
});



//---------------------------------auth cont
const Joi = require('joi');
const HttpStatus = require('http-status-codes');
const bcrypt = require('bcrypt');
const User = require('../models/userModel')
const mongoose = require("mongoose");
//---------add user------------
module.exports={
    //we use async because this function communicate with BD
    async createUser(req,res){
        //console.log(req.body);
        /*

        const schema = Joi.object({
            forename: Joi.string().min(3).max(30).required(),
            surname: Joi.string().min(3).max(30).required(),
            email: Joi.string().email().required(),
            username:Joi.string(),
            password: Joi.string().min(5).pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')),
            permissions:Joi.number()
        });*/
        const {error,value}=User.validate(req.body);

        if(error){
            return res.status(HttpStatus.CONFLICT).json(error.details);
        }
        else {
            console.log(value);
        }

        //await nestenewh il cherche
        /*const userName =  await User.findOne({
            username:value.username
        });if(userName){
            return res.status(HttpStatus.CONFLICT).json({
                message:'Username already exist'
            });
        }
        const email = await User.findOne({
            email:value.email
        });if(email){
            return res.status(HttpStatus.CONFLICT).json({
                message:'Email  already exist'
            })
        }

        //async method for encryption

        return bcrypt.hash(value.password,saltRounds,(err,hash)=>{
            if (err){
                return res.status(HttpStatus.BAD_REQUEST).json({
                    message:'error occured while hashing password'
                });}*/
        /*
        const saltRounds = 10;
        const hashedPass = await bcrypt.hash(value.password,saltRounds);
        const newUser={

            forename: value.forename,
            surname: value.surname,
            email: value.email,
            username: value.username,
            password: hashedPass


            }
        try{
            await newUser.save();
            res.status(HttpStatus.CREATED).json({message:'User created'});


        }catch(err){
            res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({message:'error creation'});


        }


            /*
             const Creation = await User.create(newUser);
             console.log('created' , value);

                     .then(user=>{

                     res.status(HttpStatus.CREATED).json({
                         message:'User created',user})
                     })
                     .catch(err=>{
                         res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
                             message:'error creation'
                         })
                     });
     */

        //);




    }
}