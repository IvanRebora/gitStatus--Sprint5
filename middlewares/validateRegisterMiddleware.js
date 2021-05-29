// Modulos requeridos
const path = require('path');
const { body } = require('express-validator');

module.exports = [

    body('name').notEmpty().withMessage('Completá el nombre'),
    body('email').notEmpty().withMessage('Completá el correo electrónico').bail()
                 .isEmail().withMessage('Debes completar con un correo electrónico válido'),
    body('password').notEmpty().withMessage('Completá la contraseña'),
    body('confirmpass').notEmpty().withMessage('Reconfirmá la contraseña'),
    body('fileavatar').custom((value, { req }) => {
        // Obtengo el archivo
        let file = req.file; 

        // Defino que extensiones son válidas
        let acceptedExtensions = ['.jpg', '.png', '.gif'];
        
        if (!file) {
            throw new Error('Tienes que subir una imágen de perfil');
        } else {
            let fileExtension = path.extname(file.originalname);
            if (!acceptedExtensions.includes(fileExtension)) {
                throw new Error ('Las extensiones de imágenes permitidas son .jpg, .png y .gif')
            }
        }
        // Siempre en las validaciones custom retorno true
        return true;
    })
]