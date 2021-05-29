const express = require('express');
const router = express.Router();
const controller = require('../controller/userController');

// Middlewares
const uploadFile = require('../middlewares/multerMiddleware'); 
const formValidations = require('../middlewares/validateRegisterMiddleware');
const profileValidations = require('../middlewares/validateProfileMiddleware');
const guestMiddleware = require('../middlewares/guestMiddleware');
const authMiddleware = require('../middlewares/authMiddleware');



router.get('/register', guestMiddleware, controller.register);

router.post('/store', uploadFile.single('fileavatar'), formValidations, controller.processRegister);

router.get('/login', guestMiddleware, controller.login);

router.post('/login', controller.processLogin);

router.get('/profile', authMiddleware, controller.profile);
// Actalizo Perfil de Usuario
router.put('/profile', authMiddleware, uploadFile.single('filavatar') ,profileValidations , controller.updateProfile);


// Logout
router.get('/logout/', controller.logout);


module.exports = router;