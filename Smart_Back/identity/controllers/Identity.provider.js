
const HttpStatus = require('http-status-codes');
const bcrypt = require('bcrypt');
const User = require('../models/userModel')
const argon2 = require('argon2');
const uuidv4 = require('uuidv4');
const validityTime = require('../config.js')().validityTime;
const jwt = require('jsonwebtoken');
const crypto = require('crypto')
const mongoose = require('mongoose'),
    Schema = mongoose.Schema
//---------add user------------
//we use async because this function communicate with BD
exports.createUser=async(req,res)=> {

        //Hash password
        const saltRounds = 10;
        const requete=JSON.parse(Object.keys(req.body)[0]);
        console.log('aw wsolna');
        //console.log(requete.forename);

        const hashedPassword = await bcrypt.hash(requete.password,10)
        //Create User
        const user = new User({
            forename: requete.forename,
            surname: requete.surname,
            email: requete.email,
            username:requete.username,
            password: hashedPassword
            //password:req.body.password

        });


        await user.save(function(err){
            if (err){
                console.log('errreur');
                return res.status(HttpStatus.CONFLICT).json({message:'erroryawas'});
            }

            else{
                console.log('created');
                return res.status(HttpStatus.CREATED).json({message:'Created'});

            }

    });



        /*

        const {error,value}=User.validate(req.body);

        if(error){
            return res.status(HttpStatus.CONFLICT).json(error.details);
        }
        else {
            console.log(value);
        }
*/









}