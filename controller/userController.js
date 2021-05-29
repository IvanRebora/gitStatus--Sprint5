// Modelo o DB
const User = require('../model/Users');

// Modulos requeridos
const {	validationResult } = require('express-validator');
const bcryptjs = require('bcryptjs');
const { findByPk } = require('../model/Users');

// Funcionalidad userController
const userController = {
    
    // Registro (GET)
    register: (req, res) => {
        return res.render('register');
    },

    // Registro (POST)
    processRegister: (req, res) => {
        const resultValidation = validationResult(req);

        // Si hay errores, devolver data ingresada y validaciones
        if (resultValidation.errors.length > 0) {
            return res.render('register', {
                errors: resultValidation.mapped(),
                oldData: req.body
            });
        }

        // Verifico que el email no este registrado caso contrario retorno error
        let userInDB = User.findByField('email', req.body.email);

        if (userInDB) {
            return res.render('register', {
                errors: {
                    email: {
                        msg: 'Este email ya está registrado.'
                    }
                },
                oldData: req.body
            });            
        }

        // Si paso las validaciones y el email no esta registrado, creo el usuario
        let userToCreate = {
            ...req.body,
            password: bcryptjs.hashSync(req.body.password, 10),
            confirmpass: bcryptjs.hashSync(req.body.confirmpass, 10),
            fileavatar: req.file.filename
        }

        let userCreated = User.create(userToCreate);

        return res.redirect('/login');
    },

    // Login (GET)    
    login:(req, res)=>{    
        return res.render('login');
    },

    // Login (POST) - Session de usuario
    processLogin: (req, res) => {

        // Verifico si el usuario está registrado
        let userToLogin = User.findByField('email', req.body.email);

        if (userToLogin) {
            let isOkThePassword = bcryptjs.compareSync(req.body.password, userToLogin.password);
            if (isOkThePassword) {
                // Guardo al usuario en Session pero borro su contraseña
                delete userToLogin.password;
                req.session.userLogged = userToLogin;

                // Creo una cookie para guardar el email, si el usuario opto por ser recordado
                if (req.body.remember) {
                    res.cookie('userEmail', req.body.email, { maxAge: (1000 * 60) * 60})
                }

                return res.redirect('/')
            }   
            return res.render('login', {
                errors: {
                    email: {
                        msg: 'Email o contraseña inválida'
                    }
                }
            })     
        }

        return res.render('login', {
            errors: {
                email: {
                    msg: 'Email no registrado'
                }
            }
        })
    },

    profile: (req,res) => {
        
        return res.render('profile', {
            user: req.session.userLogged
        });
    },

    updateProfile:(req,res) => {

        const resultValidation = validationResult(req);
        let fileavatarN = req.session.userLogged.fileavatar ;
        let oldData = {...req.body,
                        fileavatar:filavatarN};
                        
        if (resultValidation.errors.length > 0) {
            console.log(resultValidation.errors);
            return res.render('profile', {
                errors: resultValidation.mapped(),
                user:oldData  });
            
        } else{
            
            let userInDB = User.findByField('email', req.body.email);

            if (userInDB && userInDB.id != req.session.userLogged.id ) {
                return res.render('profile', {
                    errors: {
                        email: {
                            msg: 'Este email ya está registrado.'
                        }
                    },
                    user: oldData
                });            
            };

            if (req.file){
               fileavatarN =  req.file.filename
            }
            let userToUpdate = User.findByPk(req.session.userLogged.id)
            
            userToUpdate  = {
                id:    userToUpdate.id,
                name:  req.body.name,
                email       : req.body.email,
                dateBrith   : req.body.dateBrith,
                adress      : req.body.adress,
                interests   : req.body.interests,
                fileavatar      : userToUpdate.avatar,
                password    : userToUpdate.password,
                confirmpass : userToUpdate.confirmpass
        
            }            
            
            if (User.update(req.session.userLogged.id,userToUpdate )){

                req.session.userLogged = userToUpdate;
                delete req.session.userLogged.password ;
                delete req.session.userLogged.confirmpass ;
                console.log('req.session.userLogged');
                console.log(req.session.userLogged);
            };
        }
        console.log('req.session.userLogged');
        console.log(req.session.userLogged);
        return res.redirect('/');
    },

    logout: (req,res) => {
        res.clearCookie('userEmail');
        req.session.destroy();
        return res.redirect('/');
    }
};

module.exports = userController;