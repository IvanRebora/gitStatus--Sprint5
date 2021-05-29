// Modulos requeridos
const path = require('path');
const { body } = require('express-validator');

module.exports = [

    body('name').notEmpty().withMessage('Completá el nombre'),
    body('email').notEmpty().withMessage('Completá el correo electrónico').bail()
    .isEmail().withMessage('Debes completar con un correo electrónico válido')
]